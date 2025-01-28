<template>
	<view>
		<u-gap :height="data.height" :bgColor="data.bgColor" />
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				},
			},
		},
		data() {
			return {
				// height: 20
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>