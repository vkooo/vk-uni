<!-- 

import vkAddressPicker from '@/components/vkAddressPicker';
传入code
<vk-address-picker ref="address" @confirm="addrressConfirm" :indexs="addressCodes"/> 

-->
<template>
	<view class="">
		<u-picker :show="show" ref="uPicker" :title="title" :showToolbar="showToolbar" :itemHeight="itemHeight"
			:cancelText="cancelText" :cancelColor="cancelColor" :confirmText="confirmText" :confirmColor="confirmColor"
			:loading="loading" :visibleItemCount="visibleItemCount" :defaultIndex="defaultIndex" :columns="columns"
			:closeOnClickOverlay="closeOnClickOverlay" @confirm="confirm" @close="close" @cancel="cancel"
			@change="changeHandler" keyName="name">
		</u-picker>
	</view>
</template>

<script>
	import data from "./address.json"
	export default {
		name:"address-picker",
		props: {
			title: {
				type: String,
				default: () => "选择地区"
			},
			codes: {
				type: Array,
				default: function(){
					return []
				}
			},
			showToolbar: {
				type: Boolean,
				default: () => true
			},
			itemHeight: {
				type: [String, Number],
				default: () => 44
			},
			cancelText: {
				type: String,
				default: () => "取消"
			},
			cancelColor: {
				type: String,
				default: () => "#909193"
			},
			confirmText: {
				type: String,
				default: () => "确认"
			},
			confirmColor: {
				type: String,
				default: () => "#3c9cff"
			},
			visibleItemCount: {
				type: [String, Number],
				default: () => 5
			},
			loading: {
				type: Boolean,
				default: () => false
			},
			indexs: Array,
			closeOnClickOverlay: Boolean,
		},
		data() {
			return {
				show: false,
				columns: [],
				province:[],
				city:[],
				area:[],
				defaultIndex: [],
				// street:[],
			};
		},
		created(){
			this.init();
		},
		methods:{
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					indexs,
					picker = this.$refs.uPicker
				} = e
				if (columnIndex === 0) {
					this.city = this.formatData(this.province[indexs[0]].id).data;
					this.area = this.formatData(this.city[indexs[1]].id).data;
					// this.street = this.formatData(this.area[indexs[2]].id);
					picker.setColumnValues(1, this.city);
					picker.setColumnValues(2, this.area);
					// picker.setColumnValues(3, this.street);
				}
				if (columnIndex === 1) {
					this.area = this.formatData(this.city[indexs[1]].id).data;
					// this.street = this.formatData(this.area[indexs[2]].id).data;
					picker.setColumnValues(2, this.area);
					// picker.setColumnValues(3, this.street);
				}
				// if (columnIndex === 2) {
				// 	this.street = this.formatData(this.area[indexs[2]].id);
				// 	picker.setColumnValues(3, this.street);
				// }
			},
			formatData(id, currentIndex = 0){
				let arr = [];
				let index = 0, keyIndex;
				for(let key in data[id]){
					if(this.indexs[currentIndex] == key){
						keyIndex = index
					}
					index++;
					arr.push({
						name:data[id][key],
						id:key
					})
				}
				return {
					"data": arr,
					"keyIndex": keyIndex,
				};
			},
			init(){
				let result, indexs = []
				result = this.formatData(86, 0)
				//省
				this.province = result.data;
				indexs.push(result.keyIndex? result.keyIndex: 0)
				//市
				result = this.formatData(this.indexs[0]? this.indexs[0]: this.province[0].id, 1);
				this.city = result.data;
				indexs.push(result.keyIndex? result.keyIndex: 0)
				//区
				result = this.formatData(this.indexs[1]? this.indexs[1]: this.city[0].id, 2);
				this.area = result.data;
				indexs.push(result.keyIndex? result.keyIndex: 0)
				//街道
				// this.street = this.formatData(this.area[0].id);
				this.columns = [
					this.province, this.city, this.area, // this.street
				]
				this.defaultIndex = indexs
			},
			confirm(e) {
				let ids = e.value.map(i => i.id)
				let nameArr = e.value.map(i => i.name)
				let codes = {
					province_code: ids[0],
					city_code: ids[1],
					area_code: ids[2],
				}
				this.$emit("confirm", {
					codes: codes, 
					nameArr: nameArr,
					name: nameArr.join(" "),
				});
				this.show = false
			},
			close() {
				this.$emit("close");
				this.show = false
			},
			open() {
				this.$emit("open");
				this.show = false
			},
			cancel(){
				this.$emit("cancel");
				this.show = false
			}
		}
	}
</script>

<style>

</style>