<template>

</template>
<script>
  export default {
    name: 'zk-buy-addressr',
    data () {
      return {

      }
    }
  }
</script>
<style scoped lang="less">
  @import '~_style/index.less';
  .zk-buy-address {
    width: 100%;
    padding: 5px 5px 0 5px;
    min-height: 30px;
    .buy-addres_box {
      padding-left: 30px;
      padding-right: 30px;
      position: relative;
      .buy-address-content {
        width: 100%;
        .address-content-top {
          display: flex;
          .address-name {
            flex: 1;
          }
        }
        .address-content-bottom {
          .addresss-detail {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
      .address-left-icon {
        position: absolute;
        height: 30px;
        width: 30px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      .address-right-icon {
        position: absolute;
        height: 30px;
        width: 30px;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
</style>
