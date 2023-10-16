<template>
	<view>
		<u-cell-group :customStyle="{background: '#ffffff'}">
			<u-cell title="个人资料" isLink url="info/index"></u-cell>
		</u-cell-group>
		<u-gap height="8" bgColor="#f5f5f5"/>
		<u-cell-group :customStyle="{background: '#ffffff'}">
			<u-cell title="关于我们" isLink url="/pages/help/about"></u-cell>
			<u-cell title="用户协议" isLink url="/pages/help/userAgreement"></u-cell>
			<u-cell title="隐私政策" isLink url="/pages/help/privacyPolicy"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	page{
		background: #f5f5f5;
	}
</style>