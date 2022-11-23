<template>
	<view style="height: 70rpx;">
		 <view :style="{height:statusHeight+'px',paddingTop:'20rpx'}"></view>
		 <view class="page-title"  @tap="quit">
		 	<global-icon iconId="icon-jiantou-copy" :iconSize="30" />
			<view>
				<slot>返回</slot>
			</view>
		 </view>
	</view>
</template>

<script lang="ts" setup>
import {getCurrentInstance} from 'vue'

const instance = getCurrentInstance() 
// 状态栏的高度(不同场景)
const statusHeight=instance?.proxy?.$height
// 
const quit=()=>{
	uni.navigateBack({
		delta:1
	})
}
</script>

<style lang="scss" scoped>
.page-title{
	display: flex;
	align-items: center;
	margin-left: 20rpx;
	// padding: 0 20rpx 20rpx 20rpx;
	view{
		font-size: 28rpx;
		margin-left: 20rpx;
	}
}
</style>
