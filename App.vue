<script>
	import { website as websiteApi } from "@/api/website.js"
	import { getPlatform, getUrlQuery } from '@/utils/platform';
	import store from '@/store'
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
			
			// #ifdef H5
			if(platform == "wx_official" && !store.state.user.hasLogin){
				store.dispatch("user/wxOfficialOauth")
				return
			}
			// #endif
			
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
	@import "@/static/css/common.scss";

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
	
	
	.vk-group-info{
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		.f1{
			flex: auto;
			font-size: 15px;
			font-weight: 700;
			color: #333;
		}
	}
</style>
