<template>
	<view>
		<Musichead title="网易云音乐" :icon="false"></Musichead>
		<view class="container">
			<scroll-view scroll-y="true">
			 
				<!-- 搜索模块 -->
				<view class="index-search" @click="pushSearch">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲">
				</view>
				<!-- 骨架效果 -->
				<mForSkeleton :avatarSize="200" :row="3" :loading="loading" isarc="square" v-for="(item,key) in 4" :key="key"/>
				<!-- 榜单列表 -->
				<view class="index-list" v-if="!loading">
					<IndexListItem v-for="item in list" :key="item.id" :data="item" @click.native="pushList(item.id)"></IndexListItem>
				</view>
			</scroll-view>
		</view>
	
	</view>
</template>

<script>
	import Musichead from '@/components/musichead/musichead.vue'
	import IndexListItem from '@/components/index-list-item/index-list-item.vue'
	import {getTopListAPI} from '@/common/api.js'
	import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton.vue";
	
	export default {
		components:{Musichead,IndexListItem,mForSkeleton},
		data() {
			return {
				list:[],
				loading:true
			}
		},
		onLoad() {
        // 调用请求
		this.getTopList()
		},
		
		methods: {
			// 获取榜单列表
      async  getTopList(){
		const data=	await getTopListAPI() 	
		if(data.code===200){
			this.list=data.list
			this.list.length=4
			this.loading=false
	     	}
		 },
		 // 跳转页面
		 pushList(id){
			 uni.navigateTo({
				 url:'/pages/List/List?id='+id
			 })
		 },
		 // 跳转搜索页面
		 pushSearch(){
			 uni.navigateTo({
				 url:'/pages/search/search'
			 })
		 }
	   },
	   
	}
</script>

<style lang="scss" scoped>
	.container{
		.index-search{
			display: flex;
			align-items: center;
			height: 70rpx;
			margin: 70rpx 30rpx 30rpx 30rpx;
			background-color: #f7f7f7;
			border-radius: 50rpx;
			text{
				font-size: 26rpx;
				margin:0 26rpx;
			}
			input{
				font-size: 28rpx;
				flex: 1;
			}
		}
	    .index-list{
			margin: 0 30rpx;
		}
	}
	
</style>
