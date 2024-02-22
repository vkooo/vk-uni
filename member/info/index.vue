<template>
	<view>
		<view class="container">
			<view class="form">
				<u-form  ref="uForm" 
				  labelWidth="80" :labelStyle="{color: '#282828', padding: '3px 0'}">
					<view class="avatar p20">
						<image :src="avatar? avatar: '/static/image/avatar.png'" @click="upload" />
					</view>
					<view class="p20 pb0">
						<u-form-item label="昵称" borderBottom @click="$utils.navigate('modify/nickname')">
							<u-text :color="color(info.nickname)" :text="info.nickname || '立即修改昵称'" />
							<u-icon slot="right" name="arrow-right"/>
						</u-form-item>
						
						<u-form-item label="手机号码" borderBottom @click="$utils.navigate('modify/mobile')">
							<u-text :color="color(info.mobile)" :text="info.mobile || '立即绑定手机'" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						
						<u-form-item label="登录密码" @click="modifyPassword">
							<u-text :color="color()" :text="info.mobile? '修改登录密码': '请先绑定手机'" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
					</view>
					
					<u-gap height="10" bgColor="#fafafa"></u-gap>
					<view class="p15 pb0 pt0">
						<u-form-item label="出生日期" borderBottom @click="$utils.navigate('modify/birthday')">
							<u-text :color="color()" mode="date" :text="info.birthday" />
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						<u-form-item label="收货地址"  @click="$utils.navigate('address/index')">
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
			this.avatar = this.info.avatar
		},
		onShow() {
			this.$store.dispatch("member/getInfo")
		},
		methods: {
			modifyPassword(){
				if(this.info.mobile){
					this.$utils.navigate('modify/password')
				}else{
					this.$utils.navigate('modify/mobile')
				}
			},
			color(value){
				return !value? '#9b9b9b': ''
			},
			upload(){
				let that = this
				this.$upload.uploadImage('upload/image', function(res) {
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

<style lang="scss">
	
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
		/deep/ .u-text{
			justify-content: flex-end !important;
		}
	}
</style>