<template>
  <button
    :class="`
            button
            ${className}
            ${color? `button_${color}` : ''}
            ${size? `button_${size}` : ''}
        `"
    :type="type"
  >
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        className: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'button'
        }
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .button {
        border: none;
        cursor: pointer;
        background-color: $secondary-color;
        color: inherit;
        border-radius: 8px;
        @extend %small-shadow;

        &__text {
            align-self: center;
            text-transform: uppercase;
            @include text(18px, "small", "bold");
            display: block;
            margin-left: 9px;
        }

        &__icon {
            align-self: center;
            @include box(15px, 13px);
        }

        &_large {
            display: block;
            @include box(100%, 56px);
            text-align: center;
        }

        &_medium {
            display: block;
            @include box(25%, 56px);
        }

        &_small {
            @include box(47px, 40px);
            background-color: $bg-color-container;

            @include tablet {
                @include box(40px, 30px);
            }
        }

        &.button_primary {
            background-color: $primary-color;
            color: $primary-font-color;
        }
    }
</style>