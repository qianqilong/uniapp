<template>
	<view>
		<Musichead title="搜索" :icon="true"></Musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<!-- 搜索模块 -->
				<view class="search-search">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" v-model.trim="keyword" @confirm="serach"
						@input="searchSuggest" />
					<text class="iconfont iconguanbi" v-if="keyword!==''" @click="keyword=''"></text>
				</view>
				<!-- 搜索联想-->
				<view class="search-suggest"  v-if="keyword!==''">
					<view class="search-suggest-head">
						搜索“{{keyword}}”
					</view>
					<view class="search-sugges-item"  v-for="(item,index) in suggestList" :key="index" @click="pushWord(item.name)">
						<text class="iconfont iconsearch"></text>
						{{item.name}}
					</view>
				</view>
				<!-- 历史记录 -->
				<view class="search-history" v-if="historyWord.length!==0&&keyword===''" >
					<view class="search-history-head">
						<text>历史记录</text>
						<text class="iconfont iconlajitong" @click="clearHistory"></text>
					</view>
					<view class="search-history-list">
						<view v-for="(item,index) in historyWord" :key="index" @click="pushWord(item)">
							{{item}}
						</view>
					</view>
				</view>
				<!--  热搜版-->
				<view class="search-hot" v-if="!loading&&keyword===''" >
					<view class="search-hot-head">
						热搜版
					</view>
					<view class="search-hot-item" v-for="(item,index) in Hot" :key="index"
						@click="pushWord(item.searchWord)">
						<view class="search-hot-top">{{index+1}}</view>
						<view class="search-hot-word">
							<view>
								{{item.searchWord}}
								<image v-if="item.iconType!==0" :src="item.iconUrl" mode="aspectFit"></image>
							</view>
							<view>
								{{item.content}}
							</view>
						</view>
						<view class="search-history-count">
							{{item.score}}
						</view>
						<view>
						</view>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Musichead from '@/components/musichead/musichead.vue'

	import {
		searchHotAPI,
		searchSuggestAPI
	} from '@/common/api.js'

	export default {
		components: {
			Musichead
		},
		onLoad() {
			this.searchHot()
			this.getHistory()
		},
		updated() {

		},
		data() {
			return {
				loading: true,
				Hot: [1, 2], // 热点
				keyword: '', // 关键字
				historyWord: [], // 历史搜索
				timer: 0, // 定时器id
				suggestList: [], // 搜索建议数组
			}
		},
		methods: {
			// 获取热搜信息
			async searchHot() {
				uni.showLoading({
					title: '加载中...'
				})
				const data = await searchHotAPI()
				if (data.code && data.code === 200) {
					this.Hot = data.data
					this.loading = false
					uni.hideLoading()
				}
			},
			// 获取历史记录
			getHistory() {
				try {
					if (uni.getStorageSync("keyword"))
						this.historyWord = JSON.parse(uni.getStorageSync("keyword"))
				} catch (e) {
					this.historyWord = []
				}

			},
			// 清空历史记录
			clearHistory() {
				this.historyWord = []
				uni.setStorageSync("keyword", JSON.stringify(this.historyWord))
			},
			// 搜索
			serach() {
				// 存入历史记录
				const flag = this.historyWord.find((item) => item === this.keyword)
				if (!flag) {
					this.historyWord.unshift(this.keyword)
					this.historyWord.length >= 10 ? this.historyWord.length = 10 : ''
				}
				uni.setStorageSync("keyword", JSON.stringify(this.historyWord))
				// 跳转搜索结果
				uni.navigateTo({
					url: '/pages/outcome/outcome?keyword=' + this.keyword,
				})

				this.keyword = ''
			},
			// 点击热搜
			pushWord(searchWord) {
				this.keyword = searchWord
				this.serach()
			},
			// 搜索建议
			searchSuggest() {
				 this.suggestList=[]
				// 防抖(只要用户在输入就不会触发)
				clearTimeout(this.timer)
				this.timer = setTimeout(async () => {
				const data=await searchSuggestAPI(this.keyword)
				if(data.code===200){
					const arr=data.result.order
					arr.forEach((item)=>{
						 this.suggestList=[...this.suggestList,...data.result[item]]
					})
				}
				
				}, 1000)

			}

		}
	}
</script>

<style lang="scss" scoped>
	.search-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;

		text {
			font-size: 26rpx;
			margin: 0 26rpx;
		}

		input {
			font-size: 28rpx;
			flex: 1;
		}
	}

	.search-history {
		.search-history-head {
			display: flex;
			justify-content: space-between;
			margin: 0 30rpx;

			text {
				&:nth-child(1) {
					font-size: 26rpx;
				}

				&:nth-child(2) {
					font-size: 26rpx;
					color: #b8b8b8;
				}
			}
		}

		.search-history-list {
			display: flex;
			flex-wrap: wrap;
			margin: 36rpx 0 88rpx 0;
			font-size: 26rpx;

			view {
				padding: 16rpx 28rpx;
				border-radius: 40rpx;
				margin: 0 0 15rpx 30rpx;
				background-color: #f7f7f7;
			}
		}
	}

	// 热搜

	.search-hot {
		margin: 0 30rpx;

		.search-hot-head {
			font-size: 28rpx;
		}

		.search-hot-item {
			margin: 36rpx 0;
			display: flex;
			align-items: center;

			.search-hot-top {
				margin-right: 35rpx;
				font-size: 30rpx;
				color: #fb2222;
			}

			.search-hot-word {
				flex: 1;

				view {
					&:nth-child(1) {
						line-height: 48rpx;
						font-size: 30rpx;

						image {
							width: 48rpx;
							height: 18rpx;
						}
					}

					&:nth-child(2) {
						line-height: 38rpx;
						font-size: 24rpx;
						color: #939393;
					}
				}
			}
		}

		.search-history-count {
			font-size: 24rpx;
			color: #939393;
		}
	}
    
	// 搜索建议
	
	.search-suggest{
		padding: 0 54rpx;
		border-top: 1px solid #e4e4e4;
		.search-suggest-head{
			margin: 24rpx 0;
			line-height: 70rpx;
			font-size: 28rpx;
			color:#6386ae;
		}
		.search-sugges-item{
			font-size: 28rpx;
			margin: 78rpx 0;
			text{
				font-size: 26rpx;
				color:#e4e4e4;
				margin-right: 28rpx;
			}
		}
	}
</style>
