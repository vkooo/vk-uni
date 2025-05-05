<template>
	<u-popup :show="show" mode="bottom" :closeable="true" @close="show = false">
		<view>
			<view class="pop_title p-20 ">
				确认付款
			</view>
		</view>
		<view class="pop_money p-t-10 p-b-10">
			¥{{data.amount}}
		</view>
		<view class="p-20">
			<u-radio-group v-model="value" placement="column">
				<view class="pay_radio_dis p-b-30" v-for="item in channel_list" @click="value = item.id">
					<view class="pay_wx_dis">
						<view>
							<u-icon :name="item.icon" size="30px" :color="item.color" />
						</view>
						<view class="pay_wx_title">
							<view>{{item.title}}</view>
							<view class="pay_wx_info p-t-5">{{item.info}}</view>
						</view>
					</view>
					<u-radio activeColor="#d09447" :name="item.id" />
				</view>
			</u-radio-group>
			
			<view class="p-t-30">
				<u-button type="primary" 
				text="确认支付" 
				shape="circle"
				:disabled="value === 0"
				:style="[btnStyle]"
				@click="click"
				></u-button>
			</view>
			
		</view>
	</u-popup>
</template>

<script>
	import {
		mapState, mapGetters
	} from "vuex"
	import { getPlatform } from "@/utils/platform"
	export default {
		computed: {
			...mapState(["website"]),
			channel_list(){
				if(!this.website.website.paylist)
					return []
				let channel_list = [
					{
						title: '微信支付',
						info: '推荐安装微信的用户使用',
						icon: 'weixin-fill',
						provider: "wxpay",
						id: 1,
						color: "#2ba360",
					}
					// #ifndef MP-MP-WEIXIN
					,{
						title: '支付宝支付',
						info: '推荐安装支付宝的用户使用',
						icon: 'zhifubao',
						provider: "alipay",
						color: "#1e70f9",
						id: 2,
					},
					// #endif
				]
				
				const lists = channel_list.filter(item =>
				    item?.provider !== undefined && 
				    this.website.website.paylist.includes(item.provider)
				)
				return lists;
			}
		},
		data() {
			return {
				show: false,
				value: 0,
				data: {}
			}
		},
		methods:{
			pay(data){
				this.show = true;
				this.data = data
			},
			click(){
				const channel = this.channel_list.find(item => item.id == this.value)
				this.$emit('click', {
					provider: channel.provider,
					env: getPlatform(),
				})
			},
		}
	}
</script>


<style lang="scss" scoped>
.pop_title{
		text-align: center;
	}
	.pop_money{
		font-weight: bold;
		font-size:60rpx;
		text-align: center;
	}
	.pay_radio_dis{
		display: flex;
		justify-content: space-between;
		
		.pay_wx_dis{
			display: flex;
			align-items: center;
			
			.pay_wx_title{
				margin-left: 20rpx;
				font-size: 30rpx;
				
				.pay_wx_info{
					color: #989898;
					font-size: 26rpx;
				}
			}
		}
	}
</style>