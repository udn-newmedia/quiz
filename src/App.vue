<template>
  <div id="app">
    <Indicator color="#0A4DA8" :current-question="currentQuestion"></Indicator>
    <Header :links="navInfo" ></Header>
    <div v-show="currentPage === 0" class="entry-page">
      <div class="introduction-wrapper">
        <div class="introduction">
          <h1 class="title">你是網路<span class="highline">透明人</span>嗎？</h1>
          <h2 class="subtitle">測驗你的隱私危險指數</h2>
          <p class="explain">台灣人愛滑臉書、下載App，卻不知道自己的隱私可能已經悄悄外洩，在網路世界中宛如透明人。你的個資保護夠安全嗎？快透過小測驗評估你的隱私危險指數。</p>
          <div class="share">
          <ul class="icons">
              <li>
                <img class="facebook share-icon" src="../public/btn/btn_fb.svg" @click="FacebookShare(facebookUrl)" alt="">
              </li>
              <li>
                <img  class="line share-icon" src="../public/btn/btn_line.svg" @click="LineShare(lineUrl)" alt="">
              </li>
            </ul>
          </div>
          <button class="start-btn" @click="addSumOfPlayers">
            開始<img src="../public/icons/arrow-right.svg" alt="" class="arrow-right">
          </button>
          <p style="text-align: center; margin: 10px;font-size: 10px;">建議電腦使用 Chrome 開啟遊戲，以獲得最佳體驗</p>
        </div>
      </div>
      <div class="phone-background-ani">
        <animation :ani-conf="backgroundAniConf"></animation>
      </div>
    </div>
    <div v-if="currentPage === 1" class="game-box">
      <div class="animation-wrapper">
        <div class="animation-control">
          <img :src="aniBasicConf.data" v-show="aniBasicConf.isShow" class="basic" alt="">
          <img v-for=" item in aniConf " :key="item.id" v-show="item.isShow" :src="item.data" :class="{'ani_cha': item.isShow }" class="stuff" alt="">
          <img v-for=" item in aniJudgeConf" :key="item.id" v-show="item.isShow" :src="item.data" :class="{'ani_cha': item.isShow }" class="stuff" alt="">
        </div>
      </div>
      <div class="slick-wrapper">
        <slick
          ref="slick"
          :options="slickOptions"
          @afterChange="handleAfterChange"
          @beforeChange="handleBeforeChange"
          @breakpoint="handleBreakpoint"
          @destroy="handleDestroy"
          @edge="handleEdge"
          @init="handleInit"
          @reInit="handleReInit"
          @setPosition="handleSetPosition"
          @swipe="handleSwipe"
          @lazyLoaded="handleLazyLoaded"
          @lazyLoadError="handleLazeLoadError">
          <div class="card-wrapper" :key="card.id" v-for="(card, index) in cards">
            <div class="card-content">
              <div class="card-basic">
                <h3 class="card-title">{{ card.question }}</h3>
                <ul class="options">
                  <li class="option">
                    <button @click="chooseAnswer(index, card.value1)" class="option-btn">
                      <span :class="[{'active': card.value1.isPick }, {'disable': card.value1.isDisable }]" class="option-circle"><font-awesome-icon class="up" :icon="['fas', 'circle']" /></span><span class="option-text">{{ card.chart.option1 }}</span>
                    </button>
                  </li>
                  <li class="option">
                    <button @click="chooseAnswer(index, card.value2)" class="option-btn">
                      <span :class="[{'active': card.value2.isPick }, {'disable': card.value2.isDisable }]" class="option-circle"><font-awesome-icon class="up" :icon="['fas', 'circle']" /></span><span class="option-text">{{ card.chart.option2 }}</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div v-if="isExtend[index]" class="extend-wrapper">
                <div v-if="index === 9">
                  <button class="card-btn result-btn" @click="examinationResult">
                    測驗結果
                  </button>
                </div>
                <div v-else>
                  <button class="card-btn" @click="btnNext">
                    下一題 <span class="question-number"> ({{ index + 1 }}/10) </span>
                  </button>
                </div>
                <div class="foldPart" v-if="getIsFolder[index]">
                  <br>
                  <h3 class="card-subtitle">別人怎麼選?</h3>
                  <h4 class="user-percent-number" v-if="card.value1.isPick" > {{ calculatePercentage(card.chart.total, card.chart.number1, card.chart.number2, 'option1') }}% 的使用者跟你的答案相同。</h4>
                  <h4 class="user-percent-number" v-else> {{ calculatePercentage(card.chart.total, card.chart.number1, card.chart.number2, 'option2') }}% 的使用者跟你的答案相同。</h4>
                  <div class="card-chart">
                    <single-chart :is-show="true" :option-type="card.chart.type" :option-title="card.chart.option1" :option-number="calculatePercentage(card.chart.total, card.chart.number1, card.chart.number2,  'option1')"></single-chart>
                    <single-chart :is-show="false" :option-type="card.chart.type" :option-title="card.chart.option2" :option-number="calculatePercentage(card.chart.total, card.chart.number1, card.chart.number2, 'option2')"></single-chart>
                    <h5 class="user-number">共 {{ card.chart.total }} 人作答</h5>
                  </div>
                  <h3 class="card-subtitle">專家怎麼說?</h3>
                  <div class="export-report">
                    <div v-html="card.report"></div>
                  </div>
                  <h3 class="card-subtitle">你可能會想知道</h3>
                  <h3 class="related-reports" @click="youWillKnow"><a :href="card.relatedReportLink" target="_blank">{{ card.relatedReport }}</a></h3>
                  <button class="fold-up" @click="switchFold(index)">隱藏<font-awesome-icon class="up" :icon="['fas', 'chevron-up']" /></button>
                </div>
                <div class="foldPart"  v-else>
                  <button class="fold-up" @click="switchFold(index)">展開<font-awesome-icon class="up" :icon="['fas', 'chevron-down']" /></button>
                </div>  
              </div>
            </div>
          </div>
        </slick>
        <div class="give-up" @click="giveUp"><span class="decoration-line">放棄遊戲看結果</span></div>
      </div>
    </div>
    <div v-show="currentPage === 2">
      <result @appResetOption="resetOption" :ani-basic-conf="aniBasicConf" :ani-conf="aniConf" ></result>
    </div>
    <div v-show="currentPage === 3">
      <description  @appFolded="foldedCards"></description>
    </div>
  </div>
