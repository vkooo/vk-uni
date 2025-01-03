<template>
	<view>
		<view class="vk-tabbar-padd">
			<view class="vk-tabbar">
				<view class="item" v-for="(item, index) in list" @click="tabBarChange(index)">
					<view class="page_item" :class="index == 0 && tabbarIndex == index? item.class: ''">
						<image class="icon" :src="tabbarIndex == index ? item.selectedIconPath : item.iconPath" />
					</view>
					<view class="page_bottom" v-if="index > 0 || index == 0 && tabbarIndex !== index">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>
		<u-gap height="50" />
	</view>
</template>

<script>
	export default {
		props: ['tabbarIndex'],
		data() {
			return {
				list: [
					{
						"pagePath": "/pages/tabBar/index",
						"text": "首页",
						"iconPath": "/static/image/tabar/a.png",
						"selectedIconPath": "/static/image/tabar/a1.png",
						"class": "big",
					},
					{
						"pagePath": "/pages/tabBar/category",
						"text": "分类",
						"iconPath": "/static/image/tabar/b.png",
						"selectedIconPath": "/static/image/tabar/b1.png"
					},
					{
						"pagePath": "/pages/tabBar/video",
						"text": "藏升说",
						"iconPath": "/static/image/tabar/c.png",
						"selectedIconPath": "/static/image/tabar/c1.png"
					},
					{
						"pagePath": "/pages/tabBar/message",
						"text": "消息",
						"iconPath": "/static/image/tabar/d.png",
						"selectedIconPath": "/static/image/tabar/d1.png"
					},
					{
						"pagePath": "/pages/tabBar/member",
						"text": "我的",
						"iconPath": "/static/image/tabar/e.png",
						"selectedIconPath": "/static/image/tabar/e1.png"
					}
				]
			}
		},
		methods: {
			tabBarChange(e) {
				// console.log(this.list[e].pagePath)
				uni.switchTab({
					url: this.list[e].pagePath,
					success() {
						uni.hideTabBar()
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.vk-tabbar-padd {
		border-top: 1rpx solid #E2E4EA;
		background-color: #ffffff;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
		left: 50%;
		transform: translateX(-50%);

		.vk-tabbar {
			width: 90%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			
			.item{
				display: flex;
				align-items: center;
				flex-direction: column;
				color: #333333;
				font-size: 26rpx;
				width: 100rpx;
				.page_item {
					width: 60rpx;
					height: 60rpx;
				
					.icon {
						width: 100%;
						height: 100%;
					}
				
					&.big {
						width: 85rpx;
						height: 85rpx;
					}
				}
				.page_bottom {
					
				}
			}
			
		}
	}



	/deep/ .u-border-top {
		border: 0;
	}
</style>