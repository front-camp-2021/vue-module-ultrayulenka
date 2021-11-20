<template>
    <aside class="sidebar">
        <div class="sidebar__container">
            <ul class="filter-list">
                <DoubleSlider 
                    v-for="range in ranges"
                    :key="range.title"
                    v-bind="range"/>
                <FilterList 
                    v-for="filter in filters"
                    :list="filter.list"
                    :key="filter.title"
                    :title="filter.title"
                    @changeCheckedStatus="onSelectedFiltersChange"/>
            </ul>
        </div>
        <Button 
            :color="'primary'" 
            :size="'large'"
            :className="'sidebar__button_large'">
                CLEAR ALL FILTERS
        </Button>
    </aside>
</template>

<script>
import Button from '../components/Button';
import FilterList from '../components/FilterList';
import DoubleSlider from '../components/DoubleSlider';
import db from '../../server/db.json'

export default {
    components: {
        Button,
        FilterList,
        DoubleSlider
    },
    data() {
        return {
            filters: {
                'Category': {
                    title: "Category",
                    list: [...this.prepareFilters(db.categories, 'category')]
                },

                'Brand': {
                    title: "Brand",
                    list: [...this.prepareFilters(db.brands, 'brand')]
                }
            },
            ranges: {
                'Price': {
                    title: "Price",
                    min: 0,
                    max: 85000,
                    precision: 0,
                    selected: {
                        from: 0,
                        to: 85000
                    },
                    prefix:' UAH'
                },
                'Rating': {
                    title: 'Rating',
                    min: 0, 
                    max: 5,
                    precision: 2,
                    selected: {
                        from: 0,
                        to: 5
                    }
                }
            }
        }
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
        onSelectedFiltersChange() {
            console.log('hello');
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