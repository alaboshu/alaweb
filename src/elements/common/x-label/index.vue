<template>
    <div class="zk-labels" :style="styles">
        <div class="page">
            <label class="zk-label" for="">1111111</label>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
    @import '~_style/index.less';
    .zk-labels {
      font-size: @font-size-base;
      .zk-label {
        display: block;
        background-color: #cccc;
        width: 150px;
        border: 1px solid #cccc;
      }
    }
</style>

