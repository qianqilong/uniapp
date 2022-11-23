<template>
	<view v-if="IndexObj"  :class="!nightFlag?'nightTheme':''" >
	   <view :style="{height:statusHeight+'px',paddingTop:'20rpx'}"></view>
	   <!-- 搜索框 -->
	   <indexSearch/>
	   <view class="container">
		   	<scroll-view scroll-y="true">
		   		<!-- 轮播图 -->
		   		<indexCarousel :imgArr="IndexObj.swiperImages"/>
		   		<!--功能分类 -->
		   		<indexSort :sortArr="sortArr"/>
		   		<!-- 推荐模块 -->
		   		<global-listHeader>
		   			<template #title>猜你喜欢</template>
		   			更多推荐
		   		</global-listHeader>
		   		<!-- 书本 -->
		   		<commontReboot :Rebooks="IndexObj.Rebooks"/>	   		
		   		<!-- 列表页-->
			    <indexList :bookResources="IndexObj.bookResources"/>
				<!-- 播放栏 -->
				<commonAudio/>
		   	</scroll-view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import {Ref, ref,getCurrentInstance} from 'vue'
import indexSearch from '../../components/index/index-serch.vue'
import indexCarousel from '../../components/index/index-carousel.vue'
import indexSort from '../../components/index/index-sort.vue'
import commontReboot from '../../components/common/common-reboot.vue'
import indexList from '../../components/index/index-list.vue'
import {onLoad } from '@dcloudio/uni-app'  
import {ajax} from '../../common/ajax'
import commonAudio from '@/components/common/common-audio.vue'
import obj from '@/common/zhiyuan'
import {useChnagenight} from '@/hooks/audio'

const instance = getCurrentInstance() 
// 状态栏的高度(不同场景)
const statusHeight=instance?.proxy?.$height

const nightFlag=useChnagenight()
// 主页的信息
const IndexObj:Ref<any>=ref()
// 发送请求
onLoad( async ()=>{	
	uni.showLoading({
		title: '加载中'
	});
 //     IndexObj.value	=await ajax({
	//   url:'/app_index',
	//   method:'GET',
	// })
	IndexObj.value=obj
	uni.hideLoading()
})
// 功能模块的信息
const sortArr=[
	{
		iconId:'icon-icon-test',
		iconColor:'#ffc107',
		name:'看榜单'
	},
	{
		iconId:'icon-startRead',
		iconColor:'#0056b3',
		name:'听小说'
	},{
		iconId:'icon-icon09',
		iconColor:'rgb(0,0,0,0.5)',
		name:'听音乐'
	},
	{
		iconId:'icon-zhishi',
		iconColor:'#28a745',
		name:'听知识'
	}
]

</script>

<style lang="scss" scoped>

</style>
