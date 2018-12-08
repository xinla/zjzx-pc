<template>
    <div>
        <user-header></user-header>
        <user-search></user-search>
        <user-info></user-info>
        <user-list></user-list>
        <back-top></back-top>
    </div>
</template>

<script>
    import UserHeader from "./components/userHeader";
    import UserSearch from "./components/userSearch";
    import UserInfo from "./components/userInfo";
    import UserList from "./components/userList";
    import BackTop from "../../components/backTop";
    export default {
        name: "personalCenter",
        components: {BackTop, UserList, UserInfo, UserSearch, UserHeader}
    }
</script>

<style scoped>

</style>