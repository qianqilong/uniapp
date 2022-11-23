<template>
		<view class="list-music-item">
			<view class="list-music-top">{{index+1}}</view>
			<view class="list-music-song">
				<view>
					{{music.name}}
				</view>
				<view>
					<image src="../../static/dujia.png" mode=""></image>
					<image src="../../static/sq.png" mode=""></image>
					{{music.ar[0].name}} - {{music.name}}
				</view>
			</view>
			<text class="iconfont iconbofang"></text>
		</view>
</template>

<script>
	export default {
		props:{
			music:{
				type:Object,
				default:{}
			},
				
			index:{
				type:Number,
				default:1
			}
		},
		name:"music-item",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.list-music-item{
	display: flex;
	margin: 60rpx  32rpx 60rpx 46rpx;
	align-items: center;
	.list-music-top{
		width: 58rpx;
		color:#d1d1d1;
	}
	.list-music-song{
		flex:1;
		view {
			&:nth-child(1){
					line-height: 42rpx;
				    font-size: 28rpx;
					width: 70vw; 
					white-space: nowrap;// 不换行
					overflow: hidden; 
					text-overflow: ellipsis;// 加上。。。
			}
			&:nth-child(2){
				display: flex;
				align-items: center;
				font-size: 20rpx;
				color:#a0a0a0;
				width: 70vw; 
				white-space: nowrap;// 不换行
				overflow: hidden; 
				text-overflow: ellipsis;// 加上。。。
				image{
					flex-shrink: 0; // 不让flexb布局给其拉伸
					margin-right: 8rpx;
					width: 32rpx;
					height: 20rpx;
				}
			}
		}
	}
	text{
		font-size: 52rpx;
		color:#c5c5c5
	}
}
</style>