<template>
	<view class="diy-template-float">
		<movable-area class="diy-template-float-movable-area" :scale-area="false">
			<movable-view 
				class="diy-template-float-movable-view" 
				:class="!isRemove?'animation-info':''" 
				:style="{
					width: data.size + 'px',
					height: data.size + 'px',
					borderRadius: data.shape == 'round'? '50%': '5rpx',
					background: data.bgColor,
				}"
				@click="clickBtn" @touchstart="touchstart" @touchend="touchend" @change="onChange" direction="all"
				inertia="true" :x="x" :y="y" 
				:disabled="mode == 'preview'? true: disabled" 
				:out-of-bounds="true" :damping="200" :friction="100">
				<u-icon v-if="data.icon" :size="data.iconSize" :name="data.icon" />
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				},
			},
			mode: {
				type: String,
				default: 'preview'
			},
			//是否禁用拖动
			disabled: {
				type: Boolean,
				default: false
			},
			//是否自动停靠
			canDocking: {
				type: Boolean,
				default: true
			},
			bottomPx: {
				type: Number,
				default: 30
			},
			sidePx: {
				type: Number,
				default: 10
			},
		},
		data() {
			return {
				left: 0,
				top: 0,
				isRemove: true,
				windowWidth: 0,
				windowHeight: 0,
				btnWidth: 0,
				btnHeight: 0,
				x: 10000,
				y: 10000,
				old: {
					x: 0,
					y: 0
				}
			};
		},
		watch: {
			bottomPx: {
				handler(newVal, oldVal){
					if(newVal){
						this.$nextTick(res => {
							this.updatePosition()
						})
					}
				},
				deep: true,
				immediate: true,
			},
			sidePx: {
				handler(newVal, oldVal){
					if(newVal){
						this.$nextTick(res => {
							this.updatePosition()
						})
					}
				},
				deep: true,
				immediate: true,
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.getSysInfo();
			});
		},
		methods: {
			getSysInfo() {
				let sysInfo = uni.getSystemInfoSync()
				this.windowWidth = sysInfo.windowWidth
				this.windowHeight = sysInfo.windowHeight
				let view = uni.createSelectorQuery().in(this).select(".diy-template-float-movable-view")
				view.boundingClientRect(rect => {
					this.btnWidth = rect.width
					this.btnHeight = rect.height
					this.x = this.old.x
					this.y = this.old.y
					
					this.updatePosition();
				}).exec()
			},
			updatePosition() {
				if (!this.windowWidth || !this.windowHeight || !this.btnWidth || !this.btnHeight) return;
	
				this.$nextTick(() => {
					this.x = this.windowWidth - this.btnWidth - (this.sidePx || 0);
					this.y = this.windowHeight - this.btnHeight - (this.bottomPx || 0);
				});
			},

			//移动按钮
			onChange(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			//开始移动
			touchstart(e) {
				this.isRemove = true
			},
			//结束移动
			touchend(e) {
				if (this.canDocking && this.old.x) {
					this.x = this.old.x
					this.y = this.old.y
					let bWidth = (this.windowWidth - this.btnWidth) / 2
					if (this.x < 0 || (this.x > 0 && this.x <= bWidth)) {
						this.$nextTick(res => {
							this.x = 0 + this.sidePx
						})
					} else {
						this.$nextTick(res => {
							this.x = this.windowWidth - this.btnWidth - this.sidePx
						})
					}
					this.isRemove = false
				}
			},
			//点击按钮
			clickBtn() {
				this.$emit('clickBtn')
			}
		}
	};
</script>

<style scoped lang="scss">
	.diy-template-float{
		.diy-template-float-movable-area {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 999999 !important;
			pointer-events: none;
			.diy-template-float-movable-view {
				box-shadow: 0px 1rpx 6rpx 0px #333333;
				color: #FFFFFF;
				font-size: 26rpx;
				touch-action: none;
				display: flex;
				align-items: center;
				justify-content: center;
				pointer-events: auto;
				overflow: hidden;
				&.animation-info {
					transition: left .25s ease;
				}
			}
		}
	}
	
</style>
