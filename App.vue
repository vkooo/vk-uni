<script>
	import { website as websiteApi } from "@/api/website.js"
	import { getPlatform } from '@/utils/platform';
	export default {
		globalData: {
			capsuleHeight: 0,
			platform: ""
		},
		onLaunch: function(options) {
			let platform = getPlatform();
			this.globalData.platform = platform
			
			// 邀请码
			if(options.query.ii){
				uni.setStorageSync('ii', options.query.ii)
			}
			if(platform == "wx_official" && options.query.code){
				this.$store.dispatch("member/wxOauth")
			}
			
			// 如果有回调页面
			if(options.query.redirect){
				this.$store.dispatch("member/setRedirect", options.query.redirect)
			}
			
			this.$store.dispatch("website/init")
			
			// #ifdef MP-WEIXIN
			let menu = uni.getMenuButtonBoundingClientRect()
			let navigationBarHeight = menu.bottom + menu.top - uni.getSystemInfoSync().statusBarHeight + "px"
			uni.setStorageSync('capsuleHeight', navigationBarHeight)
			this.globalData.capsuleHeight = navigationBarHeight
			// #endif
			
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
	.pt0{
		padding-top: 0 !important;
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
