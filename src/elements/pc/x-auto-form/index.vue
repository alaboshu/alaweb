<template>
  <div class="x-auto-form" :style="styles">
    <el-form ref="form" :model="model" :rules="rules" label-width="120px" v-if="form.groups">
      <div>{{form.name}}</div>
      <div v-for="(group, gIndex) of form.groups" :key="gIndex">
        <div class="group-title">{{group.groupName}}</div>
        <component :is="`x-af-${typeMap[item.type]}`" v-for="(item, iIndex) of group.items" :key="iIndex" :item="item" />
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as xAfComps from './x-af-comps'
  import typeMap from './type-map'
  import regMap from './reg-map'

  export default {
    name: 'x-auto-form',
    components: {
      ...xAfComps
    },
    props: {
      viewApi: {
        type: String,
        required: true
      },
      postApi: {
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
        const data = await this.$api.get(this.viewApi)
        if (!data) return
        this.form = data
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
        this.$refs.form.validate(async (valid) => {
          if (!valid) return false
          console.log(this.model)
          const data = await this.$api.post(this.postApi, this.model)
          if (data) {
            this.$emit('postSuccess', data)
          } else {
            this.$emit('postFailed')
          }
        })
      },
      resetForm () {
        this.$refs.form.resetFields()
        this.initModel()
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less'; 
</style>

