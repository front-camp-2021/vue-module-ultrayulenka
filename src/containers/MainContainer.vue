<template>
  <div :class="isFullWidth? 'main_full-width' : 'main'">
    <Search 
        :value="searchQuery"
        @search-changed="onSearchChange"
    />
    <AsyncBoundry
        :loading="loading"
        :error="error">
        <CardList 
        :products="products" />
    </AsyncBoundry>
    <Pagination
        :page="page"
        :total-pages="totalPages"
        @page-changed="onPageChange"
        v-if="!loading && !error"
    />
    </div>
</template>

<script>
import CardList from '../components/CardList';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import AsyncBoundry from '../components/AsyncBoundry';
import { fetchFilteredProducts } from '../api';

export default {
    components: {
        CardList,
        Search,
        Pagination,
        AsyncBoundry
    },
    props: {
        selectedFilters: {
            type: Array,
            default: () => []
        },
        selectedRanges: {
            type: Array,
            default: () => []
        },
        isFullWidth: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            products: [],
            totalFound: 100,
            searchQuery: '',
            page: 1,
            totalPages: 10,
            pageLimit: 9,
            loading: false,
            error: false
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
        onSearchChange(value) {
            if(value.trim()) {
                this.searchQuery = value.trim();
            } else {
                this.searchQuery = '';
            }
        },
        onPageChange(index) {
            if(index > 0 && index <= this.totalPages) {
                window.scrollTo(0,0);
                this.page = index;
            }
        },
        getProducts() {
            this.loading = true;
            this.error = false;

            fetchFilteredProducts({
                filters: this.selectedFilters,
                ranges: this.selectedRanges, 
                search: this.searchQuery, 
                page: this.page,
                pageLimit: this.pageLimit
            }).then(res => {
                const [products, total] = res;
                this.$emit("products-count-changed", Number(total));
                this.totalPages = Math.ceil(total / this.pageLimit);
                this.products = [...products];
                setTimeout(() => this.loading = false, 500);
            })
            .catch(err => {
                this.loading = false;
                this.error = true;
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