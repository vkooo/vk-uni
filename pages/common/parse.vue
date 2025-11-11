<template>
	<view class="container ql-container">
		<view class=" ql-editor">
			<u-parse :content="content" @preview="preview" @navigate="navigate" noData="正在加载中..." />
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import { agreement } from "@/api/common"
	import { mapState } from "vuex"
	export default {
		components: {
		    uParse  //注册组件
		},
		computed: {
			...mapState('website', ["website"]),
		},
		onLoad(options) {
			agreement(options.field).then(res=>{
				this.content = res.data
			})
		},
		data() {
			return {
				content: ""
			}
		},
	}
</script>

<style>
</style>