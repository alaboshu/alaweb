<template>
  <view class="zk-order-refund">
    <view class="order-refund mr-t">
      <view class="text">退款原因</view>
      <view>
        <picker :disabled="!inshow" @change="bindPickerChange" :value="index" :range="array">
          <view class="picker-slect">
            <view class="picker-text">{{array[index]}}</view>
            <x-icon src="icon-zk-right" name="icon-zk-right" size="12"></x-icon>
          </view>
        </picker>
      </view>
    </view>
    <!-- <view class="order-refund">
      <view class="text">退款金额</view>
      <view class="input-width">
        <input class="input" :disabled="!inshow" v-model="viewModel.amount" @input="input" type="text" />
        <view class="bottom-text" v-if="inshow">总金额{{orderDetail.totalAmount}}，最高退款金额{{orderDetail.totalAmount-orderDetail.expressAmount}}，邮费{{orderDetail.expressAmount}}</view>
      </view>
    </view> -->
    <view class="order-refund">
      <view class="text">退款说明</view>
      <view class="text-width">
        <textarea v-model="viewModel.description " :disabled="!inshow" class="textarea" placeholder="请说明具体内容"></textarea>
      </view>
    </view>
    <view class="order-refund upload" v-if="inshow">
      <view class="text">上传凭证</view>
      <view>
        <upload :inshow="inshow" :viewModel="viewModel"></upload>
      </view>
    </view>
    <view class="order-refund upload" v-else-if="viewModel.images.length !== 0">
      <view class="text">上传凭证</view>
      <view>
        <upload :inshow="inshow" :viewModel="viewModel"></upload>
      </view>
    </view>
    <view v-if="!inshow">
      <view class="order-refund" v-if="viewModel.address">
        <view class="text">收货地址</view>
        <view class="input-width">
          <view style="padding-top: 5px;">
            {{viewModel.address}}
          </view>
        </view>
      </view>
      <view class="order-refund" v-if="viewModel.process">
        <view class="text">处理方式</view>
        <view class="input-width">
          <input class="input" :disabled="!inshow" v-model="viewModel.process" @input="input" type="text" />
        </view>
      </view>
    </view>
    <view class="order-foot">
      <view class="order-button" v-if="inshow" @click="save"> 提交</view>
      <view class="order-button" v-if="!inshow && viewModel.process < 3" @click="cancel">取消申请</view>
    </view>
  </view>
</template>

<script>
 
  import upload from './upload/upload.vue'
  import local from '@/service/utils/local.js'
  import './var.scss'
  import './styles'


  export default {
    
    components: { upload },
    data () {
      return {
        widgetModel: {},
        array: ['仅退款', '退款退货'],
        index: 0,
        intext: true,
        viewModel: {
          productId: '',
          storeId: '',
          userId: '',
          reason: '',
          images: [],
          amount: '',
          description: '',
          orderId: ''
        },
        orderDetail: '',
        inshow: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.inshow = this.widget.route.type === 'AfterSale' || this.widget.route.type === 'Refund'
        this.orderDetail = local.get('OrderDetails')
        if (this.widget.route.type === 'UserRefundInfo') {
          var para = {
            orderId: this.widget.route.id
          }
          var res = await this.$api.httpGet('Api/Refund/get', para)
          var list = res.result
          this.viewModel.amount = list.amount
          this.viewModel.description = list.description
          this.viewModel.images = list.images
          this.viewModel.reason = list.reason
          this.viewModel.orderId = list.orderId
          this.viewModel.productId = list.productId
          this.viewModel.storeId = list.storeId
          this.viewModel.userId = list.userId
          this.viewModel.address = list.address
          this.viewModel.processMessage = list.processMessage
          this.process(list.process)
          this.array.forEach((element, arrIndex) => {
            if (list.reason === element) {
              this.intext = false
              this.index = arrIndex
            }
          })
        }
        if (this.widget.route.type === 'AfterSale' || this.widget.route.type === 'Refund') {
          this.viewModel.productId = this.orderDetail.productSkuItems[0].productId
          this.viewModel.storeId = this.orderDetail.storeId
          this.viewModel.userId = this.orderDetail.userId
          this.viewModel.amount = this.orderDetail.totalAmount - this.orderDetail.expressAmount
          this.viewModel.orderId = this.orderDetail.order.id
          if (this.orderDetail.orderStatus === 2) {
            this.index = 0
          } else {
            this.index = 1
          }
        }
      },
      bindPickerChange (val) {
        this.intext = false
        this.index = val.target.value
        this.viewModel.reason = this.array[val.target.value]
      },
      async save () {
        this.viewModel.reason = this.array[this.index]
        if (this.viewModel.reason !== '') {
          var response = await this.$api.httpPost('Api/Refund/Apply', this.viewModel)
          if (response.status === 1) {
            uni.showToast({
              title: '申请成功',
              icon: 'none',
              success: () => {
                setTimeout(() => {
                  this.$api.to('/pages/index?path=order_show&id=' + this.widget.route.id)
                  local.remove('OrderDetails')
                }, 500)
              }
            })
          } else {
            uni.showToast({
              title: '申请失败',
              icon: 'none'
            })
          }
        } else {
          uni.showToast({
            title: '请选择退款原因',
            icon: 'none'
          })
        }
      },
      input (val) {
        if (isNaN(val.target.value)) {
          this.viewModel.amount = ''
          uni.showToast({
            title: '只能输入数字',
            icon: 'none'
          })
          return
        }
        if (this.orderDetail.totalAmount - this.orderDetail.expressAmount < val.target.value) {
          this.viewModel.amount = (this.orderDetail.totalAmount - this.orderDetail.expressAmount).toFixed(2)
          uni.showToast({
            title: '退款金额不能超过最高退款金额',
            icon: 'none'
          })
        }
      },
      cancel () {
        var para = {
          orderId: this.viewModel.orderId
        }
        var _this = this
        uni.showModal({
          title: '提示',
          content: '取消之后将无法再次申请，是否继续？',
          success: async (res) => {
            if (res.confirm) {
              var response = await _this.$api.httpPost('Api/Refund/RefuseCancel', para)
              if (response.status === 1) {
                uni.showToast({
                  title: '已取消',
                  icon: 'none',
                  success: () => {
                    setTimeout(() => {
                      this.$api.to('/pages/index?path=order_show&id=' + this.widget.route.id)
                    }, 500)
                  }
                })
              } else {
                uni.showToast({
                  title: '取消失败',
                  icon: 'none'
                })
              }
            } else if (res.cancel) {
            }
          }
        })
      },
      process (val) {
        if (val === 0) {
          this.viewModel.process = '买家申请退货退款'
        } else if (val === 1) {
          this.viewModel.process = '卖家同意退货退款'
        } else if (val === 2) {
          this.viewModel.process = '卖家拒绝退货退款'
        } else if (val === 3) {
          this.viewModel.process = '退款关闭'
        } else if (val === 4) {
          this.viewModel.process = '退款成功'
        }
      }
    }
  }
</script>


<style lang="scss">
  @import "@/assets/style/variable.scss";
</style>
