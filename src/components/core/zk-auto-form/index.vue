<template>
  <div class="zk-auto-form" component-path="core/zk-auto-form" :viewApi="viewApi" :postApi="postApi" @postSuccess="postSuccess" @postFailed="postFailed">
    <div v-if="form.groups">
      <div v-for="(group, gIndex) of form.groups" :key="gIndex">
        <div class="group-title">{{group.groupName}}</div>
        <div v-for="(item, iIndex) of group.items" :key="iIndex">
          <xAfPassword :item="item" v-if="typeMap[item.type] === 'password'" />
          <xAfTextBox :item="item" v-if="typeMap[item.type] === 'textBox'" />
        </div>
      </div>
      <div>
        <x-button type="primary" @click="submitForm">提交</x-button>
        <x-button @click="resetForm">重置</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { editSetting } from './property'
  import typeMap from './type-map'
  import regMap from './reg-map'
  export default {
    name: editSetting.key,
    props: {
      viewApi: {
        type: String,
        required: true
      },
      postApi: {
        type: String,
        required: true
      },
      successReturn: String
    },
    data () {
      return {
        form: {},
        model: {},
        rules: {},
        styles: {},
        typeMap
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        const data = await this.$api.get(this.viewApi)
        if (!data) return
        this.form = data
        this.initModel()
        this.initRules()
      },
      postSuccess (data) {
        this.$emit('postSuccess', data)
      },
      postFailed () {
        this.$emit('postFailed')
      },
      initModel () {
        this.form.groups.forEach(group => {
          group.items.forEach(item => {
            this.$set(this.model, item.field, item.value)
          })
        })
      },
      initRules () {
        this.rules = {}
        this.form.groups.forEach(group => {
          group.items.forEach(item => {
            if (item.validType) {
              this.$set(this.rules, item.field, [{
                validator: (rule, value, callback) => {
                  if (regMap[item.validType].test(value)) {
                    callback()
                  } else {
                    callback(new Error('数据不合法!'))
                  }
                },
                trigger: 'blur'
              }])
            }
          })
        })
      },
      async submitForm () {
        console.log(this.model)
        const data = await this.$api.post(this.postApi, this.model)
        if (data) {
          this.$emit('postSuccess', data)
        } else {
          this.$emit('postFailed')
        }
      },
      resetForm () {
        this.initModel()
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
</style>

