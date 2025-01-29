<template>
	<view class="diy-template-rich-text" 
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
		}">
		<view :style="{background: data.bgColor}">
			<u-parse :content="data.content || def" @navigate="handleNavigate"  />
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
		data() {
			return {
				def: `<div>
					<p><span style="font-size: 20px;">这里是『富文本』区域</span></p>
					<p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。
					</p>
					<p>也可在这里插入图片</p>
					<p></p>
					<p></p>
					<p></p>
				</div>`
			}
		},
		methods: {
			handleNavigate(event){
				console.log(event)
				// const result = event.split(":");
				// if(Array.isArray(result)){
				// 	const action = result[0];
				// 	const value = result[1];
				// 	if(action == "@aite-user_id"){
				// 		this.$utils.handleNavigate("/socialize/userInfo?id=" + value)
				// 	}
				// }
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>