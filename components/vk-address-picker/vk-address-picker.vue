<template>
	<view>
		<uni-data-picker
			:clear-icon="false"
			:placeholder="title" 
			:popup-title="title" 
			:localdata="items"
			:border="false"
			:map="{
				text:'name',
				value:'code'
			}"
			v-model="data"
			@change="onchange" />
	</view>
</template>

<script>
	import address from "./address.json"
	export default {
		name:"address-picker",
		props: {
			title: {
				type: String,
				default: () => "选择地区"
			},
			codes: {
				type: [String, Number],
				default: ""
			},
		},
		watch: {
			codes:{
				handler(newVal, oldVal){
					if(newVal > 0){
						this.data = newVal + ""
					}
				},
				deep: true,
				immediate: true
			}
		},
		data() {
			return {
				items: address,
				data: "",
			};
		},
		methods:{
			onchange(e){
				let arr = []
				for(let i in e.detail.value){
					arr.push(e.detail.value[i].value)
				}
				let codes = {
					codes: arr[3],
					data: {
						province_code: arr[0],
						city_code: arr[1],
						area_code: arr[2],
						street_code: arr[3],
					}
				}
				this.$emit('onchange', codes)
			}
		}
	}
</script>