<template>
	<view>
		<u-upload
		    :fileList="fileList"
		    @afterRead="afterRead"
		    @delete="deletePic"
		    :multiple="multiple"
		    :maxCount="maxCount"
		></u-upload>
	</view>
</template>

<script>
	export default {
		name:"vk-upload",
		props: {
			// 是否多文件上传
			multiple: {
				type: Boolean,
				default: false,
			},
			// 最大上传文件
			maxCount: {
				type: Number,
				default: 1,
			},
		},
		data() {
			return {
				fileList: [],
			};
		},
		methods: {
			setFiles(lists = []){
				if(!Array.isArray(lists)){
					lists = [lists]
				}
				const arr = []
				lists.map((item) => {
					arr.push({
						url: item
					})
				});
				this.fileList = arr
			},
		    // 删除图片
		    deletePic(event) {
				this.fileList.splice(event.index, 1);
		    },
			// 新增图片
			async afterRead(event) {
				const that = this
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				let fileListLen = that.fileList.length;
				lists.map((item) => {
					that.fileList.push({
						...item,
						status: "uploading",
						message: "上传中",
					});
				});
				for (let i = 0; i < lists.length; i++) {
					const result = await that.$upload.uploadApi(lists[i].url)
					const data = JSON.parse(result.data)
					if(data.code == 200){
						let item = that.fileList[fileListLen];
						that.fileList.splice(
							fileListLen,
							1,
							Object.assign(item, {
								status: "success",
								message: "",
								url: data.data.full_url,
							})
						);
						fileListLen++;
					}
				    
				}
				let urls = []
				that.fileList.forEach((item)=>{
					urls.push(item.url)
				})
				this.$emit("updated", urls)
			}
		}
	}
</script>

<style>

</style>