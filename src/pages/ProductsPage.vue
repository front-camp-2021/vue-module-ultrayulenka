<template>
  <div>
    <ProductsPageHeader 
      :is-sidebar-open="isSidebarOpen"
      :total-products="totalFound"
      @changeSidebarOpenStatus="onSidebarShownClick"
    />
    <div class="content">
      <FilterContainer 
        v-if="isSidebarOpen"
        :selected-filters="selectedFilters"
        :selected-ranges="selectedRanges"
        @add-filter="onAddFilter"
        @remove-filter="onRemoveFilter"
        @range-changed="onRangeChanged"
        @reset-filters="resetFilters"
      />
      <div :class="isSidebarOpen? 'main' : 'main_full-width'">
        <Search 
          :value="searchQuery"
          @search-changed="onSearchChange"
        />
        <CardList 
          :products="products" 
        />
        <Pagination
          :page="page"
          :total-pages="totalPages"
          @page-changed="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsPageHeader from '../components/ProductsPageHeader';
import FilterContainer from '../containers/FilterContainer';
import CardList from '../components/CardList';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

import { fetchFilteredProducts } from '../api';

export default {
    components: {
        ProductsPageHeader,
        FilterContainer,
        CardList,
        Search,
        Pagination
    },
    data() {
        return {
            isSidebarOpen: false,
            products: [],
            totalFound: 100,
            selectedFilters: [],
            selectedRanges: [],
            searchQuery: '',
            page: 1,
            totalPages: 10,
            pageLimit: 9
        }
    },
    computed: {
        paramsChanged: function() {
            return [...this.selectedFilters, ...this.selectedRanges];
        }
    },
    watch: {
        paramsChanged: function() {
            this.page = 1;
            this.getProducts();
        },
        page: function() {
            this.getProducts();
        },
        searchQuery: function() {
            this.page = 1;
            this.getProducts();
        }
    },
    created() {
        this.getProducts();
    },
    methods: {
        onSidebarShownClick() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        onAddFilter(value) {
            this.selectedFilters.push(value);
            console.log(this.selectedFilters);
        },
        onRemoveFilter(value) {
            const index = this.selectedFilters.indexOf(value);
            if(index > -1) {
                this.selectedFilters.splice(index, 1);
            }
            console.log(this.selectedFilters);
        },
        onRangeChanged(title, selected) {
            const index = this.selectedRanges.findIndex(range => range.title === title);
            if(index > -1) {
                this.selectedRanges.splice(index, 1, {title, selected})
            } else {
                this.selectedRanges.push({title, selected});
            }
        },
        onSearchChange(value) {
            if(value.trim()) {
                this.searchQuery = value.trim();
            } else {
                this.searchQuery = '';
            }
            console.log(this.searchQuery);
        },
        onPageChange(index) {
            if(index > 0 && index <= this.totalPages) {
                this.page = index;
            }
        },
        resetFilters() {
            this.selectedFilters = [];
            this.selectedRanges = [];
            this.searchQuery = '';
        },
        getProducts() {
            fetchFilteredProducts({
                filters: this.selectedFilters,
                ranges: this.selectedRanges, 
                search: this.searchQuery, 
                page: this.page,
                pageLimit: this.pageLimit
            }).then(res => {
                const [products, total] = res;
                this.totalFound = total;
                this.totalPages = Math.ceil(total / this.pageLimit);
                this.products = [...products];
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

    .content {
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: space-between;

        @include tablet {
            display: block;
        }
    }

    .main {
        width: 68%;

        @include tablet {
            width: 100%;
        }
    }

    .main_full-width {
        width: 100%;

        .cards-list__item {
            @include desktop {
                flex: 0 0 32%;
            }

            @include tablet {
                flex: 0 0 49%;
            }

            @include mobile {
                flex: 0 0 100%;
                margin: 0 auto;
            }
        }
    }
</style>