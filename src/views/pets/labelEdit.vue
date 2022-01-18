<template>
  <div>
    <h1>
      标签编辑
      <el-button type="primary" @click="UpdateLabel('', '00')"
        >新增标签</el-button
      >
    </h1>
    <h3>
      <el-input v-model="contentLike" placeholder="查找内容"></el-input>
      <el-button type="info" @click="getLabelList">搜索</el-button>
    </h3>
    <el-collapse v-model="choosedItem" accordion>
      <el-collapse-item
        :title="item.content"
        :name="key"
        v-for="(item, key) in labelList"
        :key="key"
        :value="item"
      >
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>标签id ：{{ item.labelId }}</span>
              <el-tag>{{ stateMap[item.state] }}</el-tag>
              <el-button type="info" @click="UpdateLabel(item, '01')"
                >使用</el-button
              >
              <el-button type="info" @click="UpdateLabel(item, '00')"
                >取消使用</el-button
              >
              <el-button type="info" @click="UpdateLabel(item, '10')"
                >删除</el-button
              >
            </div>
            <el-form ref="form" :model="item" label-width="80px">
              <el-form-item label="内容">
                <el-input v-model="item.content" placeholder=""></el-input>
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
                     
                      <el-tag v-if="attrKey != 'age'"> {{ attrKey }}  属性加成</el-tag>
                      <el-input-number
                        v-if="attrKey == 'maxAge'"
                        v-model="baseAttr[attrKey]"
                        @change="handleChange"
                        :min="-120"
                        :max="120"
                        :label="attrKey"
                      ></el-input-number>
                      <el-input-number
                        v-else-if="attrKey != 'age'"
                        v-model="baseAttr[attrKey]"
                        @change="handleChange"
                        :min="-120"
                        :max="120"
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
      labelExample: {
        labelId: "",
        content: "请输入内容",
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
          ageAttr: {maxAge: 0 },
        },
        attributeStr:
          '{"body":{"clean":0,"friendly":0,"hanger":0,"weight":0},"born":{"charm":0,"intelligence":0,"lucky":0,"strength":0},"health":{"bodyHealth":0,"footHealth":0,"headHealth":0,"tailHealth":0,"totalHealth":0},"mod":{"angry":0,"happy":0,"terrified":0}}',
        state: "01",
        attributeFromStr: {
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
          ageAttr: {maxAge: 0 },
        },
      },
      labelList: [],
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
    this.getLabelList();
  },
  methods: {
    handleClick() {
      console.log(this.choosedAttr);
    },
    handleChange() {
      console.log("hh");
    },
    UpdateLabel(item, state) {
      if (item == "") {
        item = this.labelExample;
      }
      item.state = state;
      this.$store
        .dispatch("UpdateLabel", item)
        .then((result) => {
          let status = result.data.code;
          if (status == 200) {
             this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
            });
            this.getLabelList();
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
    getLabelList() {
      var param = {};
      if (this.contentLike != "") {
        param["content"] = this.contentLike;
      }
      this.$store
        .dispatch("GetLabel", param)
        .then((result) => {
          let status = result.data.code;
          console.log(result.data);
          if (status == 200) {
            this.labelList = result.data.data;
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