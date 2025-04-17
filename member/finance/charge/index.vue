<template>
	<view>
		<u-navbar
			title="余额"
			:autoBack="true"
			bgColor="transparent"
			leftIconColor="#ffffff"
			:titleStyle="{
				color: '#ffffff'
			}"
		/>
		<view class="h-navbar" />
		<view class="content">
			<view class="title">
				账户余额(元) <span style="padding-left: 10rpx;" /> <u-icon size="20" :name="eye? 'eye': 'eye-off'"  @click="eye = !eye"/>
			</view>
			<view class="money">
				{{eye? info.money: '****'}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getChargeRule,
	} from '@/api/finance';
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState('member', ["info", "hasLogin"]),
		},
		data() {
			return {
				eye: true,
				page: 1,
				list: [],
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				getChargeRule({
					page: this.page,
					type: this.current
				}).then(res=>{
					if(res.code == 200){
						const { list, total } = res.data
						if(list.length > 0){
							this.list = this.list.concat(list)
						}else{
							this.page = this.page - 1
						}
					}
				})
			},
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #f6f7f8;
	}
	.h-navbar{
		height: 25vh;
		background: linear-gradient(to bottom, #5993f0 0%, #7fb4f0 50%, #f6f6f6 100%);
	}
	.content {
		background: #ffffff;
		width: 90%;
		margin: -15vh auto 0;
		border-radius: 10rpx;
		padding: 40rpx 20rpx;
		font-size: 28rpx;
		text-align: center;
		.title{
			display: flex;
			align-items: center;
			justify-content: center;
		}
	
		.money {
			font-weight: bold;
			font-size: 65rpx;
			margin: 15rpx 0;
		}
	}
</style>