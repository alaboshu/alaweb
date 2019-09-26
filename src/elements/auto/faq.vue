<template>
  <x-border :title="title" icon="flaticon-settings" color="accent">
    <div v-if="async">
      <zk-auto-form :serviceConfig="viewModel" v-if="async"></zk-auto-form>
      <div class="admin-faq">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#fff" text-color="#333" active-text-color="#E94729" :unique-opened="true">
            <div v-for="(item, index) in listData" :key="index">
              <el-submenu class="faq-list" :index="String(index)">
                <template slot="title">
                  <div class="fa1-head" :style="'background-color:'+backgroundColor[index].color+';'+'border: 1px solid '+backgroundColor[index].color+';'">
                    <i :class="'icon iconfont title-icon_i '+item.icon" v-if="item.icon"></i>
                    <i :class="'icon iconfont title-icon_i '+iconList[index]" :style="'color:'+backgroundColor[index].sizeColor+';'" v-else></i>
                    <span class="title-icon_span" :style="'color:'+backgroundColor[index].sizeColor+';'">{{item.title}}</span>
                  </div>
                </template>
                <div class="content-frame" :style="'border: 1px solid '+backgroundColor[index].color+';'+'border-top: none;'">
                  <div>1111111111111111111</div>
                  <div>1111111111111111111</div>
                  <div>1111111111111111111</div>
                  <div>1111111111111111111</div>
                  <div>1111111111111111111</div>
                  <div>1111111111111111111</div>
                  <div>1111111111111111111</div>
                  <div>1111111111111111111</div>
                </div>
              </el-submenu>
            </div>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
  </x-border>
</template>


<script>
  export default {
    data () {
      return {
        async: false,
        viewModel: null,
        title: '数据编辑',
        listData: [
          {
            icon: '',
            color: '',
            title: '测试一',
            intro: ''
          },
          {
            icon: '',
            color: '',
            title: '测试二',
            intro: ''
          },
          {
            icon: '',
            color: '',
            title: '测试三',
            intro: ''
          },
          {
            icon: '',
            color: '',
            title: '测试四',
            intro: ''
          }
        ],
        backgroundColor: [],
        iconList: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.async = false
        for (var i = 0; i < this.listData.length; i++) {
          this.backgroundColor[i] = this.$random.color()
          this.iconList[i] = this.$random.icon()
        }
        var type = this.$crud.getType(this.$route)
        var para = {
          type: type
        }
        var response = await this.$api.httpGet('/Api/Auto/news', para)
        if (response.status === 1) {
          this.viewModel = response.result
          this.title = this.viewModel.name
          this.async = true
        } else {
          this.$alert(response.message, '类型输入错误', {
            confirmButtonText: '确定'
          })
        }
        this.async = true
      },
      getPath () {
        this.init()
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .admin-faq {
    padding: 10px 20px;
    .el-menu {
      border-right: none;
    }
    .el-menu-vertical-demo {
      .faq-list {
        margin-bottom: 20px;
        border-radius: 5px;
        overflow: hidden;
        .fa1-head {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          padding-left: 20px;
          .title-icon_i {
            margin-right: 10px;
          }
        }
        .el-submenu__title {
          padding: 0px !important;
          border: none !important;
        }
        .content-frame {
          padding: 20px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
</style>



