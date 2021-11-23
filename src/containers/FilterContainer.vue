<template>
  <aside class="sidebar">
    <div class="sidebar__container">
      <ul class="filter-list">
        <DoubleSlider 
          v-for="range in ranges"
          :key="range.title"
          v-bind="range"
          :selected="getSelectedRange(range.title, range.min, range.max)"
          @range-changed="onRangeChange"
          :isInList="true"
        />
        <FilterList 
            v-for="filter in filters"
            :key="filter.title"
            v-bind="filter"
            :selected="selectedFilters"
            @add-filter="onAddFilter"
            @remove-filter="onRemoveFilter"
            :isInList="true"
        />
      </ul>
    </div>
    <Button 
      :color="'primary'" 
      :size="'large'"
      :class-name="'sidebar__button_large'"
      @click="onResetClick"
    >
      CLEAR ALL FILTERS
    </Button>
  </aside>
</template>

<script>
import Button from '../components/Button';
import FilterList from '../components/FilterList';
import DoubleSlider from '../components/DoubleSlider';
import { fetchCategories, fetchBrands } from '../api'

export default {
    components: {
        Button,
        FilterList,
        DoubleSlider
    },
    props: {
        selectedFilters: {
            type: Array,
            default: () => []
        },
        selectedRanges: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            filters: {
                'Category': {
                    title: "Category",
                    list: [],
                    loading: false,
                    error: false
                },

                'Brand': {
                    title: "Brand",
                    list: [],
                    loading: false,
                    error: false
                }
            },
            ranges: {
                'Price': {
                    title: 'Price',
                    min: 0,
                    max: 85000,
                    precision: 0,
                    prefix:' UAH'
                },
                'Rating': {
                    title: 'Rating',
                    min: 0, 
                    max: 5,
                    precision: 2
                }
            }
        }
    },
    created() {
        this.getFilters();
    },
    methods: {
        prepareFilters(arr, prefix) {
            return arr.map(item => {
                return {
                    value: `${prefix}=` + item.toLowerCase().split(' ').join('_'),
                    title: item
                }
            });
        },
        getSelectedRange(title, min, max) {
            const range = this.selectedRanges.find(item => item.title === title);
            return range?.selected? range.selected : {from: min, to: max};
        },
        onAddFilter(value) {
            this.$emit('add-filter', value);
        },
        onRemoveFilter(value) {
            this.$emit('remove-filter', value);
        },
        onRangeChange(title, selected) {
            this.$emit('range-changed', title, selected);
        },
        onResetClick() {
            this.$emit('reset-filters');
        },
        getFilters() {
            this.getFilter(fetchCategories, 'Category');
            this.getFilter(fetchBrands, 'Brand');
        },
        getFilter(fetch, title) {
            this.filters[title].loading = true;
            this.filters[title].error = false;

            fetch()
            .then(res => {
                this.filters[title].list = [...res];
                this.filters[title].loading = false;
            })
            .catch(err => {
                this.filters[title].loading = false;
                this.filters[title].error = true;
            })
        }
    }
}
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;
    
    .sidebar {
        width: 30%;
        height: 85vh;

        &__container {
            background-color: $bg-color-container;
            @extend %small-shadow;
            border-radius: 8px;
            margin-bottom: 2vh;
            min-height: 90%;
        }

        @include tablet {
            width: 100%;
            z-index: 10;
            position: relative;
            min-height: 100vh;
            right: 5px;
            left: 0;
        }
    }

    .filter-list {
        width: 75%;
        margin-left: 10%;
        padding: 20px 0;
        list-style: none;
    }
</style>