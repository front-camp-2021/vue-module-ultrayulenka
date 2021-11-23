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
import { 
    defineComponent,
    watch,
    ref,
    watchEffect 
} from 'vue';

export default defineComponent({
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
    setup(props, { emit }) {
        const products = ref([]);
        const totalFound = ref(100);
        const searchQuery = ref('');
        const page = ref(1);
        const totalPages = ref(10);
        const pageLimit = ref(9);
        const loading = ref(false);
        const error = ref(false);

        getProducts();

        function getProducts() {
            loading.value = true;
            error.value = false;

            fetchFilteredProducts({
                filters: props.selectedFilters,
                ranges: props.selectedRanges, 
                search: searchQuery.value, 
                page: page.value,
                pageLimit: pageLimit.value
            }).then(res => {
                const [array, total] = res;
                emit("products-count-changed", Number(total));
                totalPages.value = Math.ceil(total / pageLimit.value);
                products.value = [...array];
                setTimeout(() => loading.value = false, 500);
            })
            .catch(err => {
                loading.value = false;
                error.value = true;
            })
        }

        watch([props, searchQuery], (curr, prev) => {
            page.value = 1;
            getProducts();
        });

        watch(page, (curr, prev) => {
            getProducts();
        })

        function onSearchChange(value) {
            if(value.trim()) {
                searchQuery.value = value.trim();
            } else {
                searchQuery.value = '';
            }
        }

        function onPageChange(index) {
            if(index > 0 && index <= totalPages.value) {
                window.scrollTo(0,0);
                page.value = index;
            }
        }

        return {
            products,
            searchQuery,
            page,
            totalPages,
            loading,
            error,
            onSearchChange,
            onPageChange
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