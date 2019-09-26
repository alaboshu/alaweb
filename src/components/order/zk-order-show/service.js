export default {
  // 订单操作,订单和操作方式
  async action (jsThis, order, method) {
    if (method === 'UserOrderPay') {
      this.userOrderPay(order)
    }
    if (method === 'UserOrderCancle') {
      this.userOrderCancle(order)
    }
  },
  // 付款
  async userOrderPay (order) {},
  // 取消订单
  async userOrderCancle (order) {}
}
