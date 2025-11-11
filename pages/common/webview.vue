<template>
	<view>
		<u-navbar bgColor="#ffffff" fixed :autoBack="true" placeholder />
		<web-view class="web-view" :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: 'transparent'
					}
				},
				url: ''
			}
		},
		onLoad(options) {
			if (options.url) {
				let url = decodeURIComponent(options.url)
				this.url = url
			}

		},
	}
</script>
<style scoped>
	web-view{
		margin-top: 44px;
		width: 100%;
		height: 100vh;
	}
</style>
