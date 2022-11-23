<template>
	<view class="index">
		<global-icon iconId="icon-tubiao11" :iconSize="34" />
		<input type="text" placeholder="书名/作者/关键字" class="index-input"/>
	</view>
</template>

<script lang="ts" setup>
	
</script>

<style lang="scss" scoped>
.index{
	display: flex;
	align-items: center;
	justify-content: center; 
	margin:  20rpx 46rpx;
	height: 73rpx;
	line-height: 73rpx;
	padding: 0 22rpx;
	border-radius: 50rpx;
	background-color: #f2f2f2;
	.index-input{
		margin-left: 20rpx;
		flex: 1;
	    font-size: 34rpx; 
		color:#a3a3a3;
	}
}
</style>