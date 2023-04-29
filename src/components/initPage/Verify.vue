<template>
  <div>
    请填写发送到邮箱中的验证码<input type="text" v-model="verifyCode">
    <div style="color: red" id="div"></div>
    <br>
    <input type="button" value="提交" v-on:click="sub()"></input>
  </div>
</template>

<script>
export default {
  name: 'Verify',
  data() {
    return {
      verifyCode: ''
    }
  },
  methods: {
    sub() {
      this.$axios
        .get('/verify?username=' + this.$global_msg.username + '&verifyCode=' + this.verifyCode)
        .then(successResponse => {
          if (successResponse.data.code === 203) {
            this.$router.replace('/updateInfo')
          } else {
            document.getElementById("div").innerText = '抱歉，你的验证码错误'
          }
        })
        .catch(failResponse => {
          document.getElementById("div").innerText = '服务器无响应'
        })
    }
  }
}
</script>

<style scoped>

</style>
