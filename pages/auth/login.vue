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
					<u-gap height="50" />
					<block v-if="way == 1">
						<u-input border="bottom" type="number" placeholderStyle="color: #909399" v-model="mobile"
							placeholder="请输入11位手机号码" maxlength="11" clearable
							:prefixIconStyle="{fontSize: '22px'}">
							<view slot="prefix" class="p-r-15 m-r-10" style=" color: #0B0D0F; border-right: 1rpx solid #E2E4EA; ">
								+86
							</view>
						</u-input>
					</block>
					<block v-if="way == 2">
						<u-input border="bottom" type="text" placeholderStyle="color: #909399" v-model="account"
							placeholder="手机号/邮件地址/账号名 " maxlength="11" clearable
							:prefixIconStyle="{fontSize: '22px'}">
						</u-input>
						<u-gap height="10" />
						<u-input border="bottom" type="password" placeholderStyle="color: #909399" v-model="password"
							placeholder="密码" maxlength="11" clearable password  />
					</block>
					<u-gap height="10" />
					<view class="alternative">
						<view class="password" @click="way = way == 1? 2: 1">{{way == 2? '验证码登录': '密码登录'}}</view>
						<view class="issue">遇到问题</view>
					</view>
					<u-gap height="25" />
					<u-button @tap="submit" 
						:style="[btnStyle]"
						shape="circle"
						:disabled="disabled">{{way == 1? "获取短信验证码": "登录"}}</u-button>
					
				</block>
			</view>
			<view class="buttom">
				<view class="other-login" v-if="getPlatform == 'app'">
					<view class="other-login-p">
						<span>使用第三方帐号登陆</span>
					</view>
					<view class="loginType">
						<view class="item" v-for="item in loginType">
							<view class="icon">
								<u-icon size="40" :name="item.icon" :color="item.color" />
							</view>
						</view>
					</view>
				</view>
				<u-gap height="180" v-if="getPlatform !== 'app'" />
				<view class="hint">
					<u-checkbox-group :value="checked" @change="(e) => {checked = e}">
						<u-checkbox shape="circle" name="1" size="18"/>
					</u-checkbox-group>
					<view>
						我已阅读并同意
						<text class="link" @click="$utils.navigate('/pages/help/userAgreement')">《用户协议》</text>、
						<text class="link" @click="$utils.navigate('/pages/help/privacyPolicy')">《隐私政策》</text>，
						并授权{{website.name}}使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
					</view>
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
				checked: [],
				loginType: [
					{
						icon: "weixin-circle-fill",
						color: "#69c19c",
					},
					{
						icon: "qq-circle-fill",
						color: "#5ba8d6",
					},
				],
				way: 1,
				mobile: "",
				account: "",
				password: "",
			}
		},
		onLoad() {
			if (this.hasLogin) {
				uni.reLaunch({
					url: "/pages/index/index"
				})
				return
			}
		},
		computed: {
			disabled() {
				if( this.checked.indexOf('1') == -1) return true
				if(this.way == 1 && !this.$u.test.mobile(this.mobile)) return true
				if (this.way == 2){
					if(this.$utils.isEmpty(this.account)) return true
					if(this.$utils.isEmpty(this.password)) return true
				}
				return false
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
				if (way == 1) {
					this.$utils.navigate('/pages/auth/code?mobile=' + this.mobile)
				} else if (way == 2) {
					this.$store.dispatch("member/login", {
						account: this.account,
						password: this.password,
					})
				}
				
			},
			leftClick() {
				this.$utils.reLaunch("/pages/index/index")
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
				margin-top: 18rpx;
				font-size: 26rpx;
			}


			.alternative {
				color: #909399;
				display: flex;
				justify-content: space-between;
			}
		}

		.buttom {
			.other-login{
				margin: 150rpx 0 100rpx;
				.other-login-p{
					text-align: center;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 60%;
					margin: 0 auto;
					font-size: 26rpx;
					span{
						display: inline-block;
						padding: 10rpx 20rpx;
						background: #FFFFFF;
						color: #808080;
						z-index: 2;
					}
					&:after{
						content: "";
						height: 1rpx;
						width: 100%;
						background: #808080;
						top: 50%;
						transform: translateY(-50%);
						position: absolute;
					}
				}
				
				.loginType {
					display: flex;
					padding: 0 140rpx;
					justify-content: center;
				
					.item {
						display: flex;
						flex-direction: column;
						align-items: center;
						color: #606266;
						font-size: 28rpx;
						margin: 0 20rpx;
					}
				}
			}
			

			.hint {
				padding: 20rpx 40rpx;
				font-size: 25rpx;
				color: #909399;
				display: flex;
				::v-deep .u-checkbox-label--left{
					flex-direction: column;
				}

				.link {
					color: #ff9900;
				}
			}
		}
		::v-deep .u-input{
			background: #ffffff;
			padding-top: 20rpx !important;
			padding-bottom: 20rpx !important;
			padding-left: 0 !important;
			.uni-input-placeholder{
				color: rgb(192, 196, 204) !important;
			}
			&.u-border-bottom{
				border-color: #E2E4EA !important;
			}
		}
	}
</style>