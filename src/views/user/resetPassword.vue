<template>
  <div class="resetPassword">
    <Anarres></Anarres>
    <div class="userInput">
      <el-input
        class="input"
        v-model="userForm.userEmail"
        placeholder="请输入邮箱"
      ></el-input>
      <el-input
        class="input"
        v-model="userForm.username"
        placeholder="请输入用户名"
      ></el-input>

      <el-input
        class="input"
        v-model="userForm.password"
        placeholder="请输入新密码：长度大于6位"
        show-password
      ></el-input>
      <br />
      <br />
      <el-button class="seperate" type="primary" @click="resetPassword()"
        >重设密码</el-button
      >
      <el-link class="seperate" type="primary" @click="loginPage">登录</el-link>
    </div>
  </div>
</template>
<script>
import Anarres from "@/components/Anarres";
export default {
  data() {
    return {
      userForm: {
        username: "",
        userEmail: "",
        password: "",
      },
    };
  },
  components: {
    Anarres,
  },
  methods: {
    loginPage() {
      this.$router.push({
        path: "/",
      });
    },
    resetPassword() {
      if (!/.*@.*.com/.test(this.userForm.userEmail)) {
        this.$message.error("邮箱名称不合法");
        return;
      }
      if (this.userForm.username.length < 2) {
        this.$message.error("用户名请大于两个字 ");
        return;
      }
      if (this.userForm.password.length < 6) {
        this.$message.error("密码请大于6位");
        return;
      }
      this.$store
        .dispatch("ResetPassword", this.userForm)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: "重设密码成功",
              type: "success",
            });
            this.$router.push({
              path: "/",
            });
          } else {
            this.$message.error("重设密码失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
  },
};
</script>
<style>
h1 {
  color: tan;
}

.input {
  width: 95%;
  border: 10px solid white;
  margin: auto;
  position: relative;
}
.userInput {
  width: 40%;
  border: 10px solid white;
  margin: auto;
}
</style>