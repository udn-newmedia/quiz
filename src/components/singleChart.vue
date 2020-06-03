<template>
  <div class="single-chart">
    <div class="title-wrapper">
      <template v-if="optionType === 'text'">
        <div class="option-title">{{ optionTitle }}</div>
      </template>
      <template v-if="optionType === 'star'">
        <div class="option-title">
          <ul class="stars">
            <li class="star" :key="item" v-for="item in 5">
              <span v-if="item > starNumber">
                <font-awesome-icon class="star" :icon="['far', 'star']" />    
              </span>
              <span v-else="">
                <font-awesome-icon class="star" icon="star" />
              </span>
            </li>
            <li class="more-info">
              <slot>

              </slot>
            </li>
          </ul>
        </div>
      </template>
      <div class="option-number">{{ optionNumber + '%' }}</div>
    </div>
    <div class="chart-bar-wrapper">
      <div class="chat-bar" :style="{'width': barLength + '%'}"></div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, faStar)

export default {
  name: 'single-chart',
  data () {
    return {
      star: require("../../public/icons/star.svg"),
      barLength: 0
    }
  },
  props: {
    optionType: {
      type: String,
      default: 'text'
    },
    optionTitle: {
      type: String,
      default: '是'
    },
    optionNumber: {
      type: Number,
      default: 0
    },
    starNumber: {
      type: Number,
      default: 0
    },
    isShow: {
    }
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  computed: {

  },
  watch: {

  },
  mounted () {
    let vm = this
    setTimeout(()=>{
      vm.barLength = vm.optionNumber
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
.single-chart {
  width: 100%;
  margin: 25px 0 10px 0;
    .title-wrapper {
      width: 100%;
      &:after {
          clear:both;
          content:" ";
          display:block;
      }
      .option-title {
        float: left;
        .stars {
          margin: 0;
          padding: 0;
          li {
            display: inline-block;
            font-size: 12px;
          }
          .star {
            color: #ffce0c;
            img {
              width: 18px;
            }
          }
          .more-info {
            margin-left: 7px;
          }
        }
      }
      .option-number {
        float: right;
        font-size: 15px;
      }
    }
    .chart-bar-wrapper {
      width: 100%;
      height: 8px;
      background-color: #465362;
      border-radius: 2px;
      .chat-bar {
        height: inherit;
        background-color: rgba(#ffce0c, 0.6);
        transition: all 1.5s ease-in-out;
        border-radius: 2px 0 0 2px;

      }
    }
}
</style>
