<template>
	<view>
		<u-navbar
			title="编辑名称"
			:leftIconSize="0"
			:autoBack="true"
			leftText="取消"
			:placeholder="true"
		>
			<template slot="right">
				<text :style="{color: form.data ? '#b44a51': '#9b9b9b'}">保存</text>
			</template>
		</u-navbar>
		<view class="form">
			<u-form :model="form" ref="uForm" :rules="rules" labelWidth="80" :labelStyle="{color: '#808080'}">
				<view class="p-20 p-b-0" >
					<u-form-item borderBottom>
						<u-input placeholder="请输入您的昵称" border="none" v-model="form.data" />
					</u-form-item>
					
				</view>
				
			</u-form>
		</view>
		<view class="fixed-bottom-btn-wrap">
			<u-button type="primary" :customStyle="btnStyle" @click="rightClick">
				保存
			</u-button>
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
	import { setProfile } from '@/api/member.js';
	
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
		data() {
			return {
				field: "",
				form: {
					data: '',
				},
				rules: {
					data: {
						type: "string",
						required: true,
						message: '请填写信息',
						trigger: ['change', 'blur'],
					}
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
					form.birthday = that.$utils.timeFormart(form.birthday)
					setProfile(form).then(res=>{
						if(res.code == 200){
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
</style>