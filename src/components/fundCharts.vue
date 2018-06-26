<template>
    <div class="chart_area">
        <div v-if="!canvas" id="capitalFlows" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
        <div v-if="!canvas" id="capitalFlowsMain" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
        <div v-if="canvas">小程序内组件形式无法画出echarts</div>
        <ec-canvas v-if="canvas" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar5" :ec="ec5"></ec-canvas>
        <ec-canvas v-if="canvas" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar6" :ec="ec6"></ec-canvas>
    </div>
</template>
<script>
import Kline from '../services/KlineService'
import pieOptions from '../utils/echarts-pie'
import barOptions from '../utils/echarts-bar'
export default {
    data () {
        return {
            ec5: {
                options: '',
            },
            ec6: {
                options: '',
            },
            KlineService: new Kline,
            param: {
                code: window ? window.localStorage.getItem('code') : wx.getStorageSync('code'),
                name: window ? window.localStorage.getItem('name') : wx.getStorageSync('name')
            },
            screenWidth: 0,
            screenHeigth: 0,
            canvas: false
        }
    },
    methods: {
        async evaluated () {
            this.param.code = window ? window.localStorage.getItem('code') : wx.getStorageSync('code');
            this.param.name = window ? window.localStorage.getItem('name') : wx.getStorageSync('name');
            this.init();
        },
        init () {
            this.KlineService.getCapitalFlows(this.service, this.param).then(data => {
                if (window) {
                    var fundCanvas = echarts.init(document.getElementById('capitalFlows'))
                    fundCanvas.setOption(pieOptions.setPieOption(data.data.message))
                } else {
                    this.canvas = true;
                    this.ec5.options = pieOptions.setPieOption(data.data.message)
                }
            })
            this.KlineService.getCapitalFlowsMain(this.service, this.param).then(data => {
                if (window) {
                    var fundMainCanvas = echarts.init(document.getElementById('capitalFlowsMain'))
                    fundMainCanvas.setOption(barOptions.setBarOption(data.data.message))
                } else {
                    this.canvas = true;
                    this.ec6.options = barOptions.setBarOption(data.data.message)
                }
            })
        },
        getScreenOptions () {
            this.service.getScreenOption().then(data => {
                this.screenWidth = data.screenWidth - 10;
                this.screenHeigth = 220;
            })
            this.service.scrollTop();
        },
    },
    mounted () {
        this.evaluated().then(data => {
            this.getScreenOptions();
        })
    }
}
</script>
<style>
.chart_area {
  margin-top: 10px;
}
ec-canvas {
  width: 400px;
  height: 240px;
}
</style>


