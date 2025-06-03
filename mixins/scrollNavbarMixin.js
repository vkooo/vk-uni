export default {
	data() {
		return {
			navBgColor: 'transparent',
		};
	},
	methods: {
		handleScrollNavbar(scrollTop, threshold = 30, color = 'rgba(56, 115, 245, 0.95)') {
			this.navBgColor = scrollTop > threshold ? color : 'transparent';
		},
	},
	onPageScroll(e) {
		this.handleScrollNavbar(e.scrollTop);
	},
};