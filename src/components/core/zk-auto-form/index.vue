<template>
  <div class="zk-auto-form" :style="styles">
    <el-form ref="form" :model="model" :rules="rules" label-width="120px" v-if="form.groups">
      <div>{{form.name}}</div>
      <div v-for="(group, gIndex) of form.groups" :key="gIndex">
        <div class="group-title">{{group.groupName}}</div>
        <component :is="`zk-af-${typeMap[item.type]}`" v-for="(item, iIndex) of group.items" :key="iIndex" :item="item" />
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { editSetting } from './property'
  import * as zkAfComps from './zk-af-comps'
  import typeMap from './type-map'
  import regMap from './reg-map'

  export default {
    name: editSetting.key,
    components: {
      ...zkAfComps
    },
    props: {
      dataUri: {
        type: String,
        required: true
      }
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
        const data = await this.$api.get(this.dataUri)
        if (data.status !== 1) return
        this.form = data.result
        this.initModel()
        this.initRules()
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
      submitForm () {
        this.$refs.form.validate()
        console.log(this.model)
      },
      resetForm () {
        this.$refs.form.resetFields()
        this.initModel()
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
</style>

