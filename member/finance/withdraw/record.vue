<template>
	<view>
		<u-sticky bgColor="#fff">
			<u-tabs
				:scrollable="false"
				:activeStyle="$env.tabs.activeStyle"
				:inactiveStyle="$env.tabs.inactiveStyle"
				:lineColor="$env.tabs.lineColor"
				:list="tabList" 
				:is-scroll="false" :current="current" @change="change" />
		</u-sticky>
		<block v-if="list.length > 0">
			<u-cell-group>
				<u-cell v-for="(item, index) in list"
					:title="`${item.method_text}-提现金额：${item.amount}元`" 
					:value="item.status_text"
					:label="item.created_at"
				>
					<view
						slot="title"
						class="flex-start-center"
					>
						<text class="m-r-5">提现金额：{{item.amount}}元</text>
						<u-tag
							:text="item.method_text"
							plain
							size="mini"
							type="warning"
						/>
					</view>
				</u-cell>
			</u-cell-group>
			<u-loadmore :status="status" @loadmore="loadList()"/>
		</block>
		<vk-empty v-else />
	</view>
</template>

<script>
	import {
		withdrawLists
	} from '@/api/finance';
	export default {
		data() {
			return {
				page: 1,
				list: [],
				tabList: [
					{
						name: '全部'
					}, {
						name: '审核中'
					}, {
						name: '已打款'
					}, {
						name: '已驳回'
					}
				],
				current: 0,
				status: "loadmore",
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom(){
			this.loadList()
		},
		methods: {
			loadList(){
				this.status = 'loading';
				this.page = ++this.page;
				this.getList()
			},
			getList(){
				withdrawLists({
					page: this.page,
					status: this.current
				}).then(res=>{
					if(res.code == 200){
						const { list, total } = res.data
						if(list.length > 0){
							this.list = this.list.concat(list)
							this.status = 'loadmore';
						}else{
							this.page = this.page - 1
							this.status = 'nomore';
						}
					}
				})
			},
			change(e){
				this.current = e.index
				this.page = 1
				this.list = []
				this.getList()
			}
		}
	}
</script>

<style>
</style>