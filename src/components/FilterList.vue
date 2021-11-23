<template>
  <CustomBox 
    class="filter-item"
    :isInList="isInList">
    <h4 class="filter-item__title">
      {{ title? title : 'No title' }}
    </h4>
    <AsyncBoundry
        :loading="loading"
        :error="error">
        <ul class="options-list">
            <template v-if="list.length">
                <FilterItem 
                v-for="item of list"
                :key="item.value"
                :title="item.title"
                :value="item.value"
                :checked="selected.includes(item.value)"
                @filter-clicked="onSelectedFiltersChange"
                />
            </template>
        <li v-else>
            No filters to show
        </li>
        </ul>
    </AsyncBoundry>
  </CustomBox>
</template>

<script>
import FilterItem from './FilterItem';
import CustomBox from './CustomBox';
import AsyncBoundry from './AsyncBoundry';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        FilterItem,
        CustomBox,
        AsyncBoundry
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Array,
            default: () => []
        },
        isInList: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        function onSelectedFiltersChange(value, isSelected) {
            emit(isSelected? 'remove-filter' : 'add-filter', value);
        }

        return {
            onSelectedFiltersChange
        }
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .filter-item {
        display: block;
        position: relative;
        margin-bottom: 63px;

        &:last-child {
            margin-bottom: 0;
        }

        &::after {
            @include pseudo(100%, 1px, block, absolute);
            background-color: #D6D6D6;
            bottom: -28px;
        }

        &:last-of-type::after {
            content: none;
        }

        &__title {
            @include text(22px, "regular", "bold");
            margin-bottom: 20px;
        }
    }

    .options-list {
        list-style: none;
    }
</style>