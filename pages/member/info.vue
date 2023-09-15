<template>
	<view>
		<customNavbar title="修改资料" />
		<view class="container">
			<view class="form">
				<u-form 
				  :model="form" ref="uForm" :rules="rules"
				  labelWidth="80" :labelStyle="{fontWeight: 'bold'}">
					<view class="avatar p20">
						<image :src="form.avatar?form.avatar:'../../static/image/avatar.png'" @click="upload" class="" mode=""></image>
					</view>
					<view class="p20 pb5">
						<u-form-item label="昵称" prop="nickname" borderBottom>
							<u-input placeholder="请输入您的昵称" border="none" v-model="form.nickname" />
						</u-form-item>
						<u-form-item label="姓名" prop="realname" borderBottom>
							<u-input placeholder="请输入您的姓名" border="none" v-model="form.realname" />
						</u-form-item>
						
						<u-form-item label="手机号" prop="mobile">
							<u-input 
								border="none"
								maxlength="11"
								type="number" placeholder="请输入手机号" v-model="form.mobile">
								<template slot="suffix">
									<!-- <u-text suffixIcon="arrow-right" size="14" color="#999999" text="更换绑定"></u-text> -->
								</template>
							</u-input>
						</u-form-item>
					</view>
					
					<u-gap height="10" bgColor="#f1f1f1"></u-gap>
					<view class="p15 pb0">
						<u-form-item label="出生日期" prop="birthday" borderBottom @click="birthdayShow = true" >
							<u-text mode="date" :text="form.birthday" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						<u-form-item label="所在城市" prop="address" @click="$refs.address.show = true">
							<u-text :text="form.region_text?form.region_text: '请选择所在城市'" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
					</view>
				</u-form>
			</view>
		</view>
		<u-gap height="50" />
		<view class="p15">
			<u-button  type="success" @click="submit">确认修改</u-button>
		</view>
		<u-datetime-picker
			:show="birthdayShow"
			v-model="form.birthday"
			mode="date"
			@confirm="birthdayShow = false"
			@cancel="birthdayShow = false"
		/>
		<vk-address-picker ref="address" @confirm="addrressConfirm" :indexs="addressCodes"/>
	</view>
</template>

<script>
	import vkAddressPicker from '@/components/vkAddressPicker';
	import { setProfile } from '@/api/member.js';
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		watch:{
			"info": {
				handler(newVal, oldVal) {
					this.form = newVal
					this.addressCodes = newVal.region_code_arr
					this.$forceUpdate()
				},
				immediate: true,
				deep: true
			},
		},
		components:{
			vkAddressPicker,
		},
		onLoad() {
			this.$reLogin()
		},
		data() {
			return {
				form: {
					avatar: '',
					nickname: null,
					mobile: null,
					birthday: null,
					region_text: null
				},
				rules: {
					nickname: {
						type: "string",
						required: true,
						message: '请输入昵称',
						trigger: ['change', 'blur'],
					},
					realname: {
						type: "string",
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur'],
					},
					mobile: {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value) || this.$u.test.landline(value);
						},
						message: '请输入正确的手机号',
						trigger: ['change'],
					},
				},
				birthdayShow: false,
				code: null,
				addressCodes: []
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			upload(){
				let that = this
				this.$upload.uploadImage('upload/image', function(res) {
					that.form.avatar = res.full_url
					that.$forceUpdate()
				})
			},
			addrressConfirm(e){
				this.form.region_text = e.name;
				this.form.address_code = e.codes;
				this.$forceUpdate()
			},
			submit(){
				let that = this
				if(!this.form.avatar){
					this.$throw("请上传头像");
				}
				this.$refs.uForm.validate().then(res => {
					uni.showLoading({
						title: '加载中',
					});
					let form = that.form
					form.birthday = that.$utils.pickerFormart(form.birthday, 'yyyy-mm-dd')
					setProfile(form).then(res=>{
						if(res.code == 200){
							setTimeout(function(){
								that.$utils.switchTab("/pages/tabBar/member")
							}, 1000)
						}
					})
				}).catch(errors => {
					this.$throw("请完善资料");
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f1f1f1;
	}
	.container {
		background-color: #ffffff;
		.form{
			.avatar {
				text-align: center;
				image {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1rpx solid #cdcdcd;
				}
			}
		}
		.btn{
			padding: 0 20rpx;
			button{
				margin-top: 30rpx;
			}
		}
	}
</style>