<template>
  <div class="logo">
      <ul class="logo-lists">
          <li class="list" @click="handleGA(links[0].name)" >
              <a :href="links[0].link">
                  <img :src="links[0].logo" alt="">
              </a>
          </li>
          <li class="list" @click="handleGA(links[1].name)" >
              <a >
                  <img :src="links[1].logo" alt="">
              </a>
          </li>
          <li class="list" @click="handleGA(links[2].name)" >
              <a :href="links[2].link">
                  <img :src="links[2].logo" alt="">
              </a>
          </li>
      </ul>
  </div>
</template>

<script>
import Utils from 'udn-newmedia-utils'
import setProps from '@/mixin/setProps.js'
export default {
  name: 'logo',
  mixins: [setProps],
  data () {
      return {
          links: [
              {
                  name: '聯合新聞網',
                  link: 'https://udn.com/news/index',
                  logo: require('../../public/logo/footer_logo_UDN_white.svg')
              },
              {
                  name: '新媒體中心',
                  link: '.',
                  logo: require('../../public/logo/footer_logo_newmedia_white.svg')
              },
              {
                  name: '願景工程',
                  link: 'https://vision.udn.com/',
                  logo: require('../../public/logo/vision_logo.svg')
              }
          ]
      }
  },
  props: {

  },
  methods: {
      handleGA (logo) {
        window.ga("newmedia.send", {
            "hitType": "event",
            "eventCategory": "out link title",
            "eventAction": "click",
            "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [外連到「 " + logo +  " 」]"
        })
      }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.logo {
    margin: 35px 0;
    .logo-lists {
        margin: 10px 16px;
       list-style:none;
       .list {
           display: inline-block;
           width: 128px;
           height: 37px;
           color: white;
       }
    }
}
</style>
