<template>
  <div class="dataTypeList">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-model="this.dataTypeInfo"
        :name="dataTypeInfo.dataTypeId"
        :key="dataTypeInfo.dataTypeId"
      >
        <template slot="title">
          <el-tag type="primary"> 新建数据类型 </el-tag>
        </template>
        <data-type-item @flash="flash" :info="dataTypeInfo"></data-type-item>
      </el-collapse-item>
      <el-collapse-item
        v-for="(dataTypeInfo, index) in dataTypeInfoList"
        :name="dataTypeInfo.dataTypeId"
        :key="dataTypeInfo.dataTypeId"
      >
        <template slot="title">
          <h3 class="caseTitle">{{ dataTypeInfo.title }}</h3>
          <h4 class="caseTitle">{{ dataTypeInfo.definition }}</h4>
          <el-tag class="caseTitle" type="success">{{
            dataTypeInfo.language
          }}</el-tag>

          <el-tag
            v-if="dataTypeInfo.inUse == true"
            class="caseTitle"
            type="success"
            >已启用</el-tag
          >
          <el-tag v-else class="caseTitle" type="warning">未启用</el-tag>
        </template>
        <data-type-item @flash="flash" :info="dataTypeInfo"></data-type-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import DataTypeItem from "./dataTypeItem.vue";

export default {
  data() {
    return {
      dataTypeQuery: {},
      dataTypeInfo: {
        title: "列表",
        dataTypeId: null,
        inUse: false,
        language: "python",
        example: "[1,2,3]",
        content: "备注...",
        definition: "",
        createrId: "232",
        state: "01",
        inUse: true,
        isDynamic: true,
      },
      dataTypeInfoList: [{}],

      activeNames: ["2323", "23233"],
    };
  },
  components: {
    DataTypeItem,
  },
  created() {
    this.getCaseList();
  },
  methods: {
    //todo 请求testCase的接口
    handleChange(val) {
      console.log(val);
    },
    getCaseList() {
      this.$store
        .dispatch("DataTypeList", this.dataTypeQuery)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.dataTypeInfoList = result.data.data;
            for (let item of this.dataTypeInfoList) {
              item.isError = false;
              item.debugInfo = "";
              if (item.state === "01") {
                item.inUse = true;
              } else {
                item.inUse = false;
              }
            }
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
    flash() {
      this.getCaseList();
    },
  },
};
</script>

<style>
.caseTitle {
  margin: 10px;
}
</style>