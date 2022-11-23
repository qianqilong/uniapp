<template>
	<view class="index-list-item" v-if="data">
		<view class="index-list-img">
			<image :src="data.coverImgUrl"></image>
			<text>每天更新</text>
		</view>
		<view class="index-list-text" v-if="tracks">
			<view v-for="(item,index) in tracks">{{index+1}}.{{item.name}} - {{item.ar[0].name}}</view>
		</view>
	</view>
</template>

<script>
	import {getTopDetailAPI} from '@/common/api.js'
	
	export default {
		name:"index-list-item",
		props:{
			data:{
				type:Object,
			}
		},
		data() {
			return {
				tracks:[]
			};
		},
		methods:{
			// 获取榜单的歌曲
			async getTopDetail(){	
			const data = await getTopDetailAPI(this.data.id)
			if(data.code===200){
			  this.tracks = data.playlist.tracks 
			  this.tracks.length=3
			}
		  }
		},
		mounted() {
          this.getTopDetail()
		}
	}
</script>

<style lang="scss" scoped>
.index-list-item{
	display: flex;
	margin-bottom: 34rpx;
	.index-list-img{
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
		image{
			width: 100%;
			height: 100%;
		}
		text{
			position: absolute;
			left:12rpx;
			bottom: 16rpx;
			font-size: 20rpx;
			color: white;
		}
	}
	.index-list-text{
		line-height: 66rpx;
		font-size: 24rpx;
		color:#424242;
		
	}
}
</style>