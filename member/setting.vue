<template>
	<view class="sitting-container">
		<view class="content">
			<u-cell-group :border="false" :customStyle="{background: '#ffffff'}">
				<u-cell title="个人资料" isLink url="/member/info/index" />
				<u-cell title="手机号" isLink :value="info.mobile || '立即绑定手机'" url="/member/info/modify/mobile" />
				<u-cell :border="false" title="收货地址" isLink value="立即前往" url="/member/address/index" />
			</u-cell-group>
			<u-gap height="8" />
			<u-cell-group :border="false" :customStyle="{background: '#ffffff'}">
				<u-cell title="关于我们" isLink url="/pages/help/about" />
				<u-cell title="用户协议" isLink url="/pages/help/userAgreement" />
				<u-cell title="隐私政策" :border="false" isLink url="/pages/help/privacyPolicy" />
			</u-cell-group>

			<view class="logout">
				<u-button :style="[btnStyle]" shape="circle" type="error" text="退出登录" @click='logout' />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		methods: {
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					confirmColor: '#f56c6c', // 红色按钮
					success: (res) => {
						if (res.confirm) {
							this.$store.dispatch("member/logout")
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f6f6f6;
	}

	.sitting-container {
		padding: 20rpx;

		.content {
			.logout {
				position: fixed;
				bottom: 20px;
				width: 90%;
				transform: translateX(-50%);
				left: 50%;
			}
		}

	}
</style>