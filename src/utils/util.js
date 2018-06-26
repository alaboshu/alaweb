export default {
  nowDate(format) {
    let date = Date.now();

    function add0(m) {
      return m < 10 ? '0' + m : m
    }
    let time = new Date(parseInt(date));
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    if (format == 'yyyy-mm-dd hh:mm:ss') {
      return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    } else {
      return y + '-' + add0(m) + '-' + add0(d);
    }
  },
  formatVolumn(val) {
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
  },
  formatSyl(val) {
    if (val) {} else {
      val = 0
    }
    if (val == 0) {
      return '--'
    } else {
      return val.toFixed(2)
    }
  },
  //取整
  formatVol(val) {
    if (val == 0) {
      return '--'
    } else {
      return val.toFixed(0)
    }
  },
}
