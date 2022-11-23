<template>
	<view  :class="thisTheme">
		<view :style="{height:statusHeight+'px'}" class="cal" :class="thisTheme"></view>
		
		<!-- 设置开始 -->
		<!-- 设置头部部分 -->
		<view class="reading-head"  @tap="goback" :class="thisTheme" :animation="TopanimationData"  >
			<view class="reading-head-context" v-if="bookInfo.loadContent[bookInfo.Index]">
				<global-icon iconId="icon-jiantou-copy" style="margin: 0 20rpx;"/>
				<text>{{bookInfo.name}}</text>
				<text>章节：{{bookInfo.loadContent[bookInfo.Index].chapterCatalog}}</text>
			</view>
		</view>
		<!-- 设置底部部分 -->
		<view class="reading-bottom"  :class="thisTheme" :animation="BottomanimationData" >
			<view @tap="List.show()">
				<global-icon iconId="icon-xueyuan-mulu" :iconSize="55"></global-icon>
				<view>
					目录
				</view>
			</view>
			<view @tap="thisTheme==='nightTheme'?changeTheme('morningTheme'):changeTheme('nightTheme')">
				<global-icon iconId="icon-yanjing" :iconSize="55"></global-icon> 
				<view>
					夜间模式
				</view>
			</view>
			<view @tap="setFont">
				<global-icon iconId="icon-ziti1" :iconSize="55"></global-icon>
				<view>
					字体
				</view>
			</view>
			<view @tap="setMore">
				<global-icon iconId="icon-diqiuhuanqiu" :iconSize="55"></global-icon>
				<view>
					更多
				</view>
			</view>
		</view>
	    <!-- 阅读文本部分 -->
		<!-- 文本开始 -->
	    <swiper  :style="{height:`${calHeight}rpx`,fontSize:`${font.fontSize}rpx`,lineHeight:`${font.fontSpacing}rpx`}" :current="bookInfo.Index" @change="switchPage">
		    <swiper-item v-for="(item,index) in bookInfo.pageLength" >
		    <scroll-view scroll-y="true"  @tap="setFlag" :style="{height:`${calHeight}rpx`}">
			<view  class="reading-content" v-if="bookInfo.loadContent[index]">
				<rich-text :nodes="bookInfo.loadContent[index].text"></rich-text>
			</view>
	    	</scroll-view>
	  	</swiper-item>
	    </swiper>
	   <!-- 章节目录组件 -->
	   <global-leftList ref="List" :class="thisTheme">
		   <view class="list-head">
		   	章节目录
		   </view>
		   <scroll-view scroll-y="true" style="height: 95%;">
		   		<view class="list-item" v-for="(item,index) in bookInfo.chapterCatalog" :key="item.id" hover-class="active" :class="{active:index==bookInfo.Index}" @tap="tohapter(index)"> 		   					   
		   			{{item.title}}
		   		</view>
		   </scroll-view>
		  
	   </global-leftList>
	   <!-- 字体设置 v-if="typeFont" -->
	   <view class="font-set animated slideInUp"  :class="thisTheme"  :animation="BottomanimationDataFont">
        	<view class="font-setfont">字体:<slider min="20" max="50"  @changing="changefontSize"  :value="font.fontSize" style="width: 550rpx;" @change="" block-size="16" activeColor="#34495e" backgroundColor="#ecf1f0"></slider></view>
            <view class="font-setfont">间距:<slider min="20" max="100" @changing="changefontSpacing" :value="font.fontSpacing" style="width: 550rpx;" @change="" block-size="16" activeColor="#34495e" backgroundColor="#ecf1f0"/></view>
	   </view>
	   <!-- 更多部分设置 -->
	   <view class="more-set" :class="thisTheme" :animation="BottomanimationDataMore">
	    	<view class="more-setfont">亮度:<slider @changing="setBrightNess"  :value="brightNess" min="0" mix="100" style="width: 550rpx;"  block-size="16" activeColor="#34495e" backgroundColor="#ecf1f0"></slider></view>
	        <view class="more-theme" >
	       	   <template v-for="item in themes" :key="item.id">
				   <view class="more-theme-item"  @tap="changeTheme(item.id)">
				   	   <view :class="item.id" style="height: 80rpx;border-radius:20rpx ;"></view>
				    	<view >{{item.name}}</view>
				   </view>
	       	   </template>
	        </view>
	   </view>
	 </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance,ref} from 'vue'
