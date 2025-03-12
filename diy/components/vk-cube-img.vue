<template>
	<view class="diy-template-multiple-img" 
		:style="{
			paddingTop: data.paddingTop + 'px',
			paddingBottom: data.paddingBottom + 'px',
			paddingLeft: data.paddingSide + 'px',
			paddingRight: data.paddingSide + 'px',
			background: data.bgColor,
		}">
		<view v-for="(item, index) in data.list" 
			:key="index"
			class="diy-template-multiple-img-item"
			:style="{ width: setWidth }"
		>
			<img
			    :src="item.src"
			    @click="click(item)"
			/>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				},
			},
		},
		data() {
			return {
				// height: 20
			}
		},
		computed: {
			setWidth() {
				if(this.data.layout === 4) return "25%";
				if(this.data.layout === 3) return "33.33%";
				return "50%";
			},
		},
		methods: {
			click(item){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.diy-template-multiple-img{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		.diy-template-multiple-img-item{
			padding: 0px;
			margin: 0;
			img {
				display: block;
				max-width: 100%;
				max-height: 100%;
				width: 100%;
				border: 0;
				padding: 0;
				outline: none;
			}
		}
	}
</style>