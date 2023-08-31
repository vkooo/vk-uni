<template>
	<view>
		<view class="nav"></view>
		<view class="container">
			
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