import {useHeight,useBookInfo,useSetFont,useSetbrightNess,useSetTheme,useAddanimate} from '@/hooks/reading'
// 开始底部头部的动画
const {TopanimationData,showTop,hideTop,BottomanimationData,showBottom,hideBottom}=useAddanimate('') as any
// 字体动画
const {BottomanimationDataFont,showBottomFont,hideBottomFont}=useAddanimate('Font') as any
// 更多部分动画
const {BottomanimationDataMore,showBottomMore,hideBottomMore}=useAddanimate('More') as any
// 控制更多的显示
const themeFlag=ref(false)
// 控制修改字体的显示
const typeFont=ref(false)
// 显示头部底部
const Flag=ref(false)
// 设置头部底部的显示和隐藏
const setFlag=()=>{
	switch (Flag.value){
		case true:hideBottom(),hideTop()
			break;
		// 下方隐藏为-200rpx转换成px  num * uni.getSystemInfoSync().windowWidth / 750;	
		default:showBottom(-200* uni.getSystemInfoSync().windowWidth / 750),showTop(100* uni.getSystemInfoSync().windowWidth / 750)
			break;
	}
		if(typeFont.value!==false){
			setFont()
		}
		themeFlag.value?setMore():''
	Flag.value=!Flag.value
}
// 控制字体的显示和隐藏
const setFont=()=>{
	// 下方隐藏为-180rpx转换成px  num * uni.getSystemInfoSync().windowWidth / 750;
	typeFont.value?hideBottomFont():showBottomFont( -180 * uni.getSystemInfoSync().windowWidth / 750)
	typeFont.value=!typeFont.value
}
// 设置更多
const setMore=()=>{
	console.log(1);
	// 下方隐藏为-250rpx转换成px  num * uni.getSystemInfoSync().windowWidth / 750;
	themeFlag.value?hideBottomMore():showBottomMore( -250 * uni.getSystemInfoSync().windowWidth / 750)
	themeFlag.value=!themeFlag.value
}
// 退出看书
const goback=()=>{
	uni.navigateTo({
		url:'/pages/index/indexBookDetail/indexBookDetail?id='+bookInfo.Index
	})
}
// 目录
const List=ref(null)
// 更据目录跳转章节
const tohapter=(index)=>{
	bookInfo.Index=index
	// 隐藏目录
	setFlag()
	List.value.hide()
}
// 主题
const themes=[
	{
						id: 'blueTheme',
						name: '天蓝'
					},
					{
						id: 'eyeHelpTheme',
						name: '护眼'
					},
					{
						id: 'lightGretTheme',
						name: '淡灰'
					},
					{
						id: 'morningTheme',
						name: '早晨'
					},
					{
						id: 'nightTheme',
						name: '夜间'
					}
				]
const instance = getCurrentInstance() 
// 状态栏的高度(不同场景)
const statusHeight=instance?.proxy?.$height
// 剩余高度
const calHeight= useHeight()
// 小说信息
const [bookInfo,switchPage]=useBookInfo()
// 设置字体
const {font,changefontSize,changefontSpacing}=useSetFont()
// 设置亮度
const [brightNess, setBrightNess]=useSetbrightNess()
// 设置主题
const [thisTheme,changeTheme]=useSetTheme(themes)

</script>

<style lang="scss" scoped>
	
	.active{
			background-color: rgba(0, 0, 0, 0.1);
		}
// 阅读文章的头部
.reading-head{
	position: fixed;
	top:-100rpx;
	z-index: 1;
	width: 100%;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.15);
	padding-right:30rpx ;
	.reading-head-context{
		display: flex;
		align-items: center;
		height: 80rpx;	
	    text{
			&:nth-child(2){
			 font-size: 28rpx;
			}
			
			&:nth-child(3){
				flex: 1;
				margin: 0 40rpx;
				font-size: 23rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
// 阅读文章的底部
.reading-bottom{
	position: fixed;
	bottom: -200rpx;
	z-index: 1;
	height: 200rpx;
	width: 100%;
	// background-color:white;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.15);
	display: flex;
	align-items: center;
	view{
		flex: 1;
		text-align: center;
		font-size: 28rpx;
	}
}

.reading-content{
	padding: 0 30rpx;

}
// 章节目录头
.list-head{
	text-align: center;
	margin-top: 20rpx;
	font-size: 38rpx;
}
.list-item{
	padding: 20rpx 20rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;	
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.font-set{
	z-index:1;
	height: 180rpx;
	position: fixed;
	bottom: -180rpx;
	width: 750rpx;

	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.15);
	.font-setfont{
		display: flex;
		align-items: center;
		width: 750rpx;
		margin: 20rpx;
	}
}
.more-set{
	z-index:1;
	height: 250rpx;
	position: fixed;
	bottom: -250rpx;
	width: 750rpx;

	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.15);
	.more-setfont{
		display: flex;
		align-items: center;
		width: 750rpx;
		margin: 20rpx;
	}
	.more-theme{
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		.more-theme-item{
			flex: 1;
			margin-right:  25rpx;
			text-align: center;
		}	
	}
}
</style>
