<template>
  <div class="answer-wrap">
    <answer-desc></answer-desc>
    <back-top></back-top>
  </div>
</template>

<script>
  import answerDesc from "./components/answerDesc";
  import BackTop from "@/components/backTop";
  export default {
    components: { answerDesc, BackTop },
  }
</script>

<style scoped lang="less">
.answer-wrap{
  background: #f0f0f0;
}
</style>