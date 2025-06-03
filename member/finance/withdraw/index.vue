<template>
	<view>
		<u-navbar
			title="余额"
			:autoBack="true"
			:bgColor="navBgColor"
			leftIconColor="#ffffff"
			:titleStyle="{
				color: '#ffffff'
			}"
		>
			<view slot="right" 
				@click="$utils.navigate('/member/finance/withdraw/record')" class="nav-right-btn">
				提现记录
			</view>
		</u-navbar>
		<view class="h-navbar" />
		<view class="content">
			<view class="title">
				账户余额(元) <span style="padding-left: 10rpx;" /> <u-icon size="20" :name="eye? 'eye': 'eye-off'"  @click="eye = !eye"/>
			</view>
			<view class="money">
				{{eye? info.money: '****'}}
			</view>
		</view>
		
		<view class="section-card m-t-15">
			<view class="section-title">选择提现金额</view>
			<view class="amount-grid">
				<view 
					v-for="item in list" 
					:key="item.id"
					class="amount-item"
					:class="{
						'active': ruleId == item.id, 
						'disabled': item.price > parseFloat(info.money)
					}"
					@click="amount = item.price, ruleId = item.id"
				>
					<text class="prefix">¥</text>
					<text class="value">{{ item.price }}</text>
				</view>
				<view 
					class="amount-item all-amount"
					:class="{ 'active': amount == info.money }" 
					@click="ruleId = null, amount = info.money"
				>
					全部提现
				</view>
			</view>
			
			<view class="actual-amount" v-if="amount">
				实际到账金额：
				<text class="highlight">¥{{ actualAmount }}</text>
				<text class="fee-rate" v-if="withdrawObj.fee_rate">(手续费{{withdrawObj.fee_rate}}%)</text>
			</view>
		</view>
		
		<view class="section-card">
			<view class="section-title m-b-20">选择提现方式：</view>
			<u-radio-group v-model="withdrawMethod" 
				placement="column"
				iconPlacement="right">
				<u-radio v-for="(item, index) in methods" 
					:name="item.value" 
					:class="{
						'u-border-bottom p-b-15 m-b-15': index < methods.length - 1
					}"
					:label="item.label" />
			</u-radio-group>
		
		</view>
		
		<view class="submit-btn">
			<u-button type="primary" shape="circle" :disabled="!canSubmit" @click="submitWithdraw">
				确认提现
			</u-button>
		</view>
		<view class="m-t-10 m-b-10 set-account flex-center" 
			v-if="accountPage.page"
			@click="$utils.navigate(accountPage.page)">
			设置{{accountPage.label}}账户
			<u-icon name="arrow-right" size="12" color="rgb(153, 153, 153)" />
		</view>
		
		<view class="notice-card">
			<view class="notice-title">
				<u-icon name="info-circle" size="16" color="#2979ff" />
				<text>提现说明</text>
			</view>
			<view class="notice-content">
				<view 
					v-for="(item, index) in withdrawObj.desc" 
					:key="index"
					class="notice-item"
				>
					<text class="dot">•</text>
					<text>{{ item }}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		withdrawInit, withdrawSubmit,
	} from '@/api/finance';
	import {
		mapState, mapGetters
	} from "vuex"
	import scrollNavbarMixin from '@/mixins/scrollNavbarMixin';
	export default {
		mixins: [scrollNavbarMixin],
		computed: {
			...mapState('member', ["info", "hasLogin"]),
			...mapGetters('website', ["withdrawObj"]),
			actualAmount() {
				const amt = parseFloat(this.amount)
				return amt ? (amt * (1 - this.withdrawObj.fee_rate / 100)) : '0.00'
			},
			canSubmit() {
				if (this.amount <= 0 || this.withdrawMethod == 0) return false
				return true
			},
			accountPage() {
				if(this.withdrawMethod > 0){
					return this.methods.find(item=> item.value == this.withdrawMethod)
				}
				return {}
			},
		},
		data() {
			return {
				eye: true,
				list: [],
				amount: null,
				ruleId: null,
				withdrawMethod: 0,
				methods: [{
						label: '支付宝',
						value: 1,
						page: "/member/info/modify/aliaccount"
					},
					{
						label: '银行卡',
						value: 2,
						page: "/member/bankcard/index"
					}
				],
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init(){
				withdrawInit().then(res=>{
					if(res.code == 200){
						const { list, total } = res.data
						this.list = list.map(item => ({
						  ...item,
						  price: parseFloat(item.price)
						}));
						this.methods = this.safeMethodCheck(this.methods, this.withdrawObj.method)
					}
				})
			},
			safeMethodCheck(methods, targetValues){
			    if (!Array.isArray(methods)) return [];
			    if (!Array.isArray(targetValues)) return [];
			    
			    return methods.filter(item => 
			        item?.value !== undefined && 
			        targetValues.includes(item.value)
				);
			},
			submitWithdraw(){
				uni.showLoading({
					title: '加载中',
				});
				withdrawSubmit({
					ruleId: this.ruleId,
					amount: this.amount,
					method: this.withdrawMethod,
				}).then(res=>{
					this.$u.toast(res.msg)
					this.$store.dispatch("member/getInfo")
				})
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
	.h-navbar{
		height: 25vh;
		background: linear-gradient(to bottom, #5993f0 0%, #7fb4f0 50%, #f6f6f6 100%);
	}
	
	.content {
		background: #ffffff;
		width: 85%;
		margin: -15vh auto 0;
		border-radius: 10rpx;
		padding: 30rpx;
		font-size: 28rpx;
		text-align: center;
		.title{
			display: flex;
			align-items: center;
			justify-content: center;
		}
	
		.money {
			font-weight: bold;
			font-size: 75rpx;
			margin: 15rpx 0;
		}
	}
	.section-card {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 40rpx 30rpx;
		width: 85%;
		margin: 0 auto 30rpx;
		box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.03);
	
		.section-title {
			font-size: 30rpx;
			font-weight: 600;
			margin-bottom: 20rpx;
			color: #333;
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
	
		.amount-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 20rpx;
			margin-bottom: 20rpx;
			
			.amount-item {
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #f7f8fa;
				border-radius: 12rpx;
				font-size: 30rpx;
				color: #333;
				border: 2rpx solid transparent;
				transition: all 0.3s;
				
				.prefix {
					font-size: 24rpx;
					margin-right: 2rpx;
				}
				
				.value {
					font-weight: bold;
				}
				
				&.active {
					background: rgba(41, 121, 255, 0.1);
					color: #2979ff;
					border-color: #2979ff;
					
					.prefix {
						color: #2979ff;
					}
				}
				
				&.disabled {
					background: #f7f7f7;
					color: #ccc;
					pointer-events: none;
				}
				
				&.all-amount {
					grid-column: span 3;
					height: 75rpx;
					font-size: 28rpx;
					color: #666;
					
					&.active {
						color: #2979ff;
						font-weight: bold;
					}
				}
			}
		}
	
		.actual-amount {
			font-size: 26rpx;
			color: #666;
			padding-top: 20rpx;
			border-top: 1rpx dashed #eee;
			
			.highlight {
				color: #ff4d4f;
				font-weight: bold;
				margin-left: 10rpx;
			}
			
			.fee-rate {
				color: #999;
				font-size: 24rpx;
				margin-left: 10rpx;
			}
		}
	}
	
	.submit-btn {
		margin: 40rpx auto;
		width: 90%;
	}
	.set-account{
		width: 100%;
		text-align: center;
		color: rgb(153, 153, 153);
		font-size: 28rpx;
	}
	
	.notice-card {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		width: 85%;
		margin: 30rpx auto;
		
		.notice-title {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
			
			text {
				margin-left: 10rpx;
			}
		}
		
		.notice-content {
			color: #666;
			font-size: 26rpx;
			line-height: 1.8;
			
			.notice-item {
				display: flex;
				margin-bottom: 10rpx;
				
				.dot {
					margin-right: 10rpx;
					color: #2979ff;
				}
			}
		}
	}
	
</style>