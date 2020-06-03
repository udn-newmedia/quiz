<template>
  <div class="result-wrapper">
    <div class="result">
        <div class="ani-wrapper">
          <div class="result-profile">
              <div class="jadge-background-ani">
              <h1 :class="[{'glitch': isGitching }, getResult.stars < 3 ? 'error' : 'ok']">
                  <template v-if="getResult.stars < 3">
                      <br>
                      <div class="main-jadge ok">
                          <div class="text-wrapper">
                              <div class="text-left">合</div>
                              <div class="text-right">　格</div>
                          </div>
                          SAFETY
                      </div>
                      
                  </template>
                  <template v-else>
                      <br>
                      <div class="main-jadge error">
                        <div class="text-wrapper">
                        不及格
                        </div>
                        DANGER
                      </div>  
                  </template>
              </h1>
              </div>
              <div class="denny">
                  <img src="../../../public/people/cha.svg" v-show="aniBasicConf.isShow" alt="">
                  <img alt="" :src="item.data" :key="item.id" v-for="item in aniConf" v-show="item.isShow"  class="stuff" >
              </div>
          </div>
        </div>
        <div class="describe-wrapper">
          <div class="warning">
              <div class="warning-title">
              <span class="warning-text">隱私危險指數</span>
              <ul class="stars">
                  <li class="star" :key="index" v-for="(item, index) in 5">
                      <span v-if="item > getResult.stars">
                          <font-awesome-icon class="star" :icon="['far', 'star']" />    
                      </span>
                      <span v-else="">
                          <font-awesome-icon class="star" icon="star" />
                      </span>
                  </li>
              </ul>
              </div>     
              <div class="warning-content">{{ getassertion }}</div>
              <div class="quiz-result-number">
              {{  currentPercent }}% 使用者跟你的<span @click="changePage(3)" class="outline">測驗結果</span>相同
              </div>
              <template v-if="currentPage === 2">
                <div class="single-char-wrapper" :key="index" v-for="(item, index) in getAllStars">
                  <single-chart option-type="star" :star-number="5 - index" :is-show="currentPage === 2" :option-number="resultDataPercent[4 - index]"></single-chart>
                </div>
              </template>
              <h5 class="user-number">共 {{  sumOfPlayers }} 人作答</h5>
            
          </div>
          <div class="share-and-play-wrapper">
              <share-and-play :star-number="getResult.stars" :assetion="assetion" @shareReset="$emit('appResetOption')" ></share-and-play>
          </div>
          <div class="know-more-wrapper" @click="handleGA">
              <know-more></know-more>
          </div>
          <logo></logo>
          <Share href="https://udn.com/upf/newmedia/2019_data/digital_privacy/quiz/index.html"></Share>
          <div class="editor-wrapper">
              <editor>
              <div>製作人：蔡佩蓉</div>
              <div>視覺設計：張心慈</div>
              <div>插畫：黃微庭</div>
              <div>網頁製作：胡凈悟</div>
              <div>監製：林秀姿、潘如瑩、董谷音</div>
              <div>2019.03.25</div>
              </editor>
          </div>
        </div>     
    </div>
    <foot></foot>
  </div>
</template>
<script>
import Utils from 'udn-newmedia-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SingleChart from '../singleChart.vue';
import ShareAndPlay from '../shareAndPlay.vue';
import KnowMore from '../knowMore.vue';
import logo from '../logo.vue'

library.add(fas, faStar)

