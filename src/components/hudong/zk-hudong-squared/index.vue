<template>
  <div class="zk-hondong-squared">
    <div class="rotary-table">
      <div class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': index==current}]" :key="index">
        {{award.name}}
      </div>
      <div class="start-btn" @click="start">开始</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'raffle',
    data () {
      return {
        current: 0,
        awards: [
          { id: 1, name: '空' },
          { id: 2, name: '眼镜' },
          { id: 3, name: '包' },
          { id: 4, name: '笨驴' },
          { id: 5, name: '书' },
          { id: 6, name: '手链' },
          { id: 7, name: '美女' },
          { id: 8, name: 'iphone' }
        ],
        speed: 200,
        diff: 15,
        award: {},
        time: 0
      }
    },
    methods: {
      start () {
        // 开始抽奖
        this.drawAward()
        this.time = Date.now()
        this.speed = 200
        this.diff = 15
      },
      drawAward () {
        // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
        setTimeout(() => {
          this.award = {
            id: '4',
            name: '笨驴'
          }
        }, 1000)
        this.move()
      },
      move () {
        window.timeout = setTimeout(() => {
          this.current++
          if (this.current > 7) {
            this.current = 0
          }
          if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
            this.speed += this.diff
            if ((Date.now() - this.time) / 1000 > 4 && Number(this.award.id) === Number(this.awards[this.current].id)) {
              clearTimeout(window.timeout)
              setTimeout(() => {
                alert('恭喜你，抽中了' + this.award.name)
              }, 0)
              return
            }
          } else {
            this.speed -= this.diff
          }
          this.move()
        }, this.speed)
      }
    }
  }
</script>

<style  lang="scss">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    outline: none;
  }
  .rotary-table {
    width: 340px;
    height: 349px;
    position: relative;
    margin: auto;
    background-color: antiquewhite;
    .award {
      width: 90px;
      height: 96px;
      line-height: 96px;
      text-align: center;
      float: left;
      position: absolute;
      overflow: hidden;
      background-color: aquamarine;
      &.active {
        background-color: darkgoldenrod;
      }
      &.award0 {
        top: 21px;
        left: 21px;
      }
      &.award1 {
        top: 21px;
        left: 125px;
      }
      &.award2 {
        top: 21px;
        right: 22px;
      }
      &.award3 {
        top: 126px;
        right: 22px;
      }
      &.award4 {
        bottom: 22.5px;
        right: 22px;
      }
      &.award5 {
        bottom: 22.5px;
        right: 125.5px;
      }
      &.award6 {
        bottom: 22.5px;
        left: 21px;
      }
      &.award7 {
        top: 126px;
        left: 21px;
      }
    }
    .start-btn {
      position: absolute;
      top: 125px;
      left: 124px;
      width: 90px;
      height: 96px;
      line-height: 90px;
      text-align: center;
      background-color: coral;
    }
  }
</style>
