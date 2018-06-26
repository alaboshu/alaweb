<template>
    <div class="container">
        <div class="qus_area">
            <div class="title">你可以这样问我:</div>
            <div class="qusUl">
                <transition-group name="list" tag="p">
                    <div v-for="(item,index) in qusList" :key="index" class="qusItem" @click="getAnswer(item)" v-if="isQusList">
                        <div>{{item}}</div>
                    </div>
                </transition-group>
            </div>
            <button class="changeQusBtn" @click="getQuestion">换一换</button>
        </div>
        <div class="chat_area">
            <transition-group name="chatList" tag="p">
                <div class="chat_li" v-for="(item,index) in chatList" :key="index">
                    <div class="chat_time">{{item.dateTime}}</div>
                    <div class="chat_word chat_qus" v-if="item.position=='right'">
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/head_2.jpg" alt="userLogo">
                        <div class="chat_say">
                            <div class="chat_txt">{{item.word}}</div>
                        </div>
                    </div>
                    <div class="chat_word" v-if="item.position=='left'&&item.word.type=='sentence'">
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.jpg" alt="liangLogo">
                        <div class="chat_say">
                            <div class="chat_txt">{{item.word.answer}}</div>
                            <div class="chat_attitude">
                                <span style="padding-right: 10px" @click="chatAttitue(item, 0, index)">👍</span>
                                <span @click="chatAttitue(item, 1, index)">👎</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat_word" v-if="item.position=='left'&&item.word.type=='label'">
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.jpg" alt="liangLogo">
                        <div class="chat_say">
                            <div class="chat_list" v-for="($item,$index) in item.word.answer" :key="$index">
                                <div @click="getStockMsg($item)" :class="{'font_red': $item.inc>=0,'font_green': $item.inc<0}">
                                    <div class="label_name">{{$item.name}} （{{$item.code}}）</div>
                                    <span class="label_price">{{$item.price}}</span>
                                    <span class="label_inc">{{$item.inc}}% - {{$item.inc_value}}</span>
                                </div>
                            </div>
                            <div class="chat_attitude">
                                <span style="padding-right: 10px;" @click="chatAttitue(item, 0, index)">👍</span>
                                <span @click="chatAttitue(item, 1, index)">👎</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat_word" v-if="item.position=='left'&&item.word.type=='form'">
                        <img class="chat-img userinfo-avatar" src="./../../../static/res/img/xiaogua.jpg" alt="liangLogo">
                        <div class="chat_say">
                            <div class="chat_list" v-if="item.word.answer.length != 0">
                                <div class="flex-cell flex-row listbgc">
                                    <span class="flex-cell flex-row item">股票名称</span>
                                    <span class="flex-cell flex-row item">最新价</span>
                                    <span class="flex-cell flex-row item">涨跌幅</span>
                                    <div class="flex-cell flex-row" v-if="item.word.indication_name.length>0" v-for="($item,$index) in item.word.indication_name" :key="$index">
                                        <span class="flex-cell flex-row item">{{$item}}</span>
                                    </div>
                                    <span class="flex-cell flex-row item" v-if="item.word.block_name.length>0">板块概念</span>
                                </div>
                                <div v-for="($item,$index) in item.word.answer" :key="$index">
                                    <div @click="getDetail($item)">
                                        <div class="flex-cell flex-row" :class="{'font_red': $item.inc>=0,'font_green': $item.inc<0}">
                                            <span class="flex-cell flex-row item">{{$item.name}}</span>
                                            <span class="flex-cell flex-row item">{{$item.price}}</span>
                                            <span class="flex-cell flex-row item">{{$item.inc}}</span>
                                            <div class="flex-cell flex-row" v-if="item.word.indication_name.length>0" v-for="($$item,$$index) in $item.indication_value" :key="$$index">
                                                <span class="flex-cell flex-row item">{{$$item|money}}</span>
                                            </div>
                                            <span class="flex-cell flex-row item" v-if="item.word.block_name.length>0">{{item.word.block_name[0]}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_say" v-else>
                                <div class="chat_txt">暂无相关信息</div>
                            </div>
                            <div class="chat_attitude">
                                <span style="padding-right: 10px;" @click="chatAttitue(item, 0, index)">👍</span>
                                <span @click="chatAttitue(item, 1, index)">👎</span>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
        <transition name="fade">
            <div class="footer" v-show="isInput">
                <div class="foot">
                    <!-- <input type="file" accept="audio/*" capture="microphone" class="inputFile" placeholder="录音" @change="upload"> -->
                    <div class="foot_input">
                        <input placeholder='请输入问题' type='text' x-webkit-speech=”x-webkit-speech” v-model="question" class="inputBox" @keyup="qusCtx(question)" @change="qusCtx(question)" />
                    </div>
                    <button @click="getAnswer(question)" class="foot_btn" v-show="sendBtn">发送</button>
                </div>
            </div>
        </transition>
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