</template>

<script>
import Utils from 'udn-newmedia-utils'
import setProps from '@/mixin/setProps.js'
import axios from 'axios'
import $ from 'jquery';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faLine } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Slick from 'vue-slick';
import bodymovin from 'lottie-web';
import Header from './components/header.vue'
import Result from './components/page/result.vue';
import Description from './components/page/description.vue';
import Animation from './components/animation.vue';
import SingleChart from './components/singleChart.vue';
import ShareAndPlay from './components/shareAndPlay.vue';
import KnowMore from './components/knowMore.vue';

library.add(fas, faStar, faFacebookF, faLine)

export default {
  name: 'app',
  mixins: [setProps],
  data () {
    return {
      isFold: [false, false, false, false, false, false, false, false, false, false],
      currentQuestion: 1,
      lineUrl: 'https://udn.com/upf/newmedia/2019_data/digital_privacy/quiz/',
      facebookUrl: 'https://udn.com/upf/newmedia/2019_data/digital_privacy/quiz/',
      cover: '',
      navInfo: [{
        id: 0,
        title: '數位隱私變商品',
        url: 'https://udn.com/upf/newmedia/2019_data/digital_privacy/'
      },
      {
        id: 1,
        title: '政府正在監控你',
        url: 'https://udn.com/upf/newmedia/2019_data/digital_privacy/government/'
      },
      {
        id: 2,
        title: '測驗透明人指數',
        url: 'https://udn.com/upf/newmedia/2019_data/digital_privacy/quiz/'
      }],
      publicPath: process.env.BASE_URL,
      pageContent: ['首頁', '遊戲頁', '結果頁', '說明頁'],
      backgroundAniConf: {
        name: 'phone',
        data: require('../public/json/cover/cover.json')
      },
      aniBasicConf: {
        id: 'basic',
        data: require('../public/people/cha.svg'),
        isShow: true
      },
      aniConf: [
        { id: 'stuff01', data: require('../public/people/cha-01-duck.svg'), isShow: false }, { id: 'stuff02', data: require('../public/people/cha-02-pants.svg'), isShow: false }, { id: 'stuff03', data: require('../public/people/cha-03-pants.svg'), isShow: false }, { id: 'stuff04', data: require('../public/people/cha-04-hand.svg'), isShow: false }, { id: 'stuff05', data: require('../public/people/cha-05-hand.svg'), isShow: true },
        { id: 'stuff06', data: require('../public/people/cha-06-top.svg'), isShow: true }, { id: 'stuff07', data: require('../public/people/cha-07-pants.svg'), isShow: false }, { id: 'stuff08', data: require('../public/people/cha-08-pants.svg'), isShow: true }, { id: 'stuff09', data: require('../public/people/cha-09-hair.svg'), isShow: true }, { id: 'stuff10', data: require('../public/people/cha-10-slippers.svg'), isShow: true },
        { id: 'stuff11', data: require('../public/people/cha-11-glasses.svg'), isShow: true }, { id: 'stuff12', data: require('../public/people/cha-12-top.svg'), isShow: false }, { id: 'stuff13', data: require('../public/people/cha-13-pants.svg'), isShow: false }, { id: 'stuff14', data: require('../public/people/cha-14-top.svg'), isShow: false }, { id: 'stuff15', data: require('../public/people/cha-15-hand.svg'), isShow: false },
        { id: 'stuff16', data: require('../public/people/cha-16-top.svg'), isShow: false }, { id: 'stuff17', data: require('../public/people/cha-17-officeWorker.svg'), isShow: false }, { id: 'stuff18', data: require('../public/people/cha-18-hand.svg'), isShow: false }, { id: 'stuff19', data: require('../public/people/cha-19-glasses.svg'), isShow: false }, { id: 'stuff20', data: require('../public/people/cha-20-hand.svg'), isShow: false },
        { id: 'stuff21',  data: require('../public/people/cha-21.svg'), isShow: false }, { id: 'stuff22', data: require('../public/people/cha-22.svg'), isShow: false },
      ],
      currentChange: { on: 0, off: 0 },
      aniControl: [
        { on: [1], off: [2] }, { on: [2], off: [3] }, { on: 0, off: [4] }, { on: [4], off: [5] }, { on: 0, off: [6] }, { on: [3], off: [7] }, { on: [7], off: [8] }, { on: 0, off: [9] }, { on: 0, off: [10] },  { on:0, off: [11] }, { on: 0, off: 0 },
        { on: [12], off: [10] }, { on: [13], off: [8] }, { on: [14], off: [12] }, { on: [15], off: [5] }, { on: [16], off: [14] }, { on: [17, 18], off: [10, 13, 15, 16] }, { on: [19], off: [11] }, { on: [20], off: [18] }, { on: [21], off: [9, 17, 19] }, { on: [22], off: [21]}
      ],
      aniJudgeConf: [
        { id: 'goods01', data: require('../public/goods/bad-01.svg'), isShow: false }, { id: 'goods02', data: require('../public/goods/bad-02.svg'), isShow: false }, { id: 'goods03', data: require('../public/goods/bad-03.svg'), isShow: false }, { id: 'goods04', data: require('../public/goods/bad-04.svg'), isShow: false }, { id: 'goods05', data: require('../public/goods/bad-05.svg'), isShow: false },
        { id: 'goods06', data: require('../public/goods/bad-06.svg'), isShow: false }, { id: 'goods07', data: require('../public/goods/bad-07.svg'), isShow: false }, { id: 'goods08', data: require('../public/goods/bad-08.svg'), isShow: false }, { id: 'goods09', data: require('../public/goods/bad-09.svg'), isShow: false }, { id: 'goods10', data: require('../public/goods/bad-10.svg'), isShow: false },
        { id: 'goods11', data: require('../public/goods/good-01.svg'), isShow: false }, { id: 'goods12', data: require('../public/goods/good-02.svg'), isShow: false }, { id: 'goods13', data: require('../public/goods/good-03.svg'), isShow: false }, { id: 'goods14', data: require('../public/goods/good-04.svg'), isShow: false }, { id: 'goods15', data: require('../public/goods/good-05.svg'), isShow: false },
        { id: 'goods16', data: require('../public/goods/good-06.svg'), isShow: false }, { id: 'goods17', data: require('../public/goods/good-07.svg'), isShow: false }, { id: 'goods18', data: require('../public/goods/good-08.svg'), isShow: false }, { id: 'goods19', data: require('../public/goods/good-09.svg'), isShow: false }, { id: 'goods20', data: require('../public/goods/good-10.svg'), isShow: false },
      ],
      isExtend: [false, false, false, false, false, false, false, false, false, false],
      totalScore: 10,
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
            number2: 90,
            total: 100
          },
          name: 'card1',
          question: 'Q1：到咖啡店或餐廳用餐時，你是否會使用店家的免費WiFi？',
          report: '<p>使用公共場所的無線網路容易遭到駭客竊聽，藉此盜取你的電子信箱、通訊軟體等內容。另一種常見的駭客手法是偽裝成免費上網的WiFi熱點，使用者一旦連上去，所有網路活動都會被駭客掌握。</p><br><p>資安專家翁浩正提醒，若要使用公共場所的無線網路，切記要在有加密的狀態下，例如<b class="ligh-line">連線有https的網站</b>；或是<b  class="ligh-line">透過VPN（虛擬私人網路）建立安全連線</b>，避免個資外洩。</p>',
          relatedReport: '防駭客攻擊 別用不明Wifi！',
          relatedReportLink: 'https://udn.com/news/story/7088/3183853',
          value1: {
            name: 'value1',
            number: -1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: 1,
            isPick: false,
            isDisable: false
          }
        },
        {
          id: 'card2',
          conf: {
            name: 'robot2',
            data: require('../public/json/data2.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 40,
            option2: '否',
            number2: 60,
            total: 100
          },
          name: 'card2',
          question: 'Q2：你曾經玩過同意提供個資的Facebook心理測驗，3次以上？',
          report: '<p>在玩Facebook上面的各種測驗、遊戲時，會跳出允許給予權限的畫面，若點選同意，應用程式就可以從你的Facebook帳號中取得各種資料，包含個人信箱、嗜好、交友情況等。</p><br><p>資安專家翁浩正表示，<b class="ligh-line">這類需要出賣個資的心理測驗，能不玩就盡量避免</b>。若真的很想玩，最好先審視允許哪些資料被取得，並評估個資外洩的狀況，以及這家公司的資安評價。</p>',
          relatedReport: '善用臉書 遠離奇怪的心理測驗',
          relatedReportLink: 'https://udn.com/news/story/7341/3055451',
          value1: {
            name: 'value1',
            number: -1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: 1,
            isPick: false,
            isDisable: false
          }
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
            number2: 60,
            total: 100
          },
          name: 'card3',
          question: 'Q3：你是否會定期更換電子信箱和各種網路服務的密碼？',
          report: '<p>定期更換密碼可避免密碼外洩造成的安全風險，資安專家翁浩正建議，最好定期更換各種網路服務的密碼。如果這個網站發生資安事件，就應立即更換密碼。</p><br><p>此外，<b class="ligh-line">每個網站必須使用不同密碼、甚至不同帳號，密碼必須獨一無二</b>。使用者可以利用<a href="https://1password.com/" target="_blank">1Password</a>等密碼管理軟體集中儲存，減少必須記憶大量密碼的麻煩。</p>',
          relatedReport: '最糟網路密碼你中了嗎？3招教你自創完美密碼',
          relatedReportLink: 'https://udn.com/news/story/7086/3545692',
          value1: {
            name: 'value1',
            number: 1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: -1,
            isPick: false,
            isDisable: false
          }
        },
        {
          id: 'card4',
          conf: {
            name: 'robot4',
            data: require('../public/json/data1.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 10,
            option2: '否',
            number2: 90,
            total: 100
          },
          name: 'card4',
          question: 'Q4：你想下載一個手電筒App，發現App要求撥打電話、讀取通訊錄等權限，你會下載嗎？',
          report: '<p>下載App時應慎重過濾其要求的權限內容，<b class="ligh-line">考量此App真的需要這些資訊嗎？</b>例如，手電筒App卻要求讀取通訊錄、麥克風、GPS定位等資訊，就有必要懷疑這可能是惡意軟體。若無法判斷，建議先不要下載。</p>',
          relatedReport: '5款地圖App侵隱私 百度最嚴重',
          relatedReportLink: 'https://udn.com/news/story/11017/3263424',
          value1: {
            name: 'value1',
            number: -1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: 1,
            isPick: false,
            isDisable: false
          }
        },
        {
          id: 'card5',
          conf: {
            name: 'robot5',
            data: require('../public/json/data2.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 40,
            option2: '否',
            number2: 60,
            total: 100
          },
          name: 'card5',
          question: 'Q5：你是否曾經在沒打卡的狀況下，在某家餐廳用餐時，手機自動跳出要你為餐廳評分的訊息？',
          report: '<p>2018年8月<a href="https://www.apnews.com/828aefab64d4411bac257a07c1af0ecb" target="_blank">美聯社</a>報導指出，Google的多款App在使用者關閉手機GPS定位功能後，只要在連上網路的情況下，Google仍會持續收集用戶的位置記錄。<b class="ligh-line">美國一名電腦研究人員在關閉定位後，前往某商場購物，手機卻跳出要她為商場評分的提醒。</b></p><br><p>Google表示，使用者隨時可<a href="https://reurl.cc/My9xX" target="_blank">關閉定位紀錄功能</a>。「照理說」Google就不會繼續記錄定位資訊，但使用者相對就無法使用Google的導航服務。</p>',
          relatedReport: 'Google偷追蹤用戶定位 全球數十億人受影響',
          relatedReportLink: 'https://udn.com/news/story/7086/3308429',
          value1: {
            name: 'value1',
            number: -1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: 1,
            isPick: false,
            isDisable: false
          }
        },
        {
          id: 'card6',
          conf: {
            name: 'robot6',
            data: require('../public/json/data3.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 40,
            option2: '否',
            number2: 60,
            total: 100
          },
          name: 'card6',
          question: 'Q6：你想在訂票網購買電影票，系統要求你註冊會員，你是否會使用「Facebook帳號登入」？',
          report: '<p>使用者常常不經意授權一些應用程式使用Facebook資訊，因為只要按下「使用Facebook登入」就可以輕鬆使用新的App，不用再另外設定帳號密碼。但是貪圖方便的同時，就有個資外洩的風險。</p><br><p>使用者可以到Facebook的「設定」→「<a href="https://www.facebook.com/settings?tab=applications" target="_blank">應用程式和網站</a>」，了解你已授予哪些應用程式存取個人資料的權限，並適時解除不必要的應用程式，防止個資被不當利用。</p>',
          relatedReport: '臉書個資外洩好害怕 減少風險你可以這麼做',
          relatedReportLink: 'https://udn.com/news/story/11922/3046274',
          value1: {
            name: 'value1',
            number: -1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: 1,
            isPick: false,
            isDisable: false
          }
        },
        {
          id: 'card7',
          conf: {
            name: 'robot7',
            data: require('../public/json/data1.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 10,
            option2: '否',
            number2: 90,
            total: 100
          },
          name: 'card7',
          question: 'Q7：你是否允許Facebook自動Tag有你在內的相片？',
          report: '<p>Facebook使用臉部辨識技術，在其他人上傳你的照片時會建議標記你的名字。若要防範隱私被他人標記在動態或照片中而曝露，可以到Facebook的「設定」→「<a href="https://www.facebook.com/settings?tab=facerec&view" target="_blank">臉部辨識</a>」，將其設定為關閉。</p>',
          relatedReport: '臉書臉部辨識爭議案 美法官裁定集體訴訟',
          relatedReportLink: 'https://udn.com/news/story/6811/3091037',
          value1: {
            name: 'value1',
            number: -1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: 1,
            isPick: false,
            isDisable: false
          }
        },
        {
          id: 'card8',
          conf: {
            name: 'robot8',
            data: require('../public/json/data2.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 40,
            option2: '否',
            number2: 60,
            total: 100
          },
          name: 'card8',
          question: 'Q8：在火車站等車時發現手機沒電，你會使用車站的公共USB充電孔嗎？',
          report: '<p>國外曾經發現假的免費充電站，駭客在USB傳輸線的另一端連接一台小型電腦，一旦使用者連接上去，駭客就能竊取使用者手機裡全部的資料，甚至還能操控手機發簡訊、刷卡。</p><br><p>資安專家翁浩正建議一招最有效的自保之道，就是<b class="ligh-line">自備只能充電、不可傳輸資料的USB線</b>，降低手機被駭的風險。</p>',
          relatedReport: '他靠一條USB傳輸線 遠端遙控駭入電腦',
          relatedReportLink: 'https://udn.com/news/story/7086/3651135',
          value1: {
            name: 'value1',
            number: -1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: 1,
            isPick: false,
            isDisable: false
          }
        },
        {
          id: 'card9',
          conf: {
            name: 'robot9',
            data: require('../public/json/data3.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 40,
            option2: '否',
            number2: 60,
            total: 100
          },
          name: 'card9',
          question: 'Q9：你是否會定期刪除自己的Google搜尋和瀏覽紀錄？',
          report: '<p>Google會儲存用戶的搜尋和瀏覽紀錄，以根據用戶的喜好投放廣告或推薦內容。若不想被Google儲存紀錄，使用者可以<a href="https://support.google.com/accounts/answer/465" target="_blank">按照以下步驟</a>刪除搜尋紀錄。並且阻止Google<a href="https://myaccount.google.com/u/0/activitycontrols?pageId=none&pli=1" target="_blank">儲存你的網頁活動</a>。</p>',
          relatedReport: '不想被Google追蹤 請你跟著這樣做',
          relatedReportLink: 'https://udn.com/news/story/7086/3307214',
          value1: {
            name: 'value1',
            number: 1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: -1,
            isPick: false,
            isDisable: false
          }
        },
        {
          id: 'card10',
          conf: {
            name: 'robot10',
            data: require('../public/json/data3.json')
          },
          chart: {
            type: 'text',
            option1: '是',
            number1: 40,
            option2: '否',
            number2: 60,
            total: 100
          },
          name: 'card10',
          question: 'Q10：在LINE收到「免費小熊維尼貼圖下載活動」訊息，要求你加入某商家帳號即可下載，你是否會加入？',
          report: '<p>用假帳號送免費貼圖騙取個資是常見的詐騙手法，最快的分辨方式，就是看LINE帳號前的盾牌顏色。<b class="ligh-line">「灰色」盾牌是一般帳號，若看到知名品牌卻是灰色盾牌就要小心；</b>「綠色」是官方帳號、「深藍色」是LINE@認證帳號，都會是比較可靠的來源。</p><br><p>此外，<b class="ligh-line">使用者可至「LINE貼圖小舖→活動貼圖」，確認是否有免費活動</b>。企業官方帳號舉辦的LINE貼圖活動都會在出現在列表上。</p>',
          relatedReport: 'LINE加好友獲免費貼圖 小心詐騙幌子',
          relatedReportLink: 'https://udn.com/news/story/7320/3472517',
          value1: {
            name: 'value1',
            number: -1,
            isPick: false,
            isDisable: false
          },
          value2: {
            name: 'value2',
            number: 1,
            isPick: false,
            isDisable: false
          }
        },
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
  created: function() {
    let vm = this
    let url = 'https://nmdap.udn.com.tw/test/quiz/'
    // let url = 'http://54.95.141.59/quiz/'
    this.$store.dispatch('initAllStars');
    axios.get(url + 'scoregroup')
      .then(res=>{
        if (res) {
          let scores = res.data
          
          Object.keys(scores).map((key)=>{
            vm.cards[key].chart.number1 = scores[key]['option_yes']
            vm.cards[key].chart.number2 = scores[key]['option_no']
            vm.cards[key].chart.total = scores[key]['number']
            console.log(vm.cards[key].chart)
          })
          
           this.$store.dispatch('initAllScores', scores)
        }
      })
   
  },
  mounted(){
    this.$store.watch(
      (state, getters) => getters.isFold,
      (newValue, oldValue) => {
        console.log(`Updating from ${oldValue} to ${newValue}`);

        // Do whatever makes sense now
        // if (newValue === 'success') {
        //   this.complex = {
        //     deep: 'some deep object',
        //   };
        // }
      },
    );
  },
  watch: {

  },
  components: {
    Slick,
    Animation,
    SingleChart,
    ShareAndPlay,
    FontAwesomeIcon,
    KnowMore,
    Result,
    Description,
    Header
  },
  methods: {
        youWillKnow () {
          ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "Game Start",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [第" + this.currentQuestion  + "題][你可能想知道]"
          })
        },
        btnNext () {
          ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "Next",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [下一題]"
          })
          this.next()
        },
        addSumOfPlayers () {

          ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "Game Start",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [遊戲開始]"
          })
          this.$store.dispatch('addSumOfPlayers');
          this.changePage(1)
        },
        examinationResult () {
          ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "Game End",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [測驗結果]"
          })    
          this.$store.dispatch('examinationResult');
          this.$store.dispatch('addSumOfStars');
          this.$store.dispatch('recordStar');
          this.changePage(2)
        },
        resetOption () {
          let vm = this
          let defaultData = [5, 6, 8, 9, 10, 11]
          this.cards.map((item, index)=>{
            vm.$set(item.value1, 'isPick', false)
            vm.$set(item.value1, 'isDisable', false)
            vm.$set(item.value2, 'isPick', false)
            vm.$set(item.value2, 'isDisable', false)
            vm.$set(vm.isExtend, index, false)    
          })
          this.aniConf.map((item)=>{
            vm.$set(item, 'isShow', false)
          })
           this.aniJudgeConf.map((item)=>{
            vm.$set(item, 'isShow', false)
          })
          defaultData.map((item)=>{
            vm.$set(vm.aniConf[item - 1], 'isShow', true)
          })
          vm.$set(vm.aniBasicConf, 'isShow', true)
          this.$store.dispatch('foldAllCards');
        },
        foldedCards () {
          this.$store.dispatch('foldAllCards');
        },
        giveUp() {
          ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "Game End",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [第 " +  this.currentQuestion +  " 題][放棄作答看結果]"
          })
          this.changePage(3)
        },
        switchFold (whichCard) {

          let vm = this
          let tmpBoolean = this.getIsFolder[whichCard]
          if(tmpBoolean) {
            ga("newmedia.send", {
              "hitType": "event",
              "eventCategory": "Game Start",
              "eventAction": "click",
              "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [第 " +  this.currentQuestion +  " 題 ][隱藏卡片]"
            })
            vm.$store.dispatch('foldCurrentCard', { number: whichCard, judge: false });
          } else {
            ga("newmedia.send", {
              "hitType": "event",
              "eventCategory": "Game Start",
              "eventAction": "click",
              "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [第 " +  this.currentQuestion +  " 題 ][展開卡片]"
            })
            vm.$store.dispatch('foldCurrentCard', { number: whichCard, judge: true });
          }
          
        },
        putOnShirt (whichSuff) {
          this.$set(this.aniConf[whichSuff], 'isShow', true);
        },
        takeOffShirt (whichSuff) {
          this.$set(this.aniConf[whichSuff], 'isShow', false);
        },
        exchangeShirt (whichOldStuff, whichNewStuff) {
          this.takeOffShirt(whichOldStuff);
          this.putOnShirt(whichNewStuff);
        },
        showJudgeGoods (whichGood) {
          // 1~10 is bad, 11~20 is good
           this.$set(this.aniJudgeConf[whichGood], 'isShow', true)
        },
        chooseAnswer(whichQuestion, getScore) {
          

          if (this.cards[whichQuestion].value1.isPick === false && this.cards[whichQuestion].value2.isPick === false && getScore.name === 'value1') {
            let label = "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [第" + (whichQuestion + 1) + "題][是]"
            window.ga("newmedia.send", {
              "hitType": "event",
              "eventCategory": "option",
              "eventAction": "click",
              "eventLabel": label
            })

            this.$set(this.cards[whichQuestion]['value1'], 'isPick', true)
            this.$set(this.cards[whichQuestion]['value2'], 'isDisable', true)
            this.$store.dispatch('foldCurrentCard', { number: whichQuestion, judge: true})
            this.$store.dispatch('recordScore', { whichQuestion, 'newScore': getScore.number })
            this.$store.dispatch('recordOption', { whichQuestion, 'newOption': getScore.name })
            this.isExtend[whichQuestion] = true
            this.$store.dispatch('examinationResult');
            this.chooseStuff(whichQuestion, getScore.number)
            this.chooseShirt(getScore.number)

          } else if (this.cards[whichQuestion].value1.isPick === false && this.cards[whichQuestion].value2.isPick === false && getScore.name === 'value2') {
            let label = "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [第" + (whichQuestion + 1) + "題][否]"
            window.ga("newmedia.send", {
              "hitType": "event",
              "eventCategory": "option",
              "eventAction": "click",
              "eventLabel": label
            })
            this.$set(this.cards[whichQuestion]['value2'], 'isPick', true)
            this.$set(this.cards[whichQuestion]['value1'], 'isDisable', true)
            this.$store.dispatch('foldCurrentCard', { number: whichQuestion, judge: true})
            this.$store.dispatch('recordScore', { whichQuestion, 'newScore': getScore.number })
            this.$store.dispatch('recordOption', { whichQuestion, 'newOption': getScore.name })
            this.isExtend[whichQuestion] = true
            this.$store.dispatch('examinationResult');
            this.chooseStuff(whichQuestion, getScore.number)
            this.chooseShirt(getScore.number)

          } else {
            console.log("答案已選")
          }
        },
        chooseStuff(whichQuestion, score) {
          
          if (score > 0 ) {
            let gooGoodNumber = 10 + whichQuestion
            this.showJudgeGoods(gooGoodNumber)
          } else if ( score < 0 ) {
            let badGoodNumber = whichQuestion
            this.showJudgeGoods(badGoodNumber)
          } else {
            console.log(score)
          }
        },
        chooseShirt (score) {
          let currentScore = this.$store.getters.judgeResult.number;
          let lastScore = this.$store.getters.getLastScore;
          let vm = this
          console.log(currentScore)
          if (currentScore === 20) {
            vm.$set(vm.aniBasicConf, 'isShow', false)
          }
          if ( (lastScore <= 10 && score < 0) || (lastScore >= 10 && score > 0) ) {
            let nextChange = { ...this.aniControl[currentScore] }

              console.log(nextChange)
             if(nextChange.on !== 0) {
              nextChange.on.forEach(element => {
                let takeOffNumber = element - 1
                vm.putOnShirt(takeOffNumber)
              });
            }
            if(nextChange.off !== 0) {
              nextChange.off.forEach(element => {
                let takeOffNumber = element - 1
                vm.takeOffShirt(takeOffNumber)
              });
            }
 
          } else if (( lastScore < 10 && score > 0) || ( lastScore > 10 && score < 0)) {

            let nextChange = { ...this.aniControl[lastScore] }
            console.log(nextChange)
            if(nextChange.on !== 0) {
              nextChange.on.forEach(element => {
                let takeOffNumber = element - 1
                vm.takeOffShirt(takeOffNumber)
              });
            }
            if(nextChange.off !== 0) {
              nextChange.off.forEach(element => {
                let takeOffNumber = element - 1
                vm.putOnShirt(takeOffNumber)
              });
            }
          }
        },
        calculatePercentage (total, number1, number2, option) {
          if (option === 'option1') {

            return 100 - Math.round((number1 / total) * 100)
          }
          return Math.round((number1 / total) * 100)
        },
        LineShare (href) {
          ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "Line Share",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [line share]"
          })
          if (Utils.detectMob()) {
            // 手機
            window.open("//line.me/R/msg/text/?" + document.querySelector('title').innerHTML + "%0D%0A%0D%0A" + document.querySelector('meta[property="og:description"]').content + "%0D%0A%0D%0A" + href)
          } else {
            window.open("https://lineit.line.me/share/ui?url=" + href)
          }
        },
        FacebookShare (href) {
          ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "Facebook Share",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [facebook share]"
          })
          FB.ui(
            {
              method: 'share_open_graph',
              action_type: 'og.shares',
              action_properties: JSON.stringify({
                object: {
                  'og:url': href,
                  'og:title': '你是網路「透明人」嗎？測驗你的隱私危險指數',
                  'og:description': '台灣人愛滑臉書、下載App，卻不知道自己的隱私可能已經悄悄外洩，在網路世界中宛如透明人。你的個資保護夠安全嗎？快透過小測驗評估你的隱私危險指數。',
                  'og:image': 'https://udn.com/upf/newmedia/2019_data/digital_privacy/quiz/meta/meta_quiz.jpg'
                }
              })
            },
            // callback
            function(response) {
              if (response && !response.error_message) {
                console.log(response);
              } else {
                console.log(response.error_message);
              }
            }
          );
        },
        next() {
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
            // console.log('handleAfterChange', event, slick, currentSlide);
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
          this.currentQuestion = nextSlide + 1
          if(this.$store.getters.getCurrentAnswer[currentSlide] !== 0) {
            this.$store.dispatch('foldCurrentCard', { number: currentSlide,judge: false})
          }
        },
        handleBreakpoint(event, slick, breakpoint) {
            //console.log('handleBreakpoint', event, slick, breakpoint);
        },
        handleDestroy(event, slick) {
            //console.log('handleDestroy', event, slick);
        },
        handleEdge(event, slick, direction) {
            //console.log('handleEdge', event, slick, direction);
        },
        handleInit(event, slick) {
            //console.log('handleInit', event, slick);
        },
        handleReInit(event, slick) {
            //console.log('handleReInit', event, slick);
        },
        handleSetPosition(event, slick) {
            //console.log('handleSetPosition', event, slick);
        },
        handleSwipe(event, slick, direction) {
            //console.log('handleSwipe', event, slick, direction);
        },
        handleLazyLoaded(event, slick, image, imageSource) {
            //console.log('handleLazyLoaded', event, slick, image, imageSource);
        },
        handleLazeLoadError(event, slick, image, imageSource) {
            // console.log('handleLazeLoadError', event, slick, image, imageSource);
        },
        changePage(pageNumber) {
          this.$store.dispatch('changePage', pageNumber);
          // let nextPage = pageNumber
          // this.page = nextPage
        }
    },
    computed: {
      currentPage () {
        return this.$store.getters.getCurrentPage
      },
      getAllScore () {
        return this.$store.state.getAllScores
      },
      getIsFolder () {
        return this.$store.getters.getIsFolder
      }
    }
}
</script>

