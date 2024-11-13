<template>
	<view class="container">
		<u-form
			labelPosition="left"
			labelWidth="100"
			:model="form"
			:rules="rules"
			ref="uForm"
		>
			<u-form-item
				label="收款银行"
				prop="backcard_id"
				borderBottom
			>
				<u-input
					v-model="form.backcard_id"
					border="none"
					placeholder="请输入收款银行"
				/>
			</u-form-item>
			<u-form-item
				label="收款银行支行"
				prop="backcard_branch"
				borderBottom
			>
				<u-input
					v-model="form.backcard_branch"
					border="none"
					placeholder="请输入收款银行支行"
				></u-input>
			</u-form-item>
			<u-form-item
				label="银行卡号"
				prop="backcard_code"
				borderBottom
			>
				<u-input
					v-model="form.backcard_code"
					border="none"
					placeholder="请输入银行卡号"
				></u-input>
			</u-form-item>
			<u-form-item
				label="收款户名"
				prop="backcard_realname"
				borderBottom
			>
				<u-input
					v-model="form.backcard_realname"
					border="none"
					placeholder="请输入收款户名"
				></u-input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				rules: {}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		width: 95%;
		margin: 0 auto;
	}
</style>