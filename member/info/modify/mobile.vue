<template>
	<view>
		<u-navbar
			title="绑定手机号"
			@rightClick="rightClick"
			leftIcon=""
			:autoBack="true"
			leftText="取消"
			:placeholder="true"
		>
			<template slot="right">
				<text>保存</text>
			</template>
		</u-navbar>
		<view class="form">
			<u-form :model="form" :rules="rules" ref="uForm" labelWidth="80" :labelStyle="{color: '#808080'}">
				<view class="p-20 p-b-0" >
					<u-form-item v-if="form.mobile" label="旧手机号" borderBottom>
						{{form.mobile}}
					</u-form-item>
					<u-form-item label="新手机号" prop="newMobile" borderBottom>
						<u-input placeholder="请输入新手机号" type="number" maxlength="11" border="none" v-model="form.newMobile" />
					</u-form-item>
					
					<u-form-item label="验证码" prop="code" >
						<u-input placeholder="请输入验证码" type="number" border="none" v-model="form.code" maxlength="4" />
						<template slot="right">
							<u-button size="mini" type="primary" :plain="true"  :text="tips" @click="getCode" />
						</template>
					</u-form-item>
				</view>
			</u-form>
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
	import { setMobile } from '@/api/member.js';
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
					newMobile: '',
					code: ''
				},
				rules: {
					newMobile: {
						type: "number",
						required: true,
						message: '请填写正确手机号',
						trigger: ['change', 'blur'],
						validator: (rule, value, callback) => {
							return uni.$u.test.mobile(value)
						},
					},
					code: {
						type: "number",
						required: true,
						message: '请填写短信验证码',
						trigger: ['change', 'blur'],
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
					setMobile(form).then(res=>{
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
				if(!uni.$u.test.mobile(that.form.newMobile)){
					this.$throw("请填写正确手机号")
				}
				if(this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					getSmsCode("modify_mobile", {
						mobile: this.form.newMobile
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