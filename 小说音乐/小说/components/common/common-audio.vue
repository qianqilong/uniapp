<template>
	<view class="audio"  v-if="audioList" @tap="toDetailpage">
		<!-- 进度部分 -->
		<view class="audio-slider">
			<!-- 歌曲总时长 -->
			<view>{{durationTime[0]}}</view>
			<view  @tap.stop>
				<slider block-size="13" activeColor="#e48267" backgroundColor="#eef2f3" :value="currentTime[1]" :max="durationTime[1]" @change="sliderToplay" @changing="sliderToplay" />
			</view>
			<!-- 当前时间 -->
			<view>{{currentTime[0]}}</view>
		</view>
		<view class="audio-info">
			<!-- 音频的相关信息 -->
			<view >
				<view v-show="MusicInfo[0]!==''">歌手-{{MusicInfo[0]}}</view>
				<view v-show="MusicInfo[1]!==''">歌曲-{{MusicInfo[1]}}</view>
			</view>
			<!-- 按键 -->
			<view @tap.stop>
				<global-icon iconId="icon-shangyishou" :iconSize="75" @tap="changeIndex('-')"></global-icon>
				<global-icon :iconId="!flag?'icon-ziyuan':'icon-bofang'" :iconSize="75" style="margin: 0 20rpx;"
					@tap="playOrPause" />
				<global-icon iconId="icon-xiayishou" :iconSize="75" @tap="changeIndex('+')"></global-icon>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {useStore} from 'vuex'
	import {onBeforeUnmount,onMounted} from "vue";
    import { useTime,useMusicInfo,useSetMusic,useSwitchMusic} from '@/hooks/audio'

	const store = useStore()
	// 初始化音频
	const init = () => {
		store.dispatch('audio/init')
	}
	// 销毁音频
	const destory = () => {
		store.commit('audio/DESTRUCTION')
	}
	// 播放的状态 播放音频  处理进度条
	const {flag,playOrPause,sliderToplay}=useSetMusic()
	// 第几首音乐  切换音乐  音乐列表
	const {Index, changeIndex, audioList}=useSwitchMusic()
	// console.log(audioList);
	// 音乐的信息
	const MusicInfo=useMusicInfo(Index,audioList)
    // 音乐的时间
	const [durationTime,currentTime]=useTime()	
	
	// 跳转
	const toDetailpage=()=>{
		uni.navigateTo({
			url:'/pages/index/indexMusic/indexMusicDetail'
		})
	}
	onMounted(() => {
		init()
	})
	onBeforeUnmount(() => {
		destory()
	})
</script>

<style lang="scss" scoped>
	.audio {
		position: fixed;
		right: 0;
		/* #ifdef  APP-PLUS  */
		bottom: 8rpx;
		/* #endif  */
		/* #ifdef  H5  */
		bottom: 110rpx;
		/* #endif  */
		/* #ifdef  MP-WEIXIN  */
		bottom: 8rpx;
		/* #endif  */
		left: 0;
		z-index: 1030;
		height: 160rpx;
		margin: 0 20rpx;
		background-color: #d1ccc0;
		opacity: .9;
		border-radius: 20rpx;

		.audio-slider {
			justify-content: center;
			align-items: center;
			display: flex;
			color: #7a8388;
			font-size: 28rpx;
			height: 65rpx;

			view {
				&:nth-child(2) {
					width: 500rpx;
				}
			}
		}

		.audio-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 20rpx;

			view {
				&:nth-child(1) {
					font-size: 28rpx;
					color: #424651;
				}

				&:nth-child(2) {
					font-size: 28rpx;
					color: #424651;
				}
			}
		}
	}
</style>
