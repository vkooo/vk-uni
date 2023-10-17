<template>
	<u-parse :content="website.userAgreement" @preview="preview" @navigate="navigate" noData="正在加载中..." />
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import { mapState } from "vuex"
	export default {
		components: {
		    uParse  //注册组件
		},
		computed: {
			...mapState('website', ["website"]),
		},
		data() {
			return {
			}
		},
	}
</script>

<style>
</style>