<template>
	<view class="diy-template-single-img" 
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
		}">
		<u-image
		    :showLoading="true"
		    :src="data.src"
			width="100%"
		    :height="data.height"
			:radius="data.radius"
		    @click="click"
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
		methods: {
			click(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.diy-template-single-img{
		
	}
</style>