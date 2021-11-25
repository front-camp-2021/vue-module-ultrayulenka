<template>
  <div class="not-found">
    <img
      src="../assets/images/not-found.svg"
      class="not-found__img"
    >
    <div class="not-found__container">
      <h2>Page Not Found</h2>
      <p class="not-found__text">
        Oops! We can't find the page you're looking for.
      </p>
      <Button 
        :size="'medium'" 
        :color="'primary'" 
        :class-name="'redirect-button'"
        @click="router.push('/')"
      >
        Go home
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button';
import { useRouter } from 'vue-router'
import { 
    defineComponent,
    inject 
} from 'vue';

export default defineComponent({
    components: {
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

    .not-found {
        margin: 2vh auto 0 auto;
        width: 700px;
        text-align: center;

        &__img {
            width: 300px;
            margin-right: 40px;
        }

        &__container {
            align-self: center;
        }

        &__text {
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }
</style>