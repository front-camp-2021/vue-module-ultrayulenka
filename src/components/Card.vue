<template>
  <li class="card">
    <div class="card__inner">
      <template v-if="images.length">
        <div class="card__image">
          <a
            href="#"
            class="card__link"
          >
            <img
              :src="images[0]"
              :alt="title"
            >
          </a>
        </div>
      </template>
      <div class="card__content">
        <div class="card__details">
          <div class="rating">
            <span class="rating__value">{{ rating }}</span>
            <div class="rating__icon">
              <img
                class="rating__icon"
                src="../assets/images/star.svg"
                alt="star"
              >
            </div>
          </div>
          <span class="card__price">{{ price }}</span>
        </div>
        <h2 class="card__title">
          <a
            href="#"
            class="card__link"
          >{{ title }}</a>
        </h2>
        <p class="card__description">
          Redesigned from scratch and completely revised.
        </p>
      </div>
    </div>
    <div class="card__button-group">
      <Button 
        :class-name="'card__button'"
      >
        <img
          class="button__icon"
          src="../assets/images/heart-black.svg"
          alt="heart"
        >
        <span class="button__text">{{ inWishlist? "remove from" : "add to" }} wishlist</span>
      </Button>
      <Button
        :class-name="'card__button'"
        :color="'primary'"
      >
        <img
          class="button__icon"
          src="../assets/images/shopping-bag.svg"
          alt="shopping bag"
        >
        <span class="button__text">add {{ inCart? "more" : "" }} to cart</span>
      </Button>
    </div>
  </li>
</template>

<script>
import Button from './Button'
export default {
    components: {
        Button
    },
    props: {
        images: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        },
        rating: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        },
        inWishlist: {
            type: Boolean,
            default: false
        },
        inCart: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .card {
        font-weight: 400;
        background: $bg-color-container;
        @extend %small-shadow;
        border-radius: 8px;
        max-width: 500px;
        overflow: hidden;

        &__inner {
            height: 419px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 30px 20px 5px;
            position: relative;

            .button_show-colors {
                position: absolute;
                top: 20%;
                right: 10%;
            }

            @include mobile {
                height: 350px;
                padding: 10px 10px 5px;
            }
        }

        &__image {
            margin: auto;
            padding: 0 20px 30px;
            max-height: 65%;    

            img {
                max-width: 100%;
                height: 100%;
            }

            @include mobile {
                padding: 0 0 15px;
            }
        }

        &__details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px; 
        }

        &__price {
            @include text(21px);
        }

        &__title {
            @include text(19px, "smaller");
            width: 65%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
        }

        &__description {
            @include text(14px, "subtext", "light");
            margin: 0; 
            padding-top: 3px;
        }

        &__button-group {
            margin-top: 20px;
            width: 100%;
            display: flex;

            @include mobile {
                margin-top: 5px;
            }
        }

        &__button {
            width: 100%;
            padding: 14px 10px;
            display: flex;
            justify-content: center;
            border-radius: 0;
            @include text(18px, "small", "bold");

            @include mobile {
                .button__text {
                    font-size: 11px;
                    line-height: 11px;
                }
            }
        }

        @include desktop {
            max-width: 400px;
        }

        @include tablet {
            min-width: 255px;
        }
    }

    .rating {
        width: 65px;
        background-color: $primary-color;
        border-radius: 3px;
        padding: 6px;
        display: flex;
        justify-content: space-around;

        &__value {
            display: block;
            align-self: center;
            @include text(17px, "small");
            color: $primary-font-color;
        }
    }
</style>