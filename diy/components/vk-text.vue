<template>
	<view class="diy-template-text" 
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
		}"
	>
		<view 
			class="diy-template-text-content"
			:style="{
				fontSize: data.fontSize + 'px',
				fontWeight: data.fontWeight,
				textAlign: data.align,
				color: data.textColor,
				background: data.bgColor,
				background: data.bgColor,
				borderTopLeftRadius: data.bordertTopRadius + 'px',
				borderTopRightRadius: data.bordertTopRadius + 'px',
				borderBottomLeftRadius: data.bordertBottomRadius + 'px',
				borderBottomRightRadius: data.bordertBottomRadius + 'px',
			}"
		>
			{{data.text}}
		</view>
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
	}
</script>

<style lang="scss" scoped>
	.diy-template-text{
		
	}
</style>