export default {
  // 获取购物车商品
  async initCart (jsThis) {
    var response = await jsThis.$api.httpGet('/api/cart/getcart')
    if (response.status === 1) {
      jsThis.widgetModel = response.result
      // 购物车商品默认为不选中
      if (jsThis.widgetModel.storeItems) {
        jsThis.widgetModel.storeItems.forEach((store, storeIndex) => {
          jsThis.productStoreRadio.push(false)
          jsThis.productRadio.push([])
          store.productSkuItems.forEach((product, productIndx) => {
            jsThis.productRadio[storeIndex][productIndx] = false
          })
        })
      }
    }
  },
  // 购物车商品选中
  radioClick (jsThis, data) {
    var productRadio = jsThis.productRadio[data.storeIndex][data.productIndex]
    jsThis.$set(jsThis.productRadio[data.storeIndex], [data.productIndex], !productRadio)
    this.isStoreRadio(jsThis, data.storeIndex)
    this.isAllStoreRadio(jsThis)
  },
  // 购物车单个店铺选中
  storeClick (jsThis, index) {
    var storeRadio = jsThis.productStoreRadio[index]
    var productRadio = jsThis.productRadio[index]
    productRadio.forEach((element, productIndex) => {
      jsThis.$set(jsThis.productRadio[index], [productIndex], !storeRadio)
    })
    jsThis.$set(jsThis.productStoreRadio, [index], !storeRadio)
    this.isAllStoreRadio(jsThis)
  },
  // 判断购物车，单个店铺内商品是否全部选中
  isStoreRadio (jsThis, storeIndex) {
    var productRadio = jsThis.productRadio[storeIndex].find(r => r === false) === undefined
    jsThis.$set(jsThis.productStoreRadio, [storeIndex], productRadio)
  },
  // 判断购物车内所有店铺商品是否全部选中
  isAllStoreRadio (jsThis) {
    var allStoreRadio = jsThis.productStoreRadio.find(r => r === false) === undefined
    jsThis.$refs.cartSumbit.isRadio = allStoreRadio
  },
  // 监听全选触发
  radioChange (jsThis) {
    jsThis.productStoreRadio.forEach((store, storeIndex) => {
      this.storeClick(jsThis, storeIndex)
    })
  },

  // 删除购物车商品
  deleletClick (jsThis, data) {
    const {
      store,
      product
    } = data
    uni.showModal({
      title: '提示',
      content: '确定删除？',
      success: async (res) => {
        if (res.confirm) {
          let paramenter = {
            ProductSkuId: product.productSkuId,
            productId: product.productId,
            storeId: store.storeId,
            count: product.buyCount,
            userId: jsThis.$user.id()
          }
          var response = await jsThis.$api.httpGet('/api/cart/removecart', paramenter)
          if (response.status === 1) {
            jsThis.$api.toastSuccess('删除成功')
            this.initCart(jsThis)
          } else {
            jsThis.$api.toastWarn(response.message)
          }
        }
      }
    })
  }
}
