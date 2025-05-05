<template>
  <view class="customer-service-container">
    <!-- 顶部导航 -->
    <u-navbar
      title="在线客服"
      :autoBack="true"
      bgColor="#ffffff"
      titleColor="#333"
    ></u-navbar>

    <!-- 聊天内容区域 -->
    <scroll-view
      scroll-y
      :scroll-top="scrollTop"
      scroll-with-animation
      class="chat-container"
      @scroll="handleScroll"
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
          <!-- 客服消息 -->
          <view v-if="item.type === 'service'" class="message-box service">
            <image
              class="avatar"
              src="/static/images/service-avatar.png"
              mode="aspectFill"
            ></image>
            <view class="content">
              <view class="text" v-if="item.contentType === 'text'">{{ item.content }}</view>
              <view class="image" v-if="item.contentType === 'image'">
                <image
                  :src="item.content"
                  mode="widthFix"
                  @click="previewImage(item.content)"
                ></image>
              </view>
              <view class="time">{{ item.time }}</view>
            </view>
          </view>

          <!-- 用户消息 -->
          <view v-if="item.type === 'user'" class="message-box user">
            <view class="content">
              <view class="text" v-if="item.contentType === 'text'">{{ item.content }}</view>
              <view class="image" v-if="item.contentType === 'image'">
                <image
                  :src="item.content"
                  mode="widthFix"
                  @click="previewImage(item.content)"
                ></image>
              </view>
              <view class="time">{{ item.time }}</view>
            </view>
            <image
              class="avatar"
              :src="userInfo.avatar || '/static/images/default-avatar.png'"
              mode="aspectFill"
            ></image>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入区域 -->
    <view class="input-area">
      <view class="input-box">
        <u-input
          v-model="inputMessage"
          placeholder="请输入您的问题..."
          border="none"
          confirmType="send"
          @confirm="sendMessage"
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
    <view class="safe-area-bottom"></view>
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
      showDateTip: true
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
  methods: {
    // 发送消息
    sendMessage() {
      if (!this.canSend) return
      
      if (this.inputMessage.trim()) {
        this.sendTextMessage()
      }
    },
    
    // 发送文字消息
    sendTextMessage() {
      const msg = this.inputMessage.trim()
      const newMsg = {
        type: 'user',
        contentType: 'text',
        content: msg,
        time: this.formatTime(new Date()),
        date: this.formatDate(new Date())
      }
      
      this.addMessage(newMsg)
      this.inputMessage = ''
      
      // 模拟客服回复
      setTimeout(() => {
        this.addMessage({
          type: 'service',
          contentType: 'text',
          content: '我们已经收到您的消息，将尽快回复您',
          time: this.formatTime(new Date()),
          date: this.formatDate(new Date())
        })
      }, 1000)
    },
    
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths
          this.sendImageMessage(tempFilePaths[0])
        }
      })
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
      
      // 模拟客服回复
      setTimeout(() => {
        this.addMessage({
          type: 'service',
          contentType: 'text',
          content: '图片已收到',
          time: this.formatTime(new Date()),
          date: this.formatDate(new Date())
        })
      }, 1000)
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
    
    // 滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        this.scrollTop = this.oldScrollTop + 1
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
  background-color: #f5f5f5;
}

.chat-container {
  flex: 1;
  padding: 20rpx;
  box-sizing: border-box;
  overflow: hidden;
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
    background-color: #e0e0e0;
    border-radius: 20rpx;
    color: #999;
    font-size: 24rpx;
  }
}

.message-item {
  margin-bottom: 30rpx;
}

.message-box {
  display: flex;
  max-width: 80%;
  
  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .content {
    margin: 0 20rpx;
    max-width: calc(100% - 120rpx);
    
    .text {
      padding: 16rpx 24rpx;
      border-radius: 12rpx;
      font-size: 28rpx;
      line-height: 1.5;
      word-break: break-word;
      position: relative;
    }
    
    .image {
      border-radius: 8rpx;
      overflow: hidden;
      
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
      background-color: #2979ff;
      color: #fff;
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
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  
  .input-box {
    flex: 1;
    background-color: #f5f5f5;
    border-radius: 40rpx;
    padding: 0 20rpx;
    margin-right: 20rpx;
  }
  
  .action-btns {
    display: flex;
    align-items: center;
    
    .u-icon {
      margin-right: 20rpx;
    }
  }
}

.safe-area-bottom {
  height: env(safe-area-inset-bottom);
  background-color: #fff;
}
</style>