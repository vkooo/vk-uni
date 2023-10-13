<template>
	<view class="">
		<u-navbar
			leftIcon="close"
			:fixed="false"
			@leftClick="leftClick"
		/>
		<view class="wrap">
			<view class="top"></view>
			<view class="content">
				<view class="title">欢迎登录{{website.basic.name}}</view>
				<block v-if="way == 1">
					<input class="u-border-bottom" type="number" v-model="mobile" placeholder="请输入手机号" maxlength="11" />
					<view class="tips">未注册的手机号验证后自动创建{{website.basic.name}}账号</view>
					<button @tap="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
				</block>
				<block v-if="way == 2">
					<input class="u-border-bottom" type="number" v-model="mobile" placeholder="请输入手机号" maxlength="11" />
					<u-gap height="15"></u-gap>
					<input class="u-border-bottom" type="number" v-model="password" placeholder="请输入密码" maxlength="11" />
					<view class="tips">未注册的手机号验证后自动创建{{website.basic.name}}账号</view>
					<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
				</block>
				<view class="alternative">
					<view class="password" @click="way = way == 1? 2: 1">{{way == 2? '验证码登录': '密码登录'}}</view>
					<!-- <view class="issue">遇到问题</view> -->
				</view>
			</view>
			<view class="buttom">
				<view class="loginType">
					<view class="wechat item" @click="$store.dispatch('member/wxOauth')">
						<view class="icon"><u-icon size="38" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
						微信
					</view>
					<view class="QQ item">
						<view class="icon"><u-icon size="38" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
						QQ
					</view>
				</view>
				<view class="hint" v-if="website.userAgreement">
					登录代表同意
					<text class="link" @click="$utils.navigate('')">{{website.basic.name}}用户协议、隐私政策，</text>
					并授权使用您的{{website.basic.name}}账号信息（如昵称、头像、收获地址）以便您统一管理
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp()
	import { website as websiteApi } from "@/api/website.js"
export default {
	data() {
		return {
			way: 1,
			mobile: "",
			password: "",
			website: app.globalData.website
		}
	},
	computed: {
		inputStyle() {
			let style = {
				color: "#fff",
				backgroundColor: this.$u.color['warning'],
			};
			if(this.way == 1){
				if(this.mobile) {
					return style;
				}
			}else if(this.way == 2){
				if(this.mobile && this.password) {
					return style;
				}
			}
			return {};
		}
	},
	onLoad() {
		let that = this
		websiteApi().then(res=>{
			let website = res.data
			uni.setStorageSync('website', website)
			that.website = website
		})
	},
	methods: {
		submit() {
			let way = this.way
			if(this.$u.test.mobile(this.mobile)) {
				if(way == 1){
					this.$utils.navigate('/pages/auth/code?mobile=' + this.mobile)
				}else if(way == 2){
					this.$store.dispatch("member/login", {
						mobile: this.mobile,
						password: this.password,
					})
				}
			}
		},
		leftClick(){
			this.$utils.reLaunch("/pages/tabBar/index")
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 85vw;
		margin: 15% auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: #909399;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: #909399;
			border: none;
			font-size: 30rpx;
			padding: 5rpx 0;
			border-radius: 10rpx;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: #909399;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #606266;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: #909399;
			
			.link {
				color: #ff9900;
			}
		}
	}
}
</style>
