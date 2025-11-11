<template>
	<view>
		<u-navbar
			title="实名认证"
			:autoBack="true"
			:placeholder="true"
		>
		</u-navbar>
		<view class="form">
			<u-form ref="uForm" :model="form" labelWidth="80" :labelStyle="$env.form.labelStyle">
				<view class="p-l-20 p-r-20 p-b-0" >
					<u-form-item label="真实姓名" borderBottom>
						<u-input placeholder="请输入您的昵称" border="none" v-model="form.realname" :disabled="!!(form.is_realname == 1)"/>
					</u-form-item>
					<u-form-item label="身份证号" borderBottom>
						<u-input placeholder="请输入您的昵称" border="none" v-model="form.idcard" :disabled="!!(form.is_realname == 1)" maxlength="18"/>
					</u-form-item>
					<u-form-item label="证件正面" borderBottom>
						<vk-upload ref="vkUploadfront_cardRef" @updated="(event)=> uploadUpdated(event, 'front_card')" />
					</u-form-item>
					<u-form-item label="证件反面" borderBottom>
						<vk-upload ref="vkUploadback_cardRef" @updated="(event)=> uploadUpdated(event, 'back_card')" />
					</u-form-item>
				</view>
			</u-form>
			<view class="remark m-t-10" v-if="form.status == 3">驳回原因：{{form.remark}}</view>
		</view>
		<view class="logout m-t-25">
			<u-button :customStyle="{
				width: '90%',
				margin: '0 auto',
				color:'#9b6102'
			}" type="error" 
			shape="circle"
			:style="[btnStyle]"
			:disabled="disabled" :text="submit_text" @click="submit"/>
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
	import { getRealname, setRealname } from '@/api/member.js';
	
	import {
		mapState
	} from "vuex"
	
	export default {
		computed: {
			...mapState('member', ["hasLogin", "info"]),
			disabled(){
				if(this.info.is_realname == 1) return true
				if(this.form.status == 1 || this.form.status == 2) return true
				if(!this.form.realname || !this.form.idcard || !this.form.front_card ||!this.form.back_card) return true
				return false
			},
			submit_text(){
				if(this.info.is_realname == 1)
					return "实名认证完成"
				if(this.form.status == 1)
					return "正在审核中"
				if(this.form.status == 3)
					return "已驳回，重新提交"
					
				return "提交"
			}
		},
		data() {
			return {
				form: {},
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init(){
				const that = this
				getRealname().then(res=>{
					if(res.code == 200 && res.data){
						that.form = res.data
						that.$nextTick(function(){
							that.$refs.vkUploadfront_cardRef.setFiles(that.form.front_card)
							that.$refs.vkUploadback_cardRef.setFiles(that.form.back_card)
						})
					}
				})
			},
			// 提交实名认证
			submit(){
				const that = this
				uni.showLoading({
					title: '加载中',
				});
				setRealname(this.form).then(res=>{
					this.$u.toast(res.msg)
					that.init()
				})
			},
			uploadUpdated(lists, type){
				this.$set(this.form, type, lists[0])
				this.$refs[`vkUpload${type}Ref`].setFiles(lists[0])
			},
		}
	}
</script>

<style lang="scss" scoped>
	.logout{
	}
	.desc{
		font-size: 24rpx;
		color: #999999;
	}
	.remark{
		color: red;
		width: 90%;
		margin: 0 auto;
		text-align: center;
	}
</style>