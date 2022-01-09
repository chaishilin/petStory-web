<template>
  <div>
    <!-- <h1 @click="load">猫猫生存模拟器</h1> -->
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
    <el-button type="info" @click="load">开始猫生</el-button>
        <el-button type="info" @click="loadStory">成长</el-button>

    <div @click="loadStory()">
      <el-card class="storyLines" id="storyLines">
        <div v-for="msg in msgList" class="infinite-list-item">
          <div class="line">{{ msg }}</div>
          <br />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websock: null,
      count: 0,
      testRate: 0,
      msgList: [],
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
 
  },
  updated() {
    let ele = document.getElementById("storyLines");
    ele.scrollTop = ele.scrollHeight; //保证滚动条位于最底层
  },
  methods: {
    load() {
      this.msgList = []
      this.initWs();
      this.testRate += 1;
      this.$store
        .dispatch("NewPet", this.attribute)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
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
        .finally(() => {});
    },
    initWs() {
      console.log("initWs");
      this.websock = new WebSocket(
        "ws://162.14.118.215:8080/story/" + "1234" // new Date().getTime()
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
      this.msgList.push(data);
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
      this.websock.send("")
    }
  },
};
</script>

<style>
.storyLines {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  width: 100%;
  height: 200px;
  scroll-behavior: auto;
}
.line {
  border: 1px solid black;
}
</style>