<template>
  <div class="container">
    测试页面
  </div>
</template>
<script>
  import Chat from '../../services/chatService'
  import util from '../../utils/util'
  import { setTimeout } from 'timers';
  import store from '../../vuex/store'
  export default {
    name: "chat",
    data () {
      return {
        chatService: new Chat(),
        chatList: [{
          position: 'left',
          word: {
            answer: '你好，欢迎和我聊天，有什么可以帮助你的吗？',
            type: 'sentence'
          },
          type: 1,
          dateTime: util.nowDate('yyyy-mm-dd hh:mm:ss')
        }],
        question: '',
        userInfo: {},
        height: '',
        isInput: true,
        qusList: [],
        sendBtn: false,
        isQusList: true,
      }
    },
    methods: {
      getAnswer (word) {
        this.isInput = false;
        let question = {
          position: 'right',
          word: word,
          type: 1,
          dateTime: util.nowDate('yyyy-mm-dd hh:mm:ss')
        }
        this.service.pageScrollTo();
        this.chatList.push(question)
        this.chatService.getChatAnswer(this.service, word).then(data => {
          let answer = {
            position: 'left',
            word: data.data,
            type: 1,
            dateTime: util.nowDate('yyyy-mm-dd hh:mm:ss')
          }
          this.chatList.push(answer)
          setTimeout(() => {
            this.service.pageScrollTo().then(data => {
              setTimeout(() => {
                this.isInput = true;
              }, 500)
            })
          }, 100);
          this.question = ''
        }).catch(err => {
          console.log('接口错误', err)
        })
      },
      autoReload () {
        setTimeout(() => {
          this.getQuestion()
          this.autoReload()
        }, 20000)
      },
      getUserInfo () {
        this.service.getUserInfo().then(data => {
          this.userInfo = data.userInfo;
        })
      },
      getQuestion () {
        this.isQusList = false;
        this.chatService.getChatQus(this.service).then(data => {
          this.isQusList = true;
          this.qusList = data.data.questions;
        }).catch(err => {
          console.log('接口错误', err)
        })
      },
      getDetail (item) {
        store.commit('stockDetail', item)
        this.service.navigatePageTo(this.router + '/pages/chatDetail/main')
      },
      getStockMsg (item) {
        store.commit('stockDetail', item)
        this.service.navigatePageTo(this.router + '/pages/chatDetail/main')
      },
      qusCtx (ctx) {
        if (ctx != '') {
          this.sendBtn = true;
        } else {
          this.sendBtn = false;
        }
      },
      chatAttitue (item, att, index) {
        let data = {
          question: index >= 1 ? this.chatList[index - 1].word : '',
          answer: typeof (item.word.answer) == 'string' ? item.word.answer : JSON.stringify(item.word.answer),
          evaluation: att
        }
        this.chatService.getChatEvaluation(this.service, data).then(data => {
          alert('反馈成功')
        })
      },
      moreStock (index) {
        let qus = this.chatList[index - 1].word;
        this.service.navigatePageTo(this.router + '/pages/stockList/main?qus=' + qus)
      },
      upload (event) {
        console.log('record', event)
        let file = event.target.files[0];
      }
    },
    created () {
      this.getUserInfo()
      this.getQuestion()
      this.autoReload()
    }
  }

</script>
<style>
  .font_red {
    color: red;
  }
  .font_green {
    color: green;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .chatList-item {
    display: inline-block;
    margin-right: 10px;
  }
  .chatList-enter-active,
  .chatList-leave-active {
    transition: all 1s;
  }
  .chatList-enter,
  .chatList-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .bgc {
    /* background-color: #fff; */
    border: #dbdbea 0.5px solid;
    padding: 10px;
    border-radius: 5px;
  }
  .listbgc {
    border-bottom: #dbdbea 0.5px solid;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .item {
    margin: 2px;
  }
  .counter-warp {
    height: -webkit-fill-available;
  }
  .qus_area {
    text-align: center;
    position: relative;
    top: 0;
    width: 60%;
    font-size: 14px;
  }
  .title {
    color: red;
    font-weight: bold;
  }
  .qusItem {
    padding: 5px 0;
  }
  .qusUl {
    margin: 10px;
  }
  .foot {
    padding: 0 13px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .foot_input {
    margin-right: 9px;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #e0e0e0;
  }
  .inputBox {
    display: block;
    width: 90%;
    padding: 0 10px;
    line-height: 30px;
    height: 30px;
    border: 0;
    background: none;
    font-size: 16px;
    color: #000;
    /* border-bottom: 0.5px solid #e0e0e0; */
  }
  .foot_btn {
    width: 70px;
    height: 38px;
    margin-right: 0px;
    line-height: 36px;
    background-color: #ff6347;
    color: #fff;
    border-radius: 10px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background-color: #fff;
    left: 0px;
  }
  .chat_area {
    padding-top: 10px;
    padding-bottom: 55px;
    top: 0px;
    /* margin-right: 15px;
    margin-left: 15px; */
    position: relative;
  }
  .chat_li {
    list-style: none;
    width: 100%;
  }
  .chat_word {
    display: flex;
    width: 100%;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin-bottom: 13px;
    position: relative;
  }
  .chat_qus {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    flex-direction: row-reverse;
  }
  .chat-img {
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  .chat_say {
    position: relative;
  }
  .chat_txt {
    margin-left: 16px;
    margin-right: 16px;
    max-width: 250px;
    background: #ffb6c1;
    padding: 11px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    line-height: 21px;
    word-break: break-all;
  }
  .chat_list {
    margin-left: 16px;
    margin-right: 16px;
    background: #fff;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    font-size: 12px;
    color: #333;
    line-height: 21px;
    word-break: break-all;
    width: 85%;
  }
  button {
    font-size: 14px;
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 0;
    box-sizing: border-box;
    -webkit-user-select: none;
    user-select: none;
    width: 100%;
    overflow-x: hidden;
    /* font-size: 60px; */
  }
  .chat_table {
    font-size: 14px;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;
    text-align: center;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    text-align: center;
  }

  .flex-cell {
    flex: 1;
  }

  .changeQusBtn {
    border: 1px solid #999;
    padding: 8px;
    border-radius: 10px;
    line-height: 15px;
    width: 90px;
    background-color: #fff;
  }
  .label_name {
    width: 100%;
    margin-bottom: 10px;
  }
  .label_price {
    font-size: 20px;
    margin-right: 20px;
  }
  .chat_time {
    font-size: 12px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 5px;
    color: #999;
  }
  .chat_attitude {
    font-size: 12px;
    float: left;
    margin-left: 20px;
    margin-top: 5px;
  }
  .more_message {
    width: 100%;
    text-align: center;
    border-top: 1px solid #dbdbea;
    padding-top: 10px;
    margin-top: 5px;
  }
  .inputFile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: inline-block;
    opacity: 0;
    cursor: pointer;
    position: relative;
  }
</style>
