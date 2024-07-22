<template>
	<view>
		<u-sticky bgColor="#fff">
			<u-tabs
				:scrollable="false"
				active-color="#87ceeb"
				:list="tabList" 
				:is-scroll="false" :current="current" @change="change" />
		</u-sticky>
		<block  v-if="list.length > 0">
			<u-cell-group>
				<u-cell v-for="(item, index) in list"
					:title="item.memo" 
					:label="item.created_at"
					:border="list.length != index + 1"
				>
					<text slot="value" :style="{
						color: item.type == 1? 'red': ''
					}">
						{{(item.type == 1?'+ ':'- ')}} {{item.score}}
					</text>
				</u-cell>
			</u-cell-group>
			<u-loadmore :status="status" @loadmore="loadList()" />
		</block>
		<vkEmpty v-else />
	</view>
</template>

<script>
	import { scoreLog } from '@/api/finance';
	export default {
		data() {
			return {
				page: 1,
				list: [],
				status: "loadmore",
				tabList: [
					{
						name: '全部'
					}, {
						name: '增加'
					}, {
						name: '减少'
					}
				],
				current: 0,
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
				scoreLog({
					page: this.page,
					type: this.current
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