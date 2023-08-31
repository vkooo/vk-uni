<script>
	export default {
		onLaunch: function(options) {
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
	
	// 顶部
	.nav{
		height: var(--status-bar-height);// --status-bar-height系统状态栏高度
	}
	
	button::after {
	  border: none;
	}
	button {
	  border-radius:0;
	}
</style>
