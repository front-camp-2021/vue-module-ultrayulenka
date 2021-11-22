<template>
  <nav class="nav">
    <a
      href="#"
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
    </a>
    <div class="arrows arrows_right" />
    <a
      href="#"
      class="nav__link"
    >
      eCommerce
    </a>
    <div class="arrows arrows_right" />
    <a
      href="#"
      class="nav__link nav__link_current"
    >
      Electronics
    </a>
  </nav>
</template>

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

    .home-icon {
        height: 17px;
    }
</style>