<template>
    <div align="right" style="color: #13ce66" v-text="'用户名:'+username"></div>
    <el-row style="width: 100%;height: 80%">
        <el-col :span="3">
            <MenuBar @changeMenuId="changeMenuId"></MenuBar>
        </el-col>

        <el-col :span="3" v-if="menuId == 1">
            <UnreceiveMsgs :username="username" :userId="userId"></UnreceiveMsgs>
        </el-col>
        <el-col :span="3" v-if="menuId == 2">
            <FriendList :username="username" :userId="userId"></FriendList>
        </el-col>
        <el-col :span="3" v-if="menuId == 3">
            <OrgList :username="username" :userId="userId"></OrgList>
        </el-col>
        <el-col :span="3" v-if="menuId == 4">
            <!--TODO 朋友圈组件-->
        </el-col>

        <el-col :span="18">
            <ChatBox :userId="userId" :username="username"></ChatBox>
        </el-col>
    </el-row>
</template>

<script setup>
import MenuBar from '../components/MenuBar.vue'
import FriendList from '../components/FriendList.vue'
import ChatBox from '../components/ChatBox.vue'
import UnreceiveMsgs from '../components/UnreceiveMsgs.vue'
import OrgList from '../components/OrgList.vue'
import { ref,onBeforeMount } from 'vue'
import { useRoute } from "vue-router"

const username = ref("")
const userId = ref()
const menuId = ref(3)

const route = useRoute()

function changeMenuId(key) {
    menuId.value = key
}

onBeforeMount(()=> {
    userId.value = Number(route.query.userId)
    username.value = route.query.username
})

</script>

<style>

</style>
