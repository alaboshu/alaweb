<template>
  <div class="zk-auto-form" component-path="core/zk-auto-form" :viewApi="viewApi" :postApi="postApi" @postSuccess="postSuccess" @postFailed="postFailed">
    <div v-if="form.groups">
      <div v-for="(group, groupIndex) of form.groups" :key="groupIndex">
        <x-group :title="group.groupName"></x-group>
        <div v-for="(field, fieldIndex) of group.items" :key="fieldIndex">
          <x-input v-if="field.type===2" :label="field.name" :placeHolder="field.placeHolder" :required="field.required" v-model="model[field.field]"></x-input>
          <x-input v-if="field.type===12" :label="field.name" :placeHolder="field.placeHolder" required type="password" :min="6" :max="16"></x-input>
        </div>
      </div>
      <x-box>
        <x-button type="primary" @click="submitForm">提交</x-button>
      </x-box>
    </div>
  </div>
</template>

<script>
  import { editSetting } from './property'
  import typeMap from './type-map'/*  */
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
        console.info('表单数据', this.form)
        // console.info('表单数据groups', this.form.groups)
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
            console.info('设置值', item.field, item.value)
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
        this.initModel()
        console.log('数据模型', this.model)
        const response = await this.$api.post(this.postApi, this.model)
        if (response.status === 1) {
          this.$emit('postSuccess', response)
        } else {
          this.$emit('postFailed')
        }
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
</style>

