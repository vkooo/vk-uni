<template>
	<view>
		<u-navbar
			title="实名认证"
			:autoBack="true"
			:placeholder="true"
			bgColor="#f5f5f5"
		>
		</u-navbar>
		<view class="form">
			<u-form ref="uForm" labelWidth="80" :labelStyle="{color: '#333333'}">
				<view class="p-l-20 p-r-20 p-b-0" >
					<u-form-item label="真实姓名" borderBottom>
						<u-input placeholder="请输入您的昵称" border="none" v-model="form.realname" :disabled="!!(form.is_realname == 1)"/>
					</u-form-item>
					<u-form-item label="身份证号" borderBottom>
						<u-input placeholder="请输入您的昵称" border="none" v-model="form.id_card" :disabled="!!(form.is_realname == 1)" maxlength="18"/>
					</u-form-item>
				</view>
			</u-form>
		</view>
		<view class="logout m-t-50">
			<u-button :customStyle="{
				width: '90%',
				margin: '0 auto',
				color:'#9b6102'
			}" type="error" 
			shape="circle"
			:style="[btnStyle]"
			:disabled="disabled" :text="form.is_realname == 1?'已经实名认证':'提交认证'" @click="submit"/>
		</view>
		
		<view class="desc p-20">
			<view>实名认证说明</view>
			<view>1、请确保输入的姓名和身份证号为真实信息；</view>
			<view>2、以上信息甄宝气承诺高度保密，仅限平台实名使用；</view>
			<view>3、银行卡地区指该开户支行所属地区；</view>
			<view>4、发货银行系统会依据银行卡卡号自动识别</view>
			<view>5、以上信息甄宝气承诺高度保密，仅限平台实名使用。</view>
		</view>
	</view>
</template>

<script>
	import { setRealname } from '@/api/member.js';
	
	import {
		mapState
	} from "vuex"
	
	export default {
		computed: {
			...mapState('member', ["hasLogin", "info"]),
			disabled(){
				if(this.form.is_realname == 1) return true
				if(!this.form.realname || !this.form.id_card) return true
				return false
			}
		},
		watch: {
			info: {
				handler(newVal, oldVal){
					this.form = newVal
				},
				immediate: true
			}
		},
		data() {
			return {
				form: {},
			}
		},
		methods: {
			// 提交实名认证
			submit(){
				setRealname(this.form).then(res=>{
					if (res.tip == "请输入正确身份证号") {
						this.$u.toast("请输入正确的身份证号(如有X应为大写)!")
					} else if (res.tip == '成功') {
						this.$u.toast("认证成功!")
					} else if (res.tip == "已实名认证") {
						this.$u.toast("已经实名认证,请勿重复认证")
					}
				})
			},
			rightClick(){
				let that = this
					, data = this.data
				if(!data)
					return
				
				uni.showLoading({
					title: '加载中',
				});
				setProfile({
					nickname: data
				}).then(res=>{
					if(res.code == 200){
						that.$u.toast("操作成功")
						setTimeout(function(){
							uni.navigateBack()
						}, 1000)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
	.logout{
	}
	.desc{
		font-size: 24rpx;
		color: #999999;
	}
</style>