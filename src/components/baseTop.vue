<template>
	<div>
		<div class="tf top-wrap"></div>
		<router-view class="wrapper main-view bfc-o" />
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	}
}
</script>

<style lang="less" scoped>
@import url(../assets/styles/base.less);
  .top-wrap{
    background:red;
  }
  .main-view{
  	position: relative;
  	width: 1180px;
  	margin: 50px auto 0;
  }
</style>