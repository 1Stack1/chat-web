<template>
    <el-input @keyup.enter.native="send" type="textarea" v-model="content"
              :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入聊天内容"></el-input>
    <div align="right">
        <el-button type="primary" style="margin-top: 10px" @click="send">发送</el-button>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import bus from '../utils/eventbus'
import { getCurrentInstance } from 'vue'

const proxy  = getCurrentInstance()
const toUserId = ref()
const content = ref('')
const state = ref()
let socket

bus.on('toId', (userId) => {toUserId.value = userId.value})
bus.on('isOrg', (flag) => {flag.value ? state.value = 2 : state.value = undefined})

const emit = defineEmits(['addMsg'])

const parentVal = defineProps({
    userId: Number
})

onMounted(()=>{init()})

function send() {
    if (!content.value) {
        ElMessage({
            message: '请输入聊天记录',
            type: 'warning',
        })
    } else {
        //将记录加到前端页面
        emit('addMsg', {
            fromId: parentVal.userId,
            toId: toUserId.value,
            content: content.value,
            state:  state.value
        })
        //向后端发送聊天信息
        socket.send(JSON.stringify({
            fromId: parentVal.userId,
            toId: toUserId.value,
            content: content.value,
            state: state.value != undefined ? 2 : 0
        }))
        //清空对话框
        content.value=''
    }
}

function init() {
    var that = this;  //在methods中自定义的函数不能使用this.可以使用箭头函数或者定义一个变量指向this

    let socketUrl = "ws://abnlch.fun:8443/chatroom/api/" + parentVal.userId;

    socket = new WebSocket(socketUrl);// 开启一个websocket服务

    socket.onopen = function () {//打开事件
        console.log("websocket已打开");
    };

    socket.onmessage = function (msg) {//  浏览器端收消息，获得从服务端发送过来的文本消息
        emit('addMsg',JSON.parse(msg.data))
        console.log(JSON.parse(msg.data))
    };

    socket.onclose = function () {//关闭事件
        console.log("websocket已关闭");
    };

    socket.onerror = function () {//发生了错误事件
        console.log("websocket发生了错误");
    }

}
</script>

<style scoped>

</style>
