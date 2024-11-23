<template>
	<view class="content">
		<u-navbar
			title="个人中心"
			:autoBack="true"
			:immersive="true"
		>
		</u-navbar>
		<u-gap height="88"></u-gap>
		<scroll-view class="chat container-list" scroll-y="true" scroll-with-animation="true" :scroll-with-animation="true" :scroll-top="scrollTop" :scroll-into-view="scrollToViewID">
			<view class="chat-main" id="chat-box">
				<view class="chat-ls" v-for="(item,index) in msg" :key="index" :id="'msg'+ index">
					<view class="chat-time" v-if="item.createTime != ''"></view>
					<view class="msg-m msg-left" v-if="item.sendName ==  friendName">
						<image class="user-img b-r-10" src="/static/logo.png"></image>
						<view class="message" v-if="item.type == 1">
							<!-- 文字 -->
							<view class="msg-text">{{item.sendText}}</view>
						</view>
						<view class="message" v-if="item.type == 2" >
							<!-- 图像 -->
							<image :src="item.sendText" class="msg-img b-r-10" mode="widthFix"></image>
						</view>

					</view>
					<view class="msg-m msg-right" v-if="item.sendName != friendName">
						<image class="user-img" src="/static/logo.png"></image>
						<view class="message" v-if="item.type == 1">
							<view class="msg-text">{{item.sendText}}</view>
						</view>
						<view class="message" v-if="item.type == 2" >
							<image :src="item.sendText" class="msg-img b-r-10" mode="widthFix"></image>
						</view>

					</view>
				</view>
			</view>
		</scroll-view>

		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img" @tap="records">
					<image src="/static/imgs/chat/image.png"></image>
				</view>
				<!-- 文本框 -->
				<textarea auto-height="true" class="chat-send btn b-r-5" v-model="value"></textarea>
				<view class="bt-img" @tap="emoji">
					<image src="/static/imgs/chat/emoji.png"></image>
				</view>
				<view class="bt-img" @tap="send">
					<image src="/static/imgs/chat//send.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				friendName: "xpq",
				msg: [{
						"sendName": "゛时光い",
						"receviceName": "xpq",
						"sendText": "这是第九条未读消息",
						"createTime": "2022-01-03 12:22:12",
						"updateTime": null,
						"chatmState": 1,
						type: 1
					},
					{
						"sendName": "xpq",
						"receviceName": "xpq",
						"sendText": "这是第七条未读消息",
						"createTime": "2021-12-19 12:22:03",
						"updateTime": null,
						"chatmState": 1,
						"type": 1
					},
				],
				scrollToViewID: '',
				scrollTop: 0,
				value: ""
			}
		},
		mounted() {
			this.safariHacks();
		},
		methods: {

			safariHacks() {
				let convertStyle = function(){
						setTimeout(function(){
							let bottomHeight = document.querySelector(".submit").offsetHeight + "px"
							, navHeight = document.querySelector(".u-navbar-inner").offsetHeight + "px"
							, windowsVH = window.innerHeight + "px";
							document.querySelector('.container-list').style.setProperty("height", "calc("+ windowsVH + " - " + navHeight + " - " + bottomHeight + ")", "important");
						},1000)
				} 
				window.addEventListener('resize', function() {
					convertStyle()
				});
				convertStyle()
			},
			scrollToView(){
				let that = this
				uni.createSelectorQuery().select('#chat-box').boundingClientRect(function(rect) {
					that.scrollTop = rect.height
				}).exec()
			},
			send(){
				let that = this, value = this.value
			
				if(value == "" || value == null || value == undefined) return;
				
				value = value.replace(/\+/g, '{[$add$]}')
				let data = {
					sendName: "゛时光い",
					receviceName: "xpq",
					sendText: value,
					type: 1
				};
				that.sendPush(data)
				that.value = ""
			},
			sendPush(data) {
				let that = this
				data.createtime_text = this.$utils.formatTime()
				that.msg.push(data);
				setTimeout(function(){
					that.scrollToView()
				},100)
			},
			chooseImage(){
				const _this = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], 
					sizeType: ['original'],
					success(res) {
						let path = res.tempFilePaths[0]
						uni.uploadFile({
							url: env.uploadUrl,
							filePath: path,
							name: "file",
							fileType: 'image',
							success: function(res) {
								let data = JSON.parse(res.data);
								_this.sendPush( {
									sendText: value,
									type: 1
								})
							},
							fail: function(err) {
								let res = JSON.parse(err)
								console.log(res)
							}
						});
					},
					fail() {
						console.log('失败', err);
					},
					complete() {
						console.log('结束');
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.content {
		height: 100%;
		background-color: rgba(244, 244, 244, 1);
	}

	.chat {
		height: 100%;

		.chat-main {
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 20rpx;
			// padding-bottom: 120rpx;  //获取动态高度
			display: flex;
			flex-direction: column;
		}

		.chat-ls {
			.chat-time {
				font-size: 24rpx;
				color: rgba(39, 40, 50, 0.3);
				line-height: 34rpx;
				padding: 10rpx 0rpx;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 20rpx 0;

				.user-img {
					flex: none;
					width: 80rpx;
					height: 80rpx;
				}

				.message {
					flex: none;
					max-width: 480rpx;
				}

				.msg-text {
					font-size: 32rpx;
					color: rgba(39, 40, 50, 1);
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}

				.msg-img {
					max-width: 400rpx;
					margin-right: 8px;
				}


			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}

				.msg-img {
					margin-left: 8px !important;
				}

			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: rgba(255, 228, 49, 0.8);
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}
			}
		}
	}

	.submit {
		background: rgba(244, 244, 244, 0.96);
		border-top: 1px solid rgba(39, 40, 50, 0.1);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		// padding-bottom: var(--status-bar-height);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}

		.btn {
			flex: auto;
			background-color: #fff;
			padding: 20rpx;
			margin: 0 10rpx;
		}

		.chat-send {
			line-height: 44rpx;
		}

		.record {
			line-height: 44rpx;
			text-align: center;
			font-size: 20rpx;
			color: rgba(39, 40, 50, 0.6);
		}
	}
</style>