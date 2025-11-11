<template>
	<view>
		<u-navbar
			title="编辑名称"
			:leftIconSize="0"
			:autoBack="true"
			leftText="取消"
			:placeholder="true"
		>
		</u-navbar>
		<view class="form">
			<u-form ref="uForm" labelWidth="80" :labelStyle="$env.form.labelStyle">
				<view class="p-20 p-b-0" >
					<u-form-item label="昵称" >
						<u-input placeholder="请输入您的昵称" border="none" v-model="data" />
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
	import { setProfile } from '@/api/member.js';
	
	import {
		mapState
	} from "vuex"
	export default {
		onLoad() {
			this.data = this.info.nickname
		},
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		data() {
			return {
				data: "",
			}
		},
		methods: {
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
							that.$utils.back()
						}, 1000)
					}
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