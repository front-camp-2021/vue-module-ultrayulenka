<template>
  <li class="options-list__item">
    <div>
      <input
        :id="value"
        class="options-list__input" 
        type="checkbox"
        :name="title"
        :value="value"
        :checked="checked"
        :disabled="!value"
        @change="onClick"
      >
      <label
        class="options-list__label"
        :for="value"
      >{{ title? title : 'No title' }}</label>
    </div>
  </li>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        checked: {
            type: Boolean,
            default: false
        },
        isInList: {
            type: Boolean,
            default: false
        }
    },
    emits: [
        'filter-clicked'
    ],
    setup(props, { emit }) {
        function onClick() {
            emit('filter-clicked', props.value, props.checked);
        }

        return {
            onClick
        }
    }
})
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .options-list {
        &__item {
            position: relative;
            display: flex;
            justify-content: space-between;
        }

        &__label {
            cursor: pointer;
            margin-left: 13px;
            @include text(32px, "smaller", "light");

            &::before {
                @include pseudo(19px, 17px, block, absolute);
                background-color: $bg-color-container;
                cursor: pointer;
                border: 1px solid $light-font-color;
                border-radius: 3px; 
                left: 0;
                top: 7px;
            }

            &_round {
                &::before {
                    @include box(18px, 15px);
                    border-radius: 50%;
                    border: 1px solid $light-font-color;
                    top: 8px;
                }
            }
        }

        &__input {
            visibility: hidden;

            &:checked ~ .options-list__label::before {
                background-color: $primary-color;
            }
        }

        &__amount {
            @include text(normal, "small", "light");
            padding-top: 5px;
        }
    }
</style>