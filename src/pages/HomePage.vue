<template>
  <div class="home">
    <img
      src="../assets/images/banner.jpeg"
      class="home__banner"
    >
    <router-link to="/electronics">
      <Button 
        :size="'medium'" 
        :color="'primary'" 
        :class-name="'redirect-button'"
      >
        Go to electronics
      </Button>
    </router-link>
  </div>
</template>

<script>
import Button from '../components/Button';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        Button
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .home {
        margin: 5vh auto 0 auto;
        max-width: 700px;
    }

    .home__banner {
        @extend %small-shadow;
        max-width: 100%;
    }

    .redirect-button {
        margin: 10px auto 0 auto;
        text-transform: uppercase;
    }
</style>