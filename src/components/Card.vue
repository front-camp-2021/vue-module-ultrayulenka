<template>
    <CustomBox 
        class="card"
        :isInList="isInList">
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
            @click="onWishlistBtnClick"
            >
            <svg class="button__icon" width="20" height="17" viewBox="0 0 18 15" xmlns="http://www.w3.org/2000/svg"
            :class="inWishlist? 'heart_filled' : 'heart'">
            <g style="mix-blend-mode:color-burn">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4479 2.14929C14.7031 1.41343 13.6926 1 12.6389 1C11.5853 1 10.5748 1.41343 9.82993 2.14929L9.06449 2.90512L8.29906 2.14929C6.74769 0.61741 4.23242 0.617411 2.68105 2.14929C1.12967 3.68118 1.12967 6.16485 2.68105 7.69674L3.44648 8.45256L9.06449 14L14.6825 8.45256L15.4479 7.69674C16.1932 6.96122 16.6119 5.96344 16.6119 4.92302C16.6119 3.88259 16.1932 2.88481 15.4479 2.14929Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </svg>
            <span class="button__text">wishlist</span>
            </Button>

            <Button
            v-if="cartQuantity <= 0"
            :class-name="'card__button'"
            :color="'primary'"
            @click="onAddToCartClick"
            >
            <img
                class="button__icon"
                src="../assets/images/shopping-bag.svg"
                alt="shopping bag"
            >
            <span class="button__text">add to cart</span>
            </Button>

            <QuantityControl v-else
            class="card__control"
            :quantity="cartQuantity"
            @add="increaseQuantity"
            @remove="decreseQuantity"
            />
        </div>
    </CustomBox>
</template>

<script>
import Button from './Button';
import CustomBox from './CustomBox';
import QuantityControl from './QuantityControl';
import { 
    defineComponent,
    inject 
} from 'vue';

export default defineComponent({
    components: {
        Button,
        CustomBox,
        QuantityControl
    },
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
        cartQuantity: {
            type: Number,
            default: 0
        },
        isInList: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        function onWishlistBtnClick() {
            const {
                id,
                images,
                title,
                rating,
                price
            } = props;

            emit('wishlist-button-clicked', {id, images, title, rating, price});
        }

        function onAddToCartClick() {
            const {
                id,
                images,
                title,
                rating,
                price
            } = props;

            emit('add-to-cart', {id, images, title, rating, price});
        }

        function increaseQuantity() {
            emit('change-quantity', props.id, props.cartQuantity + 1)
        }

        function decreseQuantity() {
            emit('change-quantity', props.id, props.cartQuantity - 1)
        }

        return {
            onWishlistBtnClick,
            onAddToCartClick,
            increaseQuantity,
            decreseQuantity
        }
    }
})
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

        &__control {
            background-color: $primary-color;
            padding: 0 10px;

            .button {
                height: 70%;
                width: 30%;
            }

            p {
                color: $primary-font-color;
            }
        }

        @include desktop {
            max-width: 400px;
        }

        @include tablet {
            min-width: 255px;
        }
    }

    .heart {
        fill: none;
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