<style lang="scss">
@import '../node_modules/slick-carousel/slick/slick.css';
@import './assets/reset.css';

html, body {
  font-family: "微軟正黑體", sans-serif, "Segoe UI";
  color: #e2e2e2;
  background-color: #011936;
}
#app {
  min-height: 100vh;
  overflow: hidden;
  .entry-page {
    position: relative;
    background-color: inherit;
    min-height: 100vh;
    
    .introduction-wrapper {
      min-height: 100vh;
      width: 100%;
      position: relative;
      display: inline-block;
      z-index: 10;
      @media (min-width: 768px) {
        width: 50%;     
      }
      @media screen and (min-width: 1024px) {
        width: 50%;
      }
      .introduction {
        box-sizing: border-box;
        padding: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        @media (min-width: 768px) {
          position: absolute;
          top: 40%;
          width: 100%;
          transform: translate(-50%, -50%);
          margin-left: 80px;
        }
        @media screen and (min-width: 1024px) {
          position: absolute;
          width: 80%;
          top: 40%;
          left: 100%;
          transform: translate(-100%, -50%);
        }
        .title {
          font-weight: 900;
          margin-top: 48px;
          @media (min-width: 768px) {
            font-size: 30px;
            margin-top: 0px;
          }
          @media screen and (min-width: 1024px) {
            font-size: 40px;
          }
          .highline {
            color: #5d5d5d;
          }
        }
        .subtitle {
          margin-top: 8px;
          @media (min-width: 768px) {
            font-size: 23px;
          }
          @media screen and (min-width: 1024px) {
            font-size: 38px;
          }
        }
        .explain {
          color: #9a9a9a;
          margin: 18px 0;
          display: none;
          @media (min-width: 768px) {
            display: block;
          }
          @media screen and (min-width: 1024px) {
            display: block;
            font-size: 14px;
          }
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
              .facebook, .line {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0.6;
                cursor: pointer;
                &:hover {
                  opacity: 1;
                }
              }
            }
          }
          
        }
      }
      .start-btn {
        position: relative;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 60%;
        height: 55px;
        background-color: #e2e2e2;
        color: #011936;
        border: 0px;
        border-radius: 6px;
        font-size: 18px;
        transition: background-color .5s;
        margin-top: 250px;
        cursor: pointer;
        @media (min-width: 320px)  and (max-width: 374px) {
          width: 60%;
          margin-top: 140px;
        }
        @media (min-width: 768px) {
          margin-top: 60px;
          width: 100%;
        }
        @media screen and (min-width: 1024px) {
          margin-top: 60px;
          width: 100%;
        }
        &:focus {
          outline: none;
        }
        &:hover {
          background: #ABABAB; 
        }
        .arrow-right {
          width: 11px;
          height: 11px;
          margin-left: 10px
        }
      }
    }
    .phone-background-ani {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(5%, -60%) rotate(25deg);
      width: 100%;
      z-index: 1;
      transform-origin: 0 0;
      @media (min-width: 768px) {
        width: 80%;     
      }
      @media screen and (min-width: 1024px) {
        width: 35%;
        transform: translate(50%, -50%) rotate(25deg);
      }
    }
  }
  .game-box {
    padding-bottom: 55px;

    .animation-wrapper {
      height: 220px;
      padding: 10px;
      box-sizing: border-box;
      @media (min-width: 320px)  and (max-width: 374px) {
        height: 195px;
      }
      @media (min-width: 768px) {
        height: auto;
        padding: 10px 0 0 0;
      }
      @media screen and (min-width: 1025px){
        width: 50%;
        float: left;
        min-height: 100vh;
        height: 100vh;
      }
      .animation-control {
        position: relative;
        z-index: 0;
        @media (min-width: 768px) {

        }
        @media screen and (min-width: 1025px){
          top: 50%;
          transform: translateY(-50%);
        }
        .basic {
          // z-index: 10;
        } 
        .stuff {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
        }
        .ani_cha {
            -webkit-animation: ani 0.8s;
            -webkit-animation-delay: 0.2s;
            animation: ani 0.8s;
            animation-delay: 0.2s;
        }

        @keyframes ani {
              0%{transform: scale(1, 1); opacity: 0;}
            50%{transform: scale(1.03, 1.03); opacity: 0.5;}
            100%{transform: scale(1, 1); opacity: 1;}
        } 
        @-webkit-keyframes ani {
              0%{transform: scale(1, 1); opacity: 0;}
            50%{transform: scale(1.03, 1.03); opacity: 0.5;}
            100%{transform: scale(1, 1); opacity: 1;}
        } 
      }
      .slick-slide {
        width: 100%;
      }
    }
    .slick-wrapper {
      @media (min-width: 768px) {

      }
      @media screen and (min-width: 1025px){
        box-sizing: border-box;
        width: 50%;
        float: right;
        min-height: 100vh;
        padding-top: 10%;
        padding-right: 6%;
      }
      .slick-initialized {
        margin-top: 100px;
        @media (max-width: 320px) {
          margin-top: 30px;
        }
        @media (min-width: 768px) {
          margin-top: 0px;
        }
        @media screen and (min-width: 1025px){
          margin-top: 25%;
        }
      }
      .slick-dots {
        display: table;
        margin: 0 auto;
        padding-top: 20px;
        li {
          display: inline-block;
          background-color: #414a55;
          border-radius: 50%;
          margin: 0 6px;
          width: 5px;
          height: 5px;
          position: relative;
          &.isAnswered {
            background-color: #c2eabd;
          }
          button {
            background-color: inherit;
            border: 0px;
            font-size: 0px;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            padding: 0px;
          }
        }
        .slick-active {
          background-color: #c2eabd;
        }
      }
      .card-wrapper {
        min-height: 40vh;
        position: relative;
        @media (min-width: 768px) {

        }
        @media screen and (min-width: 1025px){
          
        }
        .card-content {
          background-color: rgba(#465362, 0.3);
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          min-height: 40vh;
          margin: 0;
          box-sizing: border-box;
          padding: 30px 22px;
          width: 95%;
          border-radius: 10px;
          @media (min-width: 320px)  and (max-width: 374px) {
            padding: 22px 22px 0;
            min-height: 35vh;
          }
          @media (min-width: 768px) {
            padding: 37px;
            min-height: 35vh
          }
          @media screen and (min-width: 1025px){
          }
          .card-basic {
            min-height: 30vh;
            @media (min-width: 320px)  and (max-width: 374px) {
                min-height: 15vh;
            }
            @media (min-width: 768px) {
              min-height: 10vh;
            }
            @media screen and (min-width: 1025px){

            }
            .card-title {
              margin: 0;
              font-size: 18px;
              margin-bottom: 20px;
              min-height: 10vh;
              @media (min-width: 320px) and (max-width: 374px) {
                font-size: 16px;
                min-height: 8vh;
                margin-bottom: 10px;
              }
              @media (min-width: 768px) {
                font-size: 21px;
                min-height: 10vh;
              }
              @media screen and (min-width: 1025px){
                line-height: 1.8;
              }
            }
            .options {
              list-style: none;
              @media (min-width: 768px) {
                margin-bottom: 12px;
              }
              @media screen and (min-width: 1025px){
                
              }
              .option {
                font-size: 18px;
                margin-bottom: 14px;
                @media (min-width: 768px) {
                  display: inline-block;
                  margin-right: 37px;
                }
                @media screen and (min-width: 1025px){
                  display: inline-block;
                  margin-right: 37px;
                }
                .option-btn {
                  border: 0;
                  width: 100%;
                  text-align: left;
                  background-color: rgba(70, 83, 98, 0.3);
                  color: #e2e2e2;
                  font-size: 18px;
                  border: none;
                  background: transparent;
                  &:focus {
                    outline: none;
                  }
                  .option-circle {
                    margin-right: 8px;
                    &.disable {
                      color: #9f9f9f;
                    }
                    &.active {
                      color: #c2eabd;
                      position: relative;
                      display: inline-block;
                      &::after {
                        content: '';
                        display: inline-block;
                        width: 5.5px;
                        height: 5.5px;
                        border-radius: 50%;
                        background-color: #011936;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -60%);
                      }
                    }
                  }

                }
                // input[type=radio] {
                //     /* Hide original inputs */
                //     visibility: hidden;
                //     position: absolute;
                    
                //   }
                // input[type=radio] + label:before {
                //     height:12px;
                //     width:12px;
                //     margin-right: 2px;
                //     content: " ";
                //     display:inline-block;
                //     vertical-align: baseline;
                //     background:#e2e2e2;
                //     margin-right: 7px;
                //   }
                // input[type=radio]:checked + label:before {
                //   background:#c2eabd;
                // }
                // /* CUSTOM RADIO AND CHECKBOX STYLES */
                //   input[type=radio] + label:before{
                //     border-radius:50%;
                //   }
              }
            }
          }
          .extend-wrapper {
            padding-bottom: 50px;
            .card-btn {
               width: 100%;
              border: 0;
              height: 44px;
              background-color: #c2eabd;
              border-radius: 6px;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 10px;
              cursor: pointer;
              &:focus {
                outline: none;
              }
              &:hover {
                background-color: #97C990;
              }
              @media (min-width: 768px) {
                margin-bottom: 60px;
              }
              @media screen and (min-width: 1025px){

              }          
              .question-number {
                font-size: 12px;
              }
            }
            .card-subtitle {
              margin-bottom: 14px;
            }
            .related-reports {
              
              a {
                color: #9f9f9f;
                text-decoration: none;
                border-bottom: solid 0.5px #9f9f9f;
                border-style:dotted;
              }
            }
            .user-percent-number {
              margin-bottom: 28px;
            }
            .card-chart {
              margin-bottom: 65px;
              .user-number {
                text-align: right;
              }
            }
            .export-report {
              margin-bottom: 65px;
              line-height: 1.5;
              @media (min-width: 768px) {
                font-size: 18px;
              }
              @media screen and (min-width: 1025px){

              } 
              .ligh-line {
                color: #9f9f9f;
              }
              a {
                color: #c2eabd;
                text-decoration: none;
              }
            }
            .fold-up {
              width: 100%;
              height: 64px;
              background-color: inherit;
              border: 0;
              border-radius: 0 0 10px 10px;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              font-size: 18px;
              color: #9f9f9f;
              outline: none;
              cursor: pointer;
              .up {
                margin-left: 8px;
                cursor: pointer;
              }
            }
          }       
        }
      }
      .slick-current {
        .card-content {
          transition: all 1s;
          background-color: rgba(#465362, 0.6);
        }
      }
    }
    .give-up {
      color: #9a9a9a;
      text-align: center;
      margin: 16px 0 0 0;
      @media (min-width: 768px) {
        margin: 16px 0 50px;
      }
      @media screen and (min-width: 1025px){
        margin: 16px 0 100px;
      }
      cursor: pointer;
      .decoration-line {
        border-bottom: solid 1px white;
        border-style: dotted;
      }
    }
  }
}
</style>
