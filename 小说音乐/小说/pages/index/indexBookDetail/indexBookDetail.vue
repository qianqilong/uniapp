<template>
	<view style="height: 100%;">
		<view style="background-color: #a8b0c3 ;position: fixed; width: 100%;z-index:10">
			<global-pageTitle>图书详情</global-pageTitle>
			<view class="book" style="margin-top: 20rpx;">
				<image src="@/static/Rebook/Rebook1.jpg" mode="widthFix" ></image>
				<view class="book-bintroduce">
					<view>{{bookDetail.name}}</view>
					<view>作者：{{bookDetail.author}}</view>
					<view>
						<button>分享</button>
						<button>收藏</button>
					</view>
				</view>
			</view>
			<commonTab :tabArr="['详情','目录']" @getTabIndex="getTabIndex" :index="Index"/>
		</view>
	    <view style="height: 35vh"></view>
	
	 	<view style="background-color: white">		
			<!-- 详情 目录  -->
			<!-- <template v-for="(item,index) in ['详情','目录'] "> -->
			<swiper :style="{height:`${height}rpx`}" @change="changeIndex" :current="Index">
				<swiper-item>
					<scroll-view scroll-y="true" v-if="Index===0" :style="{height:`${height}rpx`}">
						<view class="book-detail" >
							<view>——简介——</view>
							<view>
							 {{bookDetail.synopsis}}	
							</view>	
						</view>		
					</scroll-view>				
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" v-if="Index===1" :style="{height:`${height}rpx`}">
							<view class="book-list" v-for="item in bookDetail.chapterCatalog" :key="item.id" hover-class="active" @tap="toReadingPage(item.id)">
								<view class="book-list-item">
									{{item.title}}
								</view>
							</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script lang="ts" setup>
import {reactive,ref} from 'vue'
import test from '@/common/test'
import commonTab from '@/components/common/common-tab.vue'
import {useHeight} from '@/hooks/reading'

// 剩余高度
const height=useHeight()
// tab栏显示的内容
const Index=ref(0)
// tab栏切换
const getTabIndex=(index:number)=>{
	Index.value=index
}
// 滑动
const changeIndex=(e)=>{
	Index.value=e.detail.current
}
// 书本信息
const bookDetail=reactive({
	name:test.name,
	author:test.author,
	synopsis:test.synopsis,
	chapterCatalog:test.chapterCatalog
})
// 读取章节id
const toReadingPage=(id)=>{
	uni.navigateTo({
		url:'/pages/index/indexReading/indexReading?id='+id
	})
}
</script>

<style lang="scss" scoped>
.book{
	display: flex;
	align-items: center;
	// height: 250rpx;
	image{
           flex: 1;
		   margin: 0 20rpx;
		   border-radius: 15rpx;
	}
	.book-bintroduce{
	  flex:2;
	  view{
		  &:nth-child(1){
			  font-size: 40rpx;
			 margin: 20rpx;
			}
			&:nth-child(2){
						  font-size: 30rpx;
						  margin: 20rpx;
						}
		&:nth-child(3){
			display: flex;
			align-items: center;
			button{
				flex:1;
				margin:20rpx;
			}
		}  
	  }
	  
	}
}
.book-detail{
	view{
		&:nth-child(1){
			margin: 30rpx 0;
			text-align: center;
			color: rgba(0, 0, 0, 0.5);
		}
		&:nth-child(2){
			margin: 0 30rpx;
			font-size: 35rpx;
			line-height: 80rpx;
		}
	}
}
.book-list{
	.book-list-item{
	  	padding: 20rpx 20rpx;
		// overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;	
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	}
	
}
.active{
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>
