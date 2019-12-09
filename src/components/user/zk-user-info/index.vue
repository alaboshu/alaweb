<template>
  <view class="zk-user-info" v-if="async">
    <list-item :widget="list.infoView"></list-item>
    <list-item :widget="list.infoOut" style="margin-top: 10px;"></list-item>
  </view>
</template>

<script>
  import listItem from './styles/list-item'
  import listJson from './styles/list.json'
  export default {
    props: {
      userModel: {},
      widget: {}
    },
    components: {
      listItem
    },
    data () {
      return {
        list: listJson,
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        var userData = this.$user.loginUser()
        if (userData) {
          this.list.infoView.forEach(element => {
            element.value = userData[element.infoType]
          })
        }
        this.async = true
      }
    }
  }
</script>

<style>
</style>
