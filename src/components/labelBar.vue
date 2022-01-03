<template>
  <div class="labelBar">
    <h1 class="msg">{{ msg }}</h1>
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Anarres 请输入内容",
    };
  }
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
}

</style>