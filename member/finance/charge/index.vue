<template>
	<view class="recharge-page">
		<!-- 导航栏 -->
		<u-navbar title="充值中心" :autoBack="true" bgColor="transparent" leftIconColor="#ffffff" 
		:titleStyle="{
			color: '#ffffff'
		}">
			<view slot="right"
				@click="$utils.navigate('/member/finance/charge/record')" class="nav-right-btn">
				充值记录
			</view>
		</u-navbar>
		<view class="h-navbar" />
		<!-- 充值金额选项 -->
		<view class="section-card" style="margin-top: -15vh; ">
			<view class="section-title">充值金额</view>
			<view class="amount-grid">
				<view v-for="(item, ind) in amountOptions" :key="ind" class="amount-item"
					:class="{ 'active': index === ind }" @click="selectAmount(ind, item)">
					<view class="amount">{{ item.price }}元</view>
					<view class="amount-desc">{{ item.title }}</view>
				</view>
			</view>
		</view>

		<!-- 充值说明 -->
		<view class="section-card notice-card">
			<view class="section-title">充值说明</view>
			<view class="notice-content">
				<view v-for="(item, index) in balanceObj.recharge_desc" :key="index" class="notice-item">
					<text class="notice-index">{{ index + 1 }}. </text>
					<text>{{ item }}</text>
				</view>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="footer-bar">
			<view class="payment-amount">
				<text>付款金额</text>
				<text class="amount">¥{{ obj.price || 0.00 }}</text>
			</view>
			<u-button shape="circle" 
				:disabled="index == -1"
				@click="$refs.paymentRef.pay({
					amount: obj.price
				})"
				:customStyle="{ height: '80rpx', fontSize: '32rpx' }"
				:style="[btnStyle]"
				>
				立即充值
			</u-button>
		</view>
		<vk-payment ref="paymentRef" @click="payClick" />
	</view>
</template>

<script>
	import {
		chargeInit, chargeSubmit,
	} from '@/api/finance';
	import {
		mapState, mapGetters
	} from "vuex"
	import { handlePayment } from '@/utils/payment';

	export default {
		computed: {
			...mapState('member', ["info", "hasLogin"]),
			...mapGetters('website', ["balanceObj"]),
		},
		data() {
			return {
				index: -1,
				obj: {},
				amountOptions: [],
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init(){
				chargeInit().then(res=>{
					if(res.code == 200){
						const { list, total } = res.data
						this.amountOptions = list
					}
				})
			},
			selectAmount(index, item) {
				this.index = index
				this.obj = item
			},

			payClick(item) {
				const that = this
				item.ruleId = this.obj.id
				uni.showLoading({
					title: '充值中...'
				})
				chargeSubmit(item).then(res=>{
					const { code, data } = res
					handlePayment({
						res,
						item,
						vm: this,
						onSuccess: (e) => {
							console.log(e)
						},
						onFail: (e) => {
							console.log(e)
						},
					})
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.h-navbar {
		height: 25vh;
		background: linear-gradient(to bottom, #5993f0 0%, #7fb4f0 50%, #f6f6f6 100%);
	}

	.recharge-page {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 120rpx;
		

		.section-card {
			background-color: #ffffff;
			border-radius: 12rpx;
			padding: 30rpx;
			margin: 20rpx;

			.section-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 30rpx;
				position: relative;
				padding-left: 20rpx;
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 6rpx;
					height: 30rpx;
					background: #2979ff;
					border-radius: 3rpx;
				}
			}
		}

		.amount-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;

			.amount-item {
				border: 1rpx solid #eee;
				border-radius: 12rpx;
				padding: 30rpx 20rpx;
				text-align: center;

				.amount {
					font-size: 36rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 10rpx;
				}

				.amount-desc {
					font-size: 24rpx;
					color: #999;
				}

				&.active {
					border-color: #2979ff;
					background-color: rgba(41, 121, 255, 0.05);

					.amount {
						color: #2979ff;
					}
				}
			}
		}

		.notice-card {
			.notice-content {
				padding: 0 10rpx;
			}

			.notice-item {
				font-size: 26rpx;
				color: #666;
				line-height: 1.8;
				margin-bottom: 15rpx;
				display: flex;

				.notice-index {
					color: #2979ff;
				}
			}
		}

		.footer-bar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #ffffff;
			padding: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

			.payment-amount {
				flex: 1;
				padding-left: 30rpx;

				.amount {
					font-size: 36rpx;
					font-weight: bold;
					color: #ff4d4f;
					margin-left: 20rpx;
				}
			}

			::v-deep .u-button {
				width: 250rpx;
			}
		}
	}
</style>