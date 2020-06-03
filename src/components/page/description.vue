<template>
  <div class="description-wrapper">
    <div class="description">
      <div class="description-profile">
        <img :src="srcRWD(require('../../../public/people/cha_group_mob.svg'), require('../../../public/people/cha_group_web.svg'))" alt=""> 
      </div>
      <div class="describe-wrapper">
         <h3>共 {{ sumOfPlayers }} 人玩過遊戲</h3>
         <div class="information-chart-wrapper">
           <template v-if="currentPage === 3">
           <div class="single-chart-wrapper" :key="index" v-for="(item, index) in getAllStars">
             <single-chart option-type="star" :star-number="5 - index" :is-show="currentPage === 3" :option-number="currentPercent[4 - index]">
              <span>隱私危險指數</span>
            </single-chart>
            <h4 class="chart-description">{{ chartDescription[index] }}</h4>
           </div>
           </template>
        </div>
        <div class="share-and-play-wrapper">
          <share-and-play btn-info='繼續作答' @shareFolded="appFolded"></share-and-play>
        </div>
        <div class="know-more-wrapper">
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
import SingleChart from '../singleChart.vue';
import ShareAndPlay from '../shareAndPlay.vue';
import KnowMore from '../knowMore.vue';
import srcRWD from '../../mixin/srcRWD.js'
import logo from '../logo.vue'

export default {
  name: 'description',
  data () {
    return {
      chartDescription: [
        'Oops！你是名副其實的網路「透明人」，個人隱私早就被看光光。',
        '小心！你就是駭客眼中的肥羊，各種上網NG行為別再犯了。',
        'Google大神正在你背後看著你！快提高警覺性，奪回你的數位隱私權。',
        '你正採取措施保護你的數位隱私，但駭客還是有趁虛而入的機會！',
        '太棒了！你是數位隱私的捍衛者。駭客想竊取你的個資，沒那麼容易！'
      ],
      resultDataPercent: [0, 0, 0, 0, 0]
    }
  },
  mixins: [srcRWD],
  props: {

  },
  components: {
    SingleChart,
    ShareAndPlay,
    KnowMore,
    logo
  },
  computed: {
      currentPage () {
        return this.$store.state.currentPage
      },
      sumOfPlayers () {
          return this.$store.getters.getSumOfPlayers
      },
      getResult () {
          return this.$store.getters.judgeResult
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
        return everyPercentOfStart
      }
  },
  methods: {
    calculatePercentage (total, domainScore) {
      return Math.round((domainScore / total) * 100)
    },
    appFolded () {
      this.$emit('appFolded')
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.description {
    min-height: 100vh;
    .description-profile {
      margin: auto 0;
      text-align: center;
      margin: 41px 51px 7px;
      position: relative;
      @media (min-width: 768px) {
          
      }
      @media screen and (min-width: 1024px) {
        width: 49%;
        display: inline-block;
        vertical-align: top;
        margin: 0;
      }
      img {
        @media (min-width: 768px) {
          
        }
        @media screen and (min-width: 1024px) {
          width: 45%;
          position: fixed;
          left: 0;
        } 
      }
    }
    .describe-wrapper {
      @media (min-width: 768px) {
        
      }
      @media screen and (min-width: 1024px) {
        width: 49%;
        display: inline-block;
        padding-top: 227px;
      }
      h3 {
        margin: 0 51px;
        @media (min-width: 768px) {
          
        }
        @media screen and (min-width: 1024px) {
          margin: 0;
        }
      }
      .information-chart-wrapper {
        margin: 0 51px;
        @media (min-width: 768px) {
        
        }
        @media screen and (min-width: 1024px) {
          margin: 0;
        }
      }
      .chart-description {
        font-size: 15px;
      }
      .share-and-play-wrapper {
        margin: 71px 0 86px; 
      }
      .know-more-wrapper {
        padding: 0 15px 86px;
        @media (min-width: 768px) {
        
        }
        @media screen and (min-width: 1024px) {
          padding: 0;
        }
      }
      .editor-wrapper {
        padding: 30px 15px 62px;
      }
    }
  }
</style>
