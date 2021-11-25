<template>
  <CustomBox 
    class="filter-item"
    :is-in-list="isInList"
    @pointerup="onPointerUp"
    @pointermove="onMove($event)"
  >
    <h4 class="filter-item__title">
      {{ title? title: 'No title' }}
    </h4>
    <div class="range-slider">
      <span data-element="from">{{ `${selected.from} ${prefix}` }}</span>
      <div
        ref="slider"
        class="range-slider__inner"
        data-element="slider"
      >
        <span
          data-element="progress"
          class="range-slider__progress"
          :style="{left: left + '%', right: right + '%'}"
        />
        <span
          ref="leftThumb"
          class="range-slider__thumb-left"
          :style="{left: left + '%'}"
          @pointerdown="onPointerDown('left')"
        />
        <span
          class="range-slider__thumb-right"
          :style="{right: right + '%'}"
          @pointerdown="onPointerDown('right')"
          @pointerup="onPointerUp"
        />
      </div>
      <span data-element="to">{{ `${selected.to} ${prefix}` }}</span>
    </div>
  </CustomBox>
</template>

<script>
import CustomBox from './CustomBox';
import { 
  defineComponent,
  computed,
  ref,
  onMounted 
} from 'vue';

export default defineComponent({
  components: {
    CustomBox
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    selected: {
      type: Object,
      default: () => {
        return {
          from: props.min,
          to: props.max
        }
      },
      required: true
    },
    precision: {
      type: Number,
      default: 0
    },
    isInList: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'range-changed'
  ],

  setup (props, { emit }) {
    const activeThumb = ref('');
    const slider = ref(null);
    const leftThumb = ref(null);

    const range = computed(() => props.max - props.min);
    const left = computed(() => (props.selected.from - props.min) / range.value * 100);
    const right = computed(() => (props.max - props.selected.to) / range.value * 100);

    function onPointerDown(thumb) {
      activeThumb.value = thumb;
    }

    function onPointerUp() {
      activeThumb.value = '';
    }

    function onMove() {
      const {
        leftBoundry,
        sliderWidth,
        rightBoundry
      } = getSliderProps();

      const {
        thumbWidth
      } = getThumbProps();

      switch(activeThumb.value) {
        case 'left': {
          const shiftX = event.clientX - leftBoundry + thumbWidth;
          const newFrom = checkFrom({
            min: props.min,
            from: props.min + (shiftX / sliderWidth * range.value), 
            to: props.selected.to
          });
          emit('range-changed', props.title, {from: roundValue(newFrom), to: props.selected.to});
          break;
        }
        case 'right': {
          const shiftX = rightBoundry - event.clientX;
          const newTo = checkTo({
            max: props.max,
            to: props.max - (shiftX / sliderWidth * range.value),
            from: props.selected.from
          });
          emit('range-changed', props.title, {from: props.selected.from, to: roundValue(newTo)})
          break;
        }
      }
    }

    function checkTo({ max, from, to }) {
      if(typeof to !== 'number' || to > max) {
        return max;
      }
      const res = max - to;
      if(from + res >= max) {
        return from;
      } else {
        return to;
      };
    }

    function checkFrom({min, from, to}) {
      if(typeof from !== 'number' || from < min) {
        return min;
      } 
      const res = from - min;
      if(to - res <= min) {
        return to;
      } else {
        return from;
      }
    }

    function roundValue(value) {
      const newValue = value * Math.pow(10, props.precision);
      return Math.round(newValue) / Math.pow(10, props.precision);
    }

    function getSliderProps() {
      const sliderWidth = slider.value.getBoundingClientRect().width;
      const leftBoundry = slider.value.getBoundingClientRect().left;
      const rightBoundry = slider.value.getBoundingClientRect().right;

      return {
        sliderWidth,
        leftBoundry,
        rightBoundry
      }
    }

    function getThumbProps() {
      const thumbWidth = leftThumb.value? leftThumb.value.getBoundingClientRect().width : 0;
      return {
        thumbWidth
      }
    }

    return {
      left,
      right,
      onPointerDown,
      onPointerUp,
      onMove,
      slider,
      leftThumb
    }
  }
})
</script>

<style lang="scss">
@use "../assets/scss/variables" as *;

    .range-slider__inner {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 4px;
    margin: 10px 14px;
    background: $secondary-color;
    box-shadow: 0 0 1px #c2cfe0;
    user-select: none;
  }
  
  .range-slider__thumb-right,
  .range-slider__thumb-left {
    position: absolute;
    top: 50%;
    margin-top: -9px;
    height: 18px;
    width: 6px;
    background: url("../assets/images/range-thumb-icon.svg") left center no-repeat;
    background-size: cover;
    cursor: grab;
  }
  
  /* cursor over all slider, so that if the cursor moves out of the thumb, it's still grabbing */
  .range-slider_dragging,
  .range-slider_dragging .range-slider__thumb-right,
  .range-slider_dragging .range-slider__thumb-left {
    cursor: grabbing;
  }
  
  .range-slider__thumb-left {
    left: 0;
    margin-left: -6px;
  }
  
  .range-slider__thumb-right {
    right: 0;
    transform: rotate(180deg);
    margin-right: -6px;
  }
  
  .range-slider__progress {
    background: $primary-color;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  
  .range-slider {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 60px;
  }
  
  .range-slider > span {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #707683;
    width: 60px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  
  .range-slider > span:first-child {
    text-align: right;
    left: 0;
  }
  
  .range-slider > span:last-child {
    right: 0;
  }
</style>