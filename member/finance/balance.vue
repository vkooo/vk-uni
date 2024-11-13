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
		<view class="content header">
			<view class="title">
				账户余额(元) <span style="padding-left: 10rpx;" /> <u-icon size="20" :name="eye? 'eye': 'eye-off'"  @click="eye = !eye"/>
			</view>
			<view class="money">
				{{eye? info.money: '****'}}
			</view>
			<view class="vk-flex btn">
				<u-button shape="circle" text="提现" />
				<u-button shape="circle" type="primary" text="充值" />
			</view>
			<u-gap height="10" />
			<u-cell-group :border="false">
				<u-cell isLink title="实名信息" :titleStyle="{
					padding: '5rpx 0'
				}" :value="info.is_realname_text"/>
				<u-cell :border="false" isLink title="银行卡"
				@click="$utils.navigate('/member/info/bankcard/index')"
				:titleStyle="{
					padding: '5rpx 0'
				}" :value="'已绑定' + info.bankcard_count + '张'" />
			</u-cell-group>
		</view>
		<u-gap height="10" />
		<view class="content detail">
			<view class="vk-group-info bb-1">
				<text class="f1">
					余额变动明细
				</text>
				<u-text suffixIcon="arrow-right"
					iconStyle="font-size: 14px; color:#999999;" 
					size="13"
					color="#999999"
					align="right"
					@click="$utils.navigate('./balanceLog')"
					text="全部" />
			</view>
			<u-cell-group :border="false"  v-if="list.length > 0">
				<u-cell v-for="(item, index) in list"
					:title="item.memo" 
					:label="item.created_at"
					:border="list.length != index + 1"
				>
					<text slot="value" :style="{
						color: item.type == 1? 'red': ''
					}">
						{{(item.type == 1?'+ ':'- ')}} {{item.money}}
					</text>
				</u-cell>
			</u-cell-group>
			<vk-empty v-else />
		</view>
		<u-gap height="10" />
	</view>
</template>

<script>
	import { moneyLog } from '@/api/finance';
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
				list: [],
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				moneyLog({
					page: 1,
					limit: 5,
				}).then(res=>{
					if(res.code == 200){
						const { list, total } = res.data
						this.list = list
					}
				})
			},
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #f6f6f6;
	}
	.h-navbar{
		height: 30vh;
		background: linear-gradient(to bottom, #3873f5 0%, #5993f0 50%, #f6f6f6 100%);
	}
	.content {
		background: #ffffff;
		width: 88%;
		border-radius: 10rpx;
		padding: 20rpx 20rpx;
		font-size: 28rpx;
		margin: 0 auto;
	}
	.content.header{
		margin: -20vh auto 0;
		padding: 40rpx 20rpx 10rpx;
		.title{
			display: flex;
			align-items: center;
			justify-content: center;
		}
			
		.money {
			font-weight: bold;
			font-size: 65rpx;
			margin: 30rpx 0;
			text-align: center;
		}
		.btn{
			margin-top: 70rpx;
			.u-button{
				width: auto;
				padding: 0 120rpx;
			}
		}
	}
	.content.detail{
		
	}
</style>