export default {
  name: 'result',
  data () {
    return {
        isGitching: true,
        loopNumber: 0,
        result: {
            stars: 1,
            number: 30
        },
        assetion: ['Oops！你是名副其實的網路「透明人」，個人隱私早就被看光光。',
                   '小心！你就是駭客眼中的肥羊，各種上網NG行為別再犯了。',
                   'Google大神正在你背後看著你！快提高警覺性，奪回你的數位隱私權。',
                   '你正採取措施保護你的數位隱私，但駭客還是有趁虛而入的機會！',
                   '太棒了！你是數位隱私的捍衛者。駭客想竊取你的個資，沒那麼容易！'],
        resultDataPercent: [0, 0, 0, 0, 0]
    }
  },
  props: {
    aniConf: Array,
    aniBasicConf: Object
  },
  components: {
    SingleChart,
    ShareAndPlay,
    FontAwesomeIcon,
    KnowMore,
    logo
  },
  computed: {
    currentPage () {
      return this.$store.state.currentPage
    },
    getResult () {
        return this.$store.getters.judgeResult
    },
    getassertion () {
        let whichAssetion = 5 - this.$store.getters.judgeResult.stars
        return this.assetion[whichAssetion]
    },
    sumOfPlayers () {
        return this.$store.getters.getSumOfPlayers
    },
    getSumOfStars () {
          return this.$store.getters.getSumOfStars
    },
    getAllStars () {
          return this.$store.getters.getAllStars
    },
    currentPercent () {
      let vm = this
      let total = this.getSumOfStars
      let currentStar = this.getResult.stars - 1
      let totalPercent = 0
      let everyPercentOfStart = []
      everyPercentOfStart[currentStar] = 100
      this.getAllStars.map((item, index)=>{
        let percent = item / total
        if (index === currentStar) {
          everyPercentOfStart[currentStar] = everyPercentOfStart[currentStar]
        } else {
          everyPercentOfStart[index] = Math.floor(percent * 100)
          everyPercentOfStart[currentStar] = everyPercentOfStart[currentStar] - everyPercentOfStart[index]
        }
        
      })
      this.resultDataPercent = everyPercentOfStart
      return everyPercentOfStart[currentStar]
    }
  },
  methods: {
      switchGitch () {
          this.isGitching = !this.isGitching
      },
      changePage (page) {
        this.$store.dispatch('changePage', page);
      },
      handleGA () {
        ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "return",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [結果頁回主頁]"
          })
      }
  },
  mounted () {
      //glitch 效果，上線再打開
      this.loopNumber = setInterval(this.switchGitch, 1000)
  },
  destroyed () {
    clearInterval(this.loopNumber)
  }
}
</script>
<style lang="scss" scoped>
.result {
    min-height: 100vh;
    background-color: inherit;
    padding-top: 47px;
    @media (min-width: 768px) {
      padding: 95px 83px;
    }
    @media screen and (min-width: 1024px) {
      padding: 188px 10%;
    }
    .ani-wrapper {
        @media (min-width: 768px) {
          
        }
        @media screen and (min-width: 1024px) {
          width: 49%;
          display: inline-block;
          vertical-align: top;
        }
       .result-profile {
        position: relative;
        width: 100%;
        min-height: 50vh;
        .jadge-background-ani {
          position: relative;
          width: 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          @media (min-width: 768px) {
            left: 40%;
          }
          @media screen and (min-width: 1024px) {
            width: 80%;
            left: 25%;
          }
          h1 {
            position: relative;
            margin: 0 10px;
            font-weight: 900;
            font-size: 30px;
            white-space:nowrap;
            @media (min-width: 768px) {
              font-size: 50px;
            }
            @media screen and (min-width: 1024px) {

            }
            .main-jadge {
              margin: 0 auto;
              width: 80%;
              font-weight: 900;
              .text-wrapper {
                font-size: 80px;
                @media (min-width: 768px) {
                  font-size: 80px;

                }
                @media screen and (min-width: 1024px) {

                }
              }
            }
            &.ok {
              color: #ff3d57;
              
            }
            &.error {
              color: #4356ff;
              .text-wrapper {
                
                  &::after {
                      content: '';
                      display: block;
                      clear: both;
                  }
                  .text-left {
                      float: left;
                  } 
                  .text-right {
                      float: right;
                        @media (min-width: 768px) {
                          float: left;
                        }
                        @media screen and (min-width: 1024px) {
                          float: left;
                        }
                  }
              }
            }
            &.glitch {
              animation: clap .1s 5 forwards;
            }
          }
        }
        @keyframes clap{
          0%,100% { opacity:1; }
          30%     { left: 1vw; color:#f2e9df; }
          70%     { opacity:0; }
        }
      }
      .denny {
        z-index: 10;
        width: inherit;
        position: relative;
        img {
          width: 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          @media (min-width: 768px) {
            
          }
          @media screen and (min-width: 1024px) {
            width: 125%;
            transform: translate(-50%, 0%);
          }
        }
        .stuff {
          // position: absolute;
          // top: 0;
          // left: 0;
          z-index: 10;
        }
      }
    }
    .describe-wrapper {
      @media (min-width: 768px) {
        
      }
      @media screen and (min-width: 1024px) {
        width: 49%;
        display: inline-block;
      }
      .warning {
      padding: 28px 42px;
      .warning-title {
      text-align: center;
      .warning-text {
        -webkit-filter: drop-shadow(0px 0px 5px #ffffff);      
        filter: drop-shadow(0px 0px 5px #ffffff);
        margin-right: 6px;
      }
      .stars {
          display: inline-block;
            margin: 0;
            padding: 0;
            li {
              display: inline-block;
              font-size: 12px;
            }
            .star {
              color: #ffce0c;
              -webkit-filter: drop-shadow(0px 0px 5px #ffce0c);
              font-size: 18px;      
            filter: drop-shadow(0px 0px 5px #ffce0c);
              img {
                width: 18px;
              }
            }
            .more-info {
              margin-left: 7px;
            }
          }
        }
        .warning-content {
          margin: 18px 0 23px 0;
          padding-bottom: 32px; 
          border-bottom: solid 0.5px rgba(#ffffff, 0.5);;
        }
        .quiz-result-number {
          text-align: center;
          margin: 37px 0 31px;
          .outline {
            text-decoration:underline;
            cursor: pointer;
          }
        }
        .user-number {
          text-align: right;
        }
      }
      .share-and-play-wrapper {
        margin: 71px 0 86px; 
      }
      .know-more-wrapper {
        padding: 0 15px 86px; 
      }
      .editor-wrapper {
        padding: 30px 15px 62px;
      }
    }
  }
</style>

