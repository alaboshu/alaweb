<template>
  <div class="zkui-pc-orderbuy">
    <div class="address-box auto">
      <h2 class="title">选择收货地址</h2>
      <ul class="address-select">
        <li class="item " v-for="(item,index) in addresslist" :key="index" :class="{'active':item.isDefault}" @click="setDefault(item.id)">
          <div class="recipients">
            （{{item.name}}）收
          </div>
          <p class="particular ">
            {{item.address}}
          </p>
          <p class="default" :class="{'more':item.isDefault}" v-if="item.isDefault">默认地址</p>
        </li>
      </ul>
      <div class="operation ">
        <el-button type="primary">使用新地址</el-button>
        <!-- <span class="operation-right fr">
          管理收货地址
        </span> -->
      </div>
    </div>
    <div class="order-box auto">
      <h2 class="title">确认订单信息 </h2>
      <ul class="buy-tr">
        <li class="td-0">店铺宝贝</li>
        <li class="td-1">商品属性</li>
        <li class="td-2">单价</li>
        <li class="td-3">数量</li>
        <li class="td-4">优惠方式</li>
      </ul>
      <div class="order-store" v-for="(store,storeIndex) in modelView.storeItems " :key="storeIndex">
        <div class="store-name">
          {{store.storeName}}
        </div>
        <ul class="order-message" v-for="(productSku,productSkuIndex) in store.productSkuItems " :key="productSkuIndex">
          <li class="td-0 info-detail">
            <router-link :to="'/product/show/'+productSku.productId" class="detail-img">
              <img :src="productSku.thumbnailUrl " alt="">
            </router-link>
            <div class="detail-title">
              <router-link :to="'/product/show/'+productSku.productId">
                {{productSku.name}}
              </router-link>
            </div>
          </li>
          <li class="td-1 info-sku">
            <p>{{productSku.bn}} {{productSku.propertyValueDesc}} 重量：{{productSku.weight}}g</p>
          </li>
          <li class="td-2 info-price">
            <p>￥{{productSku.displayPrice}}</p>
          </li>
          <li class="td-3 quantity">
            <p>
              X {{productSku.buyCount}}
            </p>
          </li>
          <li class="td-4 discounts ">

          </li>
        </ul>
        <div class="order-ext">
          <div class="ext-left">
            <div class="order-memo">
              给卖家留言:
              <el-input v-model="userMessages[storeIndex]" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="ext-right">
            <div class="delivery">
              <div class="delivery-title">
                运送方式:
              </div>
              <div class="delivery-info">
                普通配送
                <el-select v-model="showValue[storeIndex]" placeholder="请选择" @change="countPrice()">
                  <el-option v-for="item in store.expressTemplates" :key="item.key" :label="item.value" :value="item.key">
                  </el-option>
                </el-select>
              </div>
              <!-- <div class="delivery-price">
                10.00
              </div> -->
            </div>
          </div>
        </div>
        <div class="order-pay" v-if="asyncFlag">
          <div class="pay-placeholder "></div>
          <div class="pay-txt">
            共:
          </div>
          <div class="pay-price">
            {{store.totalCount}}
          </div>
          <div class="pay-txt">
            件-运费:
          </div>
          <div class="pay-price">
            ￥{{storePrices[storeIndex].expressAmount }}
          </div>
          <div class="pay-txt">
            -小计:
          </div>
          <div class="pay-price">
            ￥{{storePrices[storeIndex].totalAmount}}
          </div>
        </div>
        <div class="order-pay" v-for="(money,moneyIndex) in modelView.allowMoneys" :key="moneyIndex" @on-change="countPrice()">
          <div class="pay-serve">
            <ul class="switch">
              <li class="switch-left">
                <p class="switch-left-top">{{money.title}}</p>
                <p class="switch-left-bottom">{{money.description}}</p>
              </li>
              <li class="switch-right">
                <el-switch v-model="reduceMoneys[moneyIndex]" active-color="#e60044" inactive-color="#adb5bd" @change="countPrice()">
                </el-switch>
              </li>
            </ul>
          </div>
        </div>
        <div class="pay-serve-message" v-if="priceView.feeAmount">
          <ul>
            <li class=" messahe-left ">
              服务费:
            </li>
            <li class="messahe-right ">
              {{priceView.feeAmount}}元
            </li>
          </ul>
        </div>
      </div>

      <div class="order-payInfo ">
        <div class="payInfo-wrapper ">
          <div class="payInfo-shadow ">
            <div class="order-realpay ">
              <div class="realpay-left ">
                <p>实付款：</p>
              </div>
              <div class="realpay-right ">
                <p>￥{{priceView.totalAmount}}</p>
              </div>
            </div>
            <div class="order-confirmAddr ">
              <div class="confirmAddr-left ">寄送至：</div>
              <div class="confirmAddr-right ">{{addressM.Message}}</div>
            </div>
            <div class="confirmAddr-addr-user ">
              <div class="addr-user-left ">
                收件人：
              </div>
              <div class="addr-user-right ">
                {{addressM.addressee}}
              </div>
            </div>
          </div>
        </div>
        <div class="paybutton ">
          <el-button type="primary" @click="buy()">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { USERADDRESS_SETDEFAULT_POST, USERADDRESS_GET_GET, ORDER_BUYINFO_POST, ORDER_BUY_POST, ORDER_GETPRICE_POST } from '@/service/api/apiUrl'
  export default {
    components: {
    },
    data () {
      return {
        value2: false,
        modelView: '',
        priceView: '', // 价格显示模型
        storePrices: [], // 店铺价格显示
        asyncFlag: false, // 异步数据传递判断，如果没有获取完成则不传递数据子组件中
        userMessages: [], // 留言信息
        reduceMoneys: [], // 非人民币资产信息
        showValue: [], // 显示物流快递
        isFromCart: '', // 购买信息是否来自购物车，如果是，则需要删除购物车中，相对应的商品数据
        value: '',
        addresslist: '', // 收货地址
        addressId: '', // 选择的地址ID
        addressM: {
          Message: '', // 详细地址
          addressee: '' // 收件人
        },
        payMessage: {} // 传支付页面的数据
      }
    },
    mounted () {
      this.GetData()
      this.addressData()
      // this.ceshi()
    },
    methods: {
      // 设置为默认地址
      async setDefault (item) {
        let param = {
          userId: this.LoginUser().id,
          id: item
        }
        var isDefault = await this.$api.post(USERADDRESS_SETDEFAULT_POST, param)
        if (isDefault.data.status === 1) {
          this.$message({
            message: '设置成功',
            type: 'success'
          })
          this.addressData()
        } else {
          this.$message.error(isDefault.data.message)
        }
      },
      // 获取地址
      async addressData () {
        var addresslist = await this.$api.get(USERADDRESS_GET_GET)
        this.addresslist = addresslist.data.result // 所有地址
        for (var i = 0; i < this.addresslist.length; i++) {
          if (this.addresslist[i].isDefault === true) {
            this.addressM.Message = this.addresslist[i].address
            this.addressM.addressee = this.addresslist[i].name
            this.addressId = this.addresslist[i].id
            local.setLoginStore('default_address', this.addresslist[i])
          }
        }
      },
      async GetData () {
        var buyProductInfo = ''
        // console.log('this.$route.params.buyInfo', this.$route.params.buyInfo)
        if (this.$route.params.buyInfo !== undefined) {
          buyProductInfo = this.$route.params.buyInfo
          local.setStore('order_buy', buyProductInfo) // 将购买信息写到缓存中
        } else {
          buyProductInfo = local.getStore('order_buy') // 刷新时从缓冲中读取数据
        }
        if (this.$route.params.isFromCart !== undefined) {
          this.isFromCart = this.$route.params.isFromCart // 记录购买信息是否来自购物车
        }
        if (buyProductInfo === undefined) {
          this.$message.error('暂无商品，清先购买商品')
          this.$router.push({
            name: 'commont_index'
          })
        } else {
          var buyInfoInput = {
            loginUserId: this.LoginUser().id,
            productJson: JSON.stringify(buyProductInfo)
          }
          var response = await this.$api.post(ORDER_BUYINFO_POST, buyInfoInput)
          if (response.data.status === 1) {
            this.modelView = response.data.result
            console.log('modelView', this.modelView)
            for (var i = 0; i < this.modelView.storeItems.length; i++) {
              this.showValue[i] = this.modelView.storeItems[i].expressTemplates[0].key
              this.userMessages[i] = '' // 初始化留言信息
            }
            // 初始化币种
            for (var k = 0; k < this.modelView.allowMoneys.length; k++) {
              this.reduceMoneys[k] = true
            }
            // 获取价格
            this.getPrice()
          }
        }
      },
      // 更改运费方式，重新获取价格
      countPrice () {
        this.getPrice()
      },
      async buy () {
        try {
          var defaultAddress = local.getLoginStore('default_address') // 刷新时从缓冲中读取地址
          if (defaultAddress !== undefined) {
            this.addressId = defaultAddress.id
          } else {
            this.$message.error('请先添加地址')
            return
          }
          var storeBuyItems = []
          for (var i = 0; i < this.modelView.storeItems.length; i++) {
            var storeBuyItem = this.modelView.storeItems[i]

            var productBuyItems = []
            for (var j = 0; j < storeBuyItem.productSkuItems.length; j++) {
              var productSkuBuyItem = storeBuyItem.productSkuItems[j]
              var buyproductItem = {
                ProductSkuId: productSkuBuyItem.productSkuId,
                Count: productSkuBuyItem.buyCount,
                ProductId: productSkuBuyItem.productId,
                priceStyleId: productSkuBuyItem.priceStyleId,
                Amount: productSkuBuyItem.buyCount * productSkuBuyItem.price,
                storeId: storeBuyItem.storeId
              }
              productBuyItems.push(buyproductItem)
            }

            var buyStoreItem = {
              storeId: storeBuyItem.storeId,
              deliveryId: this.showValue[i], // 运费
              userMessage: this.userMessages[i],
              totalAmount: this.priceView.storePrices[i].totalAmount, // 店铺订单总价格
              totalCount: this.modelView.storeItems[i].totalCount, // 店铺商品总数量
              expressAmount: this.priceView.storePrices[i].expressAmount, // 店铺运费
              productAmount: this.priceView.storePrices[i].productAmount, // 店铺总商品费用
              productSkuItems: productBuyItems
            }
            storeBuyItems.push(buyStoreItem)
          }
          // 虚拟资产
          var reduceMoneys = []
          for (var r = 0; r < this.modelView.allowMoneys.length; r++) {
            var allowMoneyItem = this.modelView.allowMoneys[r]
            if (this.reduceMoneys[r]) {
              var reduceMoneyItem = {
                key: allowMoneyItem.moneyId,
                value: allowMoneyItem.maxPayPrice
              }
              reduceMoneys.push(reduceMoneyItem)
            }
          }
          console.log('reduceMoneys', reduceMoneys)
          var buyInput = {
            reduceMoneysJson: JSON.stringify(reduceMoneys),
            StoreOrderJson: JSON.stringify(storeBuyItems),
            addressId: this.addressId, // 选择地址Id
            payType: 3, // 支付方式
            totalAmount: this.priceView.totalAmount, // 订单总金额
            TotalCount: this.modelView.totalCount, // 订单总商品
            paymentAmount: this.priceView.totalAmount, // 订单总金额
            orderType: 1, // 订单类型
            sign: this.modelView.sign, // 签名信息
            isFromCart: this.isFromCart, // 是否从购物车购买
            userId: this.LoginUser().id // 下单用户ID
          }
          console.info('购买格式', buyInput)
          var response = await this.$api.post('ORDER_BUY_POST', buyInput)
          console.dir('response-buy', response)
          if (response.data.status === 1) {
            var buyOutput = response.data.result
            console.log(buyOutput)
            this.payMessage = {
              payId: buyOutput.payId,
              amount: buyOutput.payAmount,
              orderType: 'order',
              orderIds: response.data.result.orderIds
            }
            console.log('payMessage', this.payMessage)
            // this.$refs.show_pay.$emit('payMethod', buyOutput.payId, buyOutput.payAmount, 'order', response.data.result.orderIds) // 唤起支付窗口
          } else {
            this.$message.error(response.data.message)
          }
        } catch (error) {
          console.warn(error)
          this.GetData() // 如果出错重新请求一次服务器
        }
      },
      // 获取价格,更改店铺运费方式，修改地址时候，会修改价格
      async getPrice () {
        var defaultAddress = local.getLoginStore('default_address') // 刷新时从缓冲中读取地址
        if (defaultAddress !== undefined) {
          this.addressId = defaultAddress.id
        } else {
          this.$message.error('请先添加地址')
          return
        }
        var storeDelivery = []
        for (var i = 0; i < this.modelView.storeItems.length; i++) {
          var storeItem = this.modelView.storeItems[i]
          var deliveryItem = {
            key: storeItem.storeId,
            value: this.showValue[i]
          }
          storeDelivery.push(deliveryItem)
        }
        var reduceMoneys = []
        for (var k = 0; k < this.modelView.allowMoneys.length; k++) {
          var allowMoneyItem = this.modelView.allowMoneys[k]
          if (this.reduceMoneys[k]) {
            var reduceMoneyItem = {
              key: allowMoneyItem.moneyId,
              value: allowMoneyItem.maxPayPrice
            }
            reduceMoneys.push(reduceMoneyItem)
          }
        }
        var priceInput = {
          sign: this.modelView.sign, // 传递签名
          loginUserId: this.LoginUser().id, // 用户Id
          addressId: this.addressId,
          reduceMoneysJson: JSON.stringify(reduceMoneys),
          storeExpressJson: JSON.stringify(storeDelivery)
        }
        var priceResponse = await this.$api.post(ORDER_GETPRICE_POST, priceInput)
        if (priceResponse.data.status !== 1) {
          if (priceResponse.data.messagecode === 100) {
            this.GetData() // 缓存对象不存在，重新请求一次数据库
          }
          // this.messageWarn(priceResponse.data.message)
        } else {
          this.priceView = priceResponse.data.result
          this.storePrices = this.priceView.storePrices
          this.asyncFlag = true
          console.log('priceView', this.priceView)
        }
      }
    }
  }
