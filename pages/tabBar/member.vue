<template>
	<view>
		<view class="header"  :style="{height: hasLogin? '30vh': '20vh'}">
			<!-- #ifdef MP -->
			<u-gap height="44" />
			<!-- #endif -->
			<view class="user vk-flex ml20">
				<view class="sitting" :style="{top: getCapsuleHeight()}" v-if="hasLogin">
					<u-icon name="setting" color="#ffffff" size="22" @click="$utils.navigate('/member/setting')" />
				</view>
				<u-avatar :src="info.avatar" shape="circle" size="55" @click="getInfo" />
				<view class="box vk-flex" @click="getInfo">
					<view class="username">
						{{hasLogin? info.nickname: "点击登录"}}
					</view>
					<view class="user-level" v-if="info.level_id > 0">
						<image class="level-img" />
						<view class="level-name">
							sad a
						</view>
					</view>
				</view>
			</view>
			<view class="custom_field vk-flex" v-if="hasLogin">
				<navigator url="/member/finance/balance" hover-class="none" class="item vk-flex">
					<text class="t2">{{info.money}}</text>
					<text class="t1">余额</text>
				</navigator>
				<navigator url="/member/finance/scoreLog" hover-class="none" class="item vk-flex">
					<text class="t2">{{info.score}}</text>
					<text class="t1">积分</text>
				</navigator>
				<view class="item vk-flex">
					<text class="t2">0.00</text>
					<text class="t1">优惠券</text>
				</view>
			</view>
		</view>
		<view class="userinfo-order" style="margin: -40px 11px 11px;">
			<view class="vk-group-info pl10 pr10">
				<text class="f1">
					我的订单
				</text>
				<u-text suffixIcon="arrow-right" align="right" color="#999" iconStyle="font-size: 14px;color: #999;" text="查看全部订单" />
			</view>
			<view class="content vk-flex">
				<view class="item vk-flex">
					isadas
					<text class="t3">待付款</text>
				</view>
			</view>
		</view>
		<view :style="{
			color: '#000000',
			fontSize: '32rpx',
			fontWeight: 'bold',
			padding: '15rpx 15px 5rpx'
		}">
			其他功能
		</view>
		<view class="menu-list">
			<u-cell-group 
				:border="false"
			>
				<u-cell 
					:border="false"
					:titleStyle="{
						color: '#000000',
						fontSize: '28rpx',
						fontWeight: 'normal',
					}"
					:icon="item.icon"
					:iconStyle="{
						fontSize: '44rpx',
						marginRight: '5rpx'
					}"
					:isLink="true"
					:title="item.name" 
					@click="itemClick(item)" 
					v-for="(item,index) in moreMenu" :key="index" 
				/>
			</u-cell-group>
		</view>
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
				moreMenu: [
					{
						name: "余额记录",
						icon: 'list',
						fun(that) {
							that.$utils.navigate('/member/finance/moneyLog')
						}
					},
					{
						name: "联系客服",
						icon: 'kefu-ermai',
						fun(that) {
							that.$utils.handleNavigate('/pages/common/service')
						}
					},
					{
						name: "隐私政策",
						icon: 'order',
						fun(that) {
							that.$utils.navigate('/pages/help/privacyPolicy')
						}
					},
					{
						name: "用户协议",
						icon: 'attach',
						fun(that) {
							that.$utils.navigate('/pages/help/userAgreement')
						}
					},
					{
						name: "退出登录",
						icon: 'man-delete',
						fun(that) {
							that.$store.dispatch("member/logout")
						}
					},
				]
			}
		},
		onShow() {
			let that = this
			this.getInfo()
			if(this.hasLogin){
				
			}
		},
		methods: {
			getInfo(){
				this.$store.dispatch("member/getInfo")
			},
			getCapsuleHeight(){
				let top = "15px";
				// #ifdef MP
				top = getApp().globalData.capsuleHeight
				// #endif
				return top
			},
			itemClick(item){
				item.fun(this)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f6f7f8;
	}
	.header {
		padding-top: 60rpx;
		color: #ffffff;
		background: linear-gradient(45deg, rgb(253, 74, 70) 0%, rgba(253, 74, 70, 0.8) 100%);
		position: relative;
		text-align: center;
		/deep/ .user {
			padding: 15px;
			.u-avatar{
				margin-right: 15rpx;
				border: 1px solid #ffffff;
			}
			.box{
				flex-direction: column;
				justify-content: center;
				.username{
					color: #fff;
					font-weight: normal;
				}
				.user-level{
					color: hsla(0,0%,100%,.6);
					margin-top: 2px;
					width: auto;
					height: 18px;
					border-radius: 9px;
					padding: 0 10px;
					display: flex;
					align-items: center;
					.level-img{
						width: 16px;
						height: 16px;
						margin-right: 3px;
						margin-left: -7px;
						border-radius: 50%;
					}
					.level-name{
						font-size: 12px;
					}
				}
			}
		}
		.custom_field{
			align-items: center;
			padding: 8px 4px;
			.item{
				flex: 1;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.t2{
					color: #fff;
					font-weight: 700;
					font-size: 16px;
				}
				.t1{
					color: hsla(0,0%,100%,.6);
					font-size: 12px;
					margin-top: 5px;
				}
			}
		}
		
		.sitting{
			right: 20rpx;
			position: absolute;
		}
	}
	.userinfo-order{
		background: #fff;
		padding: 10rpx 20rpx;
		border-radius: 8px;
		position: relative;
		.head{
			align-items: center;
			width: 100%;
			padding: 8px 0;
			.f1{
				flex: auto;
				font-size: 15px;
				padding-left: 8px;
				font-weight: 700;
				color: #333;
			}
		}
		.content{
			width: 100%;
			padding: 0 0 5px 0;
			align-items: center;
			font-size: 12px;
			.item{
				padding: 5px 0;
				flex: 1;
				flex-direction: column;
				align-items: center;
				position: relative;
				.t3{
					padding-top: 3px;
				}
			}
		}
	}
</style>