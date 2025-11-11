<template>
	<view>
		<view class="vk-tabbar-padd"
			:style="{
				background: tabbarData.bg_color,
				paddingBottom: safeBottom + 'px'
			}"
			v-if="tabbarList.length > 0">
			<view class="vk-tabbar m-0 flex-around-center">
				<view class="vk-item flex flex-column flex-align-center" 
					:style="{
						width: `calc(100% / ${tabbarData.total})`,
						color: currentTabbar === item.pagePath ? tabbarData.font_selected_color : tabbarData.font_color
					}"
					v-for="(item, index) in tabbarList" @click="tabBarChange(index, item)">
					<view class="vk-page_item"
						:style="{
							width: currentTabbar === item.pagePath ? (item.icon_selected_size + 'px') : (item.icon_size + 'px'),
							height: currentTabbar === item.pagePath ? (item.icon_selected_size + 'px') : (item.icon_size + 'px'),
						}"
					>
						<image class="icon" :src="currentTabbar === item.pagePath ? item.icon_selected_path : item.icon_path"/>
					</view>
					<view class="vk-page_bottom" :style="{
						fontSize: currentTabbar === item.pagePath ? (item.font_selected_size + 'px') : (item.font_size + 'px')
					}">
						{{ currentTabbar == item.pagePath ? item.selected_text : item.text }}
					</view>
				</view>
			</view>
		</view>
		<u-gap height="50" />
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapGetters('website', ["tabbar"]),
			tabbarList(){
				return this.tabbar.btns || []
			},
			tabbarData(){
				return this.tabbar.data || {}
			},
			currentTabbar(){
				const page = this.$utils.getCurrentPage();
				if(page){
					return page;
				}
				return null;
			},
			safeBottom() {
			    // 如果设备有安全区，取 bottom，否则返回 0
			    const bottom =  this.$u.sys().safeAreaInsets?.bottom || 0;
				return bottom > 15 ? 15 : bottom

			}
		},
		mounted: function() {},
		methods: {
			tabBarChange(index, item) {
				if(item.pagePath === this.currentTabbar) return
				this.$utils.reLaunch(item.pagePath)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.vk-tabbar-padd {
		border-top: 1rpx solid #F3F3F3;
		background-color: #ffffff;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
		left: 50%;
		transform: translateX(-50%);

		.vk-tabbar {
			height: 100rpx;
			
			.vk-item{
				.vk-page_item {
					.icon {
						width: 100%;
						height: 100%;
					}
				}
				.vk-page_bottom {
					
				}
			}
			
		}
	}



	::v-deep .u-border-top {
		border: 0;
	}
</style>