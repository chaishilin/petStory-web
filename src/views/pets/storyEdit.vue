<template>
  <div>
    <h1>
      故事编辑
      <el-button type="primary" @click="UpdateStory('', '00')"
        >新增故事</el-button
      >
    </h1>
    <h3>
      <el-input v-model="contentLike" placeholder="查找内容"></el-input>
      <el-button type="info" @click="getStoryList">搜索</el-button>
    </h3>
    <el-collapse v-model="choosedItem" accordion>
      <el-collapse-item
        :title="item.content"
        :name="key"
        v-for="(item, key) in storyList"
        :key="key"
        :value="item"
      >
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>故事id ：{{ item.storyId }}</span>
              <el-tag>{{ stateMap[item.state] }}</el-tag>
              <el-button type="info" @click="UpdateStory(item, '01')"
                >使用</el-button
              >
              <el-button type="info" @click="UpdateStory(item, '00')"
                >取消使用</el-button
              >
              <el-button type="info" @click="UpdateStory(item, '10')"
                >删除</el-button
              >
            </div>
            <el-form ref="form" :model="item" label-width="80px">
              <el-form-item label="内容">
                <el-input v-model="item.content" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="标签">
                <el-select v-model="item.tag" placeholder="请选择">
                  <el-option
                    v-for="item in tagOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="属性值">
                <el-tabs v-model="choosedAttr" @tab-click="handleClick">
                  <el-tab-pane
                    :key="key"
                    :label="key"
                    v-for="(baseAttr, key) in item.attribute"
                    :name="key"
                  >
                    <div v-for="(attrItem, attrKey) in baseAttr">
                      {{ attrKey }}
                      <el-tag v-if="attrKey != 'age'">属性加成</el-tag>
                      <el-input-number
                        v-if="attrKey != 'age'"
                        v-model="baseAttr[attrKey]"
                        @change="handleChange"
                        :min="-10"
                        :max="10"
                        :label="attrKey"
                      ></el-input-number>
                      <el-tag v-if="attrKey != 'maxAge'">触发下限</el-tag>
                      <el-input-number
                        v-if="attrKey != 'maxAge'"
                        v-model="item.attributeLow[key][attrKey]"
                        @change="handleChange"
                        :min="0"
                        :max="item.attributeHigh[key][attrKey]"
                        :label="attrKey"
                      ></el-input-number>
                      <el-tag v-if="attrKey != 'maxAge'">触发上限</el-tag>
                      <el-input-number
                        v-if="attrKey == 'age'"
                        v-model="item.attributeHigh[key][attrKey]"
                        @change="handleChange"
                        :min="item.attributeLow[key][attrKey]"
                        :max="12 * 100"
                        :label="attrKey"
                      ></el-input-number>
                      <el-input-number
                        v-else-if="attrKey != 'maxAge'"
                        v-model="item.attributeHigh[key][attrKey]"
                        @change="handleChange"
                        :min="item.attributeLow[key][attrKey]"
                        :max="10"
                        :label="attrKey"
                      ></el-input-number>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storyExample: {
        storyId: "",
        content: "请输入内容",
        tag: "日常",
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
          ageAttr: { age: 0, maxAge: 0 },
        },
        attributeStr: "null",
        state: "01",
        attributeLow: {
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
          ageAttr: { age: 0, maxAge: 0 },
        },
        attributeLowStr: "null",
        attributeHigh: {
          body: { weight: 10, hanger: 10, friendly: 10, clean: 10 },
          mod: { happy: 10, angry: 10, terrified: 10 },
          health: {
            totalHealth: 10,
            headHealth: 10,
            bodyHealth: 10,
            footHealth: 10,
            tailHealth: 10,
          },
          born: { lucky: 10, intelligence: 10, strength: 10, charm: 10 },
          ageAttr: { age: 180, maxAge: 12 * 100 },
        },
        attributeHighStr: "null",
      },
      storyList: [],
      tagOptions: [
        {
          value: "日常",
          label: "日常",
        },
        {
          value: "死亡",
          label: "死亡",
        },
      ],
      choosedItem: "0",
      contentLike: "",
      choosedAttr: "",
      stateMap: {
        "01": "启用",
        "00": "未启用",
      },
    };
  },
  created() {
    this.getStoryList();
  },
  methods: {
    handleClick() {
      console.log(this.choosedAttr);
    },
    handleChange() {
      console.log("hh");
    },
    UpdateStory(item, state) {
      if (item == "") {
        item = this.storyExample;
      }
      item.state = state;
      this.$store
        .dispatch("UpdateStory", item)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
            });
            this.getStoryList();
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
        .finally(() => {});
    },
    getStoryList() {
      var param = {};
      if (this.contentLike != "") {
        param["content"] = this.contentLike;
      }
      this.$store
        .dispatch("GetStory", param)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.storyList = result.data.data;
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
        .finally(() => {});
    },
  },
};
</script>

<style>
</style>