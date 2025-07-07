<template>
	<view class="bind-bank-card">
		<u-navbar title="银行卡列表" :autoBack="true" :borderBottom="false" 
			:placeholder="true"
		>
			<u-icon slot="right" name="plus-circle" size="20" @click="$utils.navigate('/member/bankcard/modify')" />
		</u-navbar>
		<view class="lists" v-if="list.length > 0">
			
			<view class="card-display" v-for="item in list" @click="$utils.navigate('/member/bankcard/modify', {id: item.id})">
				<!-- :style="cardStyle(item)" -->
				<view class="bank-card" >
					<view class="card-top">
						<view class="bank-info">
							<image v-if="item.icon" :src="item.icon" mode="aspectFit"
								class="bank-logo"></image>
							<text class="bank-name">{{ item.bankcard || '选择银行' }}</text>
						</view>
						<text class="card-type">银行卡</text>
					</view>
			
					<view class="card-number">
						{{ item.code.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') || '•••• •••• •••• ••••' }}
					</view>
			
					<view class="card-bottom">
						<text class="card-holder">{{ item.realname || '持卡人姓名' }}</text>
						<view class="card-chip">
							<view class="chip-line"></view>
							<view class="chip-line"></view>
							<view class="chip-line"></view>
						</view>
					</view>
				</view>
			
				<view class="card-shadow" />
			</view>
			
			<u-loadmore :status="status" @loadmore="loadList()"/>
		</view>
		<vk-empty v-else />
	</view>
</template>

<script>
	import { bankcardLists } from '@/api/member.js';
	export default {
		computed: {
			cardStyle(bank) {
				const defaultStyle = {
					background: 'linear-gradient(135deg, #2979ff, #4a90e2)',
					color: '#fff'
				};
				if (bank && bank.bgColor) {
					return {
						background: `linear-gradient(135deg, ${bank.bgColor}, ${this.lightenColor(bank.bgColor, 20)})`,
						color: '#fff'
					};
				}
				return defaultStyle;
			},
		},
		data() {
			return {
				page: 1,
				list: [],
				status: "loadmore",
			};
		},
		onShow() {
			this.list = []
			this.page = 1
			this.getList()
		},
		onReachBottom(){
			this.loadList()
		},
		methods: {
			loadList(){
				this.status = 'loading';
				this.page = ++this.page;
				this.getList()
			},
			getList(){
				bankcardLists({
					page: this.page,
				}).then(res=>{
					if(res.code == 200){
						const { list, total } = res.data
						if(list.length > 0){
							this.list = this.list.concat(list)
							this.status = 'loadmore';
						}else{
							this.page = this.page - 1
							this.status = 'nomore';
						}
					}
				})
			},
			
			// 颜色变亮
			lightenColor(color, percent) {
				const num = parseInt(color.replace('#', ''), 16);
				const amt = Math.round(2.55 * percent);
				const R = (num >> 16) + amt;
				const G = (num >> 8 & 0x00FF) + amt;
				const B = (num & 0x0000FF) + amt;
			
				return `#${(
					0x1000000 +
					(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
					(G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
					(B < 255 ? (B < 1 ? 0 : B) : 255)
				).toString(16).slice(1)}`;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.lists{
		width: 90%;
		margin: 20rpx auto 0;
	}
	.card-display {
		position: relative;
		margin-bottom: 40rpx;
	
		.bank-card {
			height: 240rpx;
			border-radius: 20rpx;
			padding: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;
			z-index: 2;
			box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
	
			.card-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
	
				.bank-info {
					display: flex;
					align-items: center;
	
					.bank-logo {
						width: 60rpx;
						height: 60rpx;
						margin-right: 15rpx;
					}
	
					.bank-name {
						font-size: 32rpx;
						font-weight: bold;
					}
				}
	
				.card-type {
					font-size: 24rpx;
					background-color: rgba(255, 255, 255, 0.2);
					padding: 6rpx 16rpx;
					border-radius: 30rpx;
				}
			}
	
			.card-number {
				font-size: 38rpx;
				letter-spacing: 2rpx;
				font-family: 'Courier New', monospace;
				margin: 30rpx 0;
				word-spacing: 10rpx;
				text-align: center;
			}
	
			.card-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
	
				.card-holder {
					font-size: 28rpx;
				}
	
				.card-chip {
					width: 50rpx;
					height: 40rpx;
					background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
					border-radius: 6rpx;
					position: relative;
					overflow: hidden;
	
					.chip-line {
						position: absolute;
						background-color: rgba(255, 255, 255, 0.4);
						height: 10rpx;
						border-radius: 5rpx;
	
						&:nth-child(1) {
							width: 30rpx;
							top: 8rpx;
							left: 5rpx;
						}
	
						&:nth-child(2) {
							width: 20rpx;
							top: 22rpx;
							left: 10rpx;
						}
	
						&:nth-child(3) {
							width: 15rpx;
							top: 15rpx;
							right: 5rpx;
						}
					}
				}
			}
		}
	
		.card-shadow {
			position: absolute;
			bottom: -20rpx;
			left: 20rpx;
			right: 20rpx;
			height: 30rpx;
			background-color: rgba(0, 0, 0, 0.05);
			border-radius: 50%;
			filter: blur(10rpx);
			z-index: 1;
		}
	}
</style>