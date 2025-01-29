<template>
	<view class="diy-template-gap" 
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
		}">
		<u-gap 
			:height="data.height" 
			:bgColor="data.bgColor"
			:style="{
				borderTopLeftRadius: data.bordertTopRadius + 'px',
				borderTopRightRadius: data.bordertTopRadius + 'px',
				borderBottomLeftRadius: data.bordertBottomRadius + 'px',
				borderBottomRightRadius: data.bordertBottomRadius + 'px',
			}"
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