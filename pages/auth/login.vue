<template>
	<view class="loginWrap ">
		<view class="imgWrap">
			<image  class="logo" style="width: 100upx;height: 100upx;" src="../../static/logo.png" mode=""></image>
		</view>
		
		<!-- <u-form v-if="loginWay == 1" class="loginForm" @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<u-input placeholder="请输入登录账号"  v-model="value" type="number" clearable />
			</view>
			<view class="uni-form-item uni-column">
				<u-input v-model="value" type="password" placeholder="请输入密码" :password-icon="true" />
				<text class="forgetText">忘记密码</text>
			</view>
			<u-button form-type="submit" class="loginbtn" type="default">登录</u-button>
		</u-form> -->
		
		<u-form class="loginForm" v-if="loginWay == 2" :model="form">
			<view class="uni-form-item uni-column">
				<u-input maxlength="11" placeholder="请输入手机号码" type="number" prop="mobile" v-model="form.mobile" />
			</view>
			<view class="uni-form-item uni-column">
				<u-input maxlength="5" placeholder="请输入验证码" type="number" prop="code" v-model="form.code" />
				<view class="wrap">
					<u-toast ref="uToast"></u-toast>
					<u-verification-code 
					:seconds="seconds" 
					ref="uCode" 
					@change="codeChange"
					></u-verification-code>
					<u-button type="success" size="mini" @click="getCode">{{tips}}</u-button>
				</view>
			</view>
			<u-button class="loginbtn" @click="formSubmit" type="default">登录</u-button>
		</u-form>
		
		<!-- <view class="action center">
			<text @click="changeLoginWay" style="color: #71B6F7;">{{loginWay == 2?'账号密码登录':'短信验证登录'}}</text>
		</view> -->
	</view>
</template>
 
<script>
	export default{
		data(){
			return{
				form:{
					mobile: "",
					code: ""
				},
				loginWay: 2,
				seconds: 5,
				tips:''
			}
		},
		methods:{
			formSubmit(){
				let loginWay = this.loginWay
					, form = this.form
					, that = this
				if(loginWay == 2){
					if(!that.$validate.mobile(form.mobile)){
						this.$u.toast('请输入正确手机号');
						return
					}
					if(form.code.length != 5){
						this.$u.toast('请输入正确验证码');
						return
					}
					this.$store.dispatch("member/login")
				}
			},
			changeLoginWay(){
				this.loginWay = this.loginWay == 1?2:1;
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode(){
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					// uni.showLoading({
					// 	title: '正在获取验证码'
					// })
					this.$u.toast('验证码已发送');
					this.$refs.uCode.start();
				}
			},
		}
	}
</script>
 
<style lang="less">
		
	.loginWrap{
		.imgWrap{
			text-align: center;
			padding: 50upx;
		}
		.loginForm{
			.uni-form-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1upx solid #DCDCDC;
				padding: 10upx 30upx;
				margin: 20upx;
				u-input{
					flex: 1;
				}
				.forgetText{
					color: #C8C7CC;
				}
				
			}
				
			.wrap{
				height: auto;
			}
			.loginbtn{margin: 20upx; margin-top: 60upx;background: #2CA800;color: #fff;}
		}
		.action{
			padding: 10upx 30upx;
		}
	}
</style>