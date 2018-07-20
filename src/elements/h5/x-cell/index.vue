<template>
  <div class="h5-x-cell  weui-form-preview" element-path="h5/x-cell">
    <div class="weui-cells" v-for="(item,index) in viewModel" :key="index">
      <div class="weui-cell" v-if="isArray" :class="{'weui-cell_access': t.Url!==''}" @click="onClick(t.Url)" v-for="(t,i) in item.Links" :key="i">
        <div class="weui-cell_hd" v-if="t.Image!==''">
          <x-icon :src="t.Image" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></x-icon>
        </div>
        <div class="weui-cell__bd">
          <slot name="bd">
            <p v-html="t.Name" />
          </slot>
        </div>
        <div class="weui-cell__ft">
          <slot name="ft"></slot>
        </div>
      </div>
    </div>
    <div class="weui-cell" v-if="!isArray" :class="{'weui-cell_access': isLink}" @click="onClick">
      <div class="weui-cell_hd">
        <x-icon :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></x-icon>
      </div>
      <div class="weui-cell__bd">
        <slot name="bd">
          <p>{{title}}</p>
        </slot>
      </div>
      <div class="weui-cell__ft">
        <slot name="ft">{{value}}</slot>
      </div>
    </div>
  </div>
</template>

<script>
  import RouterLink from '@/mixins/router-link'
  export default {
    name: 'x-cell',
    mixins: [RouterLink],
    props: {
      elementData: {},
      value: {},
      title: {},
      isLink: Boolean,
      icon: {}
    },
    data () {
      return {
        viewModel: '',
        isArray: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        console.log('this.elementData', this.elementData)
        if (this.elementData !== undefined) {
          this.isArray = true
          this.viewModel = this.elementData
        }
      },
      onClick (url) {
        // this.$emit('click')
        // this.routerLink()
        this.$router.push(url)
      }
    }
  }
</script>
<style scoped lang="less">
  @import '~_style/index.less';
  .h5-x-cell {
    font-size: @font-size-base;
  }
</style>
