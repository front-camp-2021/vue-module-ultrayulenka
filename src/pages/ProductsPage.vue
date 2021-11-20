<template>
    <div>
        <ProductsPageHeader 
            :isSidebarOpen="isSidebarOpen"
            :totalProducts="0"
            @changeSidebarOpenStatus="onSidebarShownClick"/>
        <div class="content">
            <FilterContainer v-if="isSidebarOpen" />
            <div :class="isSidebarOpen? 'main' : 'main_full-width'">
                <MainContainer />
            </div>
        </div>
    </div>
</template>

<script>
import ProductsPageHeader from '../components/ProductsPageHeader';
import FilterContainer from '../containers/FilterContainer';
import MainContainer from '../containers/MainContainer';

export default {
    components: {
        ProductsPageHeader,
        FilterContainer,
        MainContainer
    },
    data() {
        return {
            isSidebarOpen: false
        }
    },
    methods: {
        onSidebarShownClick() {
            this.isSidebarOpen = !this.isSidebarOpen;
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