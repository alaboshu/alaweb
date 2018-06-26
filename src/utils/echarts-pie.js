import dayjs from 'dayjs';

export default {
  setPieOption(data) {
    var option = {
      title: {
        text: '资金分布',
        x: 'center',
        textStyle: {
          fontSize: '16'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {d}%"
      },
      //   legend: {
      //     orient: 'vertical',
      //     x: 'left',
      //     data: ['主户流入', '主户流出', '散户流入', '散户流出']
      //   },
      series: [{
        type: 'pie',
        radius: ['30%', '60%'],
        avoidLabelOverlap: false,
        name: '资金分布',
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'bold'
            }
          }
        },
        color: ['#FF0000', '#008000', '#FFA500', '#90EE90'],
        labelLine: {
          normal: {
            show: true
          }
        },
        data: [{
            value: data.min,
            name: '主户流入'
          },
          {
            value: data.mout,
            name: '主户流出'
          },
          {
            value: data.rin,
            name: '散户流入'
          },
          {
            value: data.rout,
            name: '散户流出'
          }
        ]
      }]
    };
    return option
  }
}
