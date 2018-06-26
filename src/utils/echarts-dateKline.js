import dayjs from 'dayjs';

const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
const labelFont = 'bold 12px Sans-serif';
export default {
  methods: {
    parseKData: function (array) {
      var item = []
      var results = []
      for (var i = 0; i < array.length; i++) {
        item.push(array[i].dt)
        item.push(array[i].open * 100)
        item.push(array[i].close * 100)
        item.push(array[i].low * 100)
        item.push(array[i].high * 100)
        item.push(array[i].vol * 100)
        results.push(item)
        item = []
      }
      return results
    },
    splitData: function (rawData) {
      var categoryData = [];
      var values = []
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
      }
      return {
        categoryData: categoryData,
        values: values
      };
    },
    setOption: function (data0) {
      var upColor = '#ec0000';
      var upBorderColor = '#8A0000';
      var downColor = '#00da3c';
      var downBorderColor = '#008F28';

      function calculateMA(data0, dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
          }
          result.push(sum / dayCount);
        }
        return result;
      }

      function getVolumes(data0) {
        let data = [];
        for (let i = 0, len = data0.values.length; i < len; i++) {
          data.push(data0.values[i][4])
        }
        return data
      }

      function getOpen(data0) {
        let data = [];
        for (let i = 0, len = data0.values.length; i < len; i++) {
          data.push(data0.values[i][0])
        }
        return data
      }
      var option = {
        animation: true,
        color: colorList,
        tooltip: {
          //   triggerOn: 'none',
          //   transitionDuration: 0,
          //   confine: true,
          //   bordeRadius: 4,
          //   borderWidth: 1,
          //   borderColor: '#333',
          //   backgroundColor: 'rgba(255,255,255,0.9)',
          //   textStyle: {
          //     fontSize: 12,
          //     color: '#333'
          //   }
          show: true,
          trigger: "axis",
          formatter: function (params) {
            var res;
            res = params[0].name;
            res += "<br/> 今开 : " + params[0].data[1] / 100;
            res += "<br/> 收盘 : " + params[0].data[2] / 100;
            res += "<br/>  最低 : " + params[0].data[3] / 100;
            res += "<br/>  最高 : " + params[0].data[4] / 100;
            res += "<br/>  成交量 : " + params[0].data[5] / 10000 + '万';
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
          data: data0.categoryData,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#777'
            }
          },
          axisLabel: {
            formatter: function (value) {
              return dayjs(value).format('YY-M-D');
            }
          },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            show: true
          }
        }, {
          type: 'category',
          gridIndex: 1,
          data: data0.categoryData,
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
          children: [{
            id: 'MA5',
            type: 'text',
            style: {
              fill: colorList[1],
              font: labelFont
            },
            left: 0
          }, {
            id: 'MA10',
            type: 'text',
            style: {
              fill: colorList[2],
              font: labelFont
            },
            left: 'center'
          }, {
            id: 'MA20',
            type: 'text',
            style: {
              fill: colorList[3],
              font: labelFont
            },
            right: 0
          }]
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
                if (getVolumes(data0)[params.dataIndex - 1] > getVolumes(data0)[params.dataIndex]) {
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
          data: getVolumes(data0)
        }, {
          type: 'candlestick',
          name: '日K',
          data: data0.values,
          itemStyle: {
            normal: {
              color: '#ef232a',
              color0: '#14b143',
              borderColor: '#ef232a',
              borderColor0: '#14b143'
            },
            emphasis: {
              color: 'black',
              color0: '#444',
              borderColor: 'black',
              borderColor0: '#444'
            }
          }
        }, {
          name: 'MA5',
          type: 'line',
          data: calculateMA(data0, 5),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        }, {
          name: 'MA10',
          type: 'line',
          data: calculateMA(data0, 10),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        }, {
          name: 'MA20',
          type: 'line',
          data: calculateMA(data0, 20),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        }]
      };
      return option
    }
  }
}
