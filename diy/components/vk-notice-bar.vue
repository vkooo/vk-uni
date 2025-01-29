<template>
	<view class="diy-template-notice-bar"
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
		}">
		<u-notice-bar 
			v-if="text"
			:icon="data.icon"
			:direction="data.direction"
			:step="(data.direction == 'row' && data.step == 1)"
			:text="text" 
			:bgColor="data.bgColor" 
			:color="data.textColor" 
			:speed="data.speed" 
			:fontSize="data.fontSize"
			:url="data.url"
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
		computed: {
			text(){
				if(Array.isArray(this.data.textList)){
					const combined = this.data.textList.map(item => item.text)
					if(this.data.direction == "row" && this.data.step == 2){
						return combined.join('');
					}
					return combined
				}
				return ""
			}
		},
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>