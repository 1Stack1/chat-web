<template>
  <div align="center" style="width: 100%">
    <a href="/logout">[安全退出]</a>
    <div align="right" style="color: #13ce66" id="getfrom"></div>
    <el-row style="width: 100%;height: 80%">
      <!--      用户列表-->
      <el-col :span="6">
        <el-card style="width: 100%;height: 800px">
          <div style="text-align: center;font-size: 28px;margin-bottom: 10px">当前聊天室成员</div>
          <div style="height: 700px;overflow-y:auto;border:1px solid #000000;border-radius: 5px">
            <div v-for="(item,index) in userList" :key="index" style="padding: 10px;margin-top: 10px;font-size: 20px">
              <button style="height: 40px;width: 100%" @click="setTo(item)">{{item}}</button>
            </div>
          </div>
        </el-card>
      </el-col>
      <!--      聊天室-->
      <el-col :span="18">
        <div style="width: 100%;">
          <el-card style="width: 100%;height: 800px">
            <div style="text-align: center;font-size: 28px;margin-bottom: 10px">一起聊天吧</div>
            <div style="color: blue" id="getTo"></div>
            <div
              style="width: 100%;height: 550px;border:1px solid #000000;border-radius: 5px;overflow-y:auto;margin-bottom: 10px">
              <div v-for="(item,index) in msgList" :key="index">
                <div align="right" v-if="item.from===user" style="color: dodgerblue">{{item.time}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.msg}}
                  <el-tag size="mini">{{item.from}}</el-tag>
                </div>
                <div align="left" v-else style="color: coral">
                  <el-tag size="mini" type="danger">{{item.from}}</el-tag>
                  {{item.msg}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.time}}
                </div>
              </div>
            </div>
            <el-input @keyup.enter.native="send" type="textarea" v-model="message.msg"
                      :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入聊天内容"></el-input>
            <div align="right">
              <el-button type="primary" style="margin-top: 10px" @click="send">发送</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

let socket;
let toUser;
export default {
  name: 'Chat',
  data() {
    return {
      user: '',// 登录用户
      msgList: [],// 消息记录列表
      message: {// 发送的消息
        time: null,//时间
        to: '',//发给谁
        from: '',
        msg: ''
      },
      userList: []// 在线用户列表
    }
  },
  methods: {
    init() {
      let that = this;
      if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        this.user = this.$global_msg.username
        this.message.from = this.$global_msg.username
        document.getElementById("getfrom").innerText = "用户名：" + this.user
        let socketUrl = "ws://localhost:8443/chatroom/chat/" + this.$global_msg.username;
        if (socket != null) {
          socket.close();
          socket = null;
        }

        socket = new WebSocket(socketUrl);// 开启一个websocket服务
        socket.onopen = function () {//打开事件
          socket.send(JSON.parse(this.message))
          console.log("websocket已打开");
        };

        socket.onmessage = function (msg) {//  浏览器端收消息，获得从服务端发送过来的文本消息
          let data = JSON.parse(msg.data)
          /*if (data.userNames) {// userNames存在则是有人登录，获取在线人员信息
            that.userList = data.userNames
          } else {// userNames不存在则是有人发消息
            that.msgList.push(data)
          }*/
          this.userList = data
        };
        socket.onclose = function () {//关闭事件
          console.log("websocket已关闭");
        };
        socket.onerror = function () {//发生了错误事件
          console.log("websocket发生了错误");
        }
      }
    },
    send() {
      if (!this.message.msg) {
        this.$message({
          message: '大兄弟，请输入聊天消息！',
          type: 'warning'
        });
      } else {
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          let date = new Date();
          this.message.time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + new Date().toLocaleTimeString();
          socket.send(JSON.stringify(this.message));
          this.message.msg = '';
        }
      }
    },
    setTo(item) {
      if (item != toUser) {
        if (item != this.message.from) {
          this.message.to = item
          toUser = item
          document.getElementById("getTo").innerText = "您正在和" + this.message.to + "聊天"
          socket.send(JSON.stringify(this.message));
        } else {
          alert("点击错误,不能和您自己聊天")
        }
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>
