<template>
  <view class="zk-logistics-list">
    <ul>
      <li v-for="(item,index) in widgetModel" :key="index" @click="getLogistics(item)">
        <p>快递方式：<span>{{item.expressName}}（{{item.expressNum}}）</span></p>
        <p>物流名称：<span>{{item.remark}}</span></p>
      </li>
    </ul>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {}
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
        var paramenter = {
          OrderId: this.widget.route.id
        }
        var resposn = await this.$api.httpGet('/api/order/GetExpressList', paramenter)
        if (resposn.status === 1) {
          this.widgetModel = resposn.result
        } else {
          this.$api.toastWarn(resposn.message)
        }
      },
      getLogistics (val) {
        this.$api.to('/pages/index?path=order_logistics_look&id=' + val.id)
      }
    }
  }
</script>
