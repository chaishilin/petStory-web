<template>
  <div class="programList">
    <h1 class="msg">{{ msg }}</h1>
    <el-button type="primary" @click="createProgram">新建</el-button>
    <br />
    <div class="info" v-for="info in programInfoList">
      <program-item :info="info"></program-item>
    </div>
  </div>
</template>

<script>
import programItem from "./programItem.vue";

export default {
  data() {
    return {
      msg: "程序清单",
      programInfo: {
        createrId: "",
      },
      programInfoList: [
        {
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
    programItem,
  },
  props: {
    userId: "", //programInfo是默认值，vue组件的传参
  },
  mounted() {
    this.programInfo.createrId = this.userId; //设置为props的userId
    console.log(this.userId);
    this.$store
      .dispatch("ProgramList", this.programInfo)
      .then((result) => {
        let status = result.data.code;
        //console.log(result.data);
        if (status == 200) {
          this.programInfoList = result.data.data;
          this.msg = result.data.msg;
          //console.log("yes");
        } else if (status == 401) {
          this.$router.push({
            path: "/",
          });
        } else {
          //console.log("no");
          alert(result.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
  methods: {
    createProgram() {
      this.$router.push({
        path: "/doProgramPage",
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