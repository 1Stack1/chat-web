<template>
    <el-card style="width: 100%;height: 800px; color: blue">
        <div style="text-align: center;font-size: 28px;margin-bottom: 10px">好友列表</div>
        <el-tree :props="props" :load="loadNode" @node-click="handleNodeClick" lazy  />
    </el-card>
</template>

<script lang="ts" setup>
import { ref,watch } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElMessage } from 'element-plus'
import instance from "../utils/request"
import bus from '../utils/eventbus'

interface Tree {
    name: string
    leaf: boolean
    id: number
    nowNum: number
    maxNum: number
    ownId: number
    friendId: number
    groupId: number
}
const props = {
    label: 'name',
    isLeaf: 'leaf'
}
const toUser = ref('')
const toUserId = ref()
const historyList = ref()

const parentVal = defineProps({
    username: String,
    userId: Number
})

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
    //获取分组列表
    if (node.level === 0) {
        instance.get("/groupList/"+ parentVal.username)
            .then(successResponse =>{
                return resolve(successResponse.data)
            }).catch(failResponse =>{
                ElMessage.error('服务器异常')
            })
    }
    //获取该分组的用户列表
    if (node.level >= 1) {
        instance.get("/friendList/"+node.data.id)
                .then(successResponse =>{
                    return resolve(successResponse.data)
                })
                .catch(failResponse =>{
                    ElMessage.error('服务器异常')
                })
    }
}

const handleNodeClick = (data: Tree) => {
    if(toUser.value != data.name){
        //获得被点击用户信息
        toUser.value = data.name
        toUserId.value = data.friendId
        //总线发送点击用户信息
        bus.emit('toName',toUser)
        bus.emit('toId',toUserId)
        bus.emit('isOrg',ref(false))
        //获取与被点击用户的聊天记录
        instance.post("/historyList",{
            userId: parentVal.userId,
            toUserId: toUserId.value
        }).then((successResponse)=>{
            historyList.value = successResponse.data
            bus.emit('historyList',historyList)
        }).catch((failResponse)=>{
            ElMessage.error('服务器异常')
        })
    }
}

</script>
