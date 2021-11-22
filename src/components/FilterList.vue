<template>
  <li class="filter-item">
    <h4 class="filter-item__title">
      {{ title? title : 'No title' }}
    </h4>
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
  </li>
</template>

<script>
import FilterItem from './FilterItem';

export default {
    components: {
        FilterItem
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
        }
    },
    methods: {
        onSelectedFiltersChange(value, isSelected) {
            this.$emit(isSelected? 'remove-filter' : 'add-filter', value);
        }
    }
}
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