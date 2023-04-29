<template>
  <div>
    <table align="center">
      <tr>
        <td>用户名:</td>
        <td><input type="text" placeholder="用户名或邮箱" v-model="loginForm.username"/></td>
      </tr>
      <tr>
        <td>密码:</td>
        <td><input type="password" placeholder="密码" v-model="loginForm.password"/></td>
      </tr>
    </table>
    <button v-on:click="login">登录</button>
    <button v-on:click="signup">注册</button>
    <br>
    <div style="color: red" id="logindiv"></div>
    <br>
    <a href="/modifypw">修改密码</a>
    <a href="/forgetpw">忘记密码</a>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login() {
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$global_msg.changeUsername(this.loginForm.username)
            this.$global_msg.changeToken(successResponse.data.data)
            this.$router.replace('/chat')
          } else {
            document.getElementById("logindiv").innerText = "账号或密码错误"
          }
        })
        .catch(failResponse => {
          document.getElementById("logindiv").innerText = "服务器未响应"
        })
    },
    signup() {
      this.$router.replace({path: '/signup'})
    }
  }
}
</script>

