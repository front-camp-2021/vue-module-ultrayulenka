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

import { fetchFilteredProducts } from '../api';

export default {
    components: {
        ProductsPageHeader,
        FilterContainer,
        MainContainer
    },
    data() {
        return {
            isSidebarOpen: false,
            selectedFilters: [],
            selectedRanges: [],
            totalFound: 0
        }
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
        onTotalProductsChange(value) {
            this.totalFound = value;
        },
        resetFilters() {
            this.selectedFilters = [];
            this.selectedRanges = [];
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