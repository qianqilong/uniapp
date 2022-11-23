<template>
	<!-- 看榜单 -->
	<view v-if="books">
		<global-pageTitle>榜单</global-pageTitle>
		<view class="container">
			<scroll-view scroll-y="true" @scrolltolower="Loading">
				<commonList :books="books"/>
				<view style="text-align: center;">{{text}}...</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts" setup>
// import {ajax} from '@/common/ajax'
import {onLoad} from '@dcloudio/uni-app'
import {Ref, ref} from 'vue'
import commonList from '@/components/common/common-list.vue'
import A from '@/common/zhiyuan'

// 榜单的信息
const books:Ref<any>=ref([])
onLoad( async()=>{
	uni.showLoading({
		title:'加载中...'
	})
 //   const data:any=await ajax({
	// 	url:'/readList',
	// 	method:'GET'
	// }) 
	const data=A.bookResources.map((item)=>item.books)
	data.forEach((item)=>{
		books.value=[...item,...books.value,]
	})
	// books.value=data.books
	console.log(books.value);
	uni.hideLoading()
})
const text=ref('上拉加载显示更多')
// 触底加载
const Loading= async ()=>{
	text.value="加载中"
	// const data:any=await ajax({
	// 		url:'/readList',
	// 		method:'GET'
	// 	}) 
	// if(data.books){
	// 	text.value="上拉加载显示更多"
	// 	books.value=[...books.value,...data.books]
	// 	return
	// }
	text.value="没有更多了"
}
</script>

<style lang="scss" scoped>

</style>
