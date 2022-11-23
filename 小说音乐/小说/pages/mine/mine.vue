<template>
	<view>
		<view :style="{height:`${height}px`}"></view>
		<view class="user-header">
		    <view>
				<image src="../../static/user/user.jpg" mode="aspectFill"></image>
				<text>买啥</text>
			</view>
		    <view>
			  <text>
				  <global-icon iconId="icon-erji" :iconSize="30"/>
				  <text>我的客服</text>
			  </text>		
			</view>	
		</view>
		
		<template v-for="(item,index) in ['签到','设置','意见反馈','切换账号']" :key="index">
		    <view class="user-context">
			<text>{{item}}</text>
			<global-icon iconId="icon-iconfonti"/>		
		    </view>
	     	<view style="background-color: #f8f8f8;height: 12rpx;"></view>
		</template>
		
	</view>
</template>

<script lang="ts" setup>
import {getCurrentInstance} from 'vue'

const height=getCurrentInstance().proxy.$height
</script>

<style lang="scss">
.user-header{
	display: flex;
	justify-content: space-between;
	height: 200rpx;
	margin: 0 20rpx;
	view{	
		display: flex;
		align-items: center;
		&:nth-child(1){
			image{
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				margin: 0 20rpx;
			}
		}
		&:nth-child(2){
			// padding: ;
			>text{
				background-color: #ecf0f3;
				padding: 10rpx 20rpx;
				font-size: 28rpx;
				border-radius: 40rpx;
				text{
					margin-left: 10rpx;
				}
			}
		
		}
		
	}
}
.user-context{
	margin: 30rpx;
	display: flex;
	justify-content: space-between;
}
</style>
