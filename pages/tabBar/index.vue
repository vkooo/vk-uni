<template>
	<view>
		<view class="vk-nav" />
		<view class="container">
			12313
		</view>
	</view>
</template>

<script>
	import * as Api from "@/api/index.js"
	import { mapState } from "vuex"
	
	export default {
		computed: {
		    ...mapState(['user']),
		}, 
		data() {
			return {
				
			}
		},
		onLoad() {
			let that = this
			
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>