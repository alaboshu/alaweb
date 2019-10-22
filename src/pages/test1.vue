<template>
  <div>
    <x-password v-model="viewModel"></x-password>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    onLoad (option) {
      console.info('option', option)
    },
    methods: {

      init () {
        console.info('this.route', this.$route, this.$crud.getType(this.$route))
      }
    }
  }
</script>
<style lang="scss" scoped>
  .introduction_img-box {
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
    .introduction_bottom {
      width: 100%;
      height: 50px;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #ffffff;
      display: flex;
      .introduction-icon {
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 5px;
        i {
          font-size: 24px;
        }
        p {
          margin-top: -5px;
          font-size: 15px;
        }
      }
      .introduction-info {
        flex: 1;
        div {
          text-align: center;
          height: 25px;
          line-height: 25px;
          color: #f4516c;
        }
      }
      .introduction-buy {
        flex: 1;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        background: #f4516c;
        font-size: 14px;
      }
    }
    .introduction_bottom-placeholder {
      height: 50px;
    }
  }
</style>
