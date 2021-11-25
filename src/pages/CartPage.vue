<template>
  <div class="cart-container">
    <h2>Cart</h2>
    <div class="cart container use-bootstrap"> 
      <CartTable />
      <div class="cart__button-group">
        <Button 
          :size="'medium'"
          @click="router.push('electronics')"
        >
          Continue shopping
        </Button>
        <Button
          :size="'medium'"
          :color="'primary'"
        >
          Checkout
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import CartTable from '../components/CartTable';
import Button from '../components/Button';
import { useCart } from '../composables/cart';
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        CartTable,
        Button
    },
    setup(props) {
        const router = useRouter();

        return {
            router
        }
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .cart-container {
        padding: 20px 10px;
    }

    .cart {
        font-family: $font-stack;

        &__button-group {
            display: flex;
            justify-content: space-between;

            .button {
                border-radius: 5px;
            }
        }
    }
</style>