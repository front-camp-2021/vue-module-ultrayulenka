<template>
  <Layout>
    <Header />
    <router-view />
  </Layout>
</template>

<script>
import Layout from './components/Layout';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import { useWishlist } from './composables/wishlist';
import { useCart } from './composables/cart';
import { 
  defineComponent,
  provide 
} from 'vue';

export default defineComponent({
  components: {
    Layout,
    Header
  },
  setup() {
    provide(
      'wishlist',
      {
        ...useWishlist()
      }
    );
    provide(
      'cart',
      {
        ...useCart()
      }
    );
    provide(
      'currency',
      'UAH'
    );
  }
})
</script>

<style lang="scss">
  @import "./assets/scss/variables";

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap');

  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
  }

  body {
    background-color: $bg-color-app;
    color: $font-color;
    font-family: $font-stack;
  }

  a {
      text-decoration: none;
      color: inherit;
      background-color: transparent;
  }

  button,
  input {
    font-family: inherit; 
  }

  input:focus{
    outline: none;
  }
</style>
