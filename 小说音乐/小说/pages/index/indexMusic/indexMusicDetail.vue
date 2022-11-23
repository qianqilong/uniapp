<template>
	<view :class="!nightFlag?'nightTheme':''">
		<global-pageTitle >音乐详情</global-pageTitle>
		<view class="container">
			<scroll-view scroll-y="true">
				<!-- 歌曲信息 -->
				<view class="music-title">
				    <view>
				         <text>歌曲:</text>
				         <text>{{MusicInfo[0]}}</text>
					</view>
				    <view>
						   <text>歌手:</text>
						   <text>{{MusicInfo[1]}}</text>
					</view>
				</view>	
			    <!-- 歌曲图片 -->
				<view class="music-image">
			    	<image src="../../../static/music/music1.png" mode="widthFix"></image>
			    </view>
				<!-- 歌曲滚动条 -->
				<view class="music-slider">
					<!-- 歌曲总时长 -->
					<view>{{durationTime[0]}}</view>
					<view>
						<slider block-size="13" activeColor="#e48267" backgroundColor="#eef2f3" :value="currentTime[1]" :max="durationTime[1]" @change="sliderToplay" @changing="sliderToplay" />
					</view>
					<!-- 当前时间 -->
					<view>{{currentTime[0]}}</view>
				</view>
			    <!-- 按键部分  -->
			  	<view class="music-icon">
					<view class="music-icon-top">
						<view @tap="changeIndex('-')">
							<global-icon iconId="icon-shangyixiang" :iconSize="85"  />
						</view>
						<view @tap="playOrPause">
							<global-icon :iconId="!flag?'icon-bofang1':'icon-zanting'" :iconSize="80" />
						</view>
						<view @tap="changeIndex('+')">
						    <global-icon iconId="icon-xiayixiang" :iconSize="85"  />
						</view>
					</view>
					<view class="music-icon-bottom">
						<view @tap="listFlag=!listFlag">
							<global-icon :iconId="listFlag?'icon-icon--':'icon-liebiao'" :iconSize="60" />
							<text>播放列表</text>
						</view>
						<view @tap="collectFlag=!collectFlag">
							<global-icon :iconId="collectFlag?'icon-aixinfengxian':'icon-xihuan2'" :iconSize="60" />
							<text>收藏</text>
						</view>
						<view @tap="nightFlag=!nightFlag">
							<global-icon :iconId="nightFlag?'icon-yejianmoshi':'icon-yueliang'" :iconSize="60" />
							<text>夜间模式</text>
						</view>
					</view>
				</view>
			    <!-- 歌曲介绍 -->
				<view class="music-detail animated fadeInUp" v-if="listFlag">
			    	<view class="music-detail-introduce">
			    		<view>
			    		    <view>
			    		         <text>歌曲:</text>
			    		         <text>{{MusicInfo[0]}}</text>
			    			</view>
			    		    <view>
			    				   <text>歌手:</text>
			    				   <text>{{MusicInfo[1]}}</text>
			    			</view>
			    		</view>	
						<view class="music-detail-icon" @tap="showPopup">
							<global-icon iconId="icon-jieshao" :iconSize="60" />
						</view>
						
			    	</view>
					<view class="music-author-introduce">
						<view >
							歌手简介:
						</view>
						<view v-if="MusicInfo[2]!==''">
							{{MusicInfo[2]}}							
						</view>
					</view>
			    </view>
			    <!-- 播放列表 -->
				<view class="music-list animated fadeInUp" v-else>
					<view class="music-list-header">
						列表选择
					</view>
					<scroll-view scroll-y class="music-list-context">
						<template v-for="(item,index) in audioList" :key="item.id">
						   <view class="music-list-item" hover-class="active" @tap="changeIndex(index)">
							<text>{{item.name}}</text>
							<text>{{item.singer.name}}</text>
							<view >		
								<text v-show="Index==index">播放</text>
								<global-icon iconId="icon-bofangsanjiaoxing" :iconSize="40" v-show="Index==index"/>
							</view>
						   </view>
						</template>
					</scroll-view>
				</view>
			</scroll-view>
		</view>
		<global-popup ref="popup" :text="MusicInfo[2]"/>
	</view>
