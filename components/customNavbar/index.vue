<template>
	<view>
		<u-navbar :title="title" @rightClick="rightClick" :fixed="isFixed" :autoBack="true" />
		<u-gap height="44"></u-gap>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			},
			isFixed: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				background: {
					background: "#ffffff",
					color: "#000000"
				}
			}
		},
		methods: {
			rightClick() {
				console.log('rightClick');
			},
			leftClick() {
				console.log('leftClick');
			}
		}
	}
</script>