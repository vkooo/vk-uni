<template>
	<view>
		<u-navbar
			title="编辑名称"
			@rightClick="rightClick"
			leftIcon=""
			:autoBack="true"
			leftText="取消"
			:placeholder="true"
		>
			<template slot="right">
				<text :style="{color: data ? '#b44a51': '#9b9b9b'}">保存</text>
			</template>
		</u-navbar>
		<view class="form">
			<u-form ref="uForm" labelWidth="80" :labelStyle="{color: '#808080'}">
				<view class="p20 pb0" >
					<u-form-item label="出生日期" borderBottom @click="birthdayShow = true">
						<u-text mode="date" :text="data"></u-text>
					</u-form-item>
				</view>
				
			</u-form>
		</view>
		
		<u-datetime-picker
			:show="birthdayShow"
			v-model="data"
			mode="date"
			@confirm="birthdayShow = false"
			@cancel="birthdayShow = false"
			:minDate="$utils.minYear()"
		/>
	</view>
</template>

<script>
	import { setProfile } from '@/api/member.js';
	
	import {
		mapState
	} from "vuex"
	export default {
		onLoad(options) {
			this.data = this.info.birthday
		},
		computed: {
			...mapState('member', ["hasLogin", "info"]),
		},
		data() {
			return {
				data: '',
				birthdayShow: false,
			}
		},
		methods: {
			rightClick(){
				let that = this
				uni.showLoading({
					title: '加载中',
				});
				setProfile({
					birthday: that.$utils.pickerFormart(this.data, 'yyyy-mm-dd')
				}).then(res=>{
					if(res.code == 200){
						that.$u.toast("操作成功")
						setTimeout(function(){
							uni.navigateBack()
						}, 1000)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fafafa;
	}
</style>