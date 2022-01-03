<template>
  <div class="programListPage">
    <app-header></app-header>
    <program-list :userId="userId"></program-list>
  </div>
</template>

<script>
import Anarres from "@/components/Anarres";
import AppHeader from "@/components/appHeader.vue";
import ProgramList from "@/components/program/programList.vue";
export default {
  data() {
    return {
      userId: "",
    };
  },
  components: {
    Anarres,
    AppHeader,
    ProgramList,
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