<template>
    <table align="center">
        <tr>
            <td>用户名:</td>
            <td><input type="text" placeholder="用户名或邮箱" v-model="username"/></td>
        </tr>
        <tr>
            <td>密码:</td>
            <td><input type="password" placeholder="密码" v-model="password"/></td>
        </tr>
    </table>
    <button @click="login">登录</button>
    &nbsp;
    <button @click="signup">注册</button>
    <br>
    <a href="/modifypw">修改密码</a>
    &nbsp;
    <a href="/forgetpw">忘记密码</a>
</template>

<script setup>
import { ref } from 'vue'
import instance from "../utils/request"
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router"

const router = useRouter()
const username = ref('')
const password = ref('')
const divtext = ref('')

function login() {
    instance.post("/login",{
        username: username.value,
        password: password.value
    }).then((successResponse)=>{
        if(successResponse.data.code == 200){
            router.push({
                path: '/chat',
                query: {
                    userId: successResponse.data.data.id,
                    username: username.value
                }
            })
        }else{
            ElMessage.error('用户名或密码错误')
        }
    }).catch((failResponse)=>{
        ElMessage.error('服务器异常')
    })
}

function signup() {
    this.$router.replace({path: '/signup'})
}
</script>

<style scoped>

</style>
