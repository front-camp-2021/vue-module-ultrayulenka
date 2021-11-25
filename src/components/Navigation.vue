<template>
  <nav class="nav">
    <router-link
      to="/"
      class="nav__link"
    >
      <div class="home-icon">
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 6.25L8.61984 1L16.2397 6.25V14.5C16.2397 15.3284 15.4816 16 14.5464 16H2.6933C1.75811 16 1 15.3284 1 14.5V6.25Z"
            stroke="#7E72F2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.68909 16V8H11.5505V16"
            stroke="#7E72F2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>  
      </div>
    </router-link>
    <div
      v-if="!isCurrent('/')"
      class="arrows arrows_right"
    />
    <div
      v-for="(link, index) of getLinks()"
      :key="link"
      class="link-container"
    >
      <router-link 
        :class="`nav__link ${isCurrent(link)? 'nav__link_current': ''}`"
        :to="getRouteLink(index)"
      >
        {{ link.charAt(0).toUpperCase() + link.slice(1) }}
      </router-link>
      <div
        v-if="!isCurrent(link)"
        class="arrows arrows_right"
      />
    </div>
  </nav>
</template>

<script>
import { 
  defineComponent,
  computed 
} from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    function getLinks() {
      return route.path.split('/').filter(value => value);
    }

    function getRouteLink(index) {
      return '/' + getLinks().slice(0, index + 1).join('/');
    }

    function isCurrent(link) {
      return route.path.endsWith(link);
    }

    return {
      getLinks,
      getRouteLink,
      isCurrent
    }
  }
})
</script>

<style lang="scss">
    @use "../assets/scss/arrows" as *;
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .nav {
        display: flex;

        &__link {
            display: block;
            @include text(17px, "small", "regular");
            color: $purple-font-color;
            margin: 0 10px;
            align-self: flex-end;

            &:first-child {
                margin-left: 0;
            }

            &_current {
                color: $font-color;
                @extend %disabled-link;
            }

            @include mobile {
                margin: 0 5px;
            }
        }
    }

    .link-container {
      display: flex;
      padding-left: 10px;
    }

    .home-icon {
        height: 17px;
    }
</style>