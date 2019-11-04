export default {
  methods: {
    pagesToDetail (item) {
      this.$api.to('/pages/product/show?id=' + item.id)
    }
  }
}
