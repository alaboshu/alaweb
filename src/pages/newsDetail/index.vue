<template>
    <div>
        <div class="news_title">{{news.title}}</div>
        <div class="news_wrap">
            <span class="news_auth">{{news.auth}}</span>
            <span class="news_date">{{news.date}}</span>
        </div>
        <div class="news_detail">{{news.detail}}</div>
        <a v-if="news.type == 1&& !wxShow" :href="news.url" type="application/pdf" target="_blank" class="news_link">点击浏览原文</a>
        <a v-else :href="news.url" class="news_link" @click="openPDF">点击浏览</a>

    </div>
</template>
<script>
import { mapState } from "vuex";
import store from '../../vuex/store';
export default {
    data () {
        return {
            news: store.state.news,
            wxShow: false
        }
    },
    // computed: {
    //     ...mapState(['news'])
    // },
    methods: {
        init () {
            if (window) {
                this.wxShow = false;
            } else {
                this.wxShow = true;
            }
            this.service.scrollTop();
        },
        openPDF () {
            this.service.downloadFile(this.news.url)
        }
    },
    created () {
        this.init();
    }
}
</script>
<style>
.news_title {
  margin-top: 10px;
  padding: 0 20px;
  text-align: center;
  display: block;
}
.news_wrap {
  font-size: 14px;
  margin: 10px 10px;
  border-bottom: solid gainsboro 1px;
  text-align: center;
  padding: 10px 0;
}
/* .auth {
  font-size: 25rpx;
  margin:10px 10px;
} */
.news_date {
  margin-left: 10px;
}
.news_detail {
  display: block;
  text-indent: 2em;
  text-align: left;
  color: gray;
  overflow: hidden;
  width: 100%;
  height: 100%;
  line-height: 35px;
  font-size: 14px;
}
.news_link {
  font-size: 14px;
}
</style>


