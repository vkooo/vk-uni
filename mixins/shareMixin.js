import {
	mapState
} from "vuex"
export default {
	computed: {
		...mapState('member', ["info", "hasLogin"]),
		finalSharePath() {
			const basePath = this.pageShareConfig?.path || this.shareConfig.path;
			if (!this.hasLogin || !this.info?.id) return basePath; // 未登录或不含 id 时返回原路径

			// 拼接 id 参数（自动处理 ? 和 &）
			const separator = basePath.includes('?') ? '&' : '?';
			return `${basePath}${separator}ii=${this.info.id}`;
		}
	},
	data() {
		return {
			shareConfig: {
				title: '默认分享标题',
				path: '/pages/tabBar/index',
				imageUrl: '/static/share-default.png',
			},
		}
	},
	onLoad() {
		if (this.pageShareConfig) {
			this.shareConfig = {
				...this.shareConfig,
				...this.pageShareConfig
			};
		}
	},
	// 发送给朋友
	onShareAppMessage(res) {
		return {
			...this.shareConfig,
			path: this.finalSharePath, // 使用计算属性动态生成的路径
		};
	},
	//分享到朋友圈
	onShareTimeline(res) {
		return {
			...this.shareConfig,
			path: this.finalSharePath, // 使用计算属性动态生成的路径
		};
	}
}