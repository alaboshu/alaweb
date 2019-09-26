<template>
  <div class="zk-hudong-lottery-code">
    <div class="slot-machine">
      <img class="back-slot" mode="widthFix" src="data:image/jpeg;base64,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VFnic4VxmpKXtqv8z+8XJHsT/bLr/n4l/wC+zWhotzPLqSK80jLtPDMSOlZFaWhf8hVP90/yrry+rUeKppye66mVaMVTlp0OtFFFFfoh4gUUUUAFFFFABRRRQAUUUUAUtW/5BU/+7/WuNrstW/5BU/8Au/1rja+M4j/3iPp+rPUwPwP1GSyCKMsfwrKeRpGLMcmrt+cRoPU1Qrw4LS56lNaXCiiirNAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKuWlwdwjY5B6VTp0ZxIpHrSauiZK6NitLQv+Qqn+6f5Vm1paF/yFU/3T/Ktsv/3un6o4q/8ADl6HW0UUV+jnhBRRRQAUUUUAFFFFABRRRQBS1b/kFT/7v9a42uy1b/kFT/7v9a42vjOI/wDeI+n6s9TA/A/Up3/3E+tUavX/ANxPrVGvEjserD4QoooqiwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKVPvr9aSlT76/WkI2a0tC/wCQqn+6f5Vm1paF/wAhVP8AdP8AKtsv/wB7p+qOGv8Aw5eh1tFFFfo54QUUUUAFFFFABRRRQAUUUUAUtW/5BU/+7/WuNrstW/5BU/8Au/1rja+M4j/3iPp+rPUwPwP1Kd/9xPrVGr1/9xPrVGvEhserD4QoooqiwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKVPvr9aSlT76/WkI2a0tC/5Cqf7p/lWbWloX/IVT/dP8q2y/8A3un6o4a/8OXodbRRRX6OeEFFFFABRRRQAUUUUAFFFFAFLVv+QVP/ALv9a42uy1b/AJBU/wDu/wBa42vjOI/94j6fqz1MD8D9Snf/AHE+tUavX/3E+tUa8SGx6sPhCiiiqLCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo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">
      <div class="mp-slot">
        <div class="mp-slot-box">
          <div v-for="(item,some) in num" class="slot-group" :key="some" :style="{transform: 'translateY('+transY1+'px)'}">
            <div class="slot-item">{{item}}</div>
          </div>
        </div>

        <div class="mp-slot-box">
          <div v-for="(item,some) in num" class="slot-group" :key="some" :style="{transform: 'translateY('+transY2+'px)'}">
            <div class="slot-item">{{item}}</div>
          </div>
        </div>

        <div class="mp-slot-box">
          <div v-for="(item,some) in num" class="slot-group" :key="some" :style="{transform: 'translateY('+transY3+'px)'}">
            <div class="slot-item">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
    <button @click="start" class="press" :style="{opacity: changeColor}"></button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        height: 95, // 单个数字高度
        len: 10, // 单个项目数字个数
        transY1: 0, // 第一列初始位置
        num1: 3, // 第一列结束数字
        transY2: 0, // 第二列初始位置
        num2: 3, // 第二列结束数字
        transY3: 0, // 第三列初始位置
        num3: 3, // 第三列结束数字
        transY4: 0, // 第四列初始位置
        num4: 3, // 第四列结束数字
        speed: 24, // 速度
        changeColor: 1
      }
    },
    onLoad () {
    },
    onShow () {

    },
    methods: {

      start () {
        this.changeColor = 0.1
        let { isStart, len, height, transY1, transY2, transY3, transY4, speed, num1, num2, num3, num4 } = this
        if (isStart) return
        this.isStart = true
        const totalHeight = height * len
        const sRange = Math.floor(Math.random() * 2 + 2)
        const halfSpeed = speed / 2
        const endDis1 = num1 === 0 ? 10 * height : num1 * height
        const endDis2 = num2 === 0 ? 10 * height : num2 * height
        const endDis3 = num3 === 0 ? 10 * height : num3 * height
        const endDis4 = num4 === 0 ? 10 * height : num4 * height
        let i1 = 1; let i2 = 1; let i3 = 1; let i4 = 1

        this.timer = setInterval(() => {
          if (i1 <= sRange) {
            transY1 -= speed
            if (Math.abs(transY1) > totalHeight) {
              transY1 += totalHeight
              i1++
            }
          } else if (i1 > sRange && i1 < sRange + 2) {
            transY1 -= halfSpeed
            if (Math.abs(transY1) > totalHeight) {
              transY1 += totalHeight
              i1++
            }
          } else {
            if (transY1 === endDis1) return
            let dropSpeed = (endDis1 + transY1) / halfSpeed
            dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed
            transY1 -= dropSpeed
            transY1 = Math.abs(transY1) > endDis1 ? transY1 = -endDis1 : transY1
          }

          this.timer1 = setTimeout(() => {
            if (i2 <= sRange) {
              transY2 -= speed
              if (Math.abs(transY2) > totalHeight) {
                transY2 += totalHeight
                i2++
              }
            } else if (i2 > sRange && i2 < sRange + 2) {
              transY2 -= halfSpeed
              if (Math.abs(transY2) > totalHeight) {
                transY2 += totalHeight
                i2++
              }
            } else {
              if (transY2 === endDis2) return
              let dropSpeed = (endDis2 + transY2) / halfSpeed
              dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed
              transY2 -= dropSpeed
              transY2 = Math.abs(transY2) > endDis2 ? transY2 = -endDis2 : transY2
            }
          }, 200)

          this.timer2 = setTimeout(() => {
            if (i3 <= sRange) {
              transY3 -= speed
              if (Math.abs(transY3) > totalHeight) {
                transY3 += totalHeight
                i3++
              }
            } else if (i3 > sRange && i3 < sRange + 2) {
              transY3 -= halfSpeed
              if (Math.abs(transY3) > totalHeight) {
                transY3 += totalHeight
                i3++
              }
            } else {
              if (transY3 === endDis3) return
              let dropSpeed = (endDis3 + transY3) / halfSpeed
              dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed
              transY3 -= dropSpeed
              transY3 = Math.abs(transY3) > endDis3 ? transY3 = -endDis3 : transY3
            }
          }, 400)

          this.timer3 = setTimeout(() => {
            if (i4 <= sRange) {
              transY4 -= speed
              if (Math.abs(transY4) > totalHeight) {
                transY4 += totalHeight
                i4++
              }
            } else if (i4 > sRange && i4 < sRange + 2) {
              transY4 -= halfSpeed
              if (Math.abs(transY4) > totalHeight) {
                transY4 += totalHeight
                i4++
              }
            } else {
              let dropSpeed = (endDis4 + transY4) / halfSpeed
              if (num4 < 3) {
                dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 0.1 ? 0.1 : dropSpeed
              } else if (num4 < 5 && num4 >= 3) {
                dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 0.3 ? 0.3 : dropSpeed
              } else {
                dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 0.3 ? 0.3 : dropSpeed
              }

              transY4 -= dropSpeed
              transY4 = Math.abs(transY4) > endDis4 ? transY4 = -endDis4 : transY4
              if (Math.abs(transY4) >= endDis4) {
                clearInterval(this.timer)
                clearTimeout(this.timer1)
                clearTimeout(this.timer2)
                clearTimeout(this.timer3)
                this.isStart = false
              }
            }
          }, 600)

          this.transY1 = transY1
          this.transY2 = transY2
          this.transY3 = transY3
          this.transY4 = transY4
        }, 1000 / 60)
        this.changeColor = 1
      },

      reset () {
        this.transY1 = 0
        this.transY2 = 0
        this.transY3 = 0
        this.transY4 = 0
      }
    }
  }
</script>

<style scoped>
  .slot-machine {
  }
  .mp-slot {
    width: 65%;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    padding-top: 65px;
  }
  .back-slot {
    width: 100%;
    position: absolute;
  }
  .press {
    width: 100px;
    height: 80px;
    background-color: rgba(243, 54, 74, 0.6);
    position: fixed;
    left: 140px;
    top: 215px;
    border-radius: 35px;
  }
  .press::after {
    border: none;
  }
  .mp-slot-box {
    width: 80px;
    height: 95px;
    line-height: 95px;
    font-size: 36px;
    font-weight: bold;
    color: #f3364a;
    overflow: hidden;
    text-align: center;
  }
</style>
