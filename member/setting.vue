<template>
	<view>
		<u-cell-group :customStyle="{background: '#ffffff'}">
			<u-cell title="个人资料" isLink url="info/index"></u-cell>
		</u-cell-group>
		<u-gap height="8"/>
		<u-cell-group :customStyle="{background: '#ffffff'}">
			<u-cell title="关于我们" isLink url="/pages/help/about"></u-cell>
			<u-cell title="用户协议" isLink url="/pages/help/userAgreement"></u-cell>
			<u-cell title="隐私政策" isLink url="/pages/help/privacyPolicy"></u-cell>
		</u-cell-group>
		
		<view class="logout">
			<u-button :customStyle="{
				width: '90%',
				margin: '0 auto'
			}" :style="[btnStyle]" shape="circle" type="error" text="退出登录" @click='logout' />
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			logout(){
				this.$store.dispatch("member/logout")
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.logout{
		position: fixed;
		bottom: 20px;
		width: 100%;
	}
</style>