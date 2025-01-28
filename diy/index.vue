<template>
	<view class="diy-template" id="diy-template-sort">
		<view 
			v-for="(item, index) in list" 
			@click="current = index" 
			:id="item.id"
			:key="item.id"
			class="diy-template-item"
			:class="{
				active: index === current
			}"
		>
			<gap v-if="item.moduleId === 'gap'" :data="item.data" />
			<noticeBar v-if="item.moduleId === 'notice-bar'" :data="item.data" />
		</view>
	</view>
</template>

<script>
	import componentMap from "./components/componentMap";
	import Sortable from 'sortablejs';

	export default {
		mixins: [componentMap],
		data() {
			return {
				list: [
					// {
					// 	moduleId: "notice-bar",
					// }
				],
				current: -1,
			};
		},
		watch: {
			current: {
				handler(newVal, oldVal){
					if(newVal > -1){
						window.parent.postMessage(
							{ 
								type: 'currentChange', 
								list: this.list,
								index: newVal,
							}, 
							'*'
						);
					}
				},
				deep: true,
			},
		},
		mounted() {
		    window.addEventListener("message", this.receiveMessage);
			this.setSortable()
		},
		methods: {
			setSortable(){
				let option = {
					animation: 150,
					onEnd: (e) => {
						const { oldIndex, newIndex, item } = e;
						
						if (oldIndex !== newIndex) {
						    const movedItem = this.list.splice(oldIndex, 1)[0]; // 移除旧位置的元素
						    this.list.splice(newIndex, 0, movedItem); // 在新位置插入元素
						}
						this.current = newIndex
						this.$forceUpdate();
					}
				}
				let sortable = Sortable.create(document.getElementById('diy-template-sort'), option);
			},
			receiveMessage(event) {
			    console.log("前端 Received from iframe:", event.data);
				if(typeof event.data === "object" && Array.isArray(event.data)){
					this.list = event.data
				}
				// if(typeof event.data === "object"){
				// 	const { id, moduleId, type, data } = event.data;
				// 	if(type === 'addComponent'){
				// 		this.list.push({
				// 			id: id,
				// 			moduleId: moduleId,
				// 			data: data,
				// 		})
				// 	}else if(type === 'updateComponent'){
				// 		const index = this.list.findIndex(item=> item.id = id)
				// 		this.list[index].data = data
				// 	}
				// }
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.diy-template{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		.diy-template-item{
			box-sizing: border-box;
			&.active{
				border: 2rpx solid #479ee3;
			}
			&:hover {
				border: 2rpx dashed #479ee3;
			}
		}
		
	}
</style>