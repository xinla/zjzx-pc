<template>
    <div class="answer-wrap">
        <answer-header></answer-header>
        <answer-desc></answer-desc>
    </div>
</template>

<script>
    import answerHeader from "./components/answerHeader";
    import answerDesc from "./components/answerDesc";
    export default {
        name: "answer",
        components: {answerHeader,answerDesc},
    }
</script>

<style scoped lang="less">
    .answer-wrap{
        background: #f0f0f0;
    }
</style>