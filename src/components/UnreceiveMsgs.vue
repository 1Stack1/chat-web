<template>
    <el-card style="width: 100%;height: 800px">
        <div v-for="(item,index) in histories" :key="index">
            <el-badge :value="item.count" :max="99">
                <el-button type="primary" text="true" size="large" @click="viewHistory(item)">
                    {{item.fromUsername}}
                    <br>
                    {{item.content}}
                </el-button>
            </el-badge>
        </div>
    </el-card>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import instance from "../utils/request";
import {ElMessage} from "element-plus";
import bus from "../utils/eventbus";

const parentVal = defineProps({
    username: Number,
    userId: Number
})
const histories = ref()
const historyList = ref()

function viewHistory(item){
    if(item.count != ''){
        item.count = ''
        instance.post("/confirmReceive",{
            userId: Number(parentVal.userId),
            fromId: Number(item.fromId)
        }).then(successResponse =>{
            bus.emit('toName',ref(item.fromUsername))
            bus.emit('toId',ref(item.fromId))
            bus.emit('isOrg',ref(false))
            historyList.value = successResponse.data
            bus.emit('historyList',historyList)
        }).catch(failResponse =>{
            ElMessage.error('服务器异常')
        })
    }
}

onMounted(()=>{
    instance.get("/unreceivedMsgs/"+parentVal.userId)
        .then(successResponse =>{
            histories.value = successResponse.data
        }).catch(failResponse =>{
            ElMessage.error('服务器异常')
        })
})
</script>

<style scoped>

</style>
