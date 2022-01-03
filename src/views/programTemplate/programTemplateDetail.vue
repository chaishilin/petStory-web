<template>
  <div class="programTemplateDetail">
    <AppHeader></AppHeader>
    <div class="left-box">
      <div>
        <span>程序模板标题</span>
        <el-input
          v-model="programTemplateInfo.title"
          placeholder="接口标题"
        ></el-input>
        <span>是否使用</span>
        <el-switch v-model="isPublic"></el-switch>
      </div>

      <div>
        <quill-editor
          ref="myTextEditor"
          v-model="programTemplateInfo.content"
          :options="editorOption"
          style="height: 600px; margin-bottom: 10px"
        ></quill-editor>
      </div>
    </div>
    <div class="right-box">
      <span>编程语言类型</span>
      <!-- 这里搞成能输入新增也能列表查询的那种 -->
      <el-input
        class="el-input"
        v-model="programTemplateInfo.language"
        placeholder="编程语言类型"
      ></el-input>
      <br />

      <codemirror
        class="code-mirror"
        v-model:value="programTemplateInfo.template"
        :options="cmOptions"
      >
      </codemirror>
       <div class="output">
        <el-progress
        v-if="testRate != '0'"
         :format="progressFormat"
          :status="progressStatus()"
          :text-inside="true"
          :stroke-width="26"
          :percentage="testRate"
        ></el-progress>
        <el-result v-if="testRate == '100'" icon="success" title="测试完成"></el-result>
      </div>
      <el-button type="primary" @click="runTemplate" v-loading="getOutput"
        >模板极速测试</el-button
      >
      <br />
      <el-button type="warning" @click="testTemplate">模板测试</el-button>
      <el-button type="primary" @click="saveCode" v-loading="getSave"
        >保存</el-button
      ><el-button type="primary" @click="programTemplateList">返回</el-button>
      <el-popover placement="top" width="160" v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="deleteProgram"
            v-if="canDelete"
            >确定</el-button
          >
        </div>
        <el-button slot="reference" type="primary">删除</el-button>
      </el-popover>
      <el-button type="primary" @click="fork()">fork</el-button>
      <br />
      <div class="output">
        <div v-if="getOutput">正在获得测试结果...</div>
        <div v-for="item in programTemplateInfo.outputList">
          <div v-if="item != ''">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseWsUrl from "../../api/baseWsUrl";
import { codemirror } from "vue-codemirror";
import AppHeader from "@/components/appHeader.vue";

// 我这里引入的是js语言文件
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/javascript/javascript.js";

// 编辑的主题文件
import "codemirror/theme/dracula.css";
//编辑器代码高亮css文件
import "codemirror/addon/hint/show-hint.css";
//代码折叠文件
require("codemirror/addon/fold/foldcode.js");
require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/edit/matchbrackets.js");
require("codemirror/addon/fold/brace-fold.js");
//选中行高亮文件
require("codemirror/addon/selection/active-line.js");
//缩进文件
require("codemirror/addon/fold/indent-fold.js");
//代码只能提示
require("codemirror/addon/hint/show-hint.js");
require("codemirror/addon/hint/anyword-hint.js");
//addon文件夹放的是Code Mirror的功能插件
require("codemirror/addon/fold/comment-fold.js");
require("codemirror/mode/clike/clike.js");

