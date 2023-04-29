<template>
  <div>
    <table align="center">
      <tr>
        <td>用户名</td>
        <td><input type="text" v-model="userinfo.username"></input></td>
      </tr>
      <tr>
        <td>新密码</td>
        <td><input type="text" v-model="userinfo.password"></input></td>
      </tr>
      <tr>
        <td>重新输入</td>
        <td><input type="text" v-model="userinfo.require"></input></td>
      </tr>
      <tr>
        <td>真实姓名</td>
        <td><input type="text" v-model="userinfo.realname"></input></td>
      </tr>
      <tr>
        <td>邮箱</td>
        <td><input type="text" v-model="userinfo.email"></input></td>
      </tr>
      <tr>
        <td>学院</td>
        <td><input type="text" v-model="userinfo.college"></input></td>
      </tr>
    </table>
    <button v-on:click="sub">确认</button>
  </div>
</template>

<script>
export default {
  name: 'Modifypw',
  data() {
    return {
      userinfo: {
        username: '',
        password: '',
        require: '',
        email: '',
        college: '',
        realname: ''
      }
    }
  },
  methods: {
    sub() {
      this.$axios
        .post('/modifypw', {
          username: this.userinfo.username,
          password: this.userinfo.password,
          email: this.userinfo.email,
          college: this.userinfo.college,
          realname: this.userinfo.realname
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$router.replace({path: '/login'})
          } else {

          }
        })
        .catch(failResponse => {

        })
    }
  }
}
</script>

<style scoped>

</style>
