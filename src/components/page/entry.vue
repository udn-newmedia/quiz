<template>
    <div class="entry-page">
        <div class="phone-background-ani">
        <animation :ani-conf="backgroundAniConf"></animation>
        </div>
        <div class="introduction">
        <h1 class="title">你是網路<span class="highline">透明人</span>嗎?</h1>
        <h2 class="subtile">測驗你的隱私危機指數</h2>
        <div class="share">
        <ul class="icons">
            <li>
                <img src="../public/icons/facebook.svg" alt="" class="facebook">
            </li>
            <li>
                <img src="" alt="" class="line">
            </li>
            </ul>
        </div>
        </div>
        <button class="start-btn" @click="changePage(1)">
        開始<img src="../public/icons/arrow-right.svg" alt="" class="arrow-right">
        </button>
    </div>
</template>

<script>
import Animation from './components/animation.vue'

export default {
  name: 'entry',
  data () {
    return {
      cover: '',
      step: 0,
      page: 2,
      publicPath: process.env.BASE_URL,
      pageContent: ['首頁', '遊戲頁', '結果頁', '說明頁'],
      backgroundAniConf: {
        name: 'phone',
        data: require('../public/json/phone.json')
      },
      picked: true,
      isFold: false,
      isGitching: true,
      picked: '',
      robot1: 'robot1',
      ansmers: [
        
      ],
      cards: [
        {
          id: 'card1',
          conf: {
            name: 'robot',
            data: require('../public/json/data1.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 10,
            option2: '否',
            number2: 90
          },
          name: 'card1',
          element: 'robot1',
          question: '你曾經為了拿LINE免費貼圖，分享活動訊息給親朋好友嗎？',
          value1: 0,
          value2: 1,
          picked: ''
        },
        {
          id: 'card2',
          conf: {
            name: 'robot2',
            data: require('../public/json/data2.json')
          },
          chart: {
            type: 'star',
            number1: 1,
            number2: 5
          },
          name: 'card2',
          element: 'robot2',
          question: '你曾經為了拿LINE免費貼圖，分享活動訊息給親朋好友嗎？',
          value1: 0,
          value2: 1,
          picked: ''
        },
        {
          id: 'card3',
          conf: {
            name: 'robot3',
            data: require('../public/json/data3.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 40,
            option2: '否',
            number2: 60
          },
          name: 'card3',
          element: 'robot3',
          question: '你曾經為了拿LINE免費貼圖，分享活動訊息給親朋好友嗎？',
          value1: 0,
          value2: 1,
          picked: ''
        },
      ],
      animations : [
        {
          name: 'robot',
          data: require('../public/json/data1.json')
        },
        {
          name: 'robot2',
          data: require('../public/json/data2.json')
        },
        {
          name: 'robot3',
          data: require('../public/json/data3.json')
        }
      ],
      slickOptions: {
          slidesToShow: 1,
          dots: true,
          centerMode: true,
          arrows: false,
          infinite: false,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '30px',
                slidesToShow: 1
              }
            }
          ]
          // Any other options that can be got from plugin documentation
      }
    }
  },
  mounted(){

      let vm  = this
      //glitch 效果，上線再打開
      // setInterval(this.switchGitch, 1000)
    },
  watch: {
    cards: {
      handler: function(newValue) {
          console.log(newValue.picked)
      },
      deep: true
    }
  },
  components: {
    Slick,
    Animation,
    SingleChart,
    'font-awesome-icon': FontAwesomeIcon
  },
  methods: {
        controlAni () {
          console.log("hello")
        },
        switchGitch () {
          this.isGitching = !this.isGitching
        },
        next() {
          console.log("helll next")
          
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },
        // Events listeners
        handleAfterChange(event, slick, currentSlide) {
            console.log('handleAfterChange', event, slick, currentSlide);
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
          this.step = nextSlide

          // this.isFold = false
          // let newAnimation = {}
          // newAnimation = { ...this.cards[nextSlide].conf }
          // this.currentAnimations = { ...newAnimation }
          
        console.log("currentSlider:" + currentSlide)
            console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
        },
        handleBreakpoint(event, slick, breakpoint) {
            console.log('handleBreakpoint', event, slick, breakpoint);
        },
        handleDestroy(event, slick) {
            console.log('handleDestroy', event, slick);
        },
        handleEdge(event, slick, direction) {
            console.log('handleEdge', event, slick, direction);
        },
        handleInit(event, slick) {
            console.log('handleInit', event, slick);
        },
        handleReInit(event, slick) {
            console.log('handleReInit', event, slick);
        },
        handleSetPosition(event, slick) {
            console.log('handleSetPosition', event, slick);
        },
        handleSwipe(event, slick, direction) {
            console.log('handleSwipe', event, slick, direction);
        },
        handleLazyLoaded(event, slick, image, imageSource) {
            console.log('handleLazyLoaded', event, slick, image, imageSource);
        },
        handleLazeLoadError(event, slick, image, imageSource) {
            console.log('handleLazeLoadError', event, slick, image, imageSource);
        },
        expand() {
          this.isFold = !this.isFold
        },
        changePage(pageNumber) {
          let nextPage = pageNumber
          this.page = nextPage
        }
    },
}
</script>

<style lang="scss" scoped>

.entry-page {
position: relative;
background-color: inherit;
min-height: 100vh;
.phone-background-ani {
    height: 100vh;
    width: 200vw;
    transform: translate(-15%);
}
.introduction {
    position: absolute;
    top: 92px;
    left: 15px;
    .title {
    font-weight: 900;
    .highline {
        color: #5d5d5d;
    }
    }
    .subtitle {

    }
    .share {
    margin-top: 26px;
    ul {
        width: 100%;
        li {
        position: relative;
        background-color: #465362;
        display: inline-block;
        border-radius: 50%;
        width: 42px;
        height: 42px;
        margin: 0 5px;
        vertical-align: top;
        .facebook {
            position: absolute;
            width: 50%;
            height: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .line {

        }
        }
    }
    
    }
}
.start-btn {
    width: 60%;
    height: 55px;
    position: absolute;
    bottom: 72px;
    left: 50%;
    background-color: #e2e2e2;
    color: #011936;
    transform: translateX(-50%);
    border: 0px;
    border-radius: 6px;
    font-size: 18px;
    .arrow-right {
    width: 11px;
    height: 11px;
    margin-left: 10px
    }
}
}

</style>
