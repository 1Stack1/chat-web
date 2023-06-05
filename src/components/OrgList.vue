<template>
    <el-card style="width: 100%;height: 800px">
        <div v-for="(item,index) in orgList" :key="index">
            <el-button type="primary" text="true" size="large" @click="viewHistory(item)">
                {{item.orgName}}
            </el-button>
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

const orgList = ref()
const histories = ref()

function viewHistory(item){
    instance.get("/orgHistories/"+item.id)
        .then(successResponse =>{
            bus.emit('toName',ref(item.orgName))
            bus.emit('toId',ref(item.id))
            bus.emit('isOrg',ref(true))
            histories.value = successResponse.data
            bus.emit('historyList',histories)
        }).catch(failResponse =>{
            ElMessage.error('服务器异常')
        })
}

onMounted(()=>{
    instance.get("/orgList/"+parentVal.userId)
        .then(successResponse =>{
            orgList.value = successResponse.data
        }).catch(failResponse =>{
            ElMessage.error('服务器异常')
        })
})
</script>

<style scoped>

</style>
