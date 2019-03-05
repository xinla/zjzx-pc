<template>
    <div class="answer-wrap">
        <answer-header></answer-header>
        <answer-desc></answer-desc>
        <back-top></back-top>

    </div>
</template>

<script>
    import answerHeader from "./components/answerHeader";
    import answerDesc from "./components/answerDesc";
    import BackTop from "../../components/backTop";
    export default {
        name: "answer",
        components: {answerHeader,answerDesc,BackTop},
    }
</script>

<style scoped lang="less">
    .answer-wrap{
        background: #f0f0f0;
    }
</style>