export default {
  data() {
    return {
      websock: null,
      testRate: 0,
      visible: false,
      isPublic: false,
      getOutput: false,
      getSave: false,
      canDelete: false,
      supportLanguageList: [],
      template: "nothing",
      language: "java",
      editorOption: {},
      programTemplateInfo: {
        language: "",
        template: "",
        createrId: "",
        title: "这是个模板",
        content: "输入接口描述...",
        state: "",
        publicState: "",
        input: "1 10",
      },
      info: "",
      cmOptions: {
        // 编辑器设置
        tabSize: 4, //tab大小
        mode: "text/x-java", //编辑器模式支持文件
        theme: "dracula", //编辑器主题
        lineNumbers: true, //编辑器行号
        line: true,
        dragDrop: true, //拖拽
        lineWrapping: true, //代码折叠
        matchBrackets: true, //括号匹配
        // autofocus: true,//自动聚焦
        indentWithTabs: true, //首行缩进
        smartIndent: true,
        extraKeys: { Ctrl: "autocomplete" }, //ctrl唤起智能提示
        // more codemirror options, 更多 codemirror 的高级配置...
        hintOptions: {
          tables: {
            users: ["name", "score", "birthDate"],
            countries: ["name", "population", "size"],
          },
        },
      },
    };
  },
  components: {
    codemirror,
    AppHeader,
  },
  mounted() {
    if (this.$route.query.hasOwnProperty("templateId")) {
      //如果是带参数跳转过来的;
      this.canDelete = true; //templateId 那么当然是可以删除的
      let newProgramTemplateInfo = {
        templateId: this.$route.query.templateId,
      };
      this.$store
        .dispatch("ProgramTemplateList", newProgramTemplateInfo)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            if (result.data.data.length != 0) {
              this.programTemplateInfo = result.data.data[0];
              if (this.programTemplateInfo.publicState == "01") {
                this.isPublic = true;
              }
            }
          } else if (status == 401) {
            this.$message.error("请先登录");
            this.$router.push({
              path: "/",
            });
          } else {
            this.$message.error("调用失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          this.getOutput = false;
        });
    } else {
      //如果是新建页面过来的
      this.programTemplateInfo.language = this.language;
      this.programTemplateInfo.template = this.template;
    }
  },
  destroyed() {
    if (this.websock !== null) {
      this.websock.close(); //离开路由之后断开websocket连接
    }
  },
  created() {
    console.log("ws userId:" + localStorage.getItem("userId"));
  },
  methods: {
    fork() {
      this.$message("正在保存当前模板到用户个人列表");
      this.getSave = true;
      this.programTemplateInfo.outputList = [];
      if (this.isPublic == true) {
        this.programTemplateInfo.publicState = "01";
      } else {
        this.programTemplateInfo.publicState = "00";
      }
      //指定该程序的创建人为当前用户
      let forkInfo = this.programTemplateInfo;
      forkInfo.templateId = null;
      forkInfo.createrId = localStorage.getItem("userId");
      this.$store
        .dispatch("SaveProgramTemplate", forkInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: result.data.msg,
              type: "success",
            });
            if (result.data.data != "") {
              this.programTemplateInfo.programId = result.data.data; //如果保存后有了programId，会自动绑定，下次请求时会自动带上
              this.canDelete = result.data.data != ""; //保存后就可以删除了
            }
          } else if (status == 401) {
            this.$message.error("请先登录");
            this.$router.push({
              path: "/",
            });
          } else {
            this.$message.error(result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          this.getSave = false;
        });
    },
    saveCode() {
      this.getSave = true;
      this.programTemplateInfo.outputList = [];
      if (this.isPublic == true) {
        this.programTemplateInfo.publicState = "01";
      } else {
        this.programTemplateInfo.publicState = "00";
      }
      if (
        this.programTemplateInfo.createrId == "" ||
        this.programTemplateInfo.createrId == null
      ) {
        this.programTemplateInfo.createrId = localStorage.getItem("userId");
      } else {
        //否则，为原有的创建人
      }
      this.$store
        .dispatch("SaveProgramTemplate", this.programTemplateInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: result.data.msg,
              type: "success",
            });
            if (result.data.data != "") {
              this.programTemplateInfo.templateId = result.data.data; //如果保存后有了programId，会自动绑定，下次请求时会自动带上
              this.canDelete = result.data.data != ""; //保存后就可以删除了
            }
          } else if (status == 401) {
            this.$message.error("请先登录");
            this.$router.push({
              path: "/",
            });
          } else {
            this.$message.error(result.data.msg);
          }
        })
        .catch((err) => {
          return false;
        })
        .finally(() => {
          this.getSave = false;
        });
    },
    programTemplateList() {
      this.$router.push({
        path: "/programTemplateListPage",
      });
    },
    deleteProgram() {
      this.visible = false;
      this.programTemplateInfo.outputList = [];
      this.$store
        .dispatch("DeleteProgramTemplate", this.programTemplateInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.programTemplateList();
          } else if (status == 401) {
            this.$message.error("请先登录");
            this.$router.push({
              path: "/",
            });
          } else {
            this.$message.error("删除失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          this.getSave = false;
        });
    },
    runTemplate() {
      this.getOutput = true;
      this.$store
        .dispatch("RunProgramTemplate", this.programTemplateInfo)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.$message({
              message: result.data.msg,
              type: "success",
            });
            this.programTemplateInfo.outputList = result.data.data.split("\n");
          } else if (status == 401) {
            this.$message.error("请先登录");
            this.$router.push({
              path: "/",
            });
          } else {
            this.$message.error(result.data.msg);
          }
        })
        .catch((err) => {
          return false;
        })
        .finally(() => {
          this.getOutput = false;
        });
    },
    initWs() {
      console.log("userID: " + localStorage.getItem("userId"));
      this.websock = new WebSocket(
        baseWsUrl + "/" + localStorage.getItem("userId")
      );
      this.websock.onopen = function () {
        console.log("webSocket连接创建。。。");
      };
      this.websock.onmessage = this.wsOnMessage;
      this.websock.onclose = function (e) {
        console.log("关闭连接" + e.data);
      };
    },
    wsOnMessage(event) {
      var data = event.data;
      this.testRate = Number(data);
    },
    testTemplate() {
      if (this.websock === null) {
        this.initWs();
      }
      this.getOutput = true;
      this.$store
        .dispatch("TestProgramTemplate", this.programTemplateInfo)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.$message({
              message: result.data.msg,
              type: "success",
            });
          } else if (status == 401) {
            this.$message.error("请先登录");
            this.$router.push({
              path: "/",
            });
          } else {
            this.$message.error(result.data.msg);
          }
        })
        .catch((err) => {
          return false;
        })
        .finally(() => {
          this.getOutput = false;
        });
    },
    progressFormat(percentage) {
      return "测试进度" + percentage + "%";
    },
    progressStatus() {
      if (this.testRate < 20) {
        return "exception";
      } else if (this.testRate >= 90) {
        return "success";
      } else {
        return "warning";
      }
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
.msg {
  color: tan;
}
.output {
  color: #2d7091;
  background: #ebf7fd;
  font-size: 20px;
  text-align: center;
}
.code-mirror {
  text-align: left;
  font-size: 20px;
  border: 10px solid white;
}

.el-input {
  width: 30%;
  font-size: 15px;
  border: 10px solid white;
}
.el-radio-group {
  width: 30%;
  border: 10px solid white;
}
.el-radio /deep/ .el-radio__label {
  font-size: 15px !important;
}
.el-button {
  border: 10px solid white;
}
.left-box,
.right-box {
  position: absolute;
  width: 45%;
  height: 100%;
}
.left-box {
  background: white;
  border: 10px solid white;
}
.right-box {
  background: white;
  border: 10px solid white;

  left: 50%;
}
.el-option {
  width: 5px;
}
</style>
