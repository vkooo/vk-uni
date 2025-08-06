<template>
	<text :class="weight ? 'semiBold' : 'regular'">
		<text class="intPrice" :data-x="unit" :style="{'font-size': intSize + unit} ">
			<text :style="{'font-size': labelSize + unit} " class="normal" :class="{'font600' : coupon}">¥</text>
		{{ intPrice }}</text>
		<text v-if="coupon" class="floatPrice" :style="{'font-size': floatSize + unit} ">{{ couponPrice }}</text>
		<text v-else class="floatPrice" :style="{'font-size': floatSize + unit }">{{floatPrice}}</text>

	</text>
</template>

<script>
	export default {
		name: 'PriceFormat',
		props: {
			unit: {
				type: String,
				default: "rpx"
			},
			price: {
				type: String | Number,
				default: ""
			},
			// 粗体
			weight: {
				type: Boolean,
				default: false
			},
			intSize: {
				type: String,
				default: '32'
			},
			floatSize: {
				type: String,
				default: '22'
			},
			labelSize: {
				type: String,
				default: '20'
			},
			coupon: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				floatPrice: "",
				couponPrice: ""
			};
		},
		computed: {
			intPrice() {
				const str = this.price+'' //转成字符串
				const arr = str.split(".") //使用分隔符分割字符串成数组
				let tempStr = arr[1] ? arr[1] : '00' //如果小数点后有值就用该值，没有默认'00'
				this.floatPrice = tempStr.length === 1 ? '.'+tempStr + '0' : '.'+tempStr //小数点后只有一位的话补0
				this.couponPrice = (tempStr.length==2&&tempStr == '00') ? '' : '.'+tempStr
				return arr[0] || '0'
			}
		},
		watch: {

		}
	}
</script>

<style lang="scss" scoped>
	.normal {
		font-family: "黑体"
	}
	.font600 {
		font-weight: 600;
	}
</style>