</script>
<style lang="less" >
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix:after {
    content: '';
    display: table;
    clear: both;
  }
  .zkui-pc-orderbuy {
    .auto {
      margin: 0 auto;
      width: 990px;
    }
    background: @white;
    .address-box {
      padding-bottom: 10px;
      margin-top: 30px;
      margin-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
      .title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 15px;
      }
      .address-select {
        display: flex;
        li.item {
          border: 2px solid #e5e5e5;
          vertical-align: top;
          position: relative;
          width: 237px;
          margin: 0 14px 14px 0;
          padding: 11px 15px;
          color: #666;
          cursor: pointer;
          .recipients {
            font-size: 12px;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 5px;
          }
          .particular {
            margin-top: 5px;
            font-size: 12px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-bottom: 5px;
          }
          .default {
            font-size: 12px;
            text-align: right;
            margin-bottom: 10px;
          }
          .more {
            color: @brand;
          }
        }
        li.active {
          border: 2px solid @brand;
        }
      }
      .operation {
        position: relative;
        button.el-button {
          display: block;
          padding: 10px 10px;
          span {
            font-size: 12px;
            font-weight: 700;
          }
        }
        .operation-right {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          display: block;
          color: @warning;
          font-size: 12px;
        }
      }
    }
    .order-box {
      .title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 15px;
      }
      .td-0 {
        width: 255px;
      }
      .td-1 {
        width: 230px;
      }
      .td-2 {
        width: 160px;
      }
      .td-3 {
        width: 160px;
      }
      .td-4 {
        width: 180px;
      }
      .td-5 {
        width: 130px;
      }
      .buy-tr {
        display: flex;
        li {
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-bottom: 3px solid #b2d1ff;
          font-size: 14px;
          margin-left: 1px;
          vertical-align: bottom;
        }
      }
      .store-name {
        padding-bottom: 5px;
        margin-top: 25px;
        border-bottom: 1px dotted #80b2ff;
        height: 22px;
        font-size: 12px;
      }
      .order-message {
        display: flex;
        background-color: #fbfcff;
        border-bottom: 1px solid @white;
        li {
          padding: 10px 0;
        }
        li.info-detail {
          display: flex;
          padding-left: 10px;
          a.detail-img {
            display: block;
            width: 50px;
            height: 50px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .detail-title {
            flex: 1;
            padding-left: 10px;
            vertical-align: top;
            a {
              display: block;
              font-size: 12px;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              color: #666;
            }
          }
        }
        li.info-sku {
          p {
            color: @brand;
            font-size: 14px;
            text-align: center;
          }
        }
        li.info-price {
          p {
            font-size: 14px;
            text-align: center;
          }
        }
        li.quantity {
          p {
            font-size: 14px;
            text-align: center;
          }
        }
        li.subtotal {
          .price {
            color: @brand;
            font-size: 14px;
            text-align: right;
            padding-right: 10px;
          }
        }
      }
      .order-ext {
        display: flex;
        background-color: #f2f7ff;
        border-bottom: 1px solid @white;
        .ext-left {
          flex: 1;
          border-right: 1px solid @white;
          .order-memo {
            height: 40px;
            display: flex;
            padding: 10px;
            font-size: 12px;
            align-items: center;
            font-size: 12px;
            .el-input {
              flex: 1;
              padding-left: 5px;
              .el-input__inner {
                height: 25px;
              }
            }
          }
        }
        .ext-right {
          flex: 1;
          .delivery {
            height: 40px;
            padding: 10px;
            display: flex;
            align-items: center;
            .delivery-title {
              display: flex;
              align-items: center;
              text-align: right;
              width: 95px;
              padding-right: 15px;
              font-size: 12px;
            }
            .delivery-info {
              flex: 1;
              display: flex;
              align-items: center;
              font-size: 12px;
              .el-input__inner {
                height: 20px;
              }
              .el-select .el-input .el-select__caret {
                display: block;
              }
              .el-select > .el-input {
                padding-left: 5px;
              }
            }
            .delivery-price {
              color: @brand;
              display: flex;
              align-items: center;
              font-size: 12px;
              text-align: right;
            }
          }
        }
      }
      .pay-serve-message {
        min-height: 35px;
        border-bottom: 1px solid @white;
        background-color: #f2f7ff;
        position: relative;
        ul {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          height: 100%;
          li {
            height: 100%;
            line-height: 35px;
            font-size: 14px;
            min-width: 100px;
            text-align: center;
          }
          li.messahe-left {
            text-align: right;
          }
        }
      }
      .order-pay {
        background-color: #f2f7ff;
        height: 50px;
        display: flex;
        border-bottom: 1px solid @white;
        position: relative;
        .pay-placeholder {
          flex: 1;
        }
        .pay-txt {
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 5px;
        }
        .pay-price {
          font-size: 18px;
          display: flex;
          align-items: center;
          color: @brand;
          padding-right: 10px;
        }
        .pay-serve {
          position: absolute;
          height: 100%;
          top: 0;
          right: 0;
          .switch {
            display: flex;
            height: 100%;
            .switch-left {
              padding: 10px 0;
              p {
                height: 15px;
                line-height: 15px;
              }
              .switch-left-top {
                font-size: 14px;
              }
              .switch-left-bottom {
                font-size: 12px;
                color: @gray-600;
              }
            }
            .switch-right {
              width: 100px;
              position: relative;
              .el-switch {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }
      .order-payInfo {
        margin-top: 15px;
        .payInfo-wrapper {
          width: 373px;
          margin-left: 617px;
          border: 1px solid @brand;
          .payInfo-shadow {
            border: 3px solid #fff0e8;
            width: 370px;
            padding: 10px 10px 10px 20px;
            .order-realpay {
              display: flex;
              .realpay-left {
                flex: 1;
                p {
                  display: flex;
                  align-items: flex-end;
                  font-size: 14px;
                  color: @black;
                  font-weight: blod;
                  height: 100%;
                  justify-content: flex-end;
                  font-weight: bold;
                }
              }
              .realpay-right {
                p {
                  font-size: 18px;
                  color: @brand;
                  font-weight: bold;
                }
              }
            }
            .order-confirmAddr {
              margin-top: 10px;
              display: flex;
              .confirmAddr-left {
                flex: 1;
                font-weight: bold;
                font-size: 14px;
                text-align: right;
              }
              .confirmAddr-right {
                font-size: 14px;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
              }
            }
            .confirmAddr-addr-user {
              display: flex;
              .addr-user-left {
                font-weight: bold;
                font-size: 14px;
                flex: 1;
                text-align: right;
              }
              .addr-user-right {
                font-size: 14px;
              }
            }
          }
        }
      }
      .paybutton {
        button {
          display: block;
          margin-left: 876px;
          border-radius: 0;
          span {
            font-size: 18px;
          }
        }
      }
    }
  }
  .el-select-dropdown__item span {
    font-size: 12px;
  }
</style>
