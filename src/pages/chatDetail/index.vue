<template>
    <div class="stock_info">
        <div>
            <div class="stock_msg" :class="{'font_red': stock.riseAndFallAmount>=0,'font_green': stock.riseAndFallAmount<0}">
                <span class="item stock_nMatch">{{stock.nMatch}}</span>
                <span class="item">
                    <span style="position:absolute">{{stock.riseAndFallAmount}}</span>
                    <span>{{stock.riseAndFallRate}}%</span>
                </span>
                <span class="item stock_name">
                    <span>{{stock.shrNm}}</span>
                    <span>{{stock.shrCd}}</span>
                </span>
            </div>
            <div class="flex-cell flex-row item font_gray">
                <span class="flex-cell flex-row item">今开</span>
                <span class="flex-cell flex-row item">昨收</span>
                <span class="flex-cell flex-row item">最高</span>
                <span class="flex-cell flex-row item">最低</span>
            </div>
            <div class="flex-cell flex-row item fb_5">
                <span class="flex-cell flex-row item">{{stock.nOpen}}</span>
                <span class="flex-cell flex-row item">{{stock.nPreClose}}</span>
                <span class="flex-cell flex-row item">{{stock.highestPrice}}</span>
                <span class="flex-cell flex-row item">{{stock.lowestPrice}}</span>
            </div>
            <div class="flex-cell flex-row item font_gray">
                <span class="flex-cell flex-row item">成交额</span>
                <span class="flex-cell flex-row item">收益率</span>
                <span class="flex-cell flex-row item">市盈率</span>
                <span class="flex-cell flex-row item">总市值</span>
            </div>
            <div class="flex-cell flex-row item fb_5">
                <span class="flex-cell flex-row item">{{stock.iTurnover|formatVolumn}}</span>
                <span class="flex-cell flex-row item">{{stock.tun|formatSyl}}</span>
                <span class="flex-cell flex-row item">{{stock.pe|formatSyl}}</span>
                <span class="flex-cell flex-row item">{{stock.mktc|formatVolumn}}</span>
            </div>
            <transition name="fade">
                <div v-if="detailShow">
                    <div class="flex-cell flex-row item font_gray">
                        <span class="flex-cell flex-row item">振幅</span>
                        <span class="flex-cell flex-row item">总股数</span>
                        <span class="flex-cell flex-row item">市净率</span>
                        <span class="flex-cell flex-row item">均价</span>
                    </div>
                    <div class="flex-cell flex-row item fb_5">
                        <span class="flex-cell flex-row item">{{stock.amplitude}}</span>
                        <span class="flex-cell flex-row item">{{stock.total|formatVolumn}}</span>
                        <span class="flex-cell flex-row item">{{stock.ps|formatSyl}}</span>
                        <span class="flex-cell flex-row item">{{stock.priceAvg}}</span>
                    </div>
                    <div class="flex-cell flex-row item font_gray">
                        <span class="flex-cell flex-row item">成交量</span>
                        <span class="flex-cell flex-row item">涨停</span>
                        <span class="flex-cell flex-row item">跌停</span>
                        <span class="flex-cell flex-row item">流通市值</span>
                    </div>
                    <div class="flex-cell flex-row item fb_5">
                        <span class="flex-cell flex-row item">{{stock.ivolume|formatVolumn}}</span>
                        <span class="flex-cell flex-row item">{{stock.high}}</span>
                        <span class="flex-cell flex-row item">{{stock.low}}</span>
                        <span class="flex-cell flex-row item">{{stock.tfc|formatVolumn}}</span>
                    </div>
                </div>
            </transition>
            <div v-if="!detailShow" @click="detailShow = !detailShow" class="stock_detail">▼</div>
            <div v-if="detailShow" @click="detailShow = !detailShow" class="stock_detail">▲</div>
        </div>
        <div class="container Kline_scope">
            <div class="tab_title fb">
                <div :class="KlineTab==index?'tabselected':'tab'" v-for="(item, index) in KlineTabs" :key="index" @click="getKline(index)">{{item}}</div>
            </div>
            <ec-canvas v-if="canvas&&KlineTab==0" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar0" :ec="ec"></ec-canvas>
            <ec-canvas v-if="canvas&&KlineTab==4" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar1" :ec="ec4"></ec-canvas>
            <ec-canvas v-if="canvas&&KlineTab==1" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar2" :ec="ec1"></ec-canvas>
            <ec-canvas v-if="canvas&&KlineTab==2" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar3" :ec="ec2"></ec-canvas>
            <ec-canvas v-if="canvas&&KlineTab==3" class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar4" :ec="ec3"></ec-canvas>
            <div v-show="!canvas&&KlineTab==0" id="timeChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-show="!canvas&&KlineTab==1" id="fiveDayChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-show="!canvas&&KlineTab==2" id="dailyChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-show="!canvas&&KlineTab==3" id="weekChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
            <div v-show="!canvas&&KlineTab==4" id="mouthChart" :style="'width:'+screenWidth+'px;height:'+screenHeigth+'px'"></div>
        </div>
        <div class="container news_List">
            <div class="tab_title fb">
                <div :class="lineNum==index?'tabselected':'tab'" v-for="(item, index) in newsTabs" :key="index" @click="getNews(index)">{{item}}</div>
            </div>
            <div v-if="lineNum==0||lineNum==2||lineNum==3">
                <div v-if="news && news.length == 0" class="news-none">
                    暂无相关内容
                </div>
                <div v-else class="news-list">
                    <div class="list" ref="newsList">
                        <div class="list-item" v-for="(item, index) in news" :key="index" v-if="type==='A'" @click="newsDetail(item)">
                            <div class="item-title" :style="{width: newsTitle}">{{item.title}}</div>
                            <div v-if="item.pic" class="image-wrapper">
                                <img class="item-image" :src="item.pic" :alt="item.title">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="lineNum==4">
                <div class="stockSummary_li">
                    <span>公司名称</span>
                    <span class="stockSummary_span">{{stockSummary.name}}</span>
                </div>
                <div class="stockSummary_li">
                    <span>上市日期</span>
                    <span class="stockSummary_span">{{stockSummary.ipoDate}}</span>
                </div>
                <div class="stockSummary_li">
                    <span>发行价格</span>
                    <span class="stockSummary_span">{{stockSummary.pubPrice}}</span>
                </div>
                <div class="stockSummary_li">
                    <span>发行数量</span>
                    <span class="stockSummary_span">{{stockSummary.pubAmt}}</span>
                </div>
                <div class="stockSummary_li">
                    <span>每手股数</span>
                    <span class="stockSummary_span">100</span>
                </div>
            </div>
            <div v-if="lineNum==1">
                <fundCharts></fundCharts>
            </div>
        </div>
    </div>
