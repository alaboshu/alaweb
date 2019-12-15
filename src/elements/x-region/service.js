import widget from '@/service/api/address.api.js'
export default {
  // 初始化
  async initAddress (jsThis) {
    var addressInt = jsThis.$api.localGet('region_address_list')
    if (!addressInt) {
      addressInt = await widget.loadAllAddress()
      jsThis.$api.localSet('region_address_list', addressInt)
    }
    jsThis.addressModel.provinceData = JSON.parse(addressInt.province.message)
    jsThis.addressModel.cityData = JSON.parse(addressInt.city.message)
    jsThis.addressModel.areaData = JSON.parse(addressInt.area.message)
    var addressModel = jsThis.addressModel
    jsThis.provinceDataList = addressModel.provinceData
    jsThis.cityDataList = addressModel.cityData[jsThis.pickerValueDefault[0]]
    jsThis.areaDataList = addressModel.areaData[jsThis.pickerValueDefault[0]][jsThis.pickerValueDefault[1]]
    // 对 pickerValueDefault 做兼容处理
    this.handPickValueDefault(jsThis)
    if (!jsThis.$api.isEmpty(jsThis.model)) {
      addressModel.areaData.forEach((one, oneIndex) => {
        one.forEach((two, twoIndex) => {
          two.forEach((three, threeIndex) => {
            if (Number(three.value) === jsThis.model) {
              jsThis.cityDataList = addressModel.cityData[oneIndex]
              jsThis.areaDataList = addressModel.areaData[oneIndex][twoIndex]
              jsThis.pickerValue = [oneIndex, twoIndex, threeIndex]
              var e = {
                label: jsThis.provinceDataList[oneIndex].label -
                  addressModel.cityData[oneIndex][twoIndex].label -
                  addressModel.areaData[oneIndex][twoIndex][threeIndex].label
              }
              this._$emit(jsThis, 'onConfirm', e)
            }
          })
        })
      })
    }
  },
  // 对 pickerValueDefault 做兼容处理
  handPickValueDefault (jsThis) {
    var addressModel = jsThis.addressModel
    if (jsThis.pickerValueDefault !== [0, 0, 0]) {
      if (jsThis.pickerValueDefault[0] > addressModel.provinceData.length - 1) {
        jsThis.pickerValueDefault[0] = addressModel.provinceData.length - 1
      }
      if (
        jsThis.pickerValueDefault[1] >
        addressModel.cityData[jsThis.pickerValueDefault[0]].length - 1
      ) {
        jsThis.pickerValueDefault[1] =
          addressModel.cityData[jsThis.pickerValueDefault[0]].length - 1
      }
      if (
        jsThis.pickerValueDefault[2] >
        addressModel.areaData[jsThis.pickerValueDefault[0]][jsThis.pickerValueDefault[1]]
        .length -
        1
      ) {
        jsThis.pickerValueDefault[2] =
          addressModel.areaData[jsThis.pickerValueDefault[0]][jsThis.pickerValueDefault[1]].length - 1
      }
    }
  },
  // 监听选择器值变化
  pickerChange (jsThis, e) {
    var addressModel = jsThis.addressModel
    let changePickerValue = e.mp.detail.value
    if (jsThis.pickerValue[0] !== changePickerValue[0]) {
      // 第一级发生滚动
      jsThis.cityDataList = addressModel.cityData[changePickerValue[0]]
      jsThis.areaDataList = addressModel.areaData[changePickerValue[0]][0]
      changePickerValue[1] = 0
      changePickerValue[2] = 0
    } else if (jsThis.pickerValue[1] !== changePickerValue[1]) {
      // 第二级滚动
      jsThis.areaDataList = addressModel.areaData[changePickerValue[0]][changePickerValue[1]]
      changePickerValue[2] = 0
    }
    jsThis.pickerValue = changePickerValue
    this._$emit(jsThis, 'onChange')
  },
  //  地址发生变化后触发
  _$emit (jsThis, emitName) {
    let pickObj = {
      label: this._getLabel(jsThis),
      value: jsThis.pickerValue,
      cityCode: this._getCityCode(jsThis)
    }
    jsThis.$emit(emitName, pickObj)
  },
  _getLabel (jsThis) {
    let pcikerLabel =
      jsThis.provinceDataList[jsThis.pickerValue[0]].label +
      '-' +
      jsThis.cityDataList[jsThis.pickerValue[1]].label +
      '-' +
      jsThis.areaDataList[jsThis.pickerValue[2]].label
    return pcikerLabel
  },
  _getCityCode (jsThis) {
    return jsThis.areaDataList[jsThis.pickerValue[2]].value
  }
}
