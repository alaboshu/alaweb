 <template>
  <view class="common-x-preview weui-form-preview" v-if="async">
    <div class="preview">
      <div class="preview_col">
        <div class="preview_item" v-for="(item, index) in widgetModel.result.keyValues" :key="index" v-show="item.value">
          <div v-if="item.key==='Amount'" class="amount_item">
            <div class="amount_item_label">{{ item.name }}</div>
            <div class="amount_item_value">{{ item.value }}</div>
          </div>
          <div v-else>
            <div class="preview_item_label">{{ item.name }}</div>
            <div class="preview_item_value">
              <div class="item_value_img" v-if="item.key==='Avator'">
                <img :src="item.value" alt="">
              </div>
              <div v-else>{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>
<script>
  import './var.scss'
  export default {
    data () {
      return {
        async: false,
        widgetModel: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var appendPara = {
          id: this.widget.route.id
        }
        this.widgetModel = await this.$api.httpGet(this.widget.apiUrl, appendPara)
        this.async = true
      }
    }
  }
</script>

<style lang="scss">
</style>
