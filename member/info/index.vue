<template>
	<view>
		<view class="container">
			<view class="form">
				<u-form  ref="uForm" 
				  labelWidth="80" :labelStyle="{color: '#282828', padding: '3px 0'}">
					<view class="avatar p-15">
						<image :src="avatar? avatar: '/static/image/avatar.png'" @click="upload" />
					</view>
					<view class="p-15 p-b-0">
						<u-form-item label="昵称" borderBottom @click="$utils.navigate('/member/info/modify/nickname')">
							<u-text :color="color(info.nickname)" :text="info.nickname || '立即修改昵称'" />
							<u-icon slot="right" name="arrow-right"/>
						</u-form-item>
						
						<u-form-item label="手机号" borderBottom @click="$utils.navigate('/member/info/modify/mobile')">
							<u-text :color="color(info.mobile)" :text="info.mobile || '立即绑定手机'" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						
						<u-form-item label="登录密码" borderBottom @click="modifyPassword">
							<u-text :color="color()" :text="info.mobile? '修改登录密码': '去绑定手机号'" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						<u-form-item label="支付密码" borderBottom @click="modifyPayPassword">
							<u-text :color="color()" :text="info.mobile? '修改支付密码': '去绑定手机号'" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						<u-form-item label="绑定支付宝" @click="$utils.navigate('/member/info/modify/aliaccount')">
							<u-text :color="color()" :text="info.ali_account? '查看': '去绑定'" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
					</view>
					
					<u-gap height="10" bgColor="#fafafa"></u-gap>
					<view class="p-15 p-b-0 p-t-0">
						<u-form-item label="出生日期" borderBottom @click="$utils.navigate('/member/info/modify/birthday')">
							<u-text :color="color()" mode="date" :text="info.birthday" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						<u-form-item label="收货地址"  @click="$utils.navigate('/member/address/index')">
							<u-text :color="color()" text="立即前往" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
					</view>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
	import { setProfile } from '@/api/member.js';
	
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		data() {
			return {
				avatar: ""
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.$store.dispatch("member/getInfo").then(res=>{
				this.avatar = this.info.avatar
			})
		},
		methods: {
			modifyPassword(){
				if(this.info.mobile){
					this.$utils.navigate('/member/info/modify/password')
				}else{
					this.$utils.navigate('/member/info/modify/mobile')
				}
			},
			modifyPayPassword(){
				if(this.info.mobile){
					this.$utils.navigate('/member/info/modify/pay_password')
				}else{
					this.$utils.navigate('/member/info/modify/mobile')
				}
			},
			color(value){
				return !value? '#9b9b9b': ''
			},
			upload(){
				let that = this
				this.$upload.uploadImage({}, function(res) {
					let url = res.full_url
					setProfile({
						avatar: url
					}).then(res=>{
						that.avatar = url
						that.$forceUpdate()
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
		::v-deep .u-text{
			justify-content: flex-end !important;
		}
	}
</style>