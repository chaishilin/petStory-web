<template>
  <div>
    <h1 @click="load">hello h1</h1>
    <el-card class="storyLine" id="storyLine">
      <li v-for="msg in msgList" class="infinite-list-item">{{ msg }}</li>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websock: null,
      count: 0,
      testRate: 0,
      msgList:[],
    };
  },
  created() {
    this.initWs();
  },
  updated(){
    let ele = document.getElementById("storyLine")
    ele.scrollTop = ele.scrollHeight;//保证滚动条位于最底层
  },
  methods: {
    load() {
      this.testRate += 1;
    },
    initWs() {
      console.log("initWs");
      this.websock = new WebSocket(
        "ws://localhost:8080/story/" + "1234" // new Date().getTime()
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
  },
};
</script>

<style>
.storyLine {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  width: 100%;
  height: 130px;
  scroll-behavior:auto;
}
</style>