<template>
    <li class="filter-item">
        <h4 class="filter-item__title">{{title? title: 'No title'}}</h4>
        <div class="range-slider">
            <span data-element="from">{{`${selected.from} ${prefix}`}}</span>
            <div class="range-slider__inner" data-element="slider">
                <span data-element="progress" class="range-slider__progress" :style="`left: ${left}%; right: ${right}%`"></span>
                <span data-element="thumbLeft" class="range-slider__thumb-left" :style="`left: ${left}%`"></span>
                <span data-element="thumbRight" class="range-slider__thumb-right" :style="`right: ${right}%`"></span>
            </div>
            <span data-element="to">{{`${selected.to} ${prefix}`}}</span>
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
            left: 0,
            right: 0
        }
    }
}
</script>

<style lang="scss">
    .range-slider__inner {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 4px;
    margin: 10px 14px;
    background: #cfebfc;
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
    background: #109cf1;
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