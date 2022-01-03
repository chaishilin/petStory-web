<template>
  <div class="doProgram">
    <AppHeader></AppHeader>
    <div class="left-box">
      <div>
        <span>接口标题</span>
        <el-input v-model="programInfo.title" placeholder="接口标题"></el-input>
        <span>是否公开</span>
        <el-switch v-model="isPublic"></el-switch>
      </div>

      <div>
        <quill-editor
          ref="myTextEditor"
          v-model="programInfo.content"
          :options="editorOption"
          style="height: 600px; margin-bottom: 10px"
        ></quill-editor>
      </div>
    </div>
    <div class="right-box">
      <span>接口输入</span>
      <el-input
        class="el-input"
        v-model="programInfo.input"
        placeholder="接口输入"
      ></el-input>
      <br />
      <el-select
        v-model="programInfo.language"
        placeholder="请选择"
        @change="chooseLanguage"
        filterable
      >
        <el-option
          v-for="item in supportLanguageList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <codemirror
        class="code-mirror"
        v-model:value="programInfo.code"
        :options="cmOptions"
        :onChange="saveContent()"
      >
      </codemirror>
      <el-button type="error" @click="addCode"
        >添加代码块</el-button
      >
      <el-button type="primary" @click="runCode" v-loading="getOutput"
        >运行</el-button
      >
      <el-button type="primary" @click="saveCode" v-loading="getSave"
        >保存</el-button
      ><el-button type="primary" @click="programList">返回</el-button>
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
        <div v-if="getOutput">正在获得运行结果...</div>
        <div v-for="item in programInfo.outputList">
          <div v-if="item != ''">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import AppHeader from "@/components/appHeader.vue";

// 我这里引入的是js语言文件
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/javascript/javascript.js";

// 编辑的主题文件
import "codemirror/theme/dracula.css";
//编辑器代码高亮css文件
import "codemirror/addon/hint/show-hint.css";
import appHeader from "../../components/appHeader.vue";
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
      visible: false,
      isPublic: false,
      getOutput: false,
      getSave: false,
      canDelete: false,
      supportLanguageList: [],
      code: "public int yourFunction(int a,int b){\n        int sum = 0;\n        for(int i = a;i<=b;i++){\n            sum += i;\n        }\n        return sum;\n    }\n",
      language: "java",
      editorOption: {},
      programInfo: {
        language: "",
        codeMap: {},
        code: "",
        createrId: "",
        title: "这是个模板",
        content: "输入接口描述...",
        state: "",
        publicState: "",
        input: "1 10",
        output: "",
        outputList: [],
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
    if (this.$route.query.hasOwnProperty("programId")) {
      //如果是带参数跳转过来的;
      this.canDelete = true; //如果有programId 那么当然是可以删除的
      let newProgramInfo = {
        programId: this.$route.query.programId,
      };
      this.$store
        .dispatch("ProgramList", newProgramInfo)
        .then((result) => {
          let status = result.data.code;
          //console.log(result.data);
          if (status == 200) {
            if (result.data.data.length != 0) {
              this.programInfo = result.data.data[0];
              //console.log(this.programInfo);
              if (this.programInfo.publicState == "01") {
                this.isPublic = true;
              }
              //如果不是空模板
              if (this.programInfo.codeMap != null) {
                for (let item in this.programInfo.codeMap) {
                  this.programInfo.language = item;
                  this.programInfo.code = this.programInfo.codeMap[item];
                  break; //选择第一个支持的语言
                }
              } else {
                this.programInfo["codeMap"] = {};
                this.programInfo.language = this.language;
                this.programInfo.code = "\n\n\n"; //如果是保存的空模板，那就必须要手动传个空字符，否则codemirror会报错
                //因为code字段在空模板中为null
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
      this.programInfo.language = this.language;
      this.programInfo.code = this.code;
    }
    this.$store
      .dispatch("SupportLanguageList")
      .then((result) => {
        this.supportLanguageList = result.data.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
  methods: {
    saveContent() {
      if (this.programInfo.language != null) {
        this.programInfo.codeMap[this.programInfo.language] =
          this.programInfo.code;
      }
    },
    chooseLanguage() {
      console.log(this.programInfo);
      if (this.programInfo.codeMap.hasOwnProperty(this.programInfo.language)) {
        //如果该接口的选中语言内容不为空，则填补该语言代码
        this.programInfo.code =
          this.programInfo.codeMap[this.programInfo.language];
      } else {
        this.programInfo.code = "\n\n\n";
      }
    },
    addCode(){
      console.log(this.programInfo.content)
      this.programInfo.content += "<p>代码开始</p><pre class=\"ql-syntax\" spellcheck=\"false\">def fun(a,b):</pre><p>代码结束</p>"
      console.log(this.programInfo.content)
    },
    runCode() {
      this.getOutput = true;
      this.programInfo.outputList = [];
      this.$store
        .dispatch("DoProgram", this.programInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: "调用成功",
              type: "success",
            });
            this.programInfo.output = result.data.data.result;
            this.programInfo.outputList = this.programInfo.output.split("\n");
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
    },
    fork(){
      this.$message('正在保存当前接口到用户个人列表')
      this.getSave = true;
      this.programInfo.outputList = [];
      if (this.isPublic == true) {
        this.programInfo.publicState = "01";
      } else {
        this.programInfo.publicState = "00";
      }
      //指定该程序的创建人为当前用户
      let programForkInfo = this.programInfo;
      programForkInfo.programId = null;
      programForkInfo.createrId = localStorage.getItem("userId");
      this.$store
        .dispatch("SaveProgram", programForkInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: result.data.msg,
              type: "success",
            });
            if (result.data.data != "") {
              this.programInfo.programId = result.data.data; //如果保存后有了programId，会自动绑定，下次请求时会自动带上
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
      this.programInfo.outputList = [];
      if (this.isPublic == true) {
        this.programInfo.publicState = "01";
      } else {
        this.programInfo.publicState = "00";
      }
      if(this.programInfo.createrId == "" || this.programInfo.createrId == null){
        this.programInfo.createrId = localStorage.getItem("userId");
      }else{
        //否则，为原有的创建人
      }
      this.$store
        .dispatch("SaveProgram", this.programInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: result.data.msg,
              type: "success",
            });
            if (result.data.data != "") {
              this.programInfo.programId = result.data.data; //如果保存后有了programId，会自动绑定，下次请求时会自动带上
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

    programList() {
      this.$router.push({
        path: "/programListPage",
      });
    },
    deleteProgram() {
      this.visible = false;
      this.programInfo.outputList = [];
      this.$store
        .dispatch("DeleteProgram", this.programInfo)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.programList();
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
