<template>
  <div class="programTemplateListPage">
    <app-header></app-header>
    <program-template-list :userId="userId"></program-template-list>
  </div>
</template>

<script>
import Anarres from "@/components/Anarres";
import AppHeader from "@/components/appHeader.vue";
import ProgramTemplateList from "@/components/programTemplate/programTemplateList.vue";
export default {
  data() {
    return {
      userId: "",
    };
  },
  components: {
    Anarres,
    AppHeader,
    ProgramTemplateList,
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
    }else{
      //console.log("用户id")
      this.userId = localStorage.getItem("userId")
    }
  },
  methods: {},
};
</script>