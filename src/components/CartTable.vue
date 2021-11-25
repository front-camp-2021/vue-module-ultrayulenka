<template>
  <table
    id="cart"
    class="table table-hover table-condensed"
  >
    <thead>
      <tr>
        <th class="th_product">
          Product
        </th>
        <th class="th_price">
          Price
        </th>
        <th class="th_quantity">
          Quantity
        </th>
        <th class="th_subtotal text-center">
          Subtotal
        </th>
        <th class="th_btn" />
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.products.length > 0">
        <CartTableRow 
          v-for="product in cart.products"
          :key="product.id"
          v-bind="product"
          :currency="currency"
          @change-quantity="changeQuantity"
          @remove="removeFromCart"
        />
      </template>
      <tr v-else>
        Cart is empty
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td
          colspan="3"
          class="hidden-xs"
        />
        <td class="hidden-xs text-center">
          <strong>{{ `${total} ${currency}` }}</strong>
        </td>
        <td
          colspan="1"
          class="hidden-xs"
        />
      </tr>
    </tfoot>
  </table>
</template>

<script>
import CartTableRow from './CartTableRow';
import { 
    defineComponent,
    computed,
    inject,
    ref 
} from 'vue';

export default defineComponent({
    components: {
        CartTableRow
    },
    setup(props, { emit }) {
        const {
            state: cart,
            changeQuantity,
            removeFromCart
        } = inject('cart');

        const currency = inject('currency');

        const total = computed(() => cart.products.reduce((prev, product) => { return prev + (product.price * product.quantity)}, 0));

        return {
            total,
            currency,
            cart,
            changeQuantity,
            removeFromCart
        }
    }
})
</script>

<style lang="scss" scoped>
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;
    @import '../../node_modules/font-awesome/css/font-awesome.min.css';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    .th_product {
        width: 50%;
    }

    .th_price {
        width: 10%;
    }

    .th_quantity {
        width: 8%;
    }

    .th_subtotal {
        width: 22%;
    }

    .th_btn {
        width: 10%
    }

    .table {
        width: 100%;
        margin-bottom: 1rem;
        background-color: transparent;
    }

    table {
        border-collapse: collapse;
    }

    .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #dee2e6;
    }

    .table th {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
    }

    th {
        text-align: inherit;
    }

    .text-center {
        text-align: center !important;
    }

    .th_btn {
        width: 10%;
    }

    tfoot {
        border-top: 1px solid #dee2e6;
    }
</style>