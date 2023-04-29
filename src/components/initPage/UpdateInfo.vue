<template>
  <div>
    <div align="center" id="div1" style="color: blue"></div>
    <br>
    <div align="center" id="div2" style="color: red"></div>
    <table align="center">
      <tr>
        <td>真实姓名:</td>
        <td><input type="text" v-model="info.realname" placeholder="请输入姓名"/></td>
      </tr>
      <tr>
        <td>学校:</td>
        <td><input type="text" v-model="info.school" placeholder="请输入学校"/></td>
      </tr>
    </table>
    <button v-on:click="sub">提交</button>
    <br>
    <a href="/login"><-上一步</a>
    &nbsp;&nbsp;&nbsp;
    <a href="/login">跳过-></a>
  </div>

</template>

<script>
export default {
  name: 'UpdateInfo',
  data() {
    return {
      info: {
        realname: '',
        school: ''
      }
    }
  },
  mounted: function () {
    document.getElementById("div1").innerText = "请输入您的姓名和学校作为密保,您也可以选择跳过,但是会使您的账号不安全"
  },
  methods: {
    sub() {
      this.$axios
        .post('/updateInfo', {
          realname: this.info.realname,
          school: this.info.school
        })
        .then(successResponse => {
          if (successResponse.data === 200) {
            this.$router.replace({path: '/login'})
          } else {
            document.getElementById("div2").innerText = '非法操作,请先注册'
          }
        })
        .catch(failResponse => {
          document.getElementById("div2").innerText = "服务器未响应"
        })
    }
  }

}
</script>

<style scoped>

</style>
