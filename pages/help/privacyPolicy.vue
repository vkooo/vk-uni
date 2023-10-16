<template>
	<u-parse :content="content" @preview="preview" @navigate="navigate" noData="正在加载中..." />
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import { website as websiteApi } from "@/api/website.js"
	export default {
		components: {
		    uParse  //注册组件
		},
		data() {
			return {
				content:	'',
			}
		},
		onLoad(options) {
			let that = this
			websiteApi().then(res=>{
				let website = res.data
				uni.setStorageSync('website', website)
				that.content = website.privacyPolicy
			})
			
		},
	}
</script>

<style>
</style>