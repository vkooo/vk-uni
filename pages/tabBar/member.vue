<template>
	<view>
		<view class="header">
			<!-- #ifdef MP -->
			<u-gap height="44" />
			<!-- #endif -->
			<view class="user">
				<u-avatar :src="info.avatar" shape="circle" size="65"></u-avatar>
				<view class="sitting" :style="{top: getCapsuleHeight()}" v-if="hasLogin">
					<u-icon name="setting" color="#808080" size="25" @click="$utils.navigate('/pages/member/setting')" />
				</view>
			</view>
		</view>
		<u-cell-group>
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
			getCapsuleHeight(){
				let top = "15px";
				// #ifdef MP
				top = getApp().globalData.capsuleHeight
				// #endif
				return top
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		padding: 60rpx 0;
		background: linear-gradient(to bottom, #c3eff0, #ffffff);
		position: relative;
		text-align: center;
		.u-avatar{
			margin: 0 auto;
		}
		.user {
			// padding: 35rpx 0 50rpx;
		}
		
		.sitting{
			right: 20rpx;
			position: absolute;
		}
	}
</style>