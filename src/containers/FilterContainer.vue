<template>
  <aside class="sidebar">
    <div class="sidebar__container">
      <ul class="filter-list">
        <DoubleSlider 
          v-for="range in ranges"
          :key="range.title"
          v-bind="range"
          :selected="getSelectedRange(range.title, range.min, range.max)"
          @range-changed="changeSelectedRange"
          :isInList="true"
        />
        <FilterList 
            v-for="filter in filters"
            :key="filter.title"
            v-bind="filter"
            :selected="params.selectedFilters"
            @add-filter="addFilter"
            @remove-filter="removeFilter"
            :isInList="true"
        />
      </ul>
    </div>
    <Button 
      :color="'primary'" 
      :size="'large'"
      :class-name="'sidebar__button_large'"
      @click="resetFilters"
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
import { 
    defineComponent,
    reactive,
    inject 
} from 'vue';

export default defineComponent({
    components: {
        Button,
        FilterList,
        DoubleSlider
    },
    setup(props, { emit }) {
        const filters = reactive({
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
        });
        const ranges = reactive({
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
        });

        getFilters();

        const {
            params,
            changeSelectedRange,
            addFilter,
            removeFilter,
            resetFilters,
            getSelectedRange
        } = inject('params');

        function getFilter(fetch, title) {
            filters[title].loading = true;
            filters[title].error = false;

            fetch()
            .then(res => {
                filters[title].list = [...res];
                filters[title].loading = false;
            })
            .catch(err => {
                filters[title].loading = false;
                filters[title].error = true;
            })
        }

        function getFilters() {
            getFilter(fetchCategories, 'Category');
            getFilter(fetchBrands, 'Brand');
        }

        return {
            filters,
            ranges,
            params,
            getSelectedRange,
            addFilter,
            removeFilter,
            resetFilters,
            changeSelectedRange
        }
    }
})
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