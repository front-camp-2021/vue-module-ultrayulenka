<template>
  <div class="quantity-control">
    <Button
      :size="'small'"
      @click="onRemoveClick"
    >
      <img
        class="button__icon"
        src="../assets/images/minus.svg"
      >
    </Button>
    <p class="quantity-control__count">
      {{ quantity }}
    </p>
    <Button
      :size="'small'"
      @click="onAddClick"
    >
      <img
        class="button__icon"
        src="../assets/images/plus.svg"
      >
    </Button>
  </div>
</template>

<script>
import Button from './Button';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        Button
    },
    props: {
        quantity: {
            type: Number,
            default: 0
        }
    },
    setup(props, { emit }){
        function onAddClick() {
            emit('add');
        }

        function onRemoveClick() {
            emit('remove')
        }

        return {
            onAddClick,
            onRemoveClick
        }
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .quantity-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        &__count {
            font-size: 28px;
            text-align: center;
        }
    }

</style>