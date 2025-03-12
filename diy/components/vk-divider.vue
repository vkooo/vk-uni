<template>
	<view class="diy-template-gap" 
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
		}">
		<u-divider 
			:text="data.text" 
			:dashed="data.type == 'dashed'"
			:hairline="data.type == 'hairline'"
			:textPosition="data.textPosition"
			:textSize="data.textSize"
			:textColor="data.textColor"
			:lineColor="data.lineColor"
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