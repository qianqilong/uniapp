<template>
	<view v-if="!loading">
		<view class="fixbg" :style="{'background-image': `url(${MusicDetail.image})`}"></view>
		<MusicHead color="white" :title="MusicDetail.name" />
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image :src="MusicDetail.image" mode="" :class="{'detail-play-run':iconPlay==='iconpause'}" ></image>
					<text class="iconfont" :class="iconPlay" @click="playMusic"></text>
					<view :class="{'rotate':iconPlay==='iconpause'}" ></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap" :style="{transform:`translateY(${-(lyricindex-1)*82}rpx)`}">
						<view class="detail-lyric-item " v-for="(item,index) in MusicDetail.lyric" :key="index" :class="{active:lyricindex===index}">
							{{item.lyric}}
						</view>
					</view>
				</view>
				<!-- 相似歌曲 -->
				<view class="detail-like">
					<view class="detail-like-head">
						喜欢这首歌的人也听
						<button class="detail-like-button">
							<text class="iconfont iconbofang1"></text>
							一键收听</button>
					</view>
					<view class="detail-like-item" v-for="item in MusicDetail.songs" :key="item.id"
						@click="pushDetail(item.id)">
						<view class="detail-like-img">
							<image :src="item.album.blurPicUrl" mode=""></image>
						</view>

						<view class="detail-like-song">
							<view>{{item.name}}</view>
							<view>
								<image src="../../static/sq.png" mode=""></image>
								{{item.name}} - {{item.artists[0].name}}
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view>
				</view>
				<!-- 评论 -->
				<view class="detail-comment">
					<view class="detail-comment-head">
						精彩评论
					</view>
					<view class="detail-comment-item" v-for="item in MusicDetail.comments" :key="item.id">
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view>
										{{item.user.nickname}}
									</view>
									<view>
										{{formatDate(item.time)}}
									</view>
								</view>
								<view class="detail-comment-like">
									{{item.likedCount}}
									<text class="iconfont iconlike"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	import MusicHead from '@/components/musichead/musichead.vue'
	import {
		getMusicDetailAPI,
		getMusiclyricAPI,
		getMusicSimiAPI,
		getMusiccommentAPI,
		getMusicUrlAPI
	} from '@/common/api.js'

	export default {
		components: {
			MusicHead
		},
		data() {
			return {
				loading: true, // 加载
				MusicDetail: {}, // 音乐的详情
				limit: 20,
				offset: 1,
				iconPlay: 'iconpause', // 播放图标 iconbofang1
				bgAudioManager: '',
				timer: 1, // 定时器
				lyricindex:0, // 歌词的位置
			}
		},
		onLoad(option) {
			this.$store.commit('GET_NEXTID',option.id)
			this.getMusicDetail(option.id)
		},
		onUnload(option){
			
			// #ifdef H5
			clearInterval(this.timer)
			this.bgAudioManager.destroy()
			// #endif
				
		},
		methods: {
			// 更新歌词的数据
			pushDetail(id) {
				this.bgAudioManager.destroy()
				this.getMusicDetail(id)	
			},
			// 获取歌曲详情
			async getMusicDetail(id) {
				this.loading=true
				uni.showLoading({
					title:'加载中...'
				})
				const data = await getMusicDetailAPI(id)
				if (data.code && data.code === 200) {
					this.$set(this.MusicDetail,'name',data.songs[0].name)
					// this.MusicDetail.name = data.songs[0].name
					this.MusicDetail.image = data.songs[0].al.picUrl
					this.getMusiclyric(id)	
				}

			},
			// 获取歌词
			async getMusiclyric(id) {
				const data = await getMusiclyricAPI(id)
				if (data.code && data.code === 200) {
					const lyric = data.lrc.lyric;
					let reg = /\[([^\]]+)\]([^\[]+)/g;
					const result = []
					// $0整体,$1第一匹配结果,$2第二匹配结果
					lyric.replace(reg, ($0, $1, $2) => {
						result.push({
							time: this.formatTime($1),
							lyric: $2
						})
					})
					this.MusicDetail.lyric = result
				}
					this.getMusicSimi(id)
			},
			// 获取相识音乐
			async getMusicSimi(id) {
					const data = await getMusicSimiAPI(id)
					if (data.code && data.code === 200) {
						this.MusicDetail.songs = data.songs
					}
						this.getMusiccomment(id)
			},
			// 获取歌曲评论
			async getMusiccomment(id) {
				const data = await getMusiccommentAPI(id, this.limit, this.offset)
				this.MusicDetail.comments = data.comments
					this.getMusicUrl(id)
			},
			// 获取歌曲地址
			async getMusicUrl(id) {
					const data = await getMusicUrlAPI(id)
				 	// #ifdef MP-WEIXIN
					this.bgAudioManager = uni.getBackgroundAudioManager();
					this.bgAudioManager.title = this.MusicDetail.name;
					this.bgAudioManager.src = data.data[0].url
					
					// #endif
				    // #ifdef H5
				      this.bgAudioManager=uni.createInnerAudioContext()
					   this.bgAudioManager.src =data.data[0].url
					  this.iconPlay='iconbofang1'
					
				    // #endif
					this.watchLyricIndex() // 监听歌词滚动
					// 播放回调
					this.bgAudioManager.onPlay(() => {
						this.iconPlay = "iconpause"
							this.watchLyricIndex() // 监听歌词滚动
					})
					// 暂停回调
					this.bgAudioManager.onPause(() => {
						this.iconPlay = "iconbofang1"
							clearInterval(this.timer)
					})
					// 监听播放结束
					this.bgAudioManager.onEnded(()=>{
						this.getMusicDetail(this.$store.state.nextId)
					})
				 uni.hideLoading()
				 this.loading = false
				}

				,
			// 格式化日期
			formatDate(d) {
				let date = new Date(d);
				let YY = date.getFullYear() + '-';
				let MM =
					(date.getMonth() + 1 < 10 ?
						'0' + (date.getMonth() + 1) :
						date.getMonth() + 1) + '-';
				let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				let hh =
					(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				let mm =
					(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
					':';
				let ss =
					date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				return YY + MM + DD + ' ' + hh + mm + ss;
			}
			// 格式化时间
			,
			formatTime(t) {
				let arr = t.split(':')
				return parseFloat(arr[0] * 60) + parseFloat(parseFloat(arr[1]).toFixed(1))
			},
			// 点击播放音乐
			playMusic() {
				if (this.bgAudioManager.paused) {
					this.bgAudioManager.play()
				} else {
					 this.bgAudioManager.pause()
				}
				
			},
			// 监听歌词滚动
			watchLyricIndex() {
				clearInterval(this.timer)
				this.timer = setInterval(() => {
                 if(this.MusicDetail.lyric.length)
					for (let i = 0; i < this.MusicDetail.lyric.length; i++) {
						if(this.bgAudioManager.currentTime>this.MusicDetail.lyric[this.MusicDetail.lyric.length-1]){
							this.lyricindex=this.MusicDetail.lyric.length-1
							return
						}
						// 获取当前播放时间
						if (this.bgAudioManager.currentTime > this.MusicDetail.lyric[i].time && this.bgAudioManager
							.currentTime < this.MusicDetail.lyric[i + 1].time){
								this.lyricindex=i
							}
					}
				}, 500)
			}
		},
	   beforeDestroy() {
	   	clearInterval(this.timer)
	   }
	}
</script>

<style scoped lang="scss">
	@keyframes rotate{
		form{
			transform: rotateZ(0);
			transform-origin: 0 0;
			   
		}to{
			transform: rotateZ(-30deg);
			transform-origin: 0 0;
		}
	}
	.detail-play {
		width: 580rpx;
		height: 580rpx;
		background: url(~@/static/disc.png);
		background-size: cover;
		margin: 214rpx auto 34rpx auto;
		position: relative;
		image {
			width: 370rpx;
			height: 370rpx;
			border-radius: 50%;
			animation: 8s linear move infinite; // 开始动画
			animation-play-state: paused; // 暂停
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			margin: auto;
		}

		.detail-play-run {
			animation-play-state: running; // 运行
		}

		text {
			color: white;
			width: 100rpx;
			height: 100rpx;
			font-size: 100rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			margin: auto;
		}
        .rotate{
			transform-origin:0 0;
			transform: rotateZ(-20deg);
			  // animation-name: rotate;
			  //   animation-duration: 1s;
			  //   animation-fill-mode: both;
		}
		view {
			&:nth-child(3) {
				transition: 1s;
				width: 230rpx;
				height: 360rpx;
				background: url(~@/static/needle.png);
				position: absolute;
				left: 80rpx;
				right: 0;
				top: -200rpx;
				margin: auto;
				background-size: cover;
				
			}
			

		}
	}

	.detail-lyric {
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		text-align: center;
		overflow: hidden;
		color: #959494;

		.detail-lyric-wrap {
			transition: 0.5s;
			.detail-lyric-item {
				height: 82rpx;

				&.active {
					color: white;
				}
			}
		}
	}

	.detail-like {
		margin-top: 56rpx;

		.detail-like-head {
			height: 48rpx;
			margin-left: 34rpx;
			font-size: 36rpx;
			line-height: 48rpx;
			color: white;

			button {
				color: white;
				float: right;
				margin-right: 32rpx;
				background-color: transparent;
				width: 190rpx;
				height: 52rpx;
				line-height: 52rpx;
				border-radius: 26rpx;
				font-size: 22rpx;
				box-sizing: border-box;
				border: 1rpx solid white;

				text {
					float: left;
					font-size: 22rpx;
					margin-right: 10rpx;
				}
			}
		}

		.detail-like-item {
			margin: 38rpx 0 38rpx 30rpx;
			display: flex;

			.detail-like-img {
				width: 82rpx;
				height: 82rpx;
				align-items: center;
				margin-right: 22rpx;

				image {

					width: 82rpx;
					height: 82rpx;
				}
			}

			.detail-like-song {
				flex: 1;

				view {
					&:nth-child(1) {
						font-size: 30rpx;
						color: white;
					}

					&:nth-child(2) {
						font-size: 22rpx;
						color: #b1aaaa;

						image {
							width: 24rpx;
							height: 16rpx;
							margin-right: 8rpx;
						}
					}

				}
			}

			text {
				font-size: 54rpx;
				color: #897f73;
				margin-right: 32rpx;
			}
		}
	}

	.detail-comment {
		.detail-comment-head {
			font-size: 36rpx;
			color: white;
			margin: 36rpx 30rpx;
		}

		.detail-comment-item {
			display: flex;
			margin: 14rpx 0;

			.detail-comment-img {
				width: 66rpx;
				height: 66rpx;
				border-radius: 50%;
				overflow: hidden;
				margin: 0 20rpx;
				flex-shrink: 0; // 不让挤其变形

				image {
					width: 100%;
					height: 100%;
				}
			}

			.detail-comment-content {
				width: 90%;

				.detail-comment-title {
					display: flex;
					justify-content: space-between;

					.detail-comment-name {
						view {
							&:nth-child(1) {
								font-size: 28rpx;
								color: #b0b0b2;
								margin-bottom: 12rpx;
							}

							&:nth-child(2) {
								font-size: 18rpx;
								color: #707073;
							}
						}
					}

					.detail-comment-like {
						font-size: 24rpx;
						color: #707073;
						margin-left: 30rpx;

						text {
							margin: 0 30rpx 0 8rpx;
						}
					}
				}

				.detail-comment-text {
					padding: 30rpx 0;
					margin-right: 30rpx;
					font-size: 28rpx;
					border-bottom: 1px solid #707073;
					line-height: 40rpx;
					color: white;
				}
			}
		}
	}

	@keyframes move {
		from {
			transform: rotateZ(0deg);
		}

		to {
			transform: rotateZ(360deg);
		}
	}
</style>
