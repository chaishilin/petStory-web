<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="index"
        ><span style="font-size: 20px">首页</span></el-menu-item
      >
      <el-menu-item index="programList"
        ><span style="font-size: 20px">程序清单</span></el-menu-item
      >
      <el-menu-item index="programTemplateList"
        ><span style="font-size: 20px">程序模板</span></el-menu-item
      >
      <el-menu-item index="testCasePage"
        ><span style="font-size: 20px">数据类型列表</span></el-menu-item
      >
      <el-submenu index="user" class="user">
        <template slot="title">
          <img src="../assets/logo.png" size="30" height="30" width="30" />
          <span>{{ username }}</span>
        </template>
        <el-menu-item index="userInfo" disabled
          ><span style="font-size: 20px">我的主页</span></el-menu-item
        >
        <el-menu-item index="logout"
          ><span style="font-size: 20px">退出</span></el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      username: localStorage.getItem("username"),
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
      if (key == "programList") {
        this.$router.push({
          path: "/programListPage",
        });
      } else if (key == "programTemplateList"){
          this.$router.push({
          path: "/programTemplateListPage",
        });
      }else if (key == "testCasePage"){
          this.$router.push({
          path: "/dataTypePage",
        });
      } else if (key == "index") {
        this.$router.push({
          path: "/programListPage",
          query: { userId: "public" },
        });
      } else if (key == "logout") {
        this.$store
          .dispatch("UserLogout")
          .then((result) => {
            let status = result.data.code;
            console.log(result.data);
            if (status == 200) {
              this.$message({
                message: "退出登录成功",
                type: "success",
              });
              localStorage.clear("token");
              localStorage.clear("userId");
              this.$router.push({
                path: "/",
              });
            } else {
              this.$message.error("退出登录失败 " + result.data.msg);
            }
          })
          .catch((err) => {
            return false;
          });
      }
    },
  },
};
</script>
<style>
.user {
  position: absolute;
  right: 0px;
};
span {
  font-size: 100px;
  color: tan;
  border: 10px solid black;
}
</style>