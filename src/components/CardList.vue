<template>
  <ul className="cards-list">
    {{ !products.length? 'No producst found' : '' }}
    <template v-if="products.length">
      <Card 
        v-for="product in products"
        v-bind="product"
        :key="product.id"
        class="cards-list__item"
        :isInList="true"
      />
    </template>
  </ul>
</template>

<script>
import Card from './Card'
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        Card
    },
    props: {
        products: {
            type: Array,
            default: () => []
        }
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .cards-list {
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start; 
        align-items: flex-start;
        gap: 20px 2%;
        padding-top: 1.5vh;

        &__item {
            flex: 0 0 32%;
            min-width: 210px;
            display: block;

            @include desktop {
                flex: 0 0 49%;
            }

        @include mobile {
            flex: 0 0 100%;
        }
        }
    }
</style>