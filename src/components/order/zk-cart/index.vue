<template>
  <view>
    <cartItem1 :widget="widget" v-if="type == 1"></cartItem1>
    <cartItem2 :widget="widget" v-else-if="type == 2"></cartItem2>
  </view>
</template>
<script>
  import cartItem1 from './styles/cart-item-1'
  import cartItem2 from './styles/cart-item-2'
  export default {
    components: {
      cartItem1,
      cartItem2
    },
    props: {
      widget: {},
      type: {
        default: 2
      }
    }
  }
</script>
