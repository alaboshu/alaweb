import Vue from 'vue';
import numeral from 'numeral';
import moment from 'dayjs'

Vue.filter('strToArr', function (value) {
  if (!value) {
    return '';
  } else {
    return value.split(',');
  }
})

Vue.filter('getArrItem', function (value, index) {
  if (!value && value !== 0) {
    return '';
  } else {
    return value[index];
  }
})

Vue.filter('getArrMaxItem', function (value) {
  if (!value) {
    return '';
  } else {
    if (typeof value == 'object') {
      return value[value.length - 1];
    } else {
      let arr = value.split(',');
      return arr[arr.length - 1];
    }
  }
})

// 数字格式化
Vue.filter('number', function (value, format = '0.00') {
  return numeral(value).format(format);
})

Vue.filter('money', function (value, format = '0,0.00') {
  return numeral(value).format(format)
})

// 日期格式化 2017-12-28 15:02:50 => 2017.12.28
Vue.filter('date', function (value, format) {
  if (!value) {
    return '';
  } else {
    return value.split(' ')[0].replace(/-/g, format || '.');
  }
})

// 日期格式化 2017-12-28 15:02:50 => 2017.12.28 15:02:50
Vue.filter('dateTime', function (value, format) {
  if (!value) {
    return '';
  } else {
    return value.split(' ')[0].replace(/-/g, format || '.') + ' ' + value.split(' ')[1];
  }
})

Vue.filter('timeUnixFormat', function (value, format) {
  return value ? moment.unix(value).format(format || 'YYYY-MM-DD HH:mm:ss') : '';
})

// 累计盈亏
Vue.filter('profit', function (trade) {
  if (!trade) {
    return 0;
  } else {
    return (trade.currPercent.assetValue || trade.wfCurrPercent || trade.wfPercent) - trade.wfPercent;
  }
})

// 总操盘资金
Vue.filter('tradeTotal', function (trade) {
  if (!trade) {
    return 0;
  } else {
    return trade;
    // return bussService.getTotalTrade(trade);
  }
})

// 累计盈亏百分比-历史
Vue.filter('profitHistoryPercent', function (profit, capitalAmount) {
  // 现金=0
  if (!capitalAmount) {
    if (profit <= 0) {
      return 0;
    } else {
      return 100;
    }
  } else {
    return profit / capitalAmount * 100;
  }
})

// 正负加减号
Vue.filter('operator', function (value) {
  if (!value || isNaN(value)) {
    return 0.00;
  } else if (value > 0) {
    return '+' + value;
  } else {
    return value;
  }
})

// 交易日单位
Vue.filter('tradeCycle', function (value) {
  if (!value) {
    return '交易日';
  } else if (value == '1') {
    return '月';
  } else {
    return '周';
  }
})
//银行卡脱敏
Vue.filter('convertCardNo', function (value) {
  if (value && new RegExp(/^(\d{12}|\d{16,22})$/).test(value)) {
    return ' **** ***** **** ' + value.substring(value.length - 4, value.length);
  }
  return value;
})

// {{item.TurnoverTime|tradeClientTime(0)}}
// 2018-01-12 15:54:21 =>2018-01-12  or  =>15:54:21
Vue.filter('timePart', function (value, part) {
  if (!value) {
    return '-';
  } else {
    part = part || 0;
    return value.split(' ')[part]
  }
})
// 充值项目
Vue.filter('deltaTypeIdCn', function (value) {
  let types = ['快捷支付', '网银支付', '支付宝', '银行转账', 'app支付', '微信支付'];
  return types[value] || '其他';
})
// 充值装填
Vue.filter('statusCn', function (value) {
  let types = ['处理中', '已完成', '已驳回'];
  return types[value] || '其他';
})
//截取后两位
Vue.filter('splitWord', function (step) {
  return step.substring(step.length - 2, step.length);
})

Vue.filter('formatVolumn', function (val) {
  if (val) {} else {
    val = 0
  }
  if (val < 100000) {
    return val.toFixed(0)
  } else if (val >= 100000 && val < 1000000) {
    val = val / 10000;
    return val.toFixed(2) + '万'
  } else if (val >= 1000000 && val < 10000000) {
    val = val / 10000;
    return val.toFixed(1) + '万'
  } else if (val >= 10000000 && val < 100000000) {
    val = val / 10000;
    return val.toFixed(0) + '万'
  } else {
    val = val / 100000000;
    return val.toFixed(2) + '亿'
  }
})

Vue.filter('formatSyl', function (val) {
  if (val) {} else {
    val = 0
  }
  if (val == 0) {
    return '--'
  } else {
    return val.toFixed(2)
  }
})
