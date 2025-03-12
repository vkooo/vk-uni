<template>
	<view class="diy-template-nav-btn" 
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
		}"
	>
		<!-- 横着的 -->
		<block v-if="data.layout == 'horizontal'">
			
		</block>
		<!-- 竖着的 -->
		<block v-if="data.layout == 'vertical'">
			
		</block>
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
	.diy-template-nav-btn{
		
	}
</style>