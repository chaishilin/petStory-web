<template>
  <div class="dataTypePage">
    <app-header></app-header>
    <date-type-search></date-type-search>
    <data-type-list class="dataTypeList" :userId="userId"></data-type-list>
  </div>
</template>

<script>
import Anarres from "@/components/Anarres";
import AppHeader from "@/components/appHeader.vue";
import dataTypeList from "@/components/dataType/dataTypeList";
import dataTypeSearch from '@/components/dataType/dataTypeSearch'
export default {
  data() {
    return {
      userId: "",
    };
  },
  components: {
    Anarres,
    AppHeader,
    dataTypeList,
    dataTypeSearch,
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
  },
  created() {
    if (this.$route.query.hasOwnProperty("userId")) {
      //如果是带参数跳转过来的;
      //console.log(this.$route.query.userId);
      this.userId = this.$route.query.userId;
    } else {
      //console.log("用户id")
      this.userId = localStorage.getItem("userId");
    }
  },
  methods: {},
};
</script>
<style>
.dataTypeList{
  border: 10px ;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>