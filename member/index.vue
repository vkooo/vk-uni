<template>
	<view>
		<view class="header"  :style="{height: hasLogin || platform === 'wx_mini'? '33vh': '20vh'}">
			<!-- #ifdef MP -->
			<u-gap height="44" />
			<!-- #endif -->
			<view class="user  ml20">
				<view class="sitting" :style="{top: capsuleHeight}" v-if="hasLogin">
					<u-icon name="/static/image/user/setup.png" color="#ffffff" size="24" @click="$utils.navigate('/member/setting')" />
				</view>
				<u-gap height="25" />
				<view class="flex">
					<u-avatar :src="info.avatar" shape="circle" size="58" @click="getInfo" />
					<view class="box flex" @click="getInfo">
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
			</view>
			<view class="custom_field flex" v-if="hasLogin">
				<navigator url="/member/finance/balance" hover-class="none" class="item flex">
					<text class="t2">{{info.money}}</text>
					<text class="t1">余额</text>
				</navigator>
				<navigator url="/member/finance/scoreLog" hover-class="none" class="item flex">
					<text class="t2">{{info.score}}</text>
					<text class="t1">积分</text>
				</navigator>
				<view class="item flex">
					<text class="t2">0.00</text>
					<text class="t1">优惠券</text>
				</view>
			</view>
		</view>
		<view class="userinfo-order" :style="{
			margin: hasLogin || platform === 'wx_mini'? '-40px 11px 11px': '-20px 11px 11px'
		}">
			<view class="vk-group-info pl10 pr10">
				<text class="f1">
					我的订单
				</text>
				<u-text suffixIcon="arrow-right" align="right" color="#999"
					size="14"
					iconStyle="font-size: 14px;color: #999;" text="查看全部订单" />
			</view>
			<view class="content flex">
				<view class="item flex" v-for="(item, index) in orderBtn" >
					<view class="icon">
						<image :src="item.icon" mode="widthFix" />
					</view>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view :style="{
			color: '#000000',
			fontSize: '30rpx',
			fontWeight: 'bold',
			padding: '15rpx 15px'
		}">
			其他功能
		</view>
		<u-grid col="4" @click="(index) => toolClick(index, 'moreMenu')">
			<u-grid-item
				v-for="(item, index) in moreMenu"
				:key="index"
			>
				<u-icon
					:customStyle="{paddingTop: '20rpx'}"
					:name="item.icon"
					:size="25"
				></u-icon>
				<text class="grid-text">{{item.name}}</text>
			</u-grid-item>
		</u-grid>
		<!-- <view class="menu-list">
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
		</view> -->
		<vk-tabbar />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState('member', ["info", "hasLogin"]),
			platform(){
				return getApp().globalData.platform 
			},
			capsuleHeight(){
				let top = "15px";
				// #ifdef MP
				top = getApp().globalData.capsuleHeight
				// #endif
				return top
			},
		},
		data() {
			return {
				orderBtn: [
					{
						state: 0,
						icon: '/static/image/icon/21.png',
						name: '待支付'
					},
					{
						state: 1,
						icon: '/static/image/icon/11.png',
						name: '待发货'
					},
					{
						state: 2,
						icon: '/static/image/icon/10.png',
						name: '待收货'
					},
					{
						state: 3,
						icon: '/static/image/icon/22.png',
						name: '待评价'
					},
					{
						state: 4,
						icon: '/static/image/icon/9.png',
						name: '退款/售后'
					},
				],
				moreMenu: [
					{
						name: "余额记录",
						icon: 'list',
						fun(that) {
							that.$utils.navigate('/member/finance/balanceLog')
						}
					},
					{
						name: "联系客服",
						icon: 'kefu-ermai',
						fun(that) {
							that.$utils.navigate('/pages/customer-service/index')
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
				]
			}
		},
		onShow() {
			let that = this
			if(this.hasLogin){
				this.$store.dispatch("member/getInfo")
			}
		},
		methods: {
			toolClick(index, key){
				this[key][index].fun(this)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		padding-top: 60rpx;
		color: #000000;
		background-image: url('../static/image/user/userBg.png');
		background-repeat: no-repeat;
		background-size: 100%;
		padding: 40rpx 30rpx 0 30rpx;
		position: relative;
		text-align: center;
		::v-deep .user {
			padding: 15px;
			.u-avatar{
				margin-right: 15rpx;
				border: 1px solid #ffffff;
			}
			.box{
				flex-direction: column;
				justify-content: center;
				.username{
					color: #333333;
					font-weight: bold;
				}
				.user-level{
					color: #333333;
					margin-top: 2px;
					width: auto;
					height: 18px;
					border-radius: 9px;
					// padding: 0 10px;
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
					color: #333333;
					font-weight: bold;
					font-size: 18px;
				}
				.t1{
					color: #333333;
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
		padding: 20rpx;
		border-radius: 8px;
		position: relative;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		.head{
			align-items: center;
			width: 100%;
			padding: 8px 0;
		}
		.f1{
			flex: auto;
			font-size: 30rpx;
			font-weight: bold;
			color: #333;
		}
		.content{
			width: 100%;
			padding: 0 0 5px 0;
			align-items: center;
			font-size: 12px;
			.item{
				flex: 1;
				flex-direction: column;
				align-items: center;
				position: relative;
				.icon{
					width: 55rpx;
					height: 55rpx;
					margin: 0 auto;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					margin-top:10rpx ;
					font-size: 26rpx;
					color: #333333;
				}
			}
		}
	}
	
	.grid-text {
		font-size: 26rpx;
		padding: 8rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>