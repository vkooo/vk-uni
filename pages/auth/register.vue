<template>
	<view class="">
		<view class="nav"></view>
		<view class="container">
			<form class="form" @submit="formSubmit" @reset="formReset">
				<view class="title">用户注册</view>
				<view class="loginform">
					<view class="form-item">
						<image src="@/static/image/reg-tel.png" class="img" />
						<input type="text" class="input" placeholder="请输入手机号"
							placeholder-style="font-size:30rpx;color:#B2B5BE" name="phone" value="" />
					</view>
					<view class="form-item">
						<image src="@/static/image/reg-pwd.png" class="img" />
						<input type="text" class="input" placeholder="登录密码6~18位字符"
							placeholder-style="font-size:30rpx;color:#B2B5BE" name="password" value="" :password="true" />
					</view>
					<view class="form-item">
						<image src="@/static/image/reg-pwd.png" class="img" />
						<input type="text" class="input" placeholder="确认密码,两次密码输入必须一致"
							placeholder-style="font-size:30rpx;color:#B2B5BE" name="pwdconfirm" value="" :password="true" />
					</view>
					<view class="form-item">
						<image src="@/static/image/reg-tel.png" class="img" />
						<input type="text" class="input" placeholder="邀请码不能为空"
							placeholder-style="font-size:30rpx;color:#B2B5BE" name="yaoqingren" value="" />
					</view>
					<view class="form-item code">
						<image src="@/static/image/reg-code.png" class="img" />
						<input type="text" class="input" placeholder="请输入验证码"
							placeholder-style="font-size:30rpx;color:#B2B5BE" name="captcha" value="" />
							<view class="reg-code" @click="refreshCode">
								<image :src="codeImage" mode=""></image>
							</view>
					</view>
					<button class="form-btn" form-type="submit">注册</button>
					<navigator url="login" class="form-btn form-btn2" >登录</navigator>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import { register, captcha } from '@/api/user';
	export default {
		data() {
			return {
				codeImage: ""
			};
		},

		onLoad: function(opt) {
		},
		mounted() {
			this.refreshCode()
		},
		methods: {
			formSubmit: function(e){
				let that = this
					, formdata = e.detail.value;
				if (formdata.phone == ''){
					uni.showToast({
						title: '请输入手机号',
						icon: 'error',
					})  
				  return;
				}
				if (formdata.password == ''){
					uni.showToast({
						title: '请输入密码',
						icon: 'error',
					})  
				  return;
				}
				if (formdata.pwdconfirm == ''){
					uni.showToast({
						title: '请输入确认密码',
						icon: 'error',
					})  
				  return;
				}
				if (formdata.yaoqingren == ''){
					uni.showToast({
						title: '请输入邀请码',
						icon: 'error',
					})  
				  return;
				}
				if (formdata.captcha == ''){
					uni.showToast({
						title: '请输入验证码',
						icon: 'error',
					})  
				  return;
				}
				if(formdata.pwdconfirm != formdata.password){
					uni.showToast({
						title: '两次密码不一致',
						icon: 'error',
					})  
					return;	
				}
				
				uni.showLoading({
					title: '提交中...',
					mask: true
				});
				register(formdata).then((res)=>{
					uni.showToast({
						title: res.msg,
						duration:850
					});
					if(res.status == 0){
						setTimeout(function(){
							uni.navigateTo({
								url: "/pages/auth/login"
							})
						},1000)
					}
				})
				
			},
			refreshCode(){
				let that = this
				captcha().then(res=>{
					that.codeImage = res.data.url
				})
			}
		}
	};
</script>

<style lang="scss">
	page ,.nav{
		background: #ffffff
	}
	.container {
		width: 100%;
	}

	.title {
		margin: 70rpx 50rpx 50rpx 40rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 48rpx;
		font-weight: bold;
		color: #000000;
	}
	.form{
		margin-bottom: 40rpx;
	}

	.loginform {
		padding: 0 50rpx;
		border-radius: 5px;
		background: #FFF;
	}
	.loginform .form-item {
		display: flex;
		align-items: center;
		width: 100%;
		border-bottom: 1px #ededed solid;
		height: 88rpx;
		line-height: 88rpx;
		border-bottom: 1px solid #F0F3F6;
		margin-top: 20rpx
	}

	/*.loginform .form-item:last-child{border:0}*/
	.loginform .form-item .img {
		width: 44rpx;
		height: 44rpx;
		margin-right: 30rpx
	}

	.loginform .form-item .input {
		flex: 1;
		color: #000;
	}
	.loginform .form-item.code .input {
		flex: none;
	}
	.loginform .form-item.code .reg-code image{
		width: 100px;
		height: 88rpx;
		display: flex;
	}
	.loginform .form-btn {
		margin-top: 30rpx;
		width: 100%;
		height: 96rpx;
		line-height: 96rpx;
		color: #fff;
		font-size: 30rpx;
		border-radius: 48rpx;
		background: rgb(238, 136, 55);
	}

	.loginform .form-btn2{
		background: #EEEEEE;
		color: #000000;
		margin-top: 20rpx;
		text-align: center;
	}
</style>
