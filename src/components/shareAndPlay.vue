<template>
    <div class="share-and-play-wrapper">
        <div class="share-and-play">
            <button class="share" @click="FacebookShare(facebookUrl, starNumber, assetion[5 - starNumber])">
              <font-awesome-icon class="share-icon" :icon="['fab', 'facebook-f']" />分享結果
            </button>
            <button class="play" @click="playAgain">
              <font-awesome-icon class="play-icon undo" icon="undo-alt" /> {{ btnInfo }}
            </button>
        </div>
    </div>    
</template>
<script>
import Utils from 'udn-newmedia-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, faFacebookF)

export default {
  name: 'share-and-play',
  data () {
    return {
      star: require("../../public/icons/star.svg"),
      barLength: 0,
      facebookUrl: 'https://udn.com/upf/newmedia/2019_data/digital_privacy/quiz/'
    }
  },
  props: {
    btnInfo: {
      type: String,
      default: '再玩一次'
    },
    goTo: {
      type: Number,
      default: 2
    },
    starNumber: {
      type: Number,
      default: 3
    },
    assetion: {
      type: Array,
      default: function () { return [
        'Oops！你是名副其實的網路「透明人」，個人隱私早就被看光光。',
        '小心！你就是駭客眼中的肥羊，各種上網NG行為別再犯了。',
        'Google大神正在你背後看著你！快提高警覺性，奪回你的數位隱私權。',
        '你正採取措施保護你的數位隱私，但駭客還是有趁虛而入的機會！',
        '太棒了！你是數位隱私的捍衛者。駭客想竊取你的個資，沒那麼容易！'
      ]}
    }
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  mounted () {
    console.log(this.starNumber)
  },
  computed: {
    currentPage () {
      return this.$store.getters.getCurrentPage
    },
    getAllScore () {
      return this.$store.state.getAllScores
    },
    getLastPage () {
      return this.$store.getters.getLastPage
    }
  },
  methods: {
     playAgain() {
       let vm  = this
        console.log(this.getLastPage)
       this.$store.dispatch('foldAllCards');
       if( this.currentPage == 2 ) {
         ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "return Play",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [再玩一次]"
          })
         this.$emit('shareReset');
         this.$store.dispatch('resetScore');
         this.$store.dispatch('changePage', 1);

       }
       if( this.currentPage == 3 && this.getLastPage == 2 ) {  
         this.$store.dispatch('changePage', 2);
       } else {
         this.$store.dispatch('changePage', 1);
       }
     },
     FacebookShare (href, starNumber, assetionResult) {

       let title = '你是網路「透明人」嗎？測驗你的隱私危險指數'
       let picture = 'https://udn.com/upf/newmedia/2019_data/digital_privacy/quiz/meta/meta_quiz.jpg'
       let description = '台灣人愛滑臉書、下載App，卻不知道自己的隱私可能已經悄悄外洩，在網路世界中宛如透明人。你的個資保護夠安全嗎？快透過小測驗評估你的隱私危險指數。'

        if(this.currentPage == 2) {
          title = '我的網路透明人指數 ' + starNumber + '顆星'
          picture = 'https://udn.com/upf/newmedia/2019_data/digital_privacy/quiz/meta/meta_0' + starNumber + '.jpg'
          description = assetionResult
        }
          ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "Facebook Share",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [facebook share result]"
          })

          FB.ui(
            {
              method: 'share_open_graph',
              action_type: 'og.likes',
              action_properties: JSON.stringify({
                object: {
                  'og:url': href,
                  'og:title': title,
                  'og:description': '你的個資保護夠安全嗎？快透過小測驗評估你的數位隱私危險指數。',
                  'og:image': picture
                }
              })
            },
            // callback
            function(response) {
              if (response && !response.error_message) {
                console.log(response)
              } else {
                console.log(response.error_message)
              }
            }
          );
        }
  }
}
</script>
<style lang="scss" scoped>
.share-and-play-wrapper {
    width: 100%;
    background-color: inherit;
    .share-and-play {
    width: 75%;
    margin: 0 auto;
    button {
        border: 0px;
        width: 50%;
        height: 44px;
        border-radius: 6px;
        color: #ffffff;
        cursor: pointer;
        font-size: 16px;
    }
    .share {
        background-color: #4356ff;
        vertical-align: middle;
        .share-icon {
        margin-right: 8px;
        }
    }
    .play {
        background-color: inherit;
        transform-origin: center;
        vertical-align: middle;
        .play-icon {
        transform: translate(0, 0, -100%);
        -moz-transform:scaleX(-1);
        -webkit-transform:scaleX(-1);
        -o-transform:scaleX(-1);
        transform:scaleX(-1);
        /*IE*/
        filter:FlipH;
        margin-right: 8px;
        }   
    }
  }
}
</style>
