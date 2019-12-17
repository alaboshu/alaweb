<template>
  <view v-if="async" class="zk-auto-form">
    <view class="alert-text" v-if="autoForm.tooltip.alertText">{{autoForm.tooltip.alertText}}</view>
    <div class="box-top" v-if="autoForm.tooltip.title">{{autoForm.tooltip.title}}</div>
    <div v-for="(column,index) in autoForm.columns" :key="index">
      <div v-if="column.type==='tab'">
        <div class="group-title">{{column.name}}</div>
        <div class="box" v-for="(tabColumn,tabColumnIndex) in column.columns" :key="tabColumnIndex">
          <form-item v-model="viewModel[tabColumn.field]" :column="tabColumn" :currentModel="viewModel"></form-item>
        </div>
      </div>
      <div class="box" v-else>
        <form-item v-model="viewModel[column.field]" :column="column" :currentModel="viewModel"></form-item>
      </div>
    </div>
    <view class="zk-exchange-pay" v-if="false">
      <checkbox value="cb" checked="true" />
      <view @click="$api.to('/pages/app/agree')">同意平台服务条款</view>
    </view>
    <view class="btn-box">
      <x-button :loading="loading" :btnText="autoForm.tooltip.bottonText" @change="sumbit"></x-button>
    </view>
    <view v-if="autoForm.tooltip.buttomHelpText !== null && autoForm.tooltip.buttomHelpText !== undefined">
      <ul class="buttom-text">
        <li v-for="(item, index) in autoForm.tooltip.buttomHelpText" :key="index" v-html="index+1+'、'+item"></li>
      </ul>
    </view>
    <view v-if="autoForm.tooltip.links">
      <view v-for="(item, index) in autoForm.tooltip.viewLinks" :key="index" class="box-bottom" @click="toLink(item)">
        <p>{{item.name}}</p>
      </view>
    </view>
    <x-msg v-if="isMsg" :message="msgText"></x-msg>
  </view>
</template>

<script>
  import convert from './convert.js'
  import formItem from './form-item.vue'
  import service from './service.js'
  export default {
    components: {
      formItem
    },
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      dataModel: {},
      widget: {},
      afterSave: {
        type: Boolean,
        default: false
      }, // 判断父组件中是否定义保存后执行单独的方法，如果设置为true，在需要定义afterSave事件  
      // 示范用法：<zk-auto-form type="RecommendAddUser" @afterSave="afterSave" :afterSave="true"></zk-auto-form>
      type: {} // 如果type不为空的时候，表单从服务器上动态获取
    },
    data () {
      return {
        async: false,
        autoForm: null,
        viewModel: {},
        loading: false,
        phone: null,
        isMsg: false,
        isAgree: false,
        msgText: ''
      }
    },
    mounted () {
      this.init()
      console.info('admin', this.widget.route)
      // 找到好方法后删除
      // if (this.$route.path === '/pages/user/reg') {
      //   this.isAgree = true
      // }
    },
    methods: {
      async init () {
        var type = this.type
        if (!type) {
          type = this.$crud.getType(this.widget.route)
        }

        if (!type) {
          type = this.widget.value.form.type
        }
        if (!type) {
          this.$api.confirm('表单type不存在,请传入')
          this.$api.back()
        }
        var para = {
          type: type,
          id: this.$crud.id(this.widget.route)
        }
        var response = await this.$api.httpGet('/Api/Auto/Form', para)

        if (response.status === 1) {
          // 暂时性更改，待确定更好方案,处理完善资料的事件
          if (response.result.fromMessage !== null) {
            this.msgText = response.result.fromMessage.message
            this.isMsg = true
          }
          var result = convert.toConfig(response.result)
          this.autoForm = result
          this.viewModel = service.getModel(this.autoForm, this.dataModel)
          this.async = true
        } else {
          this.$api.confirm(response.message)
        }
        this.$api.info('auto-from表单结构', this.autoForm, this.viewModel)
      },
      async sumbit () {
        this.loading = true
        this.$api.info('表单视图', this.viewModel)
        var para = {
          type: this.autoForm.key,
          model: JSON.stringify(this.viewModel)
        }
        var response = await this.$api.httpPost('/Api/Auto/Save', para)
        if (response.status === 1) {
          if (this.afterSave) {
            // 调用父组件中的afterSave方法
            var data = {
              ...response,
              ...this.viewModel
            }

            this.$emit('afterSave', data)
          } else {
            this.isMsg = true
          }
        } else {
          this.$api.toastWarn(response.message)
        }
        this.loading = false
      },
      toLink (conter) {
        uni.navigateTo({
          url: conter.link
        })
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./var.scss";
</style>

