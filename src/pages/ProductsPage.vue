<template>
  <div>
    <ProductsPageHeader 
      :is-sidebar-open="isSidebarOpen"
      :total-products="pagination.total"
      @changeSidebarOpenStatus="onSidebarShownClick"
    />
    <div class="content">
      <FilterContainer 
        v-if="isSidebarOpen"
      />
      <MainContainer
        :isFullWidth="!isSidebarOpen"
      />
    </div>
  </div>
</template>

<script>
import ProductsPageHeader from '../components/ProductsPageHeader';
import FilterContainer from '../containers/FilterContainer';
import MainContainer from '../containers/MainContainer';
import { useParams } from '../composables/params';
import { usePagination } from '../composables/pagination';
import { 
    defineComponent,
    ref,
    provide 
} from 'vue';

export default {
    components: {
        ProductsPageHeader,
        FilterContainer,
        MainContainer
    },
    setup(props) {
        const isSidebarOpen = ref(false);
        const {
            state: pagination,
            changePage,
            changeTotal
        } = usePagination();

        const {
            state: params,
            changeSelectedRange,
            addFilter,
            removeFilter,
            changeSearchQuery,
            resetFilters,
            getSelectedRange
        } = useParams();

        provide(
            'params',
            {
                params,
                changeSelectedRange,
                addFilter,
                removeFilter,
                changeSearchQuery,
                resetFilters,
                getSelectedRange
            }
        );

        provide(
            'pagination',
            {
                pagination,
                changePage,
                changeTotal
            }
        )

        function onSidebarShownClick() {
            isSidebarOpen.value = !isSidebarOpen.value;
        }

        function onTotalProductsChange(value) {
            totalFound.value = value;
        }

        return {
            isSidebarOpen,
            pagination,
            onSidebarShownClick,
            onTotalProductsChange
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
</style>