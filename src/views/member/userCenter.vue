<template>
    <div>
        <user-header></user-header>
        <user-info></user-info>
        <user-list></user-list>
        <base-footer></base-footer>
        <back-top></back-top>
    </div>
</template>

<script>
    import UserHeader from "./components/userHeader";
    import UserSearch from "./components/userSearch";
    import UserInfo from "./components/userInfo";
    import UserList from "./components/userList";
    import BackTop from "../../components/backTop";
    import baseFooter from "../../components/baseFoot"

    export default {
        name: "personalCenter",
        components: {BackTop, UserList, UserInfo, UserSearch, UserHeader,baseFooter},
        beforeRouteEnter(to,from,next){
            if (!to.query.userId && !localStorage.token) {
                alert('获取出错，请返回！')
                /*  goTruth.$message({
                    message: '获取出错，请返回！',
                    center: true
                  });*/
                return;
            }
            next();
        }
    }
</script>

<style scoped>
</style>
