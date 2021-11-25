<template>
  <tr>
    <td data-th="Product">
      <div class="row">
        <div class="col-sm-4 hidden-xs">
          <img
            :src="images[0]"
            alt=""
            class="img-responsive cart__image"
          >
        </div>
        <div class="col-sm-8">
          <p class="cart__title">
            {{ title }}
          </p>
        </div>
      </div>
    </td>
    <td data-th="Price">
      {{ `${price} ${currency}` }}
    </td>
    <td data-th="Quantity">
      <input 
        type="number" 
        class="form-control text-center" 
        :value="quantity"
        min="1"
        @change="onChange"
      >
    </td>
    <td
      data-th="Subtotal"
      class="text-center"
    >
      {{ `${subtotal} ${currency}` }}
    </td>
    <td
      class="actions"
      data-th=""
    >
      <button 
        class="btn btn-danger btn-sm"
        @click="onDeleteClick"
      >
        <i class="fa fa-trash-o" />
      </button>
    </td>
  </tr>
</template>

<script>
import { 
    defineComponent,
    computed 
} from 'vue';

export default defineComponent({
    props: {
        id: {
            type: String,
            default: ''
        },
        images: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const subtotal = computed(() => props.price * props.quantity);

        function onChange(event) {
            emit('change-quantity', props.id, event.target.value);
        }

        function onDeleteClick() {
            emit('remove', props.id);
        }

        return {
            subtotal,
            onChange,
            onDeleteClick
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

    .cart__title {
        font-size: 16px;
    }

    .cart__image {
        width: 200px;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
    }

    .col-sm-4,
    .col-sm-8 {
        position: relative;
        width: 100%;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
    }

    .form-control {
        display: block;
        width: 100%;
        height: calc(2.25rem + 2px);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    td, th {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
    }

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

    .text-center {
        text-align: center !important;
    }

    @media (min-width: 576px) {
        .col-sm-4 {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
        }

        .col-sm-8 {
            flex: 0 0 66.666667%;
            max-width: 66.666667%;
        }
    }
</style>