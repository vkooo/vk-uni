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
					:value="(item.type == 1?'+ ':'- ') + item.score"
					:label="item.created_at"
				/>
			</u-cell-group>
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
		methods: {
			getList(){
				scoreLog({
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