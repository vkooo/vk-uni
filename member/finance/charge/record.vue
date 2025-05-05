<template>
	<view>
		<u-sticky bgColor="#fff">
			<u-tabs
				:scrollable="false"
				active-color="#87ceeb"
				:list="tabList" 
				:is-scroll="false" :current="current" @change="change" />
		</u-sticky>
		<block v-if="list.length > 0">
			<u-cell-group>
				<u-cell v-for="(item, index) in list"
					:title="item.price" 
					:value="item.status_text"
					:label="item.created_at"
				/>
			</u-cell-group>
			<u-loadmore :status="status" @loadmore="loadList()"/>
		</block>
		<vk-empty v-else />
	</view>
</template>

<script>
	import { chargeLists } from '@/api/finance';
	export default {
		data() {
			return {
				page: 1,
				list: [],
				tabList: [
					{
						name: '全部',
						value: 0,
					}, {
						name: '成功',
						value: 2,
					}, {
						name: '失败',
						value: 3,
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
				chargeLists({
					page: this.page,
					status: this.tabList[this.current].value
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