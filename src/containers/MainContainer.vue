<template>
  <div :class="isFullWidth? 'main_full-width' : 'main'">
    <Search 
        :value="params.search"
        @search-changed="changeSearchQuery"
    />
    <AsyncBoundry
        :loading="loading"
        :error="error">
        <ProductContainer
        :products="products"
        />
    </AsyncBoundry>
    <Pagination
        :page="pagination.page"
        :total-pages="pagination.totalPages"
        @page-changed="changePage"
        v-if="!loading && !error"
    />
    </div>
</template>

<script>
import ProductContainer from './ProductContainer';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import AsyncBoundry from '../components/AsyncBoundry';
import { fetchFilteredProducts } from '../api';
import { 
    defineComponent,
    watch,
    ref,
    watchEffect,
    inject 
} from 'vue';

export default defineComponent({
    components: {
        ProductContainer,
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
    setup(props, { emit }) {
        const products = ref([]);
        const loading = ref(false);
        const error = ref(false);

        const {
            params,
            changeSearchQuery
        } = inject('params');

        const {
            pagination,
            changePage,
            changeTotal
        } = inject('pagination');

        getProducts();

        function getProducts() {
            loading.value = true;
            error.value = false;

            fetchFilteredProducts({
                filters: params.selectedFilters,
                ranges: params.selectedRanges, 
                search: params.search, 
                page: pagination.page,
                pageLimit: pagination.pageLimit
            }).then(res => {
                const [array, total] = res;
                changeTotal(Number(total));
                products.value = [...array];
                setTimeout(() => loading.value = false, 500);
            })
            .catch(err => {
                loading.value = false;
                error.value = true;
            })
        }

        watch(params, (curr, prev) => {
            changePage(1);
            getProducts();
        });

        watch(pagination, (curr, prev) => {
            window.scrollTo(0,0);
            getProducts();
        })

        return {
            products,
            params,
            pagination,
            loading,
            error,
            changeSearchQuery,
            changePage
        }
    }
})
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