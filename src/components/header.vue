<template>
<div class="header-wrapper">
    <div class="header">
        <div class="left">
          <a href="https://udn.com/upf/newmedia/2019_data/digital_privacy/" @click="handle_logoGA"><i class="udn-icon udn-icon-logo" :style="{ color: '#465362' }"></i></a>
        </div>
        <div class="right">
            <div class="menu-web">
                <ul class="lists">
                  <li class="list" @click="handleGA(item.title)" v-for="item in links" :key="item.id" ><a :href="item.url" target="_blank">{{ item.title }}</a></li>
                </ul>
            </div>
            <font-awesome-icon class="hamburger" @click="controlExpand" :icon="['fas', 'bars']"  size="2x"/>
            <div class="menu" v-show="isExpand">
              <div class="close-wrapper">
                <font-awesome-icon class="close" @click="controlExpand" :icon="['fas', 'times-circle']" size="2x"/>
              </div>
              <ul class="lists">
                <li class="list" v-for="item in links" :key="item.id" ><a :href="item.url" target="_blank">{{ item.title }}</a></li>
              </ul>
            </div>
        </div>
    </div>
</div>   
</template>
<script>
import setProps from '../mixin/setProps.js'
import Utils from 'udn-newmedia-utils'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(fas)

export default {
  name: 'header',
  mixins: [setProps],
  data () {
    return {
      isExpand: false
    }
  },
  props: {
    links: Array
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    controlExpand () {
      this.isExpand = !this.isExpand
    },
    handle_logoGA () {
      window.ga("newmedia.send", {
        "hitType": "event",
        "eventCategory": "hamburger",
        "eventAction": "click",
        "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [圓形logo點擊]]"
      })
    },
    handleGA (title) {
      window.ga("newmedia.send", {
        "hitType": "event",
        "eventCategory": "out link title",
        "eventAction": "click",
        "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [外連到「 " + title +  " 」]"
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    .header {
      &::after {
        content: '';
        display: block;
        clear: both;
      }
      .left {
        float: left;
        .udn-icon-logo{
          font-size: 36px;
          color: #000;
          transition: transform 288ms ease-in;
          transform: rotate(0deg);
          text-decoration: none;
          line-height: 58px;
          &:hover{
            transform: rotate(16deg);
          }
        }
      }
      .right {
        float: right;
        .menu-web {
          display: none;
          @media (min-width: 768px) {
            display: block;
            .lists {
              text-align: center;
              .list {            
                font-size: 20px;
                line-height: 1.4;
                color: inherit;
                transition: 222ms ease;
                padding: 15px;
                display: inline-block;
                a {
                  color: #465362;
                  text-decoration: none;
                  &:hover {
                    color: #e2e2e2;
                  }
                }
                
              }
            }
          }
          @media screen and (min-width: 1025px){
            display: block;
          }
        }
        .menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #011936;
          color: white;
          z-index: 20;
          transform: all 5s;
          .lists {
            text-align: center;
            .list {
              
              font-size: 20px;
              line-height: 1.4;
              color: inherit;
              transition: 222ms ease;
              border-bottom: 1px solid #465362;;
              padding: 15px;
              a {
                
                color: #465362;
                text-decoration: none;
                
              }

              
            }
          }
        }
        .hamburger, .close {
          // width: 35px;
          // height: 20px;
          color: #465362;
          margin: 5.5px;
          @media (min-width: 768px) {
            display: none;
          }
          @media screen and (min-width: 1025px){
            display: none;
          }
        }
        .close-wrapper {
          text-align: right;
          .close {
            
          }
        }
      }
    }
  }
</style>