</template>

<script lang="ts" setup>
    import { useTime,useMusicInfo,useSetMusic,useSwitchMusic,useChnagenight} from '@/hooks/audio'
    import { ref} from 'vue'
   
    // 播放的状态 播放音频  处理进度条
	const {flag,playOrPause,sliderToplay}=useSetMusic()
	// 第几首音乐  切换音乐  音乐列表
	const {Index, changeIndex, audioList}=useSwitchMusic()
	// 音乐的信息
	const MusicInfo=useMusicInfo(Index,audioList)
    // 音乐的时间
	const [durationTime,currentTime]=useTime()
	// 列表显示与否        
	const listFlag=ref(true)
	// 列表按键
	const collectFlag=ref(true)
	// 黑夜模式
	const nightFlag=useChnagenight()
	// 弹出层
	const popup=ref(null)
	// 显示弹出层
	const showPopup=()=>{
		popup.value.show()
	}
</script>

<style lang="scss" scoped>
	
	@keyframes myfirst
		{
		    from {transform: scale(1.3);}
		}
	.active{
		background-color: #f8f9fa;
	}
	
	
	
.music-title{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 23rpx 0;
	view{
		text{
			&:nth-child(1){
				font-size: 28rpx;
			}
			&:nth-child(2){
				font-weight: 700;
			}
		}
	}
}
.music-image{
	height: 420rpx;
	width: 85%;
	margin: 0 auto;
	overflow: hidden;
	border-radius: 35rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.music-slider{
	display: flex;
	justify-content: center;
	align-items: center;
	color: #7a8388;
	font-size: 28rpx;
	height: 65rpx;
	margin: 20rpx 0;
	view {
		&:nth-child(2) {
			width: 500rpx;
		}
	}
}
.music-icon{
	margin-top:20rpx;
.music-icon-top{
	display: flex;
   justify-content: center;
   view{
	  &:nth-child(2){
	  		 margin: 0 50rpx 0 60rpx;
	  		 
	  } 
	  &:active{
	  		animation-name: myfirst; // 动画名
	  		animation-duration: 1s;
	  		animation-fill-mode: both;
	  }
   }

}
.music-icon-bottom{
	display: flex;
	justify-content: center;
	view{
		display: flex;
		flex-direction: column;
		margin: 60rpx 35rpx;
		align-items: center;
		text{
			margin-top: 15rpx;
			font-size: 25rpx;
			color: rgba(0, 0, 0, 0.5);
			
		}
	}
}
}
.music-detail{
	// position: fixed;
	box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);	
    margin: 0 auto;
	height:240rpx;
	width: 95%;
	padding: 20rpx 15rpx;
	box-sizing: border-box;
	border-radius: 30rpx;
	.music-detail-introduce{
		display: flex;
		justify-content: space-between;
		view{
			&:nth-child(1){
			 text{
				&:nth-child(1){
					font-size: 28rpx;
				}
				&:nth-child(2){
					font-weight: 700;
				}
			 }	
			}
		}
		.music-detail-icon{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
		}
	}
	.music-author-introduce{
		margin-top: 20rpx;
		font-size: 28rpx;
		view{
			&:nth-child(2){
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}
}
.music-list{
	box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
	margin: 0 auto;
	height:400rpx;
	width: 95%;
	padding: 20rpx 15rpx;
	padding-right: 40rpx;
	box-sizing: border-box;
	border-radius: 30rpx;
	.music-list-header{
		font-weight: 700;
		height: 50rpx;
		line-height: 50rpx;
	}
	.music-list-context{
		height: 330rpx;
		margin-left: 20rpx;
		overflow: hidden;
		.music-list-item{
			display: flex;
			align-items: center;
			height: 85rpx;
			text{
				text-overflow: ellipsis;
				&:nth-child(1){
					margin-left: 10rpx;
					flex: 1;
					font-size: 27rpx;
				}
				&:nth-child(2){
					flex: 1;
					font-size: 27rpx;
				}
			}
			view{		
				flex: 1;
				text{
					margin-right: 10rpx;
				}
			}
		}
	}
}
</style>
