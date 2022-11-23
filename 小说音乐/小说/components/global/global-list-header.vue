<template>
	<view class="list-header">
		<view>
			<slot name="title"></slot>
		</view>
		<view>
			<slot>查看全部</slot>
			<text class="iconfont icon-iconfonti"></text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	
</script>

<style lang="scss" scoped>
.list-header{
	width: 90%;
	margin: 30rpx auto;
	display: flex;
    justify-content:space-between ;
	align-items: center;
	view{
		display: flex;
		align-items: center;
		&:nth-child(1){
			font-size: 35rpx
		}
		&:nth-child(2){
			font-size:25rpx;
			color:rgba(0, 0, 0, 0.5);	
			text{
				font-size: 30rpx;
				color:rgba(0, 0, 0, 0.5);
			}
		}
	}
}
</style>
