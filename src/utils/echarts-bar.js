export default {
  setBarOption(data) {
    function getXData(param) {
      var XData = [];
      for (let i = 0; i < param.length; i++) {
        XData.push(param[i].dt)
      }
      return XData
    }

    function getYData(param) {
      var YData = [];
      for (let i = 0; i < param.length; i++) {
        YData.push((param[i].val / 10000).toFixed(0))
      }
      return YData
    }
    var option = {
      title: {
        text: '最近五日资金流向（单位：万元）',
        x: 'center',
        textStyle: {
          fontSize: '16'
        }
      },
      xAxis: {
        type: 'category',
        data: getXData(data),
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: getYData(data),
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
            // function (params) {
            //   var position;
            //   if (getYData(data)[params.dataIndex] < 0) {
            //     position = 'bottom';
            //   } else {
            //     position = 'top';
            //   }
            //   return position;
            // }
          }
        },
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList;
              if (getYData(data)[params.dataIndex] < 0) {
                colorList = '#14b143';
              } else {
                colorList = '#ef232a';
              }
              return colorList;
            }
          }
        }
      }]
    };
    return option;
  }
}
