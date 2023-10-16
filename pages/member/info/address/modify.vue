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
				<view class="p20 pb0" >
					<u-form-item borderBottom label="姓名" prop="realname">
						<u-input placeholder="请输入你的姓名" border="none" v-model="form.realname" />
					</u-form-item>
					<u-form-item borderBottom label="联系电话" prop="mobile">
						<u-input placeholder="请输入你的联系电话" border="none" type="number" maxlength="11" v-model="form.mobile" />
					</u-form-item>
					<u-form-item borderBottom label="所在地区" prop="region_text" @click="$refs.address.show = true; $utils.hideKeyboard()">
						<u-input placeholder="请选择你的所在地区" border="none" v-model="form.region_text" />
						<u-icon slot="right" name="arrow-right" />
					</u-form-item>
					<u-form-item borderBottom label="详细地址" prop="address_info">
						<u-input placeholder="请输入你的详细地址" border="none" v-model="form.address_info" />
					</u-form-item>
					<u-form-item borderBottom label="默认地址" prop="default">
						<u-switch v-model="form.default"></u-switch>
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
		<vk-address-picker ref="address" @confirm="addrressConfirm" :indexs="form.region_code"/>
	</view>
</template>

<script>
	import vkAddressPicker from '@/components/vkAddressPicker';
	import { findById, create, update } from '@/api/address';
	
	import {
		mapState
	} from "vuex"
	export default {
		onLoad(options) {
			this.field = options.l
			this.form.data = this.info[this.field]
		},
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		components:{
			vkAddressPicker,
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
					region_text: {
						type: "string",
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
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			addrressConfirm(e){
				this.form.region_text = e.name;
				this.form = Object.assign(this.form, e.codes)
				this.$forceUpdate()
			},
			rightClick(){
				let that = this
				this.$refs.uForm.validate().then(res => {
					uni.showLoading({
						title: '加载中',
					});
					
					(that.form.id)? update(that.form): create(that.form).then(res=>{
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

<style lang="scss">
</style>