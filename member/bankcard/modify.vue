<template>
	<view class="bind-bank-card">
		<u-navbar title="绑定银行卡" :autoBack="true" :borderBottom="false" :placeholder="true"></u-navbar>
		<u-notice-bar mode="closable" text="请填写本人真实姓名和银行卡信息" />
		<view class="content">
			<view class="card-display">
				 <!-- :style="cardStyle" -->
				<view class="bank-card ">
					<view class="card-top">
						<view class="bank-info">
							<image v-if="form.icon" :src="form.icon" mode="aspectFit"
								class="bank-logo"></image>
							<text class="bank-name">{{ form.bank || '选择银行' }}</text>
						</view>
						<text class="card-type">银行卡</text>
					</view>

					<view class="card-number">
						{{ code || '•••• •••• •••• ••••' }}
					</view>

					<view class="card-bottom">
						<text class="card-holder">{{ form.realname || '持卡人姓名' }}</text>
						<view class="card-chip">
							<view class="chip-line"></view>
							<view class="chip-line"></view>
							<view class="chip-line"></view>
						</view>
					</view>
				</view>

				<view class="card-shadow" />
			</view>

			<!-- 表单区域 -->
			<view class="form-section">
				<view class="section-title">
					<text class="title-text">填写银行卡信息</text>
					<view class="title-line" />
				</view>

				<u-form :model="form" :rules="rules" ref="uForm" labelWidth="120" errorType="toast">
					<u-form-item label="持卡人姓名" prop="realname" borderBottom>
						<u-input v-model="form.realname" placeholder="请输入与银行卡一致的姓名"
							border="none" inputAlign="right" :customStyle="{ padding: '20rpx 0' }"></u-input>
					</u-form-item>

					<u-form-item label="银行卡号" prop="code" borderBottom>
						<u-input v-model="form.code" placeholder="请输入16-19位卡号"
							border="none" type="number" inputAlign="right" maxlength="19">
						</u-input>
					</u-form-item>

					<u-form-item label="收款银行" prop="bank" borderBottom  @click="showBankPicker = true; $utils.hideKeyboard()">
						<u-input
							v-model="form.bank"
							disabled
							inputAlign="right"
							disabledColor="#ffffff"
							placeholder="请选择银行"
							border="none"
						/>
						<u-icon slot="right" name="arrow-right" color="#999" />
					</u-form-item>

					<u-form-item label="支行名称" prop="branch" borderBottom>
						<u-input v-model="form.branch" placeholder="请输入支行全称"
							border="none" type="text" inputAlign="right">
						</u-input>
					</u-form-item>
					
					<u-form-item label="预留手机号" prop="mobile" borderBottom>
						<u-input v-model="form.mobile" placeholder="银行预留手机号"
							border="none" type="number" inputAlign="right" maxlength="11">
						</u-input>
					</u-form-item>
					<u-form-item label="设置默认" prop="mobile">
						<view style="width: 100%;" class="flex flex-justify-end">
							<u-switch :activeValue="1" :inactiveValue="2"  v-model="form.default" />
						</view>
					</u-form-item>

				</u-form>
			</view>

			<!-- 银行选择器 -->
			<u-picker :show="showBankPicker" :columns="bankList" keyName="name" @confirm="confirmBank"
				@cancel="showBankPicker = false" :cancelColor="'#666'" :confirmColor="'#2979ff'"></u-picker>

			<!-- 协议和提交按钮 -->
			<view class="action-section">
				<view class="agreement flex-center">
					<u-checkbox-group :value="agree" @change="(e) => {agree = e}">
						<u-checkbox shape="circle" name="1" activeColor="#2979ff" :iconSize="18" />
					</u-checkbox-group>
					<text class="agreement-text">
						我已阅读并同意<text class="highlight">《银行卡绑定协议》</text>
					</text>
				</view>

				<view class="m-t-15">
					<u-button type="primary" shape="circle" :disabled="agree.length == 0" @click="submit">
						确认绑定
					</u-button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import { bankcardInit, bankcardSubmit } from '@/api/member.js';
	export default {
		data() {
			return {
				agree: [],
				form: {
					realname: '',
					code: '',
					bank: '',
					branch: '',
					mobile: '',
					bankcard_id: "",
				},
				rules: {
					realname: [{
							required: true,
							message: '请输入持卡人姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '姓名长度为2-10个字符',
							trigger: 'blur'
						}
					],
					code: [{
							required: true,
							message: '请输入银行卡号',
							trigger: 'blur'
						},
						{
							validator: (rule, value, callback) => {
								return /^[0-9]{16,19}$/.test(value.replace(/\s/g, ''));
							},
							message: '银行卡号格式不正确',
							trigger: 'blur'
						}
					],
					bankcard_id: [{
						required: true,
						message: '请选择收款银行',
						trigger: 'change'
					}],
					mobile: [{
							required: true,
							message: '请输入预留手机号',
							trigger: 'blur'
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value)
							},
							message: '手机号格式不正确',
							trigger: 'blur'
						}
					]
				},
				showBankPicker: false,
				bankList: [],
				id: null
			};
		},
		computed: {
			// 银行卡样式
			cardStyle() {
				const defaultStyle = {
					background: 'linear-gradient(135deg, #2979ff, #4a90e2)',
					color: '#fff'
				};
				if (this.form.bankcard_id) {
					const bank = this.bankList[0].find(item => item.id === this.form.bankcard_id);
					if (bank && bank.bgColor) {
						return {
							background: `linear-gradient(135deg, ${bank.bgColor}, ${this.lightenColor(bank.bgColor, 20)})`,
							color: '#fff'
						};
					}
				}
				return defaultStyle;
			},
			code() {
				if (this.form.code) {
					return this.form.code.replace(/\s/g, '')
						.replace(/(\d{4})(?=\d)/g, '$1 ');
				}
				return ""
			},
		},
		onLoad(options) {
			if(options.id)
				this.id = options.id
			bankcardInit(options).then(res=>{
				if(res.code == 200){
					const { lists, bankcard } = res.data
					if(options.id){
						this.form = bankcard
						
						const bank = lists.find(item=> item.id == bankcard.bankcard_id)
						this.form.bank = bank.name;
						this.bank = bank;
					}
					this.bankList = [lists]
				}
			})
		},
		methods: {
			confirmBank(e) {
				this.form.bank = e.value[0].name;
				this.form.bankcard_id = e.value[0].id;
				this.showBankPicker = false;
			},


			// 颜色变亮
			lightenColor(color, percent) {
				const num = parseInt(color.replace('#', ''), 16);
				const amt = Math.round(2.55 * percent);
				const R = (num >> 16) + amt;
				const G = (num >> 8 & 0x00FF) + amt;
				const B = (num & 0x0000FF) + amt;

				return `#${(
					0x1000000 +
					(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
					(G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
					(B < 255 ? (B < 1 ? 0 : B) : 255)
				).toString(16).slice(1)}`;
			},
			submit() {
				const that = this
				this.$refs.uForm.validate().then(res => {
					if(res){
						uni.showLoading({
							title: '正在绑定...',
							mask: true
						});
						this.form.ss = undefined
						bankcardSubmit(this.form).then(res=>{
							console.log(res)
							setTimeout(function(){
								that.$utils.back()
							}, 1000)
						})
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style lang="scss" scoped>
	.bind-bank-card {
		background-color: #f7f7f7;

		.content {
			position: relative;
			z-index: 1;
			padding: 30rpx;
		}

		/* 银行卡展示区 */
		.card-display {
			position: relative;
			margin-bottom: 40rpx;

			.bank-card {
				height: 240rpx;
				border-radius: 20rpx;
				padding: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				position: relative;
				z-index: 2;
				box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);

				.card-top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.bank-info {
						display: flex;
						align-items: center;

						.bank-logo {
							width: 60rpx;
							height: 60rpx;
							margin-right: 15rpx;
						}

						.bank-name {
							font-size: 32rpx;
							font-weight: bold;
						}
					}

					.card-type {
						font-size: 24rpx;
						background-color: rgba(255, 255, 255, 0.2);
						padding: 6rpx 16rpx;
						border-radius: 30rpx;
					}
				}

				.card-number {
					font-size: 38rpx;
					letter-spacing: 2rpx;
					font-family: 'Courier New', monospace;
					margin: 30rpx 0;
					word-spacing: 10rpx;
					text-align: center;
				}

				.card-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.card-holder {
						font-size: 28rpx;
					}

					.card-chip {
						width: 50rpx;
						height: 40rpx;
						background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
						border-radius: 6rpx;
						position: relative;
						overflow: hidden;

						.chip-line {
							position: absolute;
							background-color: rgba(255, 255, 255, 0.4);
							height: 10rpx;
							border-radius: 5rpx;

							&:nth-child(1) {
								width: 30rpx;
								top: 8rpx;
								left: 5rpx;
							}

							&:nth-child(2) {
								width: 20rpx;
								top: 22rpx;
								left: 10rpx;
							}

							&:nth-child(3) {
								width: 15rpx;
								top: 15rpx;
								right: 5rpx;
							}
						}
					}
				}
			}

			.card-shadow {
				position: absolute;
				bottom: -20rpx;
				left: 20rpx;
				right: 20rpx;
				height: 30rpx;
				background-color: rgba(0, 0, 0, 0.05);
				border-radius: 50%;
				filter: blur(10rpx);
				z-index: 1;
			}
		}

		/* 表单区域 */
		.form-section {
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx 30rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.03);

			.section-title {
				padding: 30rpx 0;
				position: relative;

				.title-text {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					position: relative;
					padding-left: 20rpx;

					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 6rpx;
						height: 30rpx;
						background-color: #2979ff;
						border-radius: 3rpx;
					}
				}

				.title-line {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					height: 2rpx;
					background: linear-gradient(90deg, #2979ff, rgba(41, 121, 255, 0.1));
				}
			}


			.placeholder {
				color: #c0c4cc !important;
				font-size: 30rpx !important;
			}
		}

		/* 操作区域 */
		.action-section {
			padding: 0 20rpx;

			.agreement {
				margin-top: 20rpx;

				.agreement-text {
					font-size: 26rpx;
					color: #666;
					margin-left: 10rpx;

					.highlight {
						color: #2979ff;
					}
				}
			}
		}

		/* 自定义uView组件样式 */
		::v-deep .u-input {
			padding: 10rpx 0 !important;
		}

	}
</style>