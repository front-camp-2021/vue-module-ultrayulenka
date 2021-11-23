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
      <MainContainer
        :isFullWidth="!isSidebarOpen"
        :selectedFilters="selectedFilters"
        :selectedRanges="selectedRanges"
        @products-count-changed="onTotalProductsChange"
      />
    </div>
  </div>
</template>

<script>
import ProductsPageHeader from '../components/ProductsPageHeader';
import FilterContainer from '../containers/FilterContainer';
import MainContainer from '../containers/MainContainer';
import { 
    defineComponent,
    watch,
    ref,
    watchEffect 
} from 'vue';

export default {
    components: {
        ProductsPageHeader,
        FilterContainer,
        MainContainer
    },
    setup(props) {
        const isSidebarOpen = ref(false);
        const selectedFilters = ref([]);
        const selectedRanges = ref([]);
        const totalFound = ref(0);

        function onSidebarShownClick() {
            isSidebarOpen.value = !isSidebarOpen.value;
        }

        function onAddFilter(value) {
            selectedFilters.value.push(value);
        }

        function onRemoveFilter(value) {
            const index = selectedFilters.value.indexOf(value);
            if(index > -1) {
                selectedFilters.value.splice(index, 1);
            }
        }

        function onRangeChanged(title, selected) {
            const index = selectedRanges.value.findIndex(range => range.title === title);
            if(index > -1) {
                selectedRanges.value.splice(index, 1, {title, selected})
            } else {
                selectedRanges.value.push({title, selected});
            }
        }

        function onTotalProductsChange(value) {
            totalFound.value = value;
        }

        function resetFilters() {
            selectedFilters.value = [];
            selectedRanges.value = [];
        }

        return {
            isSidebarOpen,
            selectedFilters,
            selectedRanges,
            totalFound,
            onSidebarShownClick,
            onRemoveFilter,
            onAddFilter,
            onRangeChanged,
            resetFilters,
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