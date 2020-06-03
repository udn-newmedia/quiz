<template>
    <div class="know-more-wrapper">
        <h3 class="title">你可能會想知道</h3>
        <div class="know-more-content-wrapper">
            <a href="https://udn.com/upf/newmedia/2019_data/digital_privacy/index.html" target="_blank">
            <div class="know-more">
                <div class="content-wrapper">
                    <div class="title-wrapper">
                        
                        <h5 class="subtitle"><span>【專題報導】按讚、打卡、看影音 你的數位隱私保障了嗎？</span></h5>
                    </div>
                </div>
                <div class="photo-wrapper">
                    <div class="photo">
                        <img src="../../public/images/more.jpg" alt="">
                    </div>
                </div>
            </div></a>
            <a href="https://udn.com/upf/newmedia/2019_data/digital_privacy/government/index.html" target="_blank">
            <div class="know-more">
                <div class="content-wrapper">
                    <div class="title-wrapper">
                        <h5 class="subtitle"><span>政府就是洩漏個資的兇手 數位人權誰來把關？</span></h5>
                    </div>
                </div>
                <div class="photo-wrapper">
                    <div class="photo">
                        <img src="../../public/images/more2.jpg" alt="">
                    </div>
                </div>
            </div></a>
        </div>
    </div>
</template>
<script>
export default {
  name: 'know-mor',
  data () {
    return {

    }
  },
  props: {

  },
  components: {

  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.know-more-wrapper {
    h3 {
        margin-bottom: 30px;
    }
    a {
        text-decoration: none;
    }
    .know-more-content-wrapper {
        border-radius: 5px;
            background-color: rgba(#465362, 0.5);
        .know-more {
            box-sizing: border-box;
            text-align: center;
            padding: 30px 25px;
            position: relative;
            @media (min-width: 768px) {
                &::after {
                    content: '';
                    display: block;
                    clear: both;
                }
            }
            @media screen and (min-width: 1024px) {
                
            }
            .content-wrapper {
                @media (min-width: 768px) {
                    width: 50%;
                    float: right;
                    text-align: left;

                }
                @media screen and (min-width: 1024px) {
                    
                }
                .title-wrapper {
                    @media (min-width: 768px) {
                        vertical-align: middle;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        margin: 0 30px;
                        font-size: 18px;
                    }
                    @media screen and (min-width: 1024px) {
                        font-size: 21px;
                    }
                    .title {
                        margin-bottom: 9px;
                        color: #e2e2e2;
                        
                    }
                    .subtitle {
                        line-height: 1.5;
                        color: #9f9f9f;
                        margin-bottom: 36px;
                        text-align: left;
                        span {
                            border-bottom: solid 1px #9f9f9f;
                        }
                    }
                } 
            }
            .photo-wrapper {
                @media (min-width: 768px) {
                    width: 50%;
                    float: left;
                }
                @media screen and (min-width: 1024px) {
                    
                }
                .photo {
                    img {
                        width: 100%;
                    }
                }
            }
            
        }
    }
}
</style>

