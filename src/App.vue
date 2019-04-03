<template>
	<div id="app">
		<keep-alive>
	    <router-view v-if="!$route.meta.notKeepAlive"/>
		</keep-alive>
	  <router-view v-if="$route.meta.notKeepAlive"/>

	  <the-release v-if="this.$store.state.userId"/>

	</div>
</template>

<script>
	export default {
		components: {
		  TheRelease: () => import('@/components/release')
		}
	}
</script>
<style lang="less">
html{
	font-size: 50px !important;
	line-height: 1;
}
</style>