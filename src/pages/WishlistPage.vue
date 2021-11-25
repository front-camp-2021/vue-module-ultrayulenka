<template>
  <div class="wishlist">
    <Button
      :size="'medium'"
      :color="'primary'"
      @click="removeAll"
    >
      CLEAR ALL ITEMS
    </Button>
    <ProductContainer 
      :products="wishlist.products"
    />
  </div>
</template>

<script>
import Button from '../components/Button';
import ProductContainer from '../containers/ProductContainer';
import { 
    defineComponent,
    inject 
} from 'vue';

export default defineComponent({
    components: {
        Button,
        ProductContainer
    },
    setup(props) {
        const {
            state: wishlist,
            removeAll
        } = inject('wishlist');

        return {
            wishlist,
            removeAll
        }
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .wishlist {
        padding: 20px 10px;
    }
</style>