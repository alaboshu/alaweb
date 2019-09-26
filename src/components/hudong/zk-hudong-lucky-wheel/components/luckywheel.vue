<template>
  <div class="container">
    <div class="lucky-wheel">
      <div class="lucky-title"></div>
      <div class="wheel-main">
        <div class="wheel-pointer-box">
          <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
        </div>
        <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
          <div class="prize-list">
            <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
              <div class="prize-pic">
                <img :src="item.icon">
              </div>
              <div class="prize-count" v-if="item.count">
                {{item.count}}
              </div>
              <div class="prize-type">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-bg"></div>
      <div class="bg-p"></div>
      <div class="content">
        <div class="lottery_ticket">今日免费抽奖次数： {{ lottery_ticket}}</div>
      </div>
      <div class="tip">
        <div class="tip-title">活动规则</div>
        <div class="tip-content">
          <p> 1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。 2.金币抽奖，每10个金豆可兑换一次大转盘机会。</p>
          <p> 2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
          <p> 3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
        </div>
      </div>
    </div>
    <div class="toast" v-show="toast_control">
      <div class="toast-container">
        <img :src="toast_pictrue" class="toast-picture">
        <div class="close" @click="close_toast()"></div>
        <div class="toast-title">
          {{toast_title}}
        </div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="close_toast">关闭</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" v-show="toast_control"></div>
  </div>
</template>
<script>
  export default {
    props: {
      widget: {}
    },
    data () {
      return {
        easejoy_bean: 0,
        lottery_ticket: 0,
        prize_list: [
          {
            icon: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39eba303dda07b8907705.png',
            count: 10,
            name: '积分',
            isPrize: 1
          },
          {
            icon: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39f8f303dda07b891ac71.png',
            count: 5,
            name: '积分',
            isPrize: 1
          },
          {
            icon: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39eba303dda07b8907703.png',
            count: 10,
            name: '元购物券',
            isPrize: 1
          },
          {
            icon: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39eba303dda07b8907704.png',
            count: 5,
            name: '牛牛币',
            isPrize: 1
          },
          {
            icon: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39eba303dda07b8907700.png',
            count: '九',
            name: '优惠券',
            isPrize: 1
          },
          {
            icon: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39eba303dda07b8907705.png',
            count: '八',
            name: '折优惠券',
            isPrize: 1
          },
          {
            icon: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39eba303dda07b89076ff.png',
            count: 0,
            name: '未中奖',
            isPrize: 0
          },
          {
            icon: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39eba303dda07b8907705.png',
            count: 100,
            name: '积分',
            isPrize: 1
          }
        ],
        toast_control: false,
        hasPrize: false,
        start_rotating_degree: 0,
        rotate_angle: 0,
        start_rotating_degree_pointer: 0,
        rotate_angle_pointer: 0,
        rotate_transition: 'transform 6s ease-in-out',
        rotate_transition_pointer: 'transform 12s ease-in-out',
        click_flag: true,
        index: 0
      }
    },
    mounted () {
      this.init()
    },
    created () {
      this.init_prize_list()
    },
    computed: {
      toast_title () {
        return this.hasPrize
          ? '恭喜您，获得' + this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name
          : '未中奖'
      },
      toast_pictrue () {
        return this.hasPrize
          ? 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-24/5ce7a8fa4c4b4b1a08b228ff.png'
          : 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-24/5ce7a9124c4b4b1a08b26bce.png'
      }
    },
    methods: {
      async  init () {

      },
      init_prize_list (list) { },
      rotate_handle () {
        this.index = 0
        this.rotating()
      },
      rotating () {
        if (!this.click_flag) return
        var type = 0
        var duringtime = 5
        // var randomRumber = Math.floor(Math.random() * 7)
        var resultIndex = this.index
        var resultAngle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]
        var randCircle = 6
        this.click_flag = false
        if (type === 0) {
          var rotateAngle =
            this.start_rotating_degree +
            randCircle * 360 +
            resultAngle[resultIndex] -
            this.start_rotating_degree % 360
          this.start_rotating_degree = rotateAngle
          this.rotate_angle = 'rotate(' + rotateAngle + 'deg)'
          var that = this
          setTimeout(function () {
            that.click_flag = true
            that.game_over()
          }, duringtime * 1000 + 1500)
        } else {
          //
        }
      },
      game_over () {
        this.toast_control = true
        this.hasPrize = this.prize_list[this.index].isPrize
      },
      // 关闭弹窗
      close_toast () {
        this.toast_control = false
      }
    }
  }
