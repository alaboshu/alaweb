<template>
  <view class="zk-user-address-map" v-if="async">
    <map class="map" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
  </view>
</template>

<script>
  export default {
    props: {
      address: {}
    },
    data () {
      return {
        latitude: '',
        longitude: '',
        covers: [],
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.address[0]) {
          uni.request({
            // 高德api,通过地址获取经纬度
            url: 'http://restapi.amap.com/v3/geocode/geo',
            data: {
              // key,web服务用于获取数据
              key: '851c69f6cb4fc0e83290ab54257664e5',
              address: this.address[0].addressDescription
            },
            success: (res) => {
              if (res.data.status === '1') {
                var response = res.data
                var list = response.geocodes[0].location.split(',')
                this.latitude = list[1]
                this.longitude = list[0]
                this.covers = [{
                  latitude: list[1],
                  longitude: list[0],
                  iconPath: ''
                }]
              }
            }
          })
        }
        this.latitude = 0
        this.longitude = 0
        // this.covers = [{
        //   latitude: list[1],
        //   longitude: list[0],
        //   iconPath: ''
        // }]
        this.async = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .zk-user-address-map {
    position: fixed;
    height: 100%;
    width: 100%;
    .map {
      width: 100%;
      height: 100%;
    }
  }
</style>
