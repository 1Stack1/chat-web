<template>
    <el-card style="width: 100%;height: 800px">
        <div :style="textStyle">一起聊天吧</div>
        <div style="color: blue" v-text="toUser"></div>
        <div :style="chatBoxStyle">
            <div v-for="(item,index) in historyList" :key="index">
                <div align="right" v-if="item.fromId=== parentVal.userId" style="color: dodgerblue">
                    <el-tag size="mini">{{item.content}}</el-tag>
                    {{parentVal.username}}
                </div>
                <div align="left" v-else style="color: coral">
                    {{item.fromName != undefined ? item.fromName : toUser}}
                    <el-tag size="mini" type="danger">{{item.content}}</el-tag>
                </div>
            </div>
        </div>
        <InputBox :userId="parentVal.userId" @addMsg="addMsg"></InputBox>
    </el-card>
</template>

<script setup>
import InputBox from '../components/InputBox.vue'
import bus from '../utils/eventbus'
import { ref } from 'vue'

const toUser = ref('xxx')
const toUserId = ref('')
const historyList = ref([])
const parentVal = defineProps({
    username: Number,
    userId: Number
})

//从总线上获取被点击用户的信息以及聊天记录
bus.on('toName', (username) => { toUser.value = username.value })
bus.on('toId', (userId) => { toUserId.value = userId.value })
bus.on('historyList',(list)=>{historyList.value = list.value})

function addMsg(msg) {
    historyList.value.push(msg)
}

const textStyle = ref({
    'text-align': 'center',
    'font-size': '28px',
    'margin-bottom': '10px'
})
const chatBoxStyle = ref({
    "width": "100%",
    "height": "550px",
    "border":"1px solid #000000",
    "border-radius": "5px",
    "overflow-y":"auto",
    "margin-bottom": "10px"
})

</script>

<style scoped>
</style>
