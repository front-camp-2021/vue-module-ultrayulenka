<template>
  <header class="header">
    <div class="logo-container">
      <div class="logo-container__item">
        <div class="logo">
          <router-link
            to="/"
            class="link"
          > 
            <img
              class="logo__icon"
              src="../assets/images/logo.svg"
              alt=""
            >
          </router-link>
        </div>
        <h1 class="title">
          <router-link
            to="/"
            class="link"
          >
            Online Store
          </router-link>
        </h1>
      </div>
      <div class="logo-container__item">
        <router-link to="/cart">
          <Button :size="'small'">
            <img 
              class="button__icon" 
              src="../assets/images/shopping-bag-dark.svg"
              alt="Visit cart page"
            >
          </Button>
        </router-link>
      </div>
    </div>
    <Navigation />
  </header>
</template>

<script>
import Button from './Button';
import Navigation from './Navigation'
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Button,
    Navigation
  }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .logo-container {
        padding: 0 0 0 5px;
        display: flex;
        margin-bottom: 1.75vh;
        justify-content: space-between;

        &__item {
            display: flex;
        }
    }

    .logo {
        margin-right: 20px;

        &__icon {
            @include tablet {
                width: 64px;
            }

            @include mobile {
                width: 45px;
            }
        }

        @include mobile {
            margin-right: 10px;
        }
    }

    .title {
        font-size: map.get($logo-font-sizes, "regular");
        font-weight: map.get($font-weights, "bold");
        line-height: 27px;
        color: $purple-font-color;
        padding-top: 20px;

        @include tablet {
            font-size: map.get($logo-font-sizes, "tablet");
            align-self: center;
            padding: 0;
        }

        @include mobile {
            font-size: map.get($logo-font-sizes, "mobile");
        }
    }
</style>