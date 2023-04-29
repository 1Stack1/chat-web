<template>
  <div>
    <table align="center">
      <tr>
        <td>用户名:</td>
        <td><input type="text" v-model="signupForm.username" placeholder="请输入用户名" id="username"
                   v-on:blur="confirmusername()"/></td>
        <td>
          <div style="color: red" id="usernamediv"></div>
        </td>
      </tr>
      <tr>
        <td>邮箱:</td>
        <td><input type="text" v-model="signupForm.email" placeholder="请输入邮箱" id="email" v-on:blur="confirmemail()"/>
        </td>
        <td>
          <div style="color: red" id="emaildiv"></div>
        </td>
      </tr>
      <tr>
        <td>密码:</td>
        <td><input type="password" v-model="signupForm.password" placeholder="请输入密码" id="password"
                   v-on:blur="confirmpassword()"/></td>
        <td>
          <div style="color: red" id="psdiv"></div>
        </td>
      </tr>
      <tr>
        <td>确认密码:</td>
        <td><input type="password" placeholder="请重新输入密码" id="confirm" v-on:blur="confirm()"/></td>
        <td>
          <div style="color: red" id="cfdiv"></div>
        </td>
      </tr>
    </table>
    <button v-on:click="signup">确认</button>
    <br>
    <div style="color: red" id="signupdiv"></div>
  </div>
</template>

<script>


export default {
  name: 'Signup',
  data() {
    return {
      signupForm: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    confirmusername() {
      const regExp = new RegExp(/^([0-9]|[a-z]|[A-Z])+$/);
      const undiv = document.getElementById("usernamediv");
      const username = document.getElementById("username").value;
      if (username == "") {
        undiv.innerText = "用户名不能为空";
      } else if (username.length < 6 || username.length > 15) {
        undiv.innerText = "用户名长度应大于6小于15";
      } else if (!regExp.test(username)) {
        undiv.innerText = "用户名只能包含数字或者字母";
      } else {
        undiv.innerText = "";
      }
    },
    confirmemail() {
      const regExp = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
      const email = document.getElementById("email").value
      const emaildiv = document.getElementById("emaildiv")
      if (email != "") {
        if (!regExp.test(email)) {
          emaildiv.innerText = "邮箱格式不正确"
        } else {
          emaildiv.innerText = ""
        }
      } else {
        emaildiv.innerText = "请输入邮箱"
      }
    },
    confirmpassword() {
      const password = document.getElementById("password").value
      const psdiv = document.getElementById("psdiv")
      if (password == "") {
        psdiv.innerText = "密码不能为空";
      } else if (password.length > 15) {
        psdiv.innerText = "密码长度应小于15";
      } else {
        psdiv.innerText = "";
      }
    },
    confirm() {
      const password = document.getElementById("password").value
      const conform = document.getElementById("confirm").value
      const cfdiv = document.getElementById("cfdiv")
      if (conform == "") {
        cfdiv.innerText = "请确认密码"
      } else if (conform != password) {
        cfdiv.innerText = "密码不正确"
      } else {
        cfdiv.innerText = ""
      }
    },
    signup() {
      this.confirmusername()
      this.confirmpassword()
      this.confirmemail()
      this.confirm()
      const usernamediv = document.getElementById("usernamediv").innerText
      const emaildiv = document.getElementById("emaildiv").innerText
      const psdiv = document.getElementById("psdiv").innerText
      const cfdiv = document.getElementById("cfdiv").innerText
      if (emaildiv == "" && usernamediv == "" && psdiv == "" && cfdiv == "") {
        this.$axios
          .post('/signup', {
            username: this.signupForm.username,
            email: this.signupForm.email,
            password: this.signupForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 202) {
              this.$global_msg.changeSigningUser(this.signupForm.username)
              this.$router.replace({path: '/verify'})
            } else {
              document.getElementById("signupdiv").innerText = "用户名或邮箱已存在"
            }
          })
          .catch(failResponse => {
            document.getElementById("signupdiv").innerText = "服务器未启动"
          })
      }
    }
  }
}
</script>
