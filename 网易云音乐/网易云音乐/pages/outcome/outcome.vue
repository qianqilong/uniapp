<template>
	<view>
		<Musichead title="搜索结果" :icon="true"></Musichead>
		<view class="container" v-if="!loading">
			<scroll-view scroll-y="true" @scrolltolower="scrollCome">
				<Musicitem v-for="(item,index) in songs" :music="item" :index="index"
					@click.native="pushDetail(item.id)" />
				<view class="skeleton">
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Musichead from '@/components/musichead/musichead.vue'
	import {
		searchKeywordsAPI
	} from '@/common/api.js'
	import Musicitem from '@/components/music-item/music-item.vue'

	export default {
		components: {
			Musichead,
			Musicitem
		},
		onLoad(option) {
			this.keyword = option.keyword
			this.searchKeywords(option.keyword, this.limit, this.offset)
		},
		watch: {
			async offset() {
				const data = await searchKeywordsAPI(this.keyword, this.limit, this.offset)
				if (data.code === 200) {
					
					this.songs.push(...data.result.songs)
				}

			},
		},
		data() {
			return {
				loading: true,
				limit: 30,
				offset: 0,
				keyword: '',
				songs: []
			}
		},
		methods: {
			// 获取搜索数据
			async searchKeywords(keyword, limit, offset) {
				uni.showLoading({
					title: '加载中...'
				})
				const data = await searchKeywordsAPI(keyword, limit, offset)
				if (data.code === 200) {
					this.songs.push(...data.result.songs)
					this.$store.commit('ADDTOPLIST',data.result.songs)
					this.loading = false
					uni.hideLoading()
				}
			},
			// 跳转详情页
			pushDetail(id) {
				uni.navigateTo({
					url: "/pages/Detail/Detail?id=" + id
				})
			},
			// 滚动到底部
			scrollCome() {
				this.offset += 1
			}
		}
	}
</script>

<style>

</style>
