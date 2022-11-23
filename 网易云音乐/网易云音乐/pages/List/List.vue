<template>

	<view v-if="!loading">
		<view class="fixbg" :style="{'background-image':`url(${head.coverImgUrl})`}"></view>
		<Musichead title="歌单" :icon="true" color="white"></Musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="head.coverImgUrl" mode=""></image>
						<text class="iconfont iconyousanjiao">{{count}}</text>
					</view>
					<view class="list-head-text">
						<view>
							云音乐{{head.name}}
						</view>
						<view>
							<image :src="head.avatarUrl" alt=""></image>
							{{head.nickname}}
						</view>
						<view>
							{{head.description}}
						</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button class="list-share" open-type="share">
					<text class="iconfont iconicon-"></text>
					分享给微信好友
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont iconbofang1"></text>
						<text>播放全部</text>
						<text>(共{{musicList.length}}首)</text>
					</view>
					<!-- 歌曲的item部分 -->
					<Musicitem v-for="(item,index) in musicList" :key="item.id" :music="item" :index="index" @click.native="pushDetail(item.id)"/>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Musichead from '@/components/musichead/musichead.vue'
	import {
		getTopDetailAPI
	} from '@/common/api.js'
	import Musicitem from '@/components/music-item/music-item.vue'

	export default {
		components: {
			Musichead,
			Musicitem
		},
		data() {
			return {
				loading: true,
				head: {}, // 头部信息
				musicList: []
			};
		},
		methods: {
			// 获取榜单详情
			async getTopDetail(id) {
				uni.showLoading({
					title:'加载中'
				})
				const data = await getTopDetailAPI(id)
				if (data.code && data.code === 200) {
					this.$store.commit('ADDTOPLIST',data.playlist.trackIds)
					this.head.coverImgUrl = data.playlist.coverImgUrl
					this.head.description = data.playlist.description
					this.head.name = data.playlist.name
					this.head.avatarUrl = data.playlist.creator.avatarUrl
					this.head.nickname = data.playlist.creator.nickname
					this.musicList = data.playlist.tracks
					this.head.playCount = data.playlist.playCount
					this.loading=false
					uni.hideLoading()
				}
			}
		    // 跳转详情页
			,pushDetail(id){
				uni.navigateTo({
					url:"/pages/Detail/Detail?id="+id
				})
			}
		},
		onLoad(option) {
			this.getTopDetail(option.id)
		},
		computed: {
			// 播放次数
			count() {
				let count = this.head.playCount
				if (count >= 10000 && count <= 100000000) {
					count /= 10000
					return count.toFixed(1) + '万'
				} else if (count > 100000000) {
					count /= 100000000
					return count.toFixed(1) + '亿'
				}
				return count
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.list-head {
			display: flex;
			margin: 30rpx;

			.list-head-img {
				width: 264rpx;
				height: 264rpx;
				border-radius: 30rpx;
				overflow: hidden;
				position: relative;
				margin-right: 42rpx;

				image {
					width: 100%;
					height: 100%;
				}

				text {
					position: absolute;
					right: 8rpx;
					top: 8rpx;
					color: white;
					font-size: 26rpx;
				}
			}

			.list-head-text {
				flex: 1;
				color: #f0f2f7;

				view {
					&:nth-child(1) {
						color: white;
						font-size: 34rpx;
					}

					&:nth-child(2) {
						display: flex;
						margin: 32rpx 0;
						font-size: 24rpx;
						align-items: center;

						image {
							width: 54rpx;
							height: 54rpx;
							border-radius: 50%;
							margin-right: 14rpx;
						}
					}

					&:nth-child(3) {
						line-height: 34rpx;
						font-size: 22rpx;
					}
				}
			}
		}

		.list-share {
			width: 330rpx;
			height: 74rpx;
			margin: 0 auto;
			background-color: rgba(0, 0, 0, .4);
			border-radius: 37rpx;
			color: white;
			text-align: center;
			line-height: 74rpx;
			font-size: 28rpx;

			text {
				margin-right: 16rpx;
				font-size: 24rpx;
			}
		}

		.list-music {
			background-color: white;
			border-radius: 50rpx;
			margin-top: 40rpx;
			overflow: hidden;

			.list-music-head {
				height: 50rpx;
				margin: 40rpx 0 0 22rpx;

				text {
					&:nth-child(1) {
						height: 50rpx;
						font-size: 50rpx;
					}

					&:nth-child(2) {
						font-size: 30rpx;
						margin: 0 10rpx 0 26rpx;
					}

					&:nth-child(3) {
						font-size: 26rpx;
						color: #aaaaaa;
					}
				}
			}
		}
	}
</style>
