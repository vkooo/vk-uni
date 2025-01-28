<template>
	<view>
		<u-notice-bar 
			v-if="data.text"
			:icon="data.icon"
			:text="data.text" 
			:bgColor="data.bgColor" 
		/>
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