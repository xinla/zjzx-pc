<template>
  <div>
    <user-info :userId="userId"></user-info>
    <user-list :userId="userId"></user-list>
    <base-footer></base-footer>
    <back-top></back-top>
  </div>
</template>

<script>
import UserInfo from "./components/userInfo";
import UserList from "./components/userList";
import BackTop from "../../components/backTop";
import baseFooter from "../../components/baseFoot"

export default {
  name: "personalCenter",
  components: {BackTop, UserList, UserInfo, baseFooter},
  computed: {
  	userId() {
  		return parseInt(this.$route.query.userId)
  	}
  },
  beforeRouteEnter(to,from,next){
    if (!to.query.userId) {
        GoTruth.$message({
          message: '获取出错，请返回！',
          center: true
        });
      return;
    }
    next();
  }
}
</script>

<style scoped>
</style>