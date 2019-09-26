<template>
  <radio-group @change="radioChange" v-if="async">
    <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in options" :key="item.value" @click="getIndex(index)" :class="index === current ?  'checkbox selectBox' : 'checkbox '">
      <radio :value="String(item.key)" :checked="index === current" v-show="false" />{{item.value}}
    </label>
  </radio-group>
</template>
<script>
  export default {
    data () {
      return {
        current: 0,
        options: '',
        async: false
      }
    },
    props: {
      modelValue: {},
      value: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.modelValue) {
          var para = {
            type: this.modelValue
          }
          var respone = await this.$api.httpGet('/Api/Type/GetKeyValue', para)
          if (respone.status === 1) {
            this.options = respone.result
            this.$emit('input', this.options[0].key)
            this.async = true
          }
        }
      },
      radioChange (e) {
        this.$emit('input', e.detail.value)
      },
      getIndex (index) {
        this.current = index
      }
    }
  }
</script>
<style lang="scss" scoped>
  checkbox-group,
  radio-group {
    display: flex !important;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .checkbox {
    padding: 2px 5px;
    text-align: center;
    display: block;
    background: #f7f7f7;
    border-radius: 20px;
    color: #666;
    margin-top: 10px;
    margin-right: 10px;
    // padding: 0;
  }
  .selectBox {
    display: block;
    color: #e93b3d;
    border: 1px solid #e93b3d;
    background: #fdf0f0 !important;
  }
</style>
