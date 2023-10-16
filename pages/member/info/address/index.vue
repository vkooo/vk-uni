<template>
	<view class="container">
		<u-navbar
			title="收货地址"
			@rightClick="rightClick"
			:autoBack="true"
			:placeholder="true"
		>
			<template slot="right">
				<text style="color: #9b9b9b">添加新地址</text>
			</template>
		</u-navbar>
		<view class="addres-list">
			<view class="address-item" v-for="(item, index) in list" :key="index">
				<view class="contacts">
					<text class="name">{{ item.name }}</text>
					<text class="phone">{{ item.phone }}</text>
				</view>
				<view class="address">
					<text class="region" v-for="(region, idx) in item.region" :key="idx">{{ region }}</text>
					<text class="detail">{{ item.detail }}</text>
				</view>
				<view class="line"></view>
				<view class="item-option">
					<view class="_left">
						<label class="item-radio" @click.stop="handleSetDefault(item)">
							<radio class="radio" color="#fa2209" :checked="item.address_default"></radio>
							<text class="text">{{ item.address_default ? '已设为默认' : '设为默认' }}</text>
						</label>
					</view>
					<view class="_right">
						<view class="events">
							<view class="event-item" @click="$utils.navigate('modify?id=' + item.id)">
								<text class="iconfont icon-edit"></text>
								<u-text prefixIcon="edit-pen" iconStyle="font-size: 19px" text="编辑" />
							</view>
							<view class="event-item" @click="handleRemove(item.id)">
								<text class="iconfont icon-delete"></text>
								<u-text prefixIcon="trash" iconStyle="font-size: 19px" text="删除" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { lists } from '@/api/address.js';
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			let that = this
			lists().then(res=>{
				that.list = res.data
			})
		},
		methods: {
			rightClick() {
				this.$utils.navigate("modify")
			},
			// 删除地址
			handleRemove(addressId) {
				const that = this
				uni.showModal({
					title: "提示",
					content: "您确定要删除当前收货地址吗?",
					success: function(res) {
						if (res.confirm) {
							const list = uni.getStorageSync('savedData')
							const item = list.filter(address => address.id !== addressId);
							uni.setStorageSync('savedData', item);
							uni.showToast({
								title: '删除成功',
								duration: 2000
							});
							that.getAddressList()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}

					}
				});

			},

			// 设置默认地址
			handleSetDefault(item) {
				const id = item.id
				this.addresslist.forEach(item => {
					if (item.id == id) {
						item.address_default = true
						return
					}
					item.address_default = false
				})
				uni.setStorageSync('savedData', this.addresslist);
				this.getAddressList()
			}
		}
	}
</script>

<style lang="scss" scoped>

	// 项目内容
	.address-item {
		margin: 20rpx auto 20rpx auto;
		padding: 30rpx 40rpx;
		width: 94%;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		background: #fff;
	}

	.contacts {
		font-size: 30rpx;
		margin-bottom: 16rpx;
		font-weight: bold;
		.name {
			margin-right: 16rpx;
		}
	}

	.address {
		font-size: 28rpx;

		.region {
			margin-right: 10rpx;
		}
	}

	.line {
		margin: 20rpx 0;
		border-bottom: 1rpx solid #f3f3f3;
	}

	.item-option {
		display: flex;
		justify-content: space-between;
		height: 48rpx;

		// 单选框
		.item-radio {
			font-size: 28rpx;

			.radio {
				vertical-align: middle;
				transform: scale(0.76)
			}

			.text {
				vertical-align: middle;
			}
		}

		// 操作
		.events {
			display: flex;
			align-items: center;
			line-height: 48rpx;

			.event-item {
				font-size: 28rpx;
				margin-right: 26rpx;
				color: #4c4c4c;

			}
		}

	}


	// 底部操作栏
	.footer-fixed {
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		right: 0;
		min-height: 120rpx;
		z-index: 11;
		box-shadow: 0 -4rpx 40rpx 0 rgba(151, 151, 151, 0.24);
		background: #fff;

		// 设置ios刘海屏底部横线安全区域
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.btn-wrapper {
			height: 120rpx;
			display: flex;
			align-items: center;
			padding: 0 40rpx;
		}

		.btn-item {
			flex: 1;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			border-radius: 50rpx;
		}

		.btn-item-main {
			background: linear-gradient(to right, #f9211c, #ff6335);
		}

	}
</style>