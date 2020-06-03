<template>
  <div class="animation">
    <div style="height: 100vh" class="bodymovin" :ref="aniConf.name"></div>
  </div>
</template>

<script>
import bodymovin from 'lottie-web';

export default {
  name: 'animation',
  data () {
    return {
      animation: null,
      currentDirection: 1,
      intervelNumber: 0
    }
  },
  props: {
    aniConf: {
        type: Object,
        required: true,
        default: function () {
            return {
                name: 'robot',
                data: require('../../public/json/data1.json')
            }
        }
    }
  },
  components: {},
  mounted () {
      console.log(this.props)
      let vm  = this
      let element = vm.$refs[vm.aniConf.name]
      let data = vm.aniConf.data
      
      vm.animation = bodymovin.loadAnimation({
        container: element, // Required
        animationData: data, // Required
        // path: data,
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true // Optional
      })

      this.intervelNumber = setInterval(function(){
        if (vm.currentDirection === 1) {
          vm.currentDirection = -1
          vm.animation.stop()
          vm.animation.setDirection(vm.currentDirection)
          vm.animation.play()
        } else {
          vm.currentDirection = 1
          vm.animation.stop()
          vm.animation.setDirection(vm.currentDirection)
          vm.animation.play()   
        }
      }, 2500)
      console.log(this.intervelNumber)
  },
  destroyed () {
    clearInterval(this.intervelNumber)
  }
}
</script>

<style lang="scss" scoped>
.animation {
  
    .lottie {
      
    }
}
</style>
