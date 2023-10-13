<script>
	import { website as websiteApi } from "@/api/website.js"
	export default {
		globalData: {
			website: {},
			capsuleHeight: 0,
		},
		onLaunch: function(options) {
			let website = uni.getStorageSync('website')
			if(!website){
				websiteApi().then(res=>{
					website = res.data
					uni.setStorageSync('website', website)
					this.globalData.website = website
				})
			}else{
				this.globalData.website = website
			}
			// #ifdef MP-WEIXIN
			let menu = uni.getMenuButtonBoundingClientRect()
			let navigationBarHeight = menu.bottom + menu.top - uni.getSystemInfoSync().statusBarHeight + "px"
			uni.setStorageSync('capsuleHeight', navigationBarHeight)
			this.globalData.capsuleHeight = navigationBarHeight
			// #endif
			// if(!this.$store.state.user.hasLogin){
				
			// 	if("pages/tabBar/index".indexOf(options.path) == -1){
			// 		uni.reLaunch({
			// 			url: "/pages/auth/login",
			// 		})
			// 	}
			// }else{
			// 	let paths = [
			// 		"pages/auth/login",
			// 		"pages/auth/register",
			// 	];
			// 	if(paths.indexOf(options.path) > -1){
			// 		uni.reLaunch({
			// 			url: "/pages/tabBar/index",
			// 		})
			// 	}
			// }
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	@import url("static/iconfont/iconfont.css");
	/*每个页面公共css */
	.vk-flex {
		display: flex;
	}
	
	.vk--flex__item{
		flex: 1;
	}
	.container{
		font-size: $vk-font-size;
	}
	
	// 顶部
	.nav{
		height: var(--status-bar-height);// --status-bar-height系统状态栏高度
	}
	
	.mt5{
		margin-top: 10rpx !important;
	}
	.mt10{
		margin-top: 20rpx !important;
	}
	
	.mr10{
		margin-right: 20rpx !important;
	}
	.p15{
		padding: 15rpx !important;
	}
	.p20{
		padding: 20rpx !important;
	}
	.pt10{
		padding-top: 20rpx !important;
	}
	.pb10{
		padding-bottom: 20rpx !important;
	}
	.pb5{
		padding-bottom: 10rpx !important;
	}
	.pb0{
		padding-bottom: 0 !important;
	}
	button::after {
	  border: none;
	}
	button {
	  border-radius:0;
	}
</style>
