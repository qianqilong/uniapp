<template>
	<view >
	   <view :style="{height:statusHeight+'px',paddingTop:'20rpx'}"></view>
	   <!-- 搜索框 -->
	   <indexSearch/>
	   <view class="container" style="background-color: rgba(0, 0, 0, 0.05);display: flex;">
		   	<!-- 左侧部分 -->
		   	<scroll-view scroll-y="true" :style="{height: `${height}rpx`}" class="left-list">
				<template v-for="(item,index) in LeftList" :key="index">
					<view class="left-list-item" @tap="lefToright(`right${index}`)" :style="{color:index===leftIndex? 'red':''}">
						{{item}}
					</view>
				</template>
				  <view :style="{height:`${+height-220}rpx`,width:'100%'}"></view>
		   	</scroll-view>
			<!-- 右边部分 -->
			<scroll-view scroll-y="true" :style="{height: `${height}rpx`}" class="right-list" :scroll-into-view="rightIndex" @scroll="rightToleft" >
				<template v-for="(item,index) in sortResources" :key="index">
					<view class="right-list-item" :id="`right${index}`">
						<!-- 顶部 -->
						<view class="right-list-item-header">
							<text>{{item.text}}</text>
							<global-icon iconId="icon-youjiantou" :iconSize="40"></global-icon>
						</view>
						<!-- 底部 -->
						<view class="right-list-item-content">
							<template v-for="(sub,sindex) in item.content" :key="sindex">
								<view>{{sub}}</view>
							</template>
						</view>
					</view>
				</template>
              <view :style="{height:`${+height-320}rpx`,width:'100%'}"></view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import  {sortResources} from './sortResources'
import indexSearch from '../../components/index/index-serch.vue'
import {computed, getCurrentInstance,ref} from 'vue'
import {useHeight} from '@/hooks/reading'

const statusHeight=getCurrentInstance().proxy.$height
// 计算剩余高度
const height=useHeight()
// 获取左侧的数组
const LeftList=computed(()=>{
	return sortResources.map((item)=>item.text)
})
// 滚动值
const rightIndex=ref('right1')
// 点击右边
const lefToright=(idx)=>{
	rightIndex.value=idx
}
const leftIndex=ref(0)
// 右联动
const rightToleft=(e)=>{
	let curScrollTop=e.detail.scrollTop
	let standardVal= 320 * uni.getSystemInfoSync().windowWidth / 750
	let curIndex=Math.round(curScrollTop/standardVal)
	leftIndex.value=curIndex
}
</script>

<style lang="scss">
.left-list{
		font-size: 28rpx;
		width: 180rpx;
		padding: 0 20rpx;
	.left-list-item{
		height: 100rpx;
		line-height: 100rpx;
	}
}
	
.right-list{
	 height: 250rpx;
	 padding: 0 10rpx;
	 box-sizing: border-box;
	.right-list-item{
		 margin-bottom: 70rpx;
		.right-list-item-header{
			display: flex;
			height: 80rpx;
			align-items: center;
			justify-content: center;
			text{
				margin-right:8rpx;
			}
		}
		
		.right-list-item-content{
			height: 170rpx;
			background-color: white;
			font-size: 28rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			view{
				width: calc(100%/3);
				text-align: center;
			}
			
		}
			
	}
		
}
	


</style>
