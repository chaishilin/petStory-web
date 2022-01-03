<template>
  <div class="content">
    <h1>可运行代码文章编辑区</h1>
    <el-button type="error" @click="addCode">添加代码块</el-button>
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      style="height: 600px; margin-bottom: 10px"
    ></quill-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      editorOption: {},
    };
  },
  methods: {
    addCode() {
      console.log(this.content);
      this.content +=
        '<p>代码开始</p><pre class="ql-syntax" spellcheck="false">def fun(a,b):</pre><p>代码结束</p>';
      console.log(this.content);
    },
  },
};
</script>

<style>
</style>