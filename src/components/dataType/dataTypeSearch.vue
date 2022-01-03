<template>
  <div class="dataTypeSearch">
    <br>
    <el-form :inline=true :model="searchInfo">
      <el-form-item label="测试程序id:">
          <el-input v-model="searchInfo.dataTypeId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="语言类型:">
           <el-input v-model="searchInfo.language" placeholder=""></el-input>
           </el-form-item>
      <el-form-item label="使用状态:">
          <el-select v-model="searchInfo.state" placeholder="请选择">
            <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
    </el-select>
  </el-form-item>
      <el-form-item >
          <el-button type="primary" @click="search">搜索</el-button></el-button>
      </el-form-item>
    </el-form>
       <br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInfo: {
        dataTypeId: "",
        language: "",
        state: "",
      },
      stateList: [
        {
          label: "启用",
          value: "01",
        },
        {
          label: "未启用",
          value: "02",
        },
      ],
    };
  },
  methods: {
    search() {
      this.$store
        .dispatch("DataTypeList", this.searchInfo)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.$message({
              message: "查询成功 - 实际功能未完成",
              type: "success",
            });
            this.$emit("flash"); //刷新该组件
          } else if (status == 401) {
            this.$router.push({
              path: "/",
            });
          } else {
            alert(result.data.msg);
          }
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>

<style>
</style>