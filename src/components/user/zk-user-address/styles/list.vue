<template>
  <view>
    <view class="add-list" v-if="addList && async">
      <view v-for="(item, index) in addList" :key="index">
        <scroll-view class="scroll-list" :style="'width:' + screenWidth + 'px;'" :show-scrollbar="false" :scroll-x="true">
          <view class="list" :style="'width:' + (screenWidth+50) + 'px;'">
            <view class="image" v-if="item.name">{{item.name.substr(0, 1)}}</view>
            <view class="cont">
              <view class="cont-title">
                <text>{{item.name}}</text>
                <text class="phone">{{item.mobile}}</text>
              </view>
              <view class="cont-foot">
                <text class="select" v-if="item.isDefault">默认</text>
                <text class="test">{{item.addressDescription}} {{item.address}}</text>
              </view>
            </view>
            <view class="right" @click="editClick(item)">编辑</view>
            <view class="delete" @click="deleteClick(item)">删除</view>
          </view>
        </scroll-view>

      </view>
    </view>
    <addButton></addButton>
  </view>
</template>


<script>
  import styleApi from './styleApi'
  import addButton from './button'
  export default {
    components: { addButton },
    data () {
      return {
        addList: null,
        screenWidth: 0, // 屏幕宽度
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // 计算屏幕宽度
        this.screenWidth = this.$base.screenWidth()
        this.addList = await styleApi.getAddress(this)
        this.async = true
      },
      // 编辑地址
      editClick (item) {
        this.$emit('change', { data: item, type: 'edit', form: 'list' })
      },
      // 删除地址
      deleteClick (item) {
        uni.showModal({
          content: '确认删除此地址？',
          success: async (res) => {
            if (res.confirm) {
              var response = await this.$api.httpDelete('/api/userAddress/delete', { id: item.id })
              if (response.status === 1) {
                this.$api.localRemove('shop_order_select_address')
                this.$api.toast('删除成功')
              } else {
                this.$api.toastWarn(response.message)
              }
              this.init()
            }
          } })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .add-list {
    background: #f2f2f2;
    .scroll-list {
      width: 100%;
    }
    .list {
      position: relative;
      height: 55px;
      box-sizing: border-box;
      padding: 10px;
      background: #fff;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      .image {
        width: 25px;
        height: 25px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 25px;
      }
      .cont {
        height: 40px;
        flex-grow: 2;
        box-sizing: border-box;
        margin-left: 10px;
        margin-bottom: 5px;
        .cont-title {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          .phone {
            font-size: 10.5px;
            color: #909399;
            margin-left: 10px;
          }
        }
        .cont-foot {
          height: 15px;
          box-sizing: border-box;
          .select {
            display: inline-block;
            font-size: 10px;
            height: 15px;
            line-height: 15px;
            padding: 0px 5px;
            background-color: #dcd3cf;
            color: #f74c31;
          }
          .test {
            line-height: 15px;
            font-size: 12.25px;
            color: #000;
          }
        }
      }
      .right {
        color: #909399;
        height: 20px;
        line-height: 20px;
        padding: 0px 5px;
        margin-right: 50px;
      }
      .delete {
        width: 50px;
        height: 100%;
        background: #f74c31;
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        text-align: center;
        line-height: 55px;
      }
    }
  }
</style>
