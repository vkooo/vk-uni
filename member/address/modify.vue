<template>
	<view>
		<u-navbar
			title="编辑收货地址"
			@rightClick="rightClick"
			leftIcon=""
			:autoBack="true"
			leftText="取消"
			:placeholder="true"
		>
			<template slot="right">
				保存
			</template>
		</u-navbar>
		<view class="form">
			<u-form :model="form" ref="uForm" :rules="rules" labelWidth="80" 
				:labelStyle="{color: '#808080'}">
				<view class="p-20 p-b-0 p-t-0" >
					<u-form-item borderBottom label="姓名" prop="realname">
						<u-input placeholder="请输入你的姓名" border="none" v-model="form.realname" />
					</u-form-item>
					<u-form-item borderBottom label="联系电话" prop="mobile">
						<u-input placeholder="请输入你的联系电话" border="none" type="number" maxlength="11" v-model="form.mobile" />
					</u-form-item>
					<u-form-item borderBottom label="所在地区" prop="region_codes">
						<view style="width: 100%;">
							<vk-address-picker ref="address" @onchange="addrressConfirm" :codes="form.region_codes"/>
							<!-- <u-input placeholder="请选择你的所在地区" border="none" v-model="form.region_text" /> -->
							<u-icon slot="right" name="arrow-right" />
						</view>
					</u-form-item>
					<u-form-item borderBottom label="详细地址" labelPosition="top" prop="address_info">
						<u-textarea placeholder="请输入你的详细地址" border="none" v-model="form.address_info" />
					</u-form-item>
					<u-form-item borderBottom label="默认地址" prop="default">
						<u-switch v-model="form.default" 
							:inactiveValue="0"
							:activeValue="1"
						></u-switch>
					</u-form-item>
					
				</view>
				
			</u-form>
		</view>
		
		<u-datetime-picker
			:show="birthdayShow"
			v-model="form.birthday"
			mode="date"
			@confirm="birthdayShow = false"
			@cancel="birthdayShow = false"
		/>
	</view>
</template>

<script>
	import { findById, create, update } from '@/api/address';
	import { address } from '@/api/common.js';
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		data() {
			return {
				form: {
					realname: "",
					mobile: null,
					region_text: '',
					address_info: "",
					region_code: []
				},
				rules: {
					realname:  {
						type: "string",
						required: true,
						message: '请输入你的姓名',
						trigger: ['change', 'blur'],
					},
					mobile: {
						type: "number",
						required: true,
						message: '请输入你的联系电话',
						trigger: ['change', 'blur'],
						validator: (rule, value, callback) => {
							return uni.$u.test.mobile(value)
						},
					},
					region_codes: {
						required: true,
						message: '请选择你的所在地区',
						trigger: ['change', 'blur'],
					},
					address_info: {
						type: "string",
						required: true,
						message: '请输入你的详细地址',
						trigger: ['change', 'blur'],
					}
				},
				birthdayShow: false,
				code: null,
			}
		},
		onLoad(options){
			let that = this
			if(options.id){
				findById(options.id).then(res=>{
					if(res.code == 200){
						that.form = res.data
						that.form.region_codes = res.data.street_code
						
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			addrressConfirm(e){
				this.form.region_codes = e.codes
				this.form = Object.assign(this.form, e.data)
				this.$forceUpdate()
			},
			rightClick(){
				let that = this
				this.$refs.uForm.validate().then(res => {
					
					(that.form.id? update(that.form): create(that.form)).then(res=>{
						if(res.code == 200){
							that.$u.toast("操作成功")
							setTimeout(function(){
								uni.navigateBack()
							}, 1000)
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss" >
	
	page{
		background-color: #fafafa;
	}
	.form{
		background-color: #ffffff;
	}
</style>