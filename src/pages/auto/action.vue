<template>
  <x-border title="商品提醒">
    <div class="action">
      <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1519718280,1849655749&fm=26&gp=0.jpg" alt="">
      <div class="action-title">商品添加成功，请选择以下操作</div>
      <div style="color: #409eff;">{{time}}秒后返回上级页面...</div>
      <ul class="action-list">
        <router-link to="/user/product/add">
          <li>继续添加商品</li>
        </router-link>
        <li>编辑商品</li>
        <router-link to="/user/product/list?type=ZKCloud.App.Shop.Product.Domain.Entities.Product">
          <li>管理商品</li>
        </router-link>
        <li>设置该商品活动</li>
      </ul>
    </div>
  </x-border>
</template>



<script>
  export default {
    data () {
      return {
        time: 3,
        timer: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.timer = setInterval(() => {
          this.time--
          if (this.time === 0) {
            // this.$router.push('/user/product/add')
            this.$router.back(-1)
            clearInterval(this.timer)
          }
        }, 1000)
      }
    },
    destroyed () {
      clearInterval(this.timer)
    }
  }
</script>



<style lang="scss" scoped>
  .action {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      display: block;
    }
    .action-title {
      margin-top: 10px;
      font-size: 14px;
      color: #409eff;
    }
    .action-list {
      margin-top: 50px;
      display: flex;
      justify-content: center;
      margin-bottom: 100px;
      li {
        width: 100px;
        font-size: 13px;
        text-align: center;
        color: #e94729;
        cursor: pointer;
        &:hover {
          transition: 1s;
          opacity: 0.8;
        }
      }
    }
  }
</style>
