<template>
  <view class="user_passwrod">
    <zk-auto-form :widget="viewModel" type="ChangeLoginPasswordAutoForm"></zk-auto-form>
  </view>
</template>

<script>
  import userJson from './json/user_password_login.json'
  export default {
    data () {
      return {
        viewModel: userJson
      }
    }
  }
</script>
