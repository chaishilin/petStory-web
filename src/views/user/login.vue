<template>
  <div class="login">
    <Anarres></Anarres>
    <div class="userInput">
      <el-input
        class="el-input"
        v-model="userForm.username"
        placeholder="请输入用户名"
        >用户名</el-input
      >
      <el-input
        class="el-input"
        v-model="userForm.password"
        placeholder="请输入密码"
        show-password
        >密码</el-input
      >
    </div>
    <el-button type="primary" @click="login">登录</el-button>
    <el-link type="primary" @click="registerPage">注册</el-link>
    <el-link type="primary" @click="resetPasswordPage">忘记密码</el-link>
  </div>
</template>

<script>
import Anarres from "@/components/Anarres";
export default {
  name: "login",
  clearUserInfo: false,
  data() {
    return {
      msg: "Welcome to urras",
      userForm: {
        username: "",
        password: "",
      },
      info: "",
    };
  },
  components: {
    Anarres,
  },
  methods: {
    login() {
      this.$store
        .dispatch("Login", this.userForm)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            localStorage.setItem("token", result.data.data.token);
            localStorage.setItem("userId", result.data.data.userId);
            localStorage.setItem("username", result.data.data.username);

            this.$router.push({
              path: "/programListPage",
            });
          } else {
            this.$message.error("登录失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    registerPage() {
      this.$router.push({
        path: "/register",
      });
    },
    resetPasswordPage() {
      this.$router.push({
        path: "/resetPassword",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.userInput {
  width: 40%;
  border: 10px solid white;
  margin: auto;
}
.el-input {
  width: 95%;
  border: 10px solid white;
  margin: auto;
  position: relative;
}
</style>
