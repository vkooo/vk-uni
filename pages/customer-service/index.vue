<template>
  <view class="customer-service-container">
    <!-- 顶部导航 -->
    <u-navbar
      title="在线客服"
      :autoBack="true"
      bgColor="#ffffff"
      titleColor="#333"
	  :placeholder="true"
    ></u-navbar>

    <!-- 聊天内容区域 -->
    <scroll-view
      scroll-y
      :scroll-top="scrollTop"
      scroll-with-animation
      class="chat-container"
      @scroll="handleScroll"
      :enhanced="true"
      :show-scrollbar="false"
      :bounces="false"
    >
      <view class="chat-list">
        <!-- 系统消息 -->
        <view class="system-message" v-if="showDateTip">
          <text>{{ todayDate }}</text>
        </view>
        
        <!-- 消息列表 -->
        <view
          v-for="(item, index) in messageList"
          :key="index"
          :class="['message-item', item.type]"
        >
          <view :class="['message-box', item.type]">
            <image
              v-if="item.type === 'service'"
              class="avatar"
              :src="item.avatar || '/static/images/service-avatar.png'"
              mode="aspectFill"
              @error="handleImageError"
            ></image>
            <view class="content">
              <view class="text" v-if="item.contentType === 'text'">{{ item.content }}</view>
              <view class="image" v-if="item.contentType === 'image'">
                <image
                  :src="item.content"
                  mode="widthFix"
                  @click="previewImage(item.content)"
                  @error="handleImageError"
                ></image>
              </view>
              <view class="time">{{ item.time }}</view>
            </view>
            <image
              v-if="item.type === 'user'"
              class="avatar"
              :src="userInfo.avatar || '/static/images/default-avatar.png'"
              mode="aspectFill"
              @error="handleImageError"
            ></image>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入区域 -->
    <view class="input-area" :style="{ paddingBottom: keyboardHeight + 'px' }">
      <view class="input-box">
        <u-input
          v-model="inputMessage"
          placeholder="请输入您的问题..."
          border="none"
          confirmType="send"
          @confirm="sendMessage"
          :adjustPosition="false"
        ></u-input>
      </view>
      <view class="action-btns">
        <u-icon
          name="photo"
          size="24"
          color="#666"
          @click="chooseImage"
        ></u-icon>
        <u-button
          type="primary"
          size="mini"
          :disabled="!canSend"
          @click="sendMessage"
        >发送</u-button>
      </view>
    </view>
    
    <!-- 底部安全区域 -->
    <view class="safe-area-bottom" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputMessage: '',
      messageList: [
        {
          type: 'service',
          contentType: 'text',
          content: '您好，请问有什么可以帮您？',
          time: this.formatTime(new Date()),
          date: this.formatDate(new Date())
        }
      ],
      userInfo: {
        avatar: '',
        nickname: '用户'
      },
      scrollTop: 0,
      oldScrollTop: 0,
      showDateTip: true,
      keyboardHeight: 5,
    }
  },
  computed: {
    todayDate() {
      return this.formatDate(new Date(), true)
    },
    canSend() {
      return this.inputMessage.trim() || this.tempImage
    }
  },
  onLoad() {
    // #ifdef APP-PLUS || MP-WEIXIN
    // 监听键盘高度变化
    uni.onKeyboardHeightChange((res) => {
      this.keyboardHeight = res.height
      this.scrollToBottom()
    })
    // #endif
  },
  onUnload() {
    // #ifdef APP-PLUS || MP-WEIXIN
    // 移除键盘监听
    uni.offKeyboardHeightChange()
    // #endif
  },
  methods: {
    // 处理图片加载错误
    handleImageError(e) {
      console.error('图片加载失败', e)
    },
    
    // 选择图片
    chooseImage() {
      // #ifdef APP-PLUS
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.sendImageMessage(res.tempFilePaths[0])
        }
      })
      // #endif
      
      // #ifdef MP-WEIXIN
      uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.sendImageMessage(res.tempFiles[0].tempFilePath)
        }
      })
      // #endif
    },
    
    // 发送图片消息
    sendImageMessage(imagePath) {
      const newMsg = {
        type: 'user',
        contentType: 'image',
        content: imagePath,
        time: this.formatTime(new Date()),
        date: this.formatDate(new Date())
      }
      
      this.addMessage(newMsg)
      this.addMessage({
        type: 'service',
        contentType: 'text',
        content: '图片已收到',
        time: this.formatTime(new Date()),
        date: this.formatDate(new Date())
      })
    },
    
    // 滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this)
        query.select('.chat-container').boundingClientRect()
        query.select('.chat-list').boundingClientRect()
        query.exec((res) => {
          if (res[0] && res[1]) {
            const containerHeight = res[0].height
            const listHeight = res[1].height
            this.scrollTop = listHeight - containerHeight
          }
        })
      })
    },
    
    // 发送消息
    sendMessage() {
      if (!this.canSend) return
      
      if (this.inputMessage.trim()) {
        const newMsg = {
          type: 'user',
          contentType: 'text',
          content: this.inputMessage.trim(),
          time: this.formatTime(new Date()),
          date: this.formatDate(new Date())
        }
        
        this.addMessage(newMsg)
        this.inputMessage = ''
        
        this.addMessage({
          type: 'service',
          contentType: 'text',
          content: '我们已经收到您的消息，将尽快回复您',
          time: this.formatTime(new Date()),
          date: this.formatDate(new Date())
        })
      }
    },
    
    // 添加消息到列表
    addMessage(message) {
      // 检查是否需要显示日期分隔
      if (this.messageList.length > 0) {
        const lastMsg = this.messageList[this.messageList.length - 1]
        this.showDateTip = message.date !== lastMsg.date
      }
      
      this.messageList.push(message)
      this.scrollToBottom()
    },
    
    // 预览图片
    previewImage(url) {
      uni.previewImage({
        urls: [url],
        current: 0
      })
    },
    
    // 处理滚动事件
    handleScroll(e) {
      this.oldScrollTop = e.detail.scrollTop
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
  // #ifdef H5
  height: calc(100vh - var(--window-top));
  // #endif
}

.chat-container {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ededed;
  padding: 10rpx 20rpx 0;
}

.chat-list {
  min-height: 100%;
  display: flex;
  flex-direction: column;
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
    }
    
    .time {
      text-align: left;
      padding-left: 10rpx;
    }
  }
}

.message-box.user {
  flex-direction: row-reverse;
  margin-left: auto;
  
  .content {
    .text {
      background-color: #95ec69;
      color: #333;
      border-top-right-radius: 0;
    }
    
    .time {
      text-align: right;
      padding-right: 10rpx;
    }
  }
}

.input-area {
  display: flex;
  align-items: center;
  padding: 12rpx 20rpx;
  background-color: #f7f7f7;
  border-top: 1rpx solid #e6e6e6;
  // #ifdef H5
  position: sticky;
  bottom: 0;
  z-index: 100;
  // #endif
  
  .input-box {
    flex: 1;
    background-color: #fff;
    border-radius: 8rpx;
    padding: 12rpx 20rpx;
    margin-right: 20rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
    
    .u-input {
      font-size: 28rpx;
    }
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