<template>
	<view class="diy-template" id="diy-template-sort">
		<view 
			v-for="(item, index) in list" 
			@tap="checked(index)" 
			:id="item.id"
			:key="item.id"
			class="diy-template-item"
			:class="{
				active: index === current
			}"
		>
			<vk-text v-if="item.moduleId === 'text'" :data="item.data" />
			<vk-gap v-if="item.moduleId === 'gap'" :data="item.data" />
			<vk-divider v-if="item.moduleId === 'divider'" :data="item.data" />
			<vk-notice-bar v-if="item.moduleId === 'notice-bar'" :data="item.data" />
			<vk-search v-if="item.moduleId === 'search'" :data="item.data" />
			<vk-float 
				v-if="item.moduleId === 'float'" 
				:mode="mode"
				:bottomPx="item.data.bottomPx"
				:sidePx="item.data.sidePx"
				:disabled="item.data.disabled"
				:canDocking="item.data.canDocking"
				:data="item.data"
			/>
			<vk-single-img v-if="item.moduleId === 'single-img'" :data="item.data" />
			<vk-multiple-img v-if="item.moduleId === 'multiple-img'" :data="item.data" />
			<vk-rich-text v-if="item.moduleId === 'rich-text'" :data="item.data" />
			<vk-nav-btn v-if="item.moduleId === 'nav-btn'" :data="item.data" />
			<view class="diy-template-del"  @tap.stop="delItem(index)">移除</view>
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
					// 	moduleId: "float",
					// 	data: {
					// 		bottomPx: 30,
					// 		sidePx: 10,
					// 		disabled: false,
					// 		canDocking: true,
					// 	},
					// }
				],
				current: -1,
				mode: "prod",
			};
		},
		onLoad(options) {
			if(options.mode){
				this.mode = options.mode
			}
		},
		mounted() {
		    window.addEventListener("message", this.receiveMessage);
			this.setSortable()
		},
		methods: {
			setSortable() {
				this.$nextTick()
			    const sortable = Sortable.create(document.getElementById('diy-template-sort'), {
			        animation: 150,
			        onEnd: ({ oldIndex, newIndex }) => {
			            if (oldIndex === newIndex) return; // 无需操作
			            const [movedItem] = this.list.splice(oldIndex, 1); // 解构直接取出元素
			            this.list.splice(newIndex, 0, movedItem); // 插入新位置
			
			            this.current = newIndex;
			            this.postMessage({
			                type: 'sortable',
			                list: [...this.list], // 深拷贝，防止外部引用直接修改
			                index: newIndex,
			            });
						this.$forceUpdate();
			        },
			    });
			},
			checked(index){
				if(this.current === index)
					return
				this.current = index
				this.postMessage({
					type: 'checked', 
					list: this.list,
					index: index,
				});
			},
			delItem(index){
				this.list.splice(index, 1)
				this.$forceUpdate();
				this.postMessage({
					type: 'remove', 
					list: this.list,
					index: -1,
				});
				this.$u.toast("移除成功")
			},
			postMessage(params){
				window.parent.postMessage(
					params, 
					'*'
				);
			},
			receiveMessage(event) {
			    console.log("前端 Received from iframe:", event.data);
				if(typeof event.data === "object" && Array.isArray(event.data)){
					this.list = event.data
				}
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
			position: relative;
			border: 1rpx solid transparent;
			&.active{
				border: 1rpx solid #479ee3;
			}
			&:hover {
				border: 1rpx dashed #479ee3;
				.diy-template-del{
					display: block;
				}
			}
			
			.diy-template-del{
				height: 18px;
				width: 40px;
				background: rgba(0, 0, 0, 0.4);
				font-size: 12px;
				color: #fff;
				line-height: 18px;
				text-align: center;
				position: absolute;
				bottom: 0;
				right: 0;
				display:none;
				cursor: pointer;
				z-index: 9999;
			}
		}
		
	}
</style>