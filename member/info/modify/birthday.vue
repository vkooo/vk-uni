<template>
	<view>
		<u-navbar
			title="编辑名称"
			:leftIconSize="0"
			:autoBack="true"
			leftText="取消"
			:placeholder="true"
		>
		</u-navbar>
		<view class="form">
			<u-form ref="uForm" labelWidth="80" :labelStyle="{color: '#808080'}">
				<view class="p-20 p-b-0" >
					<u-form-item label="出生日期" borderBottom @click="birthdayShow = true, timestamp = $utils.dateToTimestamp(data, '-')">
						<u-text mode="date" :text="data"></u-text>
					</u-form-item>
				</view>
				
			</u-form>
		</view>
		<view class="fixed-bottom-btn-wrap">
			<u-button type="primary" :customStyle="btnStyle" @click="rightClick">
				保存
			</u-button>
		</view>
		
		<u-datetime-picker
			:show="birthdayShow"
			v-model="timestamp"
			mode="date"
			@confirm="datetimeConfirm"
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
				timestamp: "",
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
					birthday: that.$utils.timeFormart(this.data)
				}).then(res=>{
					if(res.code == 200){
						that.$u.toast("操作成功")
						setTimeout(function(){
							that.$utils.back()
						}, 1000)
					}
				})
			},
			datetimeConfirm(e){
				let value
					, format = "yyyy-mm-dd"
				value = uni.$u.timeFormat(e.value, format);
				this.data = value
				this.birthdayShow = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fafafa;
	}
</style>