import dayjs from 'dayjs';
import echarts from 'echarts';

export default {
  parserDataDaily(message) {
    var array = message.shares
    var item = []
    var results = []
    var average = []
    var volume = []
    for (var i = 0; i < array.length; i++) {
      item.push(array[i].price * 100)
      results.push(array[i].dt.substring(0, 5))
      average.push(array[i].amount / array[i].volume * 100)
      if (i > 0) {
        volume.push(Math.abs(array[i].volume - array[i - 1].volume) * 100)
      } else {
        volume.push(Math.abs(array[i].volume) * 100)
      }

    }
    return {
      data: item,
      date: results,
      average: average,
      volume: volume,
      min: message.min * 100,
      max: message.max * 100,
      closeDaily: message.close * 100
    }
  },
  parserDataWeek(message) {
    var array = message.shares
    var item = []
    var results = []
    var average = []
    var volume = []
    for (var i = 0; i < array.length; i++) {
      item.push(array[i].price * 100)
      results.push(dayjs(array[i].dt).format('M-D'))
      average.push(array[i].amount / array[i].volume * 100)
      if (i > 0) {
        if (Math.abs(array[i].volume - array[i - 1].volume) * 100 < Math.abs(array[1].volume) * 1000) {
          volume.push(Math.abs(array[i].volume - array[i - 1].volume) * 100)
        }
      } else {
        volume.push(Math.abs(array[i].volume) * 100)
      }
    }
    return {
      data: item,
      date: results,
      average: average,
      volume: volume,
      min: message.min * 100,
      max: message.max * 100,
      closeDaily: message.close * 100
    }
  },
  setOption(data) {
    let option = {
      tooltip: {
        // triggerOn: 'none',
        // transitionDuration: 0,
        // confine: true,
        // bordeRadius: 4,
        // borderWidth: 1,
        // borderColor: '#333',
        // backgroundColor: 'rgba(255,255,255,0.9)',
        // textStyle: {
        //   fontSize: 12,
        //   color: '#333'
        // }
        show: true,
        trigger: "axis",
        formatter: function (params) {
          var res;
          if (params.length !== 1) {
            res = dayjs().format("YYYY-MM-DD");
            res += "<br/> 时间 : " + params[0].axisValue;
            res += "<br/> 价格 : " + params[0].value / 100;
            // res += "<br/>  涨跌 : " + params[0].value[2];
            // res += "<br/>  涨跌幅 : " + params[0].value[3] + "%";
            res += "<br/>  成交量 : " + params[2].value / 100 + '手';
          } else {
            res = dayjs().format("YYYY-MM-DD");
            res += "<br/> 时间 : " + "--";
            res += "<br/> 价格 : " + "--";
            // res += "<br/>  涨跌 : " + "--";
            // res += "<br/>  涨跌幅 : " + "--";
            res += "<br/>  成交量 : " + '--';
          }
          return res;
        }
      },
      axisPointer: {
        link: [{
          xAxisIndex: [0, 1]
        }]
      },
      dataZoom: [{
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 0,
        end: 100,
        height: 20
      }],
      xAxis: [{
        type: 'category',
        data: data.date,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#777'
          }
        },
        // axisLabel: {
        //   formatter: function (value) {
        //     return echarts.format.formatTime('HH:mm', value);
        //   }
        // },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          show: true
        }
      }, {
        type: 'category',
        gridIndex: 1,
        data: data.date,
        scale: true,
        boundaryGap: false,
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#777'
          }
        },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
      }],
      yAxis: [{
        scale: true,
        splitNumber: 2,
        axisLine: {
          lineStyle: {
            color: '#777'
          }
        },
        splitLine: {
          show: true
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: true,
          formatter: '{value}\n'
        }
      }, {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }],
      grid: [{
        left: 20,
        right: 20,
        top: 10,
        height: 120
      }, {
        left: 20,
        right: 20,
        height: 40,
        top: 160
      }],
      graphic: [{
        type: 'group',
        left: 'center',
        top: 70,
        width: 200,
        bounding: 'raw',
      }],
      series: [{
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList;
              if (data.volume[0] > data.closeDaily) {
                colorList = '#14b143';
              } else {
                colorList = '#ef232a';
              }
              if (data.volume[params.dataIndex - 1] > data.volume[params.dataIndex]) {
                colorList = '#14b143';
              } else {
                colorList = '#ef232a';
              }
              return colorList;
            }
          },
          emphasis: {
            color: '#140'
          }
        },
        data: data.volume
      }, {
        name: 'price',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: '#3b98d3'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#d5e1f2'
            }, {
              offset: 1,
              color: '#3b98d3'
            }])
          }
        },
        lineStyle: {
          normal: {
            width: 1
          }
        },
        data: data.data
      }, {
        name: 'average',
        data: data.average,
        type: 'line',
        smooth: true,
        color: '#F4A460',
        lineStyle: {
          normal: {
            width: 1
          }
        },
        symbol: 'none'
      }]
    }
    return option
  }
}
