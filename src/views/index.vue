<template>
  <x-foot></x-foot>
</template>

<script>
  export default {
    data () {
      return {
        clientType: ''
      }
    },
    mounted () {
      this.ApiGet()
    },
    methods: {
      async ApiGet () {
        // var data = await api.get('api/user/info?id=1')
        // console.info('data', data)
      }
    }
  }
</script>

<style scoped lang="less">
</style>
