<template>
	<view class="diy-template-search" 
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
		}">
		<u-search
			:shape="data.shape"
			:height="data.height" 
			:bgColor="data.bgColor"
			:searchIcon="data.searchIcon"
			:searchIconSize="data.searchIconSize"
			:placeholder="data.placeholder"
			:clearabled="data.clearabled"
			:showAction="data.showAction"
			:actionText="data.actionText"
			:inputAlign="data.align"
			:disabled="data.disabled"
			:color="data.textColor"
			:placeholderColor="data.placeholderColor"
			:searchIconColor="data.searchIconColor"
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