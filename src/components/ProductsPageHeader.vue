<template>
  <div class="heading">
    <div :class="`heading__sidebar ${isSidebarOpen? 'heading__sidebar_open' : 'heading__sidebar_closed'}`">
      <h3 class="section-title">
        Filters
      </h3>
      <Button
        :size="'small'"
        :class-name="'heading__show-sidebar-btn'"
        @click="onShowSidebarClick"
      >
        <div
          :class="`arrows arrows_${isSidebarOpen? 'left' : 'right'}`"
        />
        <div
          :class="`arrows arrows_${isSidebarOpen? 'up' : 'down'}`"
        />
      </Button>
    </div>
    <div :class="`heading__products ${isSidebarOpen? 'heading__products_open' : 'heading__products_closed'}`">
      <span class="total">{{ totalProducts }} results found</span>
      <router-link to="/wishlist">
        <Button 
          :size="'small'"
          :color="'primary'"
        >
          <img
            class="button__icon"
            src="../assets/images/heart-white.svg"
            alt="Go to wishlist"
          >
        </Button>
      </router-link>
    </div>
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
    isSidebarOpen: {
        type: Boolean,
        required: true
    },
    totalProducts: {
        type: Number,
        required: true
    }
  },
  setup(props, { emit }) {
    function onShowSidebarClick() {
      emit('changeSidebarOpenStatus');
    }

    return {
      onShowSidebarClick
    }
  }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .heading {
        display: flex;
        justify-content: space-between;
        margin: 1vh 0 0;
        gap: 2% 0;

        &__sidebar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1vh;

            &_open {
                width: 30%;
            }

            &_closed {
                width: 15%;
            }

            .section-title {
                @include text(21px);
                align-self: center;
            }
        

            @include tablet {
                margin: 0;
            }

            @include tablet {
                width: 100%;
                height: fit-content;
                padding: 5px;
                background-color: $bg-color-container;
                margin-bottom: 2vh;
                border-radius: 8px;
                box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135);
            }
        }

        &__show-sidebar-btn {

            .arrows {
                &_down,
                &_up {
                    display: none;
            
                    @include tablet {
                        display: block;
                    }
                }
            
                &_left,
                &_right {
                    @include tablet {
                        display: none;
                    }
                }
            
            }

            @include tablet {
                box-shadow: none;
                background-color: transparent;
            }
        }

        &__products {
            color: $font-color;
            display: flex;
            justify-content: space-between;
            margin-bottom: 1vh;

            &_open {
                width: 68%;
            }

            &_closed {
                width: 83%;
            }

            .total {
                align-self: center;
                @include text(21px);
            }

            @include tablet {
                width: 100%;
            }
        }

        @include tablet {
            display: block;
        }
    }
</style>