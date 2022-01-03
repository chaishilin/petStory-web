<template>
  <div class="userInfo">
    <h1>{{ msg }}</h1>
    <!-- <el-table :data="userInfoList">
      <el-table-column label="userId" prop="userId"></el-table-column>
      <el-table-column label="username" prop="username"></el-table-column>
      <el-table-column label="userPhone" prop="userPhone"></el-table-column>
      <el-table-column label="userEmail" prop="userEmail"></el-table-column>
      <el-table-column label="userState" prop="userState"></el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "接口详情",
      userInfoList: [
        {
          userId: "",
          username: "",
          userPhone: "",
          userEmail: "",
          userState: "",
        },
      ],
    };
  },
  components: {
    doProgram,
  },
  methods: {},
  mounted: function () {
    this.$store
      .dispatch("UserInfoList")
      .then((result) => {
        let status = result.data.code;
        console.log(result.data);
        if (status == 200) {
          this.userInfoList = result.data.data;
          console.log("yes");
        } else if (status == 401) {
          this.$router.push({
            path: "/",
          });
        } else {
          console.log("no");
          alert(result.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
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
</style>
