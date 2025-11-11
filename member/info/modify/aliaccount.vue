<template>
	<view>
		<u-navbar
			title="绑定支付宝"
			:leftIconSize="0"
			:autoBack="true"
			leftText="取消"
			:placeholder="true"
		>
		</u-navbar>
		<view class="form">
			<u-form :model="form" :rules="rules" ref="uForm" labelWidth="90" :labelStyle="$env.form.labelStyle">
				<view class="p-20 p-b-0" >
					<u-form-item label="支付宝姓名" prop="ali_name" borderBottom>
						<u-input placeholder="请输入支付宝姓名" type="text" border="none" v-model="form.ali_name" />
					</u-form-item>
					<u-form-item label="支付宝账户" prop="ali_account">
						<u-input placeholder="请输入支付宝账户" type="text" border="none" v-model="form.ali_account" />
					</u-form-item>
				</view>
			</u-form>
		</view>
		<view class="fixed-bottom-btn-wrap">
			<u-button type="primary" :customStyle="btnStyle" @click="rightClick">
				保存
			</u-button>
		</view>
	</view>
</template>

<script>
	import { setAliAccount } from '@/api/member.js';
	
	import {
		mapState
	} from "vuex"
	export default {
		onLoad() {
			this.form.ali_name = this.info.ali_name
			this.form.ali_account = this.info.ali_account
		},
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		data() {
			return {
				form: {
					ali_name: '',
					ali_account: ''
				},
				rules: {
					ali_name: {
						type: "string",
						required: true,
						message: '请输入支付宝姓名',
						trigger: ['change', 'blur'],
					},
					ali_account: {
						type: "string",
						required: true,
						message: '请输入支付宝账户',
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
					setAliAccount(that.form).then(res=>{
						if(res.code == 200){
							that.$u.toast("操作成功")
							setTimeout(function(){
								that.$utils.back()
							}, 1000)
						}
					})
				})
			},
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