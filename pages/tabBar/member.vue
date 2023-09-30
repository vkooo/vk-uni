<template>
	<view>
		<view class="user">
			<view style="margin: auto;">
				<u-avatar src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" size="65"></u-avatar>
				<view class="user-text">点击获取头像</view>
			</view>
		</view>
		<u-cell-group>
			<u-cell icon="account-fill" url="/pages/user/info" title="个人设置" :isLink="true"></u-cell>
			<u-cell icon="info-circle-fill" url="/pages/user/address/index" title="收货地址" :isLink="true"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState('member', ["info", "hasLogin"]),
		},
		data() {
			return {

			}
		},
		onShow() {
			let that = this
			this.$store.dispatch("member/getInfo")
			if(this.hasLogin){
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.user {
		display: flex;
		padding: 60rpx 0 60rpx 0;
		background: linear-gradient(to bottom, #c3eff0, #ffffff);
		text-align: center;
		.u-avatar{
			margin: 0 auto;
		}
	}

	.user-text {
		font-size: 30rpx;
		color: #8a8b8d;
		padding-top: 20rpx;
	}
</style>