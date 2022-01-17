<template>
  <div class="petStory">
    <!-- <h1>猫猫生存模拟器</h1> -->
    <div class="attrbuteSet" v-if="setAttr == true">
      <h1>请分配属性</h1>
      <div>幸运值</div>
      <el-input-number
        v-model="attribute.born.lucky"
        :min="0"
        :max="attribute.born.lucky + attributeSet.left"
        @change="changeBornAttribute"
        label="幸运值"
      ></el-input-number>
      <div>智力</div>
      <el-input-number
        v-model="attribute.born.intelligence"
        :min="0"
        :max="attribute.born.intelligence + attributeSet.left"
        @change="changeBornAttribute"
        label="智力"
      ></el-input-number>
      <div>体力</div>
      <el-input-number
        v-model="attribute.born.strength"
        :min="0"
        :max="attribute.born.strength + attributeSet.left"
        @change="changeBornAttribute"
        label="体力"
      ></el-input-number>
      <div>魅力</div>
      <el-input-number
        v-model="attribute.born.charm"
        :min="0"
        :max="attribute.born.charm + attributeSet.left"
        @change="changeBornAttribute"
        label="魅力"
      ></el-input-number>
      <br />
      <br />
      <el-tag>你将是今天的第{{ userCount }}只小猫咪</el-tag>
      <br />
      <br />
      <el-button type="info" @click="chooseLabel">选择天赋</el-button>
    </div>
    <div class="selectLabel" v-if="setLabel == true">
      <el-card
        class="box-card"
        :key="key"
        :label="key"
        v-for="(item, key) in labelList"
        :name="key"
      >
        <el-tag :type="isUseLabel(item)" @click="useLabel(item)">{{
          item.content
        }}</el-tag>
      </el-card>
      <el-button type="info" @click="reload">返回选择属性</el-button>

      <el-button type="info" @click="initWs">开始猫生</el-button>
    </div>
    <div class="storyContent" v-if="storyContent == true">
      <br />
      <br />

      <div @click="loadStory()">
        <el-card class="storyLines" id="storyLines">
          <div v-for="msg in msgList" class="infinite-list-item">
            <div class="line">{{ msg }}</div>
            <br />
          </div>
        </el-card>
      </div>
      <el-button type="info" @click="reload" v-if="reloadPet == true"
        >重新开始</el-button
      >
    </div>
  </div>
</template>

<script>
import baseWsUrl from "@/api/baseWsUrl";
export default {
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      websock: null,
      count: 0,
      testRate: 0,
      msgList: [],
      labelList: [],
      choosedLabel: [],
      setAttr: true,
      setLabel: false,
      storyContent: false,
      userId: "",
      reloadPet: false,
      userCount: 0,
      attributeSet: {
        left: 20,
        sumNum: 20,
        maxNum: 10,
      },
      attribute: {
        body: { weight: 0, hanger: 0, friendly: 0, clean: 0 },
        mod: { happy: 0, angry: 0, terrified: 0 },
        health: {
          totalHealth: 0,
          headHealth: 0,
          bodyHealth: 0,
          footHealth: 0,
          tailHealth: 0,
        },
        born: { lucky: 0, intelligence: 0, strength: 0, charm: 0 },
      },
    };
  },
  created() {
    this.getUserCount();
  },
  updated() {
    let ele = document.getElementById("storyLines");
    if (ele != null) {
      console.log(ele.scrollHeight);
      ele.scrollTop = ele.scrollHeight; //保证滚动条位于最底层
    }
  },
  methods: {
    load() {
      this.getViewportSize()
      this.msgList = [];
      this.testRate += 1;
      var params = {};
      var chooesdLabelIds = [];
      for (let label of this.choosedLabel) {
        chooesdLabelIds.push(label.labelId);
      }
      params["labels"] = chooesdLabelIds;
      params["attribute"] = this.attribute;
      params["userId"] = this.userId;
      this.$store
        .dispatch("NewPet", params)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            console.log(result.data.data);
          } else {
            this.$message.error("调用失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          this.storyContent = true;
          this.setAttr = false;
          this.setLabel = false;
          this.loadStory();
        });
    },
    getUserCount() {
      this.$store
        .dispatch("GetUserCount")
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.userCount = result.data.data;
          } else {
            this.$message.error("调用失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {});
    },
    initWs() {
      this.$store
        .dispatch("NewUserId", this.attribute)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.userId = result.data.data;
          } else {
            this.$message.error("调用失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          return false;
        })
        .finally(() => {
          this.websock = new WebSocket(baseWsUrl + this.userId);

          this.websock.onopen = function () {
            console.log("webSocket连接创建。。。");
          };

          this.websock.onmessage = this.wsOnMessage;
          this.websock.onclose = this.wsOnclose;
          this.load();
        });
    },
    wsOnMessage(event) {
      var data = event.data;
      this.msgList.push(data);
    },
    wsOnclose() {
      this.reloadPet = true;
      this.$message.info("请重新开始");
      console.log("关闭连接");
    },
    changeBornAttribute() {
      this.attributeSet.left =
        this.attributeSet.sumNum -
        (this.attribute.born.lucky +
          this.attribute.born.intelligence +
          this.attribute.born.strength +
          this.attribute.born.charm);
    },
    loadStory() {
      this.websock.send("");
    },
    chooseLabel() {
      this.storyContent = false;
      this.setAttr = false;
      this.setLabel = true;
      this.$store
        .dispatch("GetLabel", {})
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.labelList = [];
            for (let item of result.data.data) {
              item["chooesd"] = false;
              this.labelList.push(item);
            }
          } else {
            this.$message.error("调用失败 " + result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {});
    },
    useLabel(item) {
      if (item.chooesd == false) {
        if (this.choosedLabel.length + 1 > 4) {
          this.$message.error("最多选择4个属性！");
          return;
        }
        item.chooesd = true;
      } else {
        item.chooesd = false;
      }
      this.choosedLabel = [];
      for (let label of this.labelList) {
        if (label.chooesd == true) {
          this.choosedLabel.push(label);
        }
      }
    },
    isUseLabel(item) {
      for (let label of this.choosedLabel) {
        if (item == label) {
          return "primary";
        }
      }
      return "info";
    },
    reload() {
      this.storyContent = false;
      this.setAttr = true;
      this.setLabel = false;
      this.reloadPet = false;
      this.getUserCount();
    },
    getViewportSize() {
      this.windowWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      this.windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      console.log(this.windowHeight)
      if (document.getElementsByClassName("storyLines").length) {
        let ele = document.getElementsByClassName("storyLines")[0].style;
        ele.setProperty("--height", this.windowHeight * 0.5 + "px");
        console.log(this.windowHeight* 0.5)
      }
    },
  },
};
</script>

<style>
.petStory {
  height: 100%;
}
.storyLines {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  width: 100%;
  height: var(--height);
  scroll-behavior: auto;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
.line {
  border: 2px solid palevioletred;
  height: auto;
}

</style>