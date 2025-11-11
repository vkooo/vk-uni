<template>
	<view>
		<u-navbar
			title="更改密码"
			:leftIconSize="0"
			:autoBack="true"
			leftText="取消"
			:placeholder="true"
		>
		</u-navbar>
		<view class="form">
			<u-form :model="form" :rules="rules" ref="uForm" labelWidth="80" :labelStyle="$env.form.labelStyle">
				<view class="p-20 p-b-0" >
					<u-form-item label="手机号" borderBottom>
						{{form.mobile}}
					</u-form-item>
					
					<u-form-item label="验证码" prop="code" >
						<u-input placeholder="请输入验证码" type="number" border="none" v-model="form.code" maxlength="4" />
						<template slot="right">
							<u-button size="mini" type="primary" :plain="true"  :text="tips" @click="getCode" />
						</template>
					</u-form-item>
				</view>
				<u-gap height="8" bgColor="#f5f5f5"/>
				<view class="p-20 p-b-0 pt0" >
					<u-form-item label="新密码" borderBottom prop="password">
						<u-input placeholder="请输入新密码" type="number" border="none" v-model="form.password" />
					</u-form-item>
					
					<u-form-item label="确认密码" prop="confirm_password" >
						<u-input placeholder="请输入确认密码" type="number" border="none" v-model="form.confirm_password" />
					</u-form-item>
				</view>
			</u-form>
		</view>
		<view class="fixed-bottom-btn-wrap">
			<u-button type="primary" :customStyle="btnStyle" @click="rightClick">
				保存
			</u-button>
		</view>
		<u-code :seconds="second" 
			ref="uCode"
			@change="codeChange"
			changeText="x秒后重新获取验证码"
			endText="重新获取验证码"
		></u-code>
	</view>
</template>

<script>
	import { setPassword } from '@/api/member.js';
	import { getSmsCode } from '@/api/auth.js';
	
	import {
		mapState
	} from "vuex"
	export default {
		onLoad() {
			this.form.mobile = this.info.mobile
		},
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		data() {
			return {
				second: 60,
				tips: 60,
				form: {
					code: '',
					password: "",
					confirm_password: ""
				},
				rules: {
					code: {
						type: "number",
						required: true,
						message: '请填写验证码',
						trigger: ['change', 'blur'],
					},
					password: {
						type: "string",
						required: true,
						message: '请填写新密码',
						trigger: ['change', 'blur'],
					},
					confirm_password: {
						type: "string",
						required: true,
						message: '两次密码不一致',
						trigger: ['change', 'blur'],
						validator: (rule, value, callback) => {
							return this.form.password == value;
						},
					},
				},
			}
		},
		methods: {
			rightClick(){
				let that = this
				this.$refs.uForm.validate().then(res => {
					uni.showLoading({
						title: '加载中',
					});
					let form = that.form
					setPassword(form).then(res=>{
						if(res.code == 200){
							that.$u.toast("操作成功")
							setTimeout(function(){
								that.$utils.back()
							}, 1000)
						}
					})
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode(){
				let that = this
				if(!uni.$u.test.mobile(that.info.mobile)){
					this.$throw("请填写正确手机号")
				}
				if(this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					getSmsCode("modify_password", {
						mobile: that.info.mobile
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fafafa;
	}
	.form{
		background: #ffffff;
	}
</style>