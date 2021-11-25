<template>
  <nav
    v-if="totalPages > 0"
    class="page-navigation"
  >
    <a 
      id="prev-page" 
      class="page-navigation__page-link"
      :disabled="page <= 1"
      @click="goToPage(page - 1)"
    />
    <ul class="page-navigation__list">
      <li
        v-for="(item, index) of counter(totalPages)"
        :key="index"
        class="page-navigation__item"
        :class="getClass(index)"
      >
        <a 
          class="page-navigation__page-link"
          @click="goToPage(index + 1)"
        >
          {{ index + 1 }}
        </a>
      </li>
    </ul>
    <a 
      id="next-page" 
      class="page-navigation__page-link"
      :disabled="page >= totalPages"
      @click="goToPage(page + 1)"
    />
  </nav>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        page: {
            type: Number,
            default: 0
        },
        totalPages: {
            type: Number,
            default: 0
        }
    },
    setup(props, { emit }) {
        function counter(i) {
            return new Array(i);
        }

        function getClass(i) {
            const base = 'page-navigation__item_';
            const modificator = i === props.page - 1? 'current':
                                i === props.page - 2? 'prev':
                                i === props.page? 'next': '';
            return modificator? base + modificator : ''; 
        }

        function goToPage(index) {
            emit('page-changed', index);
        }

        return {
            counter,
            getClass, 
            goToPage
        }
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .page-navigation {
        display: flex;
        justify-content: center;
        @include text(21px);
        letter-spacing: 4px;
        color: $font-color;
        margin: 2vh auto 0 auto;

        &__page-link {
            text-decoration: none;
            color: inherit;
            display: block;
            cursor: pointer;
        }

        &__list {
            display: flex;
            list-style: none;
            justify-content: space-between;
            align-items: center;
            background-color: $secondary-color;
            border-radius: 20px;

            @include mobile {
                width: 50%;
            }
        }

        &__item {
            &_current {
                display: block;
                background: $primary-color;
                color: $primary-font-color;
                @include box(40px);
                border-radius: 50%;
                padding: 10px 0 10px 2px;
                text-align: center;

                .page-navigation__page-link {
                    @extend %disabled-link;
                }

            }

            &:first-child {
                padding-left: 19px;
                
                &.page-navigation__item_current {
                    padding-left: 2px;
                }
            }

            &:last-child {
                padding-right: 14px;

                &.page-navigation__item_current {
                    padding-right: 0;
                }
            }

            @include tablet {
                display: none;

            
                &:first-child,
                &:last-child,
                &_current,
                &_next,
                &_prev {
                    display: unset;
                }
            }

            @include mobile {
                &_next,
                &_prev {
                    display: none;
                }
            }

        }
    }

    .page-navigation__item + .page-navigation__item {
        margin-left: 15px;
    }

    #prev-page {
        margin-right: 20px;
    }

    #next-page {
        margin-left: 20px;
    }

    #prev-page,
    #next-page {
        @include box(40px);
        background: $secondary-color;
        border-radius: 50%;

        &:before {
            @include pseudo(7px);
            top: 8px;
            left: 15px;
        }
    }

    #prev-page:before {
        border-left: 2px solid $font-color;
        border-top: 2px solid $font-color;
        transform: rotate(-45deg);
    }

    #next-page:before {
        border-right: 2px solid $font-color;
        border-top: 2px solid $font-color;
        transform: rotate(45deg);
    }
</style>