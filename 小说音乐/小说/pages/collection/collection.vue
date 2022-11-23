<template>
	<view>
		<view :style="{height:statusHeight+'px',paddingTop:'20rpx'}"></view>
		<!-- 搜索框 -->
		<indexSearch />
		<commonTap
			:tabArr="['我的收藏','收听历史']"
			@getTabIndex="getTabIndex"
			:index="Index"
		/>
		<view class="container">
			<swiper
				:style="{height:`${height}rpx`}"
				@change="changeIndex"
				:current="Index"
			>
				<!-- 我的收藏 -->
				<swiper-item>
					<view class="">
						<commonList
							:books="books"
							:flag="true"
							@cancalCollect="cancalCollect"
						/>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">1</view>
				</swiper-item>
			</swiper>
		</view>
		<commonPopup
			text="取消收藏"
			ref="Popup"
			@cancelColl="cancelColl"
		/>
	</view>
</template>

<script lang="ts" setup>
import commonList from '@/components/common/common-list.vue'
import indexSearch from '../../components/index/index-serch.vue'
import { getCurrentInstance, ref } from 'vue'
import commonTap from '@/components/common/common-tab.vue'
import { useHeight } from '@/hooks/reading'
import A from '@/common/zhiyuan'
import commonPopup from '@/components/common/common-popup.vue'

const statusHeight = getCurrentInstance().proxy.$height
// 计算高度
const height = useHeight()
// 第几个滑块
const Index = ref(0)
// 获取index数值
const getTabIndex = index => {
	Index.value = index
}
// 改变index
const changeIndex = e => {
	Index.value = e.detail.current
}
// 我的收藏
const books = ref(A.bookResources[0].books)
// 弹出层的
const Popup = ref(null)
// 取消的id
const index = ref(0)
// 取消收藏
const cancalCollect = id => {
	uni.hideTabBar({
		animation: true
	})
	index.value = id
	Popup.value.show()
}
// 取消收藏逻辑的执行
const cancelColl = () => {
	books.value = books.value.filter(item => item.id !== index.value)
}
</script>

<style lang="scss">
</style>
