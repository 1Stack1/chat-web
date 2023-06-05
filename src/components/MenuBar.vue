<template>
    <el-card style="width: 100%;height: 800px;">
        <div style="color: green">功能</div>
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="clickHandle">
                <el-icon><Bell /></el-icon>
                <span slot="title">新消息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="clickHandle">
                <el-icon><User /></el-icon>
                <span slot="title">好友</span>
            </el-menu-item>
            <el-menu-item index="3" @click="clickHandle">
                <el-icon><ChatRound /></el-icon>
                <span slot="title">群聊</span>
            </el-menu-item>
            <el-menu-item index="4" @click="clickHandle">
                <el-icon><More /></el-icon>
                <span slot="title">朋友圈</span>
            </el-menu-item>
        </el-menu>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
const menuId = ref(1)

const emit = defineEmits(['changeMenuId'])


function clickHandle(item) {
    emit('changeMenuId',item.index)
}
</script>

<style scoped>
</style>
