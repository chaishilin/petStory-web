<template>
  <div class="programTemplateList">
    <!-- <h1 class="msg">{{ msg }}</h1> -->
    <h1 class="msg">{{ title }}</h1>
    <el-button type="primary" @click="createProgramTemplate">新建程序模板</el-button>
    <br />
    <div class="info" v-for="info in programTemplateInfoList">
      <program-template-item :info="info"></program-template-item>
    </div>
  </div>
</template>

<script>
import programTemplateItem from "@/components/programTemplate/programTemplateItem";

export default {
  data() {
    return {
      title:"程序模板清单",
      msg: "程序清单",
      programTemplateInfo: {
        createrId: "",
      },
      programTemplateInfoList: [
        {
          templateId: "",
          createrName: "",
          programId: "",
          title: "",
          language: "",
          createTime: "",
          createrId: localStorage.getItem("userid"),
          content: "wdefghhgfdsadfghnjhfd",
          createrName: "(*^_^*)",
        },
      ],
    };
  },
  components: {
    programTemplateItem,
  },
  props: {
    userId: "", //programInfo是默认值，vue组件的传参
  },
  mounted() {
    this.programTemplateInfo.createrId = this.userId; //设置为props的userId
    this.$store
      .dispatch("ProgramTemplateList", this.programTemplateInfo)
      .then((result) => {
        let status = result.data.code;
        if (status == 200) {
          this.programTemplateInfoList = result.data.data;
          this.msg = result.data.msg;
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
  methods: {
    createProgramTemplate() {
      this.$router.push({
        path: "/programTemplateDetail",
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
.msg {
  color: tan;
  font-size: 30px;
}
.info {
  border: 10px solid white;
  display: inline-block;
}
</style>