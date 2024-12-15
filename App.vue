<script>
	import { website as websiteApi } from "@/api/website.js"
	import { getPlatform, getBrand, getUrlQuery } from '@/utils/platform'
	import store from '@/store'
	export default {
		globalData: {
			capsuleHeight: 0,
			platform: null,
			brand: null
		},
		onLaunch: function(options) {
			let platform = getPlatform()
				, brand = getBrand();
			this.globalData.platform = platform
			this.globalData.brand = brand
			
			this.$store.dispatch("website/init")
			
			// 邀请码
			if(options.query.ii){
				uni.setStorageSync('ii', options.query.ii)
			}
			
			// #ifdef H5
			if(platform == "wx_official" && !store.state.member.hasLogin){
				store.dispatch("member/wxOauth")
				return
			}
			// #endif
			
			// 如果有回调页面
			if(options.query.redirect){
				this.$store.dispatch("member/setRedirect", options.query.redirect)
			}
			
			// #ifdef MP-WEIXIN
			// 胶囊高度
			let menu = uni.getMenuButtonBoundingClientRect()
			let navigationBarHeight = menu.bottom + menu.top - uni.getSystemInfoSync().statusBarHeight + "px"
			uni.setStorageSync('capsuleHeight', navigationBarHeight)
			this.globalData.capsuleHeight = navigationBarHeight
			// #endif
			
			uni.onNetworkStatusChange(function(res) {
				console.log('onNetworkStatusChange', res);
				if (res.isConnected) {
					uni.reLaunch({
						url: '/pages/tabBar/index'
					})
				}
			})
			
			console.log('App Launch')
		},
		onShow: function() {
			if (store.state.member.hasLogin) {
				this.$ws.init()
				store.dispatch("member/getInfo")
			}
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "@/static/css/common.scss";
	@import "@/static/css/generate.scss";

	@import url("static/iconfont/iconfont.css");
	/*每个页面公共css */
	
	.vk-flex {
		display: flex;
		&.align_items{
			align-items: center;
		}
		&.align_items_end{
			align-items: flex-end;
		}
		&.justify_center{
			justify-content: center;
		}
		&.justify_between{
			justify-content: space-between;
		}
	}
	
	.vk-flex-column{
		flex-flow: column;
	}
	
	.vk--flex__item{
		flex: 1;
	}
	.container{
		font-size: $vk-font-size;
	}
	
	.vk-group-info{
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		.f1{
			flex: auto;
			font-size: 15px;
			font-weight: 700;
			color: #333;
		}
	}
</style>
