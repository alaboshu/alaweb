<template>
  <div class="pc-x-foot" element-path="pc/x-foot">
    <div class="about">
      <ul class="area">
        <li class="lw w1">
          <span class="aboutus show_icon"></span>
          <span>关于我们</span>
          <a href="//www.zhe800.com/contact" target="_blank" add_params="utm_content=zhe800_bottom">关于我们</a>

          <a href="//hr.zhe800.com" target="_blank" add_params="utm_content=zhe800_bottom">诚聘英才</a>
          <a rel="nofollow" href="//www.zhe800.com/service_terms" target="_blank" add_params="utm_content=zhe800_bottom">网站服务条款</a>
          <a href="//help.zhe800.com/detail/82" target="_blank" add_params="utm_content=zhe800_bottom">用户服务协议</a>
          <a href="//help.zhe800.com/detail/234" target="_blank" add_params="utm_content=zhe800_bottom">联系我们</a>
        </li>
        <li class="lw">
          <span class="shopguide show_icon"></span>
          <span>购物指南</span>
          <a href="//www.zhe800.com/n/newusers" target="_blank" add_params="utm_content=zhe800_bottom">新手玩转折800</a>
          <a href="//shop.zhe800.com/my/orders" target="_blank" add_params="utm_content=zhe800_bottom">订单查询</a>
          <a href="//www.zhe800.com/faq/rank" target="_blank" add_params="utm_content=zhe800_bottom">会员介绍</a>
          <a href="//help.zhe800.com/detail/274" target="_blank" add_params="utm_content=zhe800_bottom">积分攻略</a>
          <a href=" //help.zhe800.com/" target="_blank" add_params="utm_content=zhe800_bottom">帮助中心</a>
        </li>
        <li class="lw">
          <span class="busscom show_icon"></span>
          <span>消费者保障</span>
          <a href="//www.zhe800.com/n/help/zhe800_description?utm_content=zhe800_bottom" target="_blank" add_params="utm_content=zhe800_bottom">商品抽检</a>
          <a href="//shop.zhe800.com/refunds/customer" target="_blank" add_params="utm_content=zhe800_bottom">退货退款政策</a>
          <a href="//shop.zhe800.com/n/act/yunfeibutieka" target="_blank" add_params="utm_content=zhe800_bottom">运费补贴卡</a>
          <a href="//help.zhe800.com/detail/2233" target="_blank" add_params="utm_content=zhe800_bottom">无忧售后</a>
          <a href="//help.zhe800.com/detail/81" target="_blank" add_params="utm_content=zhe800_bottom">先行赔付</a>
        </li>
        <li class="lw">
          <span class="usersafe show_icon"></span>
          <span>商务合作</span>
          <a href="https://zhaoshang.zhe800.com/?utm_content=zhe800_bottom" target="_blank" add_params="utm_content=zhe800_bottom">商家报名</a>
          <a href="//www.zhe800.com/friendly_links" target="_blank" add_params="utm_content=zhe800_bottom">友情链接</a>
          <a href="//www.zhe800.com/n/jubao" target="_blank" add_params="utm_content=zhe800_bottom">廉正举报</a>
        </li>
        <li class="w3">
          <span class="nexttothere show_icon"></span>
          <span>下次怎么来?</span>
          <h3>
            <span>记住域名：</span>
            <a href="//www.zhe800.com" add_params="utm_content=zhe800_bottom" target="_blank">
              <em class="em">zhe800.com</em>
            </a>
          </h3>
          <h4>
            <span> 百度搜索：</span>
            <a rel="nofollow" href="//www.baidu.com/s?tn=baiduhome_pg&amp;ie=utf-8&amp;bs=%E6%8A%98800&amp;f=8&amp;rsv_bp=1&amp;rsv_spt=1&amp;wd=%E6%8A%98800&amp;inputT=0" target="_blank" class="search_link">折800</a>
          </h4>
          <a class="desktop" rel="nofollow" href="//www.zhe800.com/download_tao800?fn=%E6%8A%98800.url" title="下载桌面快捷方式" target="_blank">下载桌面快捷方式</a>
          <h5>
            <span>收藏本站：</span>
            <a id="clt" href="javascript:$.addfavorite()">
              <u>加入收藏</u>
            </a>
          </h5>
          <h6>
            <span>订阅本站:</span>
            <br>
            <input type="text" class="txt" placeholder="输入您的邮件" id="subscribe_email"><input type="button" onclick="$.tao_dingyue()" class="smt dysmt" value="订阅"></h6>
        </li>
        <li class="w4">
          <div class="bottom_qrcode_wrapper"></div>
          <span>下载登录手机端App</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-cell',
    props: {
      elementData: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.elementData === undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pc-x-foot {
    font-size: @font-size-base;
  }

  .about {
    max-width: 1280px;
    min-width: 1080px;
    width: 80%;
    margin: 0 auto;
    font-size: 18px;
  }
  .area {
    display: flex;
    flex: 4;
  }
  .em,
  .search_link {
    color: red;
  }
  .area .lw span,
  .area .lw a {
    display: block;
    line-height: 28px;
  }
  .area .lw a {
    color: #b5b5b5;
  }
  .lw {
    width: 200px;
  }
  .lw span,
  .w3 span:nth-child(2) {
    display: block;
    margin: 20px 0 20px 0;
    font-size: 22px;
    color: #000;
  }
  .txt {
    width: 97px;
    height: 23px;
    border: 1px solid #999;
    outline: none;
    padding-left: 5px;
    color: #cbcbcb;
    font-size: 12px;
  }
  .smt {
    width: 41px;
    height: 23px;
    background: #f9f9f9;
    border: 1px solid #999;
    border-left: none;
    color: #999999;
  }
  .w3 h3 span,
  .w3 h4 span,
  .w3 h5 span,
  .w3 h6 span,
  .w3 .desktop {
    color: #b5b5b5;
  }
  u {
    text-decoration: none;
    color: #b5b5b5;
  }
  .show-icon {
    display: inline-block;
    vertical-align: middle;
  }
  .show-icon .aboutus {
    background-image: url('../../../../static/svg/foot_icon.png');
  }
</style>
