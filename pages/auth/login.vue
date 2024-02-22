<template>
	<view class="">
		<u-navbar leftIcon="close" :fixed="false" @leftClick="leftClick" />
		<view class="wrap">
			<view class="top"></view>
			<view class="content">
				<view class="logo">
					<image :src="website.logo" mode="widthFix"></image>
				</view>

				<block v-if="getPlatform === 'wx_official' || getPlatform === 'wx_mini' ">
					<u-gap height="90"></u-gap>
					<u-button text="微信授权登录" type="success" size="large" @click="wxOauth" shape="circle" />
					<u-gap height="20"></u-gap>
					<u-button text="暂不登录" @click="leftClick" color="#eeeeee" size="large"
						:customStyle="{color: '#a9a9a9'}" shape="circle" type="success" />
				</block>

				<block v-else>
					<u-gap height="40"></u-gap>
					<block v-if="way == 1">
						<u-input border="bottom" type="number" placeholderStyle="color: #909399" v-model="mobile"
							placeholder="请输入手机号" maxlength="11" clearable prefixIcon="phone"
							:prefixIconStyle="{fontSize: '20px'}" />
						<view class="tips">未注册的手机号验证后自动创建{{website.name}}账号</view>
						<button @tap="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
					</block>
					<block v-if="way == 2">
						<u-input border="bottom" type="number" placeholderStyle="color: #909399" v-model="mobile"
							placeholder="请输入手机号" maxlength="11" clearable prefixIcon="phone"
							:prefixIconStyle="{fontSize: '20px'}" />
						<u-gap height="10"></u-gap>
						<u-input border="bottom" type="password" placeholderStyle="color: #909399" v-model="password"
							placeholder="请输入密码" maxlength="11" clearable password prefixIcon="lock"
							:prefixIconStyle="{fontSize: '20px'}" />
						<u-gap height="15"></u-gap>
						<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
					</block>
					<view class="alternative">
						<view class="password" @click="way = way == 1? 2: 1">{{way == 2? '验证码登录': '密码登录'}}</view>
						<!-- <view class="issue">遇到问题</view> -->
					</view>
				</block>

			</view>
			<view class="buttom">
				<view class="loginType" v-if="getPlatform == 'app'">
					<view class="wechat item">
						<view class="icon"><u-icon size="38" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
						微信
					</view>
					<view class="QQ item">
						<view class="icon"><u-icon size="38" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
						QQ
					</view>
				</view>
				<u-gap height="150" v-if="getPlatform !== 'app'"></u-gap>
				<view class="hint">
					登录代表同意{{website.name}}
					<text class="link" @click="$utils.navigate('/pages/help/userAgreement')">《用户协议》</text>、
					<text class="link" @click="$utils.navigate('/pages/help/privacyPolicy')">《隐私政策》</text>，
					并授权{{website.name}}使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				way: 1,
				mobile: "",
				password: "",
			}
		},
		onLoad() {
			if (this.hasLogin) {
				uni.reLaunch({
					url: "/pages/tabBar/index"
				})
				return
			}
		},
		computed: {
			inputStyle() {
				let style = {
					color: "#fff",
					backgroundColor: this.$u.color['warning'],
				};
				if (!this.$u.test.mobile(this.mobile)) {
					return {};
				}
				if (this.way == 1) {
					if (this.mobile) {
						return style;
					}
				} else if (this.way == 2) {
					if (this.mobile && this.password) {
						return style;
					}
				}
				return {};
			},
			getPlatform() {
				return getApp().globalData.platform
			},
			...mapState('member', ["info", "hasLogin"]),
			...mapState('website', ["website"]),
		},
		methods: {
			submit() {
				let way = this.way
				if (this.$u.test.mobile(this.mobile)) {
					if (way == 1) {
						this.$utils.navigate('/pages/auth/code?mobile=' + this.mobile)
					} else if (way == 2) {
						this.$store.dispatch("member/login", {
							mobile: this.mobile,
							password: this.password,
						})
					}
				}
			},
			leftClick() {
				this.$utils.reLaunch("/pages/tabBar/index")
			},
			wxOauth() {
				this.$store.dispatch("member/wxOauth")
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #ffffff;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 85vw;
			margin: 2% auto 0;


			.logo {
				margin: 0 auto;
				text-align: center;

				image {
					width: 100px;
					height: 100px;
				}
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
				padding: 140rpx;
				justify-content: space-between;

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
		/deep/ .u-input{
			padding-left: 0 !important;
		}
	}
</style>