<template>
	<view>
		<u-navbar
			leftIcon="close"
			:fixed="false"
			@leftClick="leftClick"
		/>
		<view class="wrap">
			<view class="key-input">
				<view class="title">输入验证码</view>
				<view class="tips">验证码已发送至 {{mobile}}</view>
				<view class="code-flex vk-flex">
					<u-code-input fontSize="24"
						:space="40"
						mode="line" hairline v-model="value" :maxlength="maxlength"
						@finish="finish"
						:focus="true"
					></u-code-input>
				</view>
				<text :class="{ error: error }">验证码错误，请重新输入</text>
				<view class="captcha">
					<text @click="getCode" class="regain">{{ tips }}</text>
				</view>
			</view>
		</view>
		
		<u-code :seconds="second" ref="uCode"
			@start="start"
			@change="codeChange"
			changeText="x秒后重新获取验证码"
			endText="重新获取验证码"
		></u-code>
	</view>
	
</template>

<script>
	import { getLoginSmsCode } from "@/api/auth.js"
export default {
	data() {
		return {
			mobile: null,
			maxlength: 4,
			value: '',
			second: 60,
			tips: 60,
			error: false,
		};
	},
	computed: {},
	onLoad(options) {
		if(this.hasLogin){
			uni.reLaunch({
				url: "/pages/tabBar/index"
			})
			return
		}
		if(this.$u.test.mobile(options.mobile)){
			this.mobile = options.mobile
		}else{
			this.$utils.redirectTo("/pages/auth/login")
		}
	},
	onReady() {
		this.getCode()
	},
	methods: {
		// 收不到验证码选择时的选择
		getCode() {
			let that = this
			if(this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: '正在获取验证码'
				})
				getLoginSmsCode({
					mobile: this.mobile
				}).then(res=>{
					if(res.code == 200){
						uni.$u.toast('验证码已发送');
						that.$refs.uCode.start();
					}
					uni.hideLoading();
				})
			} else {
				uni.$u.toast('倒计时结束后再发送');
			}
		},
		codeChange(text) {
			this.tips = text;
		},
		start(){
			console.log("start")
		},
		finish(value) {
			this.$store.dispatch("member/loginBySms", {
				mobile: this.mobile,
				code: value
			})
		},
		leftClick(){
			this.$utils.navigate('./login')
		},
	}
};
</script>

<style lang="scss" scoped>
	page{
		background: #ffffff;
	}
.wrap {
	padding: 80rpx;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}
.code-flex{
	display: flex;
	justify-content: center;
}
.key-input {
	padding: 30rpx 0;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
}
.captcha {
	color: #ff9900;
	font-size: 30rpx;
	margin-top: 40rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
