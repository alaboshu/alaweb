<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" ref="ref_zkdialog" v-el-drag-dialog :before-close="handleClose" class="zk-dialog">
    <div class="body-content">
      <slot name="body"></slot>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <slot name="footer" v-if="$slots.footer"></slot>
      <el-button type="primary" v-if="!$slots.footer" @click="dialogVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import elDragDialog from '@/utils/pc-directive/el-dragDialog'
  export default {
    directives: { elDragDialog },
    name: 'zk-dialog',
    props: {
      dialogModel: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '60%'
      },
      title: {
        type: String,
        default: 'zkweb'
      }
    },
    data () {
      return {
        viewModel: '',
        dialogVisible: false
      }
    },
    mounted () {
      this.init()
      this.$nextTick(function () {
        this.$on('child', function (dialogCloseVisible) {
          // console.info('父组件点击')
          this.dialogVisible = true
        })
      })
    },
    methods: {
      async  init () {
        this.dialogVisible = this.dialogModel
      },
      handleClose () {
        this.dialogVisible = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~_style/index.less';
</style>