</script>
<style scoped>
  .container {
    width: 100%;
  }
  .lucky-wheel {
    width: 100%;
    height: 31.5625rem;
    background: rgb(252, 207, 133)
      url("https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39645303dda07b88e8524.png")
      no-repeat center bottom;
    background-size: 100%;
    padding-top: 1.5625rem;
  }
  .lucky-title {
    width: 100%;
    height: 8.125rem;
    background: url("https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd395db303dda07b88e0989.png")
      no-repeat center top;
    background-size: 100%;
  }
  .wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .wheel-bg {
    width: 18.4375rem;
    height: 18.4375rem;
    background: url("https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd396b4303dda07b88f1f9c.png")
      no-repeat center top;
    background-size: 100%;
    color: #fff;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    transition: transform 3s ease;
  }
  .wheel-pointer-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -60%);
    width: 5.3125rem;
    height: 5.3125rem;
  }
  .wheel-pointer {
    width: 5.3125rem;
    height: 5.3125rem;
    background: url("https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-09/5cd39919303dda07b88ff83d.png")
      no-repeat center top;
    background-size: 100%;
    transform-origin: center 60%;
  }
  .wheel-bg div {
    text-align: center;
  }
  .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .prize-list .prize-item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .prize-list .prize-item:first-child {
    top: 0;
    left: 8.3125rem;
    transform: rotate(20deg);
  }
  .prize-list .prize-item:nth-child(2) {
    top: 2.8rem;
    left: 10.8rem;
    transform: rotate(67deg);
  }
  .prize-list .prize-item:nth-child(3) {
    top: 6.4rem;
    left: 10.6rem;
    transform: rotate(-250deg);
  }
  .prize-list .prize-item:nth-child(4) {
    top: 9rem;
    left: 8.2125rem;
    transform: rotate(-210deg);
  }
  .prize-list .prize-item:nth-child(5) {
    top: 9.2125rem;
    left: 4.4rem;
    transform: rotate(-160deg);
  }
  .prize-list .prize-item:nth-child(6) {
    top: 6.3875rem;
    left: 1.9rem;
    transform: rotate(-111deg);
  }
  .prize-list .prize-item:nth-child(7) {
    top: 2.8rem;
    left: 1.8125rem;
    transform: rotate(-69deg);
  }
  .prize-list .prize-item:nth-child(8) {
    top: 0;
    left: 4.5rem;
    transform: rotate(-20deg);
  }
  .prize-item {
    width: 5.875rem;
    height: 9rem;
  }

  .prize-pic img {
    width: 4.0625rem;
    height: 2.5rem;
    margin-top: 1.5625rem;
  }
  .prize-count {
    font-size: 12px;
  }
  .prize-type {
    font-size: 10px;
  }
  .main {
    position: relative;
    width: 100%;
    min-height: 14.25rem;
    background: rgb(243, 109, 86);
    padding-bottom: 1.6875rem;
  }
  .main-bg {
    width: 100%;
    height: 6.5625rem;
    position: absolute;
    top: -3.4375rem;
    left: 0;
    background: url("https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-24/5ce7aadb4c4b4b1a08b3772a.png")
      no-repeat center top;
    background-size: 100%;
  }
  .bg-p {
    width: 100%;
    height: 2.95rem;
    background: rgb(252, 207, 133);
  }
  .content {
    position: absolute;
    top: 0.175rem;
    left: 0;
    background: rgb(243, 109, 86);
    width: 100%;
    height: 5.1875rem;
    font-size: 1.125rem;
    color: #ffeb39;
    padding-left: 6.75rem;
  }
  .content div {
    text-align: left;
  }
  .tip {
    position: relative;
    margin: 2.5rem auto 0;
    width: 17.5rem;
    border: 1px solid #fbc27f;
  }
  .tip-title {
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 1rem;
    color: #fccc6e;
    background: rgb(243, 109, 86);
    padding: 0.3125rem 0.625rem;
  }
  .tip-content {
    padding: 1.5625rem 0.625rem;
    font-size: 13px;
    color: #fff8c5;
    line-height: 1.5;
  }
  .toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
    width: 100%;
    height: 100%;
  }
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20000;
    transform: translate(-50%, -50%);
    width: 15.4375rem;
    background: #fff;
    border-radius: 0.3125rem;
    padding: 0.3125rem;
    background-color: rgb(252, 244, 224);
  }
  .toast-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dotted #fccc6e;
  }
  .toast-picture {
    position: absolute;
    top: -6.5rem;
    left: -1.5rem;
    width: 18.75rem;
    height: 8.5625rem;
  }
  .toast-pictrue-change {
    position: absolute;
    top: -1.5rem;
    left: -1.375rem;
    width: 17.5rem;
    height: 3.125rem;
  }
  .toast-title {
    padding: 2.8125rem 0;
    font-size: 18px;
    color: #fc7939;
    text-align: center;
  }
  .toast-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.9375rem;
  }
  .toast-btn div {
    background-image: -moz-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );

    background-image: -ms-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    background-image: -webkit-linear-gradient(
      -18deg,
      rgb(242, 148, 85) 0%,
      rgb(252, 124, 88) 51%,
      rgb(252, 124, 88) 99%
    );
    box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
    width: 4.6875rem;
    height: 1.875rem;
    border-radius: 1.875rem;
    text-align: center;
    line-height: 1.875rem;
    color: #fff;
  }
  .close {
    position: absolute;
    top: -0.9375rem;
    right: -0.9375rem;
    width: 2rem;
    height: 2rem;
    background: url("https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-24/5ce7aac44c4b4b1a08b312e1.png")
      no-repeat center top;
    background-size: 100%;
  }
</style>

