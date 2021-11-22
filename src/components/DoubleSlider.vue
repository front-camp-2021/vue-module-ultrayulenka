<template>
  <li 
    class="filter-item"
    @pointerup="onPointerUp"
    @pointermove="onMove($event)"
  >
    <h4 class="filter-item__title">
      {{ title? title: 'No title' }}
    </h4>
    <div class="range-slider">
      <span data-element="from">{{ `${selected.from} ${prefix}` }}</span>
      <div
        class="range-slider__inner"
        data-element="slider"
      >
        <span
          ref="slider"
          data-element="progress"
          class="range-slider__progress"
          :style="{left: left + '%', right: right + '%'}"
        />
        <span
          ref="leftThumb"
          class="range-slider__thumb-left"
          :style="{left: left + '%'}"
          @pointerdown="onPointerDownLeft"
        />
        <span
          class="range-slider__thumb-right"
          :style="{right: right + '%'}"
          @pointerdown="onPointerDownRight"
          @pointerup="onPointerUp"
        />
      </div>
      <span data-element="to">{{ `${selected.to} ${prefix}` }}</span>
    </div>
  </li>
</template>

<script>
export default {
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
                    from: this.min,
                    to: this.max
                }
            }
        },
        precision: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            activeThumb: ''
        }
    },
    computed: {
        range: function() {
            return this.max - this.min;
        },
        left: function() {
            return (this.selected.from - this.min) / this.range * 100;
        },
        right: function() {
            return (this.max - this.selected.to) / this.range * 100;
        },
        sliderWidth: function() {
            return this.$refs.slider.getBoundingClientRect().width;
        },
        leftBoundry: function() {
            return this.$refs.slider.getBoundingClientRect().left;
        },
        rightBoundry: function() {
            return this.$refs.slider.getBoundingClientRect().right;
        },
        thumbWidth: function() {
            return this.$refs.leftThumb.getBoundingClientRect().width;
        }
    },
    methods: {
        onPointerDownLeft() {
            this.activeThumb = 'left'
            console.log(this.activeThumb);
        },
        onPointerDownRight() {
            this.activeThumb = 'right'
            console.log(this.activeThumb);
        },
        onPointerUp() {
            this.activeThumb = '';
        },
        onMove(event) {
            switch(this.activeThumb) {
                case 'left': {
                    const shiftX = event.clientX - this.leftBoundry + this.thumbWidth;
                    const newFrom = this.checkFrom({
                        min: this.min,
                        from: this.min + (shiftX / this.sliderWidth * this.range), 
                        to: this.selected.to
                    });
                    this.$emit('range-changed', this.title, {from: this.roundValue(newFrom), to: this.selected.to});
                    break;
                }
                case 'right': {
                    const shiftX = this.rightBoundry - event.clientX;
                    const newTo = this.checkTo({
                        max: this.max,
                        to: this.max - (shiftX / this.sliderWidth * this.range),
                        from: this.selected.from
                    });
                    this.$emit('range-changed', this.title, {from: this.selected.from, to: this.roundValue(newTo)});
                    break;
                }
            }
        },
        checkTo({ max, from, to }) {
            if(typeof to !== 'number' || to > max) {
                return max;
            }
            const res = max - to;
            if(from + res >= max) {
                return from;
            } else {
                return to;
            };
        },
        checkFrom({min, from, to}) {
            if(typeof from !== 'number' || from < min) {
                return min;
            } 
            const res = from - min;
            if(to - res <= min) {
                return to;
            } else {
                return from;
            }
        },
        roundValue(value) {
            const newValue = value * Math.pow(10, this.precision);
            return Math.round(newValue) / Math.pow(10, this.precision);
        }
    }
}
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