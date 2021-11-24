<template>
  <CardList 
    :products="products"
    :wishlistIds="wishlistIds"
    :cart="cartIds"
    @update-wishlist="changeWishlistStatus"
    @add-to-cart="addToCart"
    @change-cart-quantity="changeQuantity" />
</template>

<script>
import CardList from '../components/CardList';

import { 
    defineComponent,
    inject,
    computed 
} from 'vue';

export default defineComponent({
    components: {
        CardList
    },
    props: {
        products: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }) {
        const {
            state: wishlist,
            changeWishlistStatus
        } = inject('wishlist');

        const {
            state: cart,
            addToCart,
            changeQuantity
        } = inject('cart');

        const wishlistIds = computed(() => wishlist.products.map(item => item.id));
        const cartIds = computed(() => cart.products.map(item => {
            return {
                id: item.id,
                quantity: item.quantity
            }
        }));

        return {
            wishlistIds,
            changeWishlistStatus,
            cartIds,
            addToCart,
            changeQuantity
        }
    }
})
</script>