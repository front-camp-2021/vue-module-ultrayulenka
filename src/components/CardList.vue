<template>
  <ul className="cards-list">
    {{ !products.length? 'No producst found' : '' }}
    <template v-if="products.length">
      <Card 
        v-for="product in products"
        v-bind="product"
        :inWishlist="isInWishlist(product.id)"
        :cartQuantity="getCartQuantity(product.id)"
        :key="product.id"
        class="cards-list__item"
        :isInList="true"
        @wishlist-button-clicked="onWishlistBtnClick"
        @add-to-cart="onAddToCart"
        @change-quantity="onChangeQuantity"
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
        },
        wishlistIds: {
            type: Array,
            default: () => []
        },
        cart: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }) {
        function isInWishlist(id) {
            return props.wishlistIds.includes(id);
        }

        function getCartQuantity(id) {
            const product = props.cart.find(item => item.id === id);
            return product? product.quantity : 0;
        }

        function onWishlistBtnClick(product) {
            emit('update-wishlist', product);
        }

        function onAddToCart(product) {
            emit('add-to-cart', product);
        }

        function onChangeQuantity(id, quantity) {
            emit('change-cart-quantity', id, quantity);
        }

        return {
            isInWishlist,
            getCartQuantity,
            onWishlistBtnClick,
            onAddToCart,
            onChangeQuantity
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