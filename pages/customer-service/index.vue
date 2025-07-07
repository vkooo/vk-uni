<template>
	<view class="customer-service-container">
		<!-- 顶部导航 -->
		<u-navbar title="在线客服" :autoBack="true" bgColor="#ffffff" titleColor="#333" :placeholder="true" />
		
		<!-- {{scrollTop}} -->
		
		<!-- 聊天内容区域 -->
		 <!-- @scrolltoupper="loadPrevPage" -->
		<scroll-view scroll-y :scroll-top="scrollTop" scroll-with-animation class="chat-container"
			@scroll="handleScroll" :enhanced="true" :show-scrollbar="false"
			:refresher-enabled="true" :refresher-triggered="refreshing" @refresherrefresh="onRefresh"
			:scroll-into-view="autoScrollId">
			<view class="chat-list">
				<!-- 加载更多提示 -->
				<view class="load-more-tip" v-if="loading">
					<u-loadmore status="loading" />
				</view>

				<!-- 系统消息 -->
				<view class="system-message" v-if="showDateTip">
					<text>{{ todayDate }}</text>
				</view>

				<!-- 消息列表 -->
				<view v-for="(item, index) in messageList" :id="'msg-' + index" :key="index"
					:class="['message-item', item.sender_type == 1? 'user': 'service']">
					<view :class="['message-box', item.sender_type == 1? 'user': 'service']">
						<image v-if="item.sender_type === 2" class="avatar"
							:src="item.avatar || '/static/images/service-avatar.png'" mode="aspectFill"></image>
						<view class="content">
							<view class="text" v-if="item.content_type === 1">{{ item.content }}</view>
							<view class="image" v-if="item.content_type === 2">
								<image :src="item.content" mode="widthFix" @click="$utils.previewImg([item.content])">
								</image>
							</view>
							<view class="time">{{ formatTime(new Date(item.created_at)) }}</view>
						</view>
						<image v-if="item.sender_type === 1" class="avatar"
							:src="info.avatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部输入区域（固定定位） -->
		<view class="input-area">
			<view class="input-box">
				<u-input v-model="inputMessage" placeholder="请输入您的问题..." border="none" confirmType="send"
					@confirm="sendMessage" :adjustPosition="false"></u-input>
			</view>
			<view class="action-btns">
				<u-icon name="photo" size="24" color="#666" @click="chooseImage"></u-icon>
				<u-button type="primary" size="mini" :disabled="!canSend" @click="sendMessage">发送</u-button>
			</view>
		</view>

		<!-- 底部安全区域 -->
		<view class="safe-area-bottom" />
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				inputMessage: '',
				scrollTop: 0,
				oldScrollTop: 0,
				showDateTip: true,
				loading: false,
				refreshing: false,
				firstLoaded: false,
				autoScrollId: ""
			}
		},
		computed: {
			...mapGetters("kefu", ['messageList', "hasMore", "scrollToBottomUUID"]),
			...mapState('member', ["info", "hasLogin"]),
			todayDate() {
				return this.formatDate(new Date(), true)
			},
			canSend() {
				return this.inputMessage.trim()
			}
		},
		watch: {
			scrollToBottomUUID: {
				handler(newVal, oldVal) {
					this.$nextTick(() => {
						this.scrollToBottom()
					})
				},
				immediate: true,
				deep: true,
			}
		},
		onLoad() {
			this.initChat()
		},
		onUnload() {
			// #ifdef APP-PLUS || MP-WEIXIN
			uni.offKeyboardHeightChange()
			// #endif
		},
		methods: {
			async initChat() {
				try {
					// 初始化获取聊天记录
					await this.$store.dispatch("kefu/init")
					await this.$store.dispatch("kefu/loadMore")
					this.scrollToBottom();
					// 标记首次加载完成
					this.firstLoaded = true

					// 设置监听（根据需要）
					// #ifdef APP-PLUS || MP-WEIXIN
					uni.onKeyboardHeightChange(() => {
						setTimeout(() => {
							this.scrollToBottom()
						}, 300)
					})
					// #endif

					// 4. 确保DOM更新后滚动到底部
					this.$nextTick(() => {
						this.scrollToBottom()
					})
				} catch (error) {
					console.error("初始化聊天失败:", error)
					uni.showToast({
						title: '初始化失败',
						icon: 'none'
					})
				}
			},

			// 下拉刷新
			onRefresh() {
				if (this.loading) return
				this.refreshing = true
				// this.loadPrevPage()
			},

			// 加载历史消息
			async loadPrevPage() {
				if (this.loading || !this.hasMore) {
					this.refreshing = false
					return
				}

				this.loading = true
				try {
					this.scrollTop = 0
					const autoScrollId = this.autoScrollId;
					const prevScrollHeight = await this.getScrollHeight(); // 记录当前滚动高度
					await this.$store.dispatch('kefu/loadMore')
					const newScrollHeight = await this.getScrollHeight();
					// console.log(prevScrollHeight, newScrollHeight, newScrollHeight - prevScrollHeight)
					this.scrollTop = newScrollHeight - prevScrollHeight;
					this.$forceUpdate()
				} finally {
					this.loading = false
					this.refreshing = false
				}
			},
			
			getScrollHeight() {
				const query = uni.createSelectorQuery().in(this);
				return new Promise(resolve => {
					query.select('.chat-list').boundingClientRect(res => {
						resolve(res.height);
					}).exec();
				});
			},
			
			// 选择图片
			chooseImage() {
				let that = this
				this.$upload.uploadImage({}, function(res) {
					let url = res.full_url
					that.sendImageMessage(url)
				})
			},

			// 发送图片消息
			sendImageMessage(imagePath) {
				const newMsg = {
					sender_type: 1,
					content_type: 2,
					content: imagePath,
					created_at: new Date(),
				}
				this.addMessage(newMsg)
			},

			// 滚动到底部（优化版）
			scrollToBottom() {
				if (this.messageList.length === 0) return

				this.autoScrollId = 'msg-' + (this.messageList.length - 1);

				// 方法2：备用方案 - 直接设置 scrollTop
				this.$nextTick(() => {
					setTimeout(() => {
						// 确保DOM更新完成
						const query = uni.createSelectorQuery().in(this);
						query.select('.chat-container').scrollOffset();
						query.select('.chat-list').boundingClientRect();
						query.exec(res => {
							if (res[0] && res[1]) {
								// 计算需要滚动的高度
								const scrollHeight = res[1].height - res[0].height;
								if (scrollHeight > 0) {
									this.scrollTop = scrollHeight + 50; // 加50确保滚动到底部
								}
							}
						});
					}, 100); // 适当延迟确保DOM更新
				});

			},

			// 发送消息
			sendMessage() {
				if (!this.canSend) return

				const newMsg = {
					sender_type: 1,
					content_type: 1,
					content: this.inputMessage.trim(),
					created_at: new Date(),
				}

				this.addMessage(newMsg)
				this.inputMessage = ''
			},

			// 添加消息到列表
			async addMessage(message) {
				if (this.messageList.length > 0) {
					const lastMsg = this.messageList[this.messageList.length - 1]
					this.showDateTip = this.formatDate(new Date(message.created_at)) !== this.formatDate(new Date(lastMsg
						.created_at))
				}
				await this.$store.dispatch("kefu/sendMsg", message)
				this.scrollToBottom();
			},

			// 处理滚动事件
			handleScroll(e) {
				this.oldScrollTop = e.detail.scrollTop
				
				// 检测是否接近顶部
				if (this.oldScrollTop < 50 && !this.loading && this.hasMore) {
				    this.loadPrevPage();
				}
			},

			// 格式化时间 (HH:MM)
			formatTime(date) {
				const hours = date.getHours().toString().padStart(2, '0')
				const minutes = date.getMinutes().toString().padStart(2, '0')
				return `${hours}:${minutes}`
			},

			// 格式化日期 (YYYY-MM-DD)
			formatDate(date, showToday = false) {
				const year = date.getFullYear()
				const month = (date.getMonth() + 1).toString().padStart(2, '0')
				const day = date.getDate().toString().padStart(2, '0')

				if (showToday) {
					const today = new Date()
					if (date.toDateString() === today.toDateString()) {
						return '今天'
					}
				}

				return `${year}-${month}-${day}`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.customer-service-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #ededed;
		position: relative;
		// #ifdef H5
		height: calc(100vh - var(--window-top));
		// #endif
	}

	.chat-container {
		flex: 1;
		box-sizing: border-box;
		padding: 10rpx 20rpx 110rpx;
		background-color: #ededed;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	.chat-list {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 20rpx;
	}

	.load-more-tip {
		padding: 20rpx 0;
		display: flex;
		justify-content: center;
	}

	.system-message {
		text-align: center;
		margin: 30rpx 0;

		text {
			display: inline-block;
			padding: 6rpx 20rpx;
			background-color: #d8d8d8;
			border-radius: 20rpx;
			color: #999;
			font-size: 24rpx;
		}
	}

	.message-item {
		margin-bottom: 20rpx;
	}

	.message-box {
		display: flex;
		max-width: 80%;
		position: relative;

		.avatar {
			width: 88rpx;
			height: 88rpx;
			border-radius: 8rpx;
			flex-shrink: 0;
			border: 2rpx solid #e6e6e6;
		}

		.content {
			margin: 0 20rpx;
			max-width: calc(100% - 128rpx);

			.text {
				padding: 16rpx 24rpx;
				border-radius: 8rpx;
				font-size: 30rpx;
				line-height: 1.5;
				word-break: break-word;
				position: relative;
				box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
			}

			.text::after {
				content: '';
				position: absolute;
				top: 12rpx;
				width: 0;
				height: 0;
				border: 12rpx solid transparent;
			}

			.image {
				border-radius: 8rpx;
				overflow: hidden;
				box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);

				image {
					max-width: 300rpx;
					max-height: 300rpx;
					display: block;
				}
			}

			.time {
				margin-top: 8rpx;
				font-size: 22rpx;
				color: #999;
			}
		}
	}

	.message-box.service {
		.content {
			.text {
				background-color: #fff;
				color: #333;
				border-top-left-radius: 0;

				&::after {
					left: -24rpx;
					border-right-color: #fff;
				}
			}

			.time {
				text-align: left;
				padding-left: 10rpx;
			}
		}
	}

	.message-box.user {
		flex-direction: row;
		margin-left: auto;
		justify-content: flex-end;

		.content {
			.text {
				background-color: #95ec69;
				color: #333;
				border-top-right-radius: 0;

				&::after {
					right: -24rpx;
					border-left-color: #95ec69;
				}
			}

			.time {
				text-align: right;
				padding-right: 10rpx;
			}
		}
	}

	.input-area {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		padding: 12rpx 20rpx;
		padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
		background-color: #f7f7f7;
		border-top: 1rpx solid #e6e6e6;
		z-index: 100;

		.input-box {
			flex: 1;
			background-color: #fff;
			border-radius: 8rpx;
			padding: 12rpx 20rpx;
			margin-right: 20rpx;
			box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
		}

		.action-btns {
			display: flex;
			align-items: center;

			.u-icon {
				margin-right: 20rpx;
				transition: transform 0.2s;

				&:active {
					transform: scale(0.9);
				}
			}

			.u-button {
				background-color: #07c160;
				border: none;
				border-radius: 8rpx;
				padding: 0 24rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 26rpx;

				&[disabled] {
					background-color: #9ee2b8;
				}
			}
		}
	}

	.safe-area-bottom {
		height: env(safe-area-inset-bottom);
		background-color: #f7f7f7;
	}
</style>