</template>
<script>
import Kline from '../../services/KlineService'
import parserDate from '../../utils/echarts-dateKline'
import store from '../../vuex/store'
import fundCharts from '../../components/fundCharts'
import Util from '../../utils/util'
import timeDate from '../../utils/echarts-timeKline'

export default {
    name: "chatDetail",
    data () {
        return {
            ec: {
                options: '',
            },
            ec1: {
                options: '',
            },
            ec2: {
                options: '',
            },
            ec3: {
                options: '',
            },
            ec4: {
                options: '',
            },
            KlineService: new Kline,
            param: {
                code: window ? window.localStorage.getItem('code') : wx.getStorageSync('code'),
                name: window ? window.localStorage.getItem('name') : wx.getStorageSync('name')
            },
            pageParam: {
                code: window ? window.localStorage.getItem('code') : wx.getStorageSync('code'),
                page: 1,
                count: 10
            },
            update: store.state.stock.code,
            canvas: false,
            stock: {},
            news: [],
            lineNum: 0,
            type: 'A',
            Kline: '',
            KlineTab: 0,
            screenWidth: 0,
            screenHeigth: 0,
            newsTitle: '70%',
            detailShow: false,
            stockSummary: {},
            stockNews: [],
            stockNotices: [],
            stockResearch: [],
            KlineTabs: ['分时', '五日', '日线', '周线', '月线'],
            newsTabs: ['新闻', '资金', '公告', '研报', '简况']
        }
    },
    components: {
        'fundCharts': fundCharts
    },
    methods: {
        getStockMsg () {
            //this.service.navigatePageTo(this.router + '/pages/stockDetail/main')
        },
        async evaluated () {
            this.param.code = window ? window.localStorage.getItem('code') : wx.getStorageSync('code');
            this.param.name = window ? window.localStorage.getItem('name') : wx.getStorageSync('name');
        },
        stockMsg () {
            Promise.all([
                this.KlineService.stockRealTime(this.service, this.param),
                this.KlineService.getStockNews(this.service, this.param),
            ]).then(data => {
                this.stock = data[0].data.message;
                this.news = data[1].data.message;
            })
        },
        KlineMsg () {
            //异步请求K线
            this.KlineService.getTimeDate(this.service, this.param).then(data => {
                this.echart(data, 'timeChart');
            });
            this.KlineService.getDailyDate(this.service, this.param).then(data => {
                this.echart(data, 'dailyChart');
            });
            this.KlineService.getWeekData(this.service, this.param).then(data => {
                this.echart(data, 'weekChart');
            });
            this.KlineService.getMouthDate(this.service, this.param).then(data => {
                this.echart(data, 'mouthChart');
            });
            this.KlineService.getFiveData(this.service, this.param).then(data => {
                this.echart(data, 'fiveDayChart');
            })
            //异步请求资讯
            this.KlineService.getStockNews(this.service, this.pageParam).then(data => {
                this.stockNews = data.data.message;
            }).catch(err => { })
            this.KlineService.getStockNotices(this.service, this.pageParam).then(data => {
                this.stockNotices = data.data.message;
            }).catch(err => { })
            this.KlineService.getResearch(this.service, this.pageParam).then(data => {
                this.stockResearch = data.data.message;
            }).catch(err => { })
            this.KlineService.getStockSummary(this.service, this.param).then(data => {
                this.stockSummary = data.data.message;
            })
        },
        echart (data, domId) {
            if (window) {
                if (domId == 'timeChart') {
                    var KlineCanvas = echarts.init(document.getElementById(domId))
                    KlineCanvas.setOption(timeDate.setOption(timeDate.parserDataDaily(data.data.message)))
                } else if (domId == 'fiveDayChart') {
                    var KlineCanvas = echarts.init(document.getElementById(domId))
                    KlineCanvas.setOption(timeDate.setOption(timeDate.parserDataWeek(data.data.message)))
                } else {
                    var KlineCanvas = echarts.init(document.getElementById(domId))
                    KlineCanvas.setOption(parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message))))
                }
            } else {
                this.canvas = true;
                switch (domId) {
                    case 'timeChart':
                        this.ec.options = timeDate.setOption(timeDate.parserDataDaily(data.data.message))
                        break;
                    case 'fiveDayChart':
                        this.ec1.options = timeDate.setOption(timeDate.parserDataWeek(data.data.message))
                        break;
                    case 'dailyChart':
                        this.ec2.options = parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message)))
                        break;
                    case 'weekChart':
                        this.ec3.options = parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message)))
                        break;
                    case 'mouthChart':
                        this.ec4.options = parserDate.methods.setOption(parserDate.methods.splitData(parserDate.methods.parseKData(data.data.message)))
                        break;
                    default:
                        break;
                }
            }
        },
        newsDetail (item) {
            store.commit('newsDetail', item, this.lineNum)
            this.service.navigatePageTo(this.router + '/pages/newsDetail/main')
        },
        async getNews (id) {
            this.lineNum = id;
            switch (id) {
                case 0:
                    this.news = this.stockNews;
                    this.newsTitle = '70%';
                    break;
                case 1:
                    this.news = this.stockNotices;
                    this.newsTitle = 'auto';
                    break;
                case 2:
                    this.news = this.stockResearch;
                    this.newsTitle = 'auto';
                    break;
                default:
                    break;
            }
        },
        getKline (id, domId) {
            this.KlineTab = id;
        },
        getScreenOptions () {
            this.service.getScreenOption().then(data => {
                this.screenWidth = data.screenWidth - 10;
                this.screenHeigth = 220;
            })
            this.service.scrollTop();
        }
    },
    mounted () {
        this.evaluated().then(data => {
            this.stockMsg();
            this.KlineMsg();
            this.getScreenOptions();
        });
    }
}
</script>
<style>
.Kline_scope {
  z-index: 1;
}
.font_red {
  color: red;
}
.font_green {
  color: green;
}
.font_gray {
  color: #666;
}
.fb_5 {
  font-weight: 500;
}
.stock_msg {
  text-align: center;
}
ec-canvas {
  width: 400px;
  height: 240px;
}
.news_List {
  position: relative;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  box-sizing: border-box;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
  overflow-x: hidden;
  /* font-size: 60px; */
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
.flex-cell {
  flex: 1;
}
.item {
  margin: 2px;
}
.tab_title {
  text-align: center;
  width: auto;
  border-bottom: 1px solid #999;
  padding: 5px;
  margin-bottom: 10px;
  border-top: 1px solid #999;
  font-family: cursive;
}
.tab {
  display: inline;
  margin: 10px 15px;
}
.tabselected {
  display: inline;
  margin: 10px 15px;
  color: red;
}
.list {
  padding: 0;
}
.list-item {
  height: 70px;
  margin: 0 15px;
  border-bottom: 1px solid #f5f5f5;
  width: 90%;
  padding-bottom: 10px;
}
.item-title {
  display: inline-block;
  padding-top: 15px;
  line-height: 20px;
}
.image-wrapper {
  float: right;
  padding-top: 15px;
}
.item-image {
  width: 75px;
  height: 60px;
}
.multipic {
  display: block;
  position: absolute;
  right: 0;
  bottom: 2px;
  width: 40px;
  height: 16px;
  font-size: 12px;
  color: #fff;
  background: #000;
  opacity: 0.7;
  text-align: center;
  line-height: 16px;
}
.news-none {
  text-align: center;
  padding: 30px;
}
.stock_info {
  font-size: 14px;
}
.stock_nMatch {
  font-size: 35px;
}
.stock_name {
  font-size: 18px;
  font-weight: bold;
  position: relative;
  top: -8px;
  left: 22px;
}
.stock_detail {
  width: 100%;
  text-align: center;
}
.stockSummary_li {
  float: left;
  display: block;
  width: 100%;
  padding: 20px;
}
.stockSummary_span {
  margin-left: 20px;
}
.circle {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  background: #ffb6c1;
  /* 宽度和高度需要相等 */
  position: relative;
  top: -225px;
  right: -285px;
}
.circle_txt {
  color: red;
  width: 30px;
  position: relative;
  left: 11px;
  top: 5px;
  font-size: 12px;
}
</style>


