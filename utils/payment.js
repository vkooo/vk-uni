/**
 * 支付响应处理器
 * @param {Object} options 配置选项
 * @param {Object} options.res 支付接口响应数据
 * @param {Object} options.item 支付配置项
 * @param {VueInstance} options.vm Vue实例上下文
 * @param {Function} [options.onSuccess] 成功回调
 * @param {Function} [options.onFail] 失败回调
 * @param {Function} [options.onError] 异常回调
 */
export const handlePayment = ({
	res,
	item,
	vm,
	onSuccess = () => vm.$u.toast('支付成功'),
	onFail = () => vm.$u.toast('支付失败，请重试'),
	onError = (e) => {
		console.error('支付处理异常:', e);
		vm.$u.toast('支付处理异常');
	}
}) => {
	const {
		code,
		data
	} = res || {};

	if (code !== 200) {
		onFail(new Error('支付请求失败'));
		return;
	}
	try {
		if (item.env === 'h5') {
			handleH5Payment(data, onSuccess);
		} else {
			handleAppPayment({
				provider: item.provider,
				orderInfo: data,
				onSuccess,
				onFail
			});
		}
	} catch (error) {
		onError(error);
	}
};

/**
 * 处理H5支付
 * @param {string} html 支付表单HTML
 * @param {Function} callback 成功回调
 */
const handleH5Payment = (html, callback) => {
	const body = document.querySelector('body');
	body.innerHTML = html;
	const form = document.forms[0];
	if (form) form.submit();
	callback(); // H5支付表单提交后触发回调
};

/**
 * 处理APP支付
 * @param {Object} params 参数对象
 * @param {string} params.provider 支付提供商
 * @param {Object} params.orderInfo 订单信息
 * @param {Function} params.onSuccess 成功回调
 * @param {Function} params.onFail 失败回调
 */
const handleAppPayment = ({
	provider,
	orderInfo,
	onSuccess,
	onFail
}) => {
	uni.requestPayment({
		provider,
		orderInfo,
		success: onSuccess,
		fail: onFail
	});
};

// 使用示例
/*
handlePayment({
  res: apiResponse,
  item: { env: 'wx_mini', provider: 'wxpay' },
  vm: this,
  onSuccess: () => {
    this.$u.toast('自定义成功提示');
    this.$router.push('/order-success');
  },
  onFail: (err) => {
    console.log('支付失败:', err);
    this.$u.toast('支付被取消');
  },
  onError: (e) => {
    this.$u.toast('系统异常');
    trackError(e);
  }
});
*/