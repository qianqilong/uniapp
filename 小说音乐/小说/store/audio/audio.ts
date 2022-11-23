import { ajax } from '@/common/ajax'
import obj from './music'

let music, timer;
export const audio = {
	namespaced: true,
	state: () => {
		return {
			playStatus: false, // 当前播放状态
			audioList: [],// 音频列表
			indexPlay: 0,// 当前歌曲标识
			durationTime: 300,// 总时长
			currentTime: 0,// 当前时长
			nightFlag:true, // 是否是白天
		}
	},
	mutations: {
		INIT(state, value) {
			state.audioList = value
		},
		// 监听事件
		ADDAUDIOEVENT(state,dispatch) {
			music.onCanplay(()=>{
				state.durationTime = music.duration	
			   
				// #ifdef MP-WEIXIN
				 state.durationTime = 300
				// #endif
			})
			// 音频播放事件	
			music.onPlay(() => {	
				console.log('播放')
			})
			// 音频暂停事件
			music.onPause(() => {
				console.log('暂停')
			})
			// 音频停止事件	
			music.onStop(() => {
				console.log('停止')
			})
			// 音频自然播放结束事件	
			music.onEnded(() => {
				console.log('结束')
				dispatch('changeIndex',state.indexPlay+1)
			})
			// 音频播放错误事件
			music.onError((res) => {
				state.playStatus=false
				// dispatch('changeIndex',state.indexPlay+1)
			})
			// 音频播放进度更新事件
			music.onTimeUpdate(() => {
				state.currentTime = music.currentTime
			})
		},
		// 取消监听
		DESTRUCTION() {
			// 取消监听 onPlay 
			music.offPlay()
			// 取消监听 onPause 
			music.offPause()
			// 取消监听 onStop 
			music.offStop()
			// 取消监听 onEnded 
			music.offEnde()
			// 取消监听 onTimeUpdate 
			music.offTimeUpdate()
			// 取消监听 onError 
			music.offError()
		},
		// 播放事件
		ADUDIOPLAY(state) {			
			music.play()
			state.playStatus = true
		},
		// 暂停
		ADUDIOPAUSE(state) {
			music.pause()
			state.playStatus = false
		},
		// 停止
		AUDIOSTOP() {
			music.stop()
		},
		// 改变播放标识
		CHANGEINDEX(state, value: number) {
			state.indexPlay = value
		},
	    // 音频跳转
		ADUDIOSEEK(state,value:number){
			music.seek(+value)
		}
	
	},
	actions: {
		// 初始化
		async init(context) {
			if (music) return;
			music = uni.createInnerAudioContext();
			// 获取资源
			// const list:any = await ajax({ url: '/musicResourecs', method: 'GET' })
			const list = obj
			list ? context.commit('INIT', list.musicResourecs) : ''
			music.src =context.state.audioList[context.state.indexPlay].src	
			context.commit('ADDAUDIOEVENT',context.dispatch)
			console.log(list);
		},
		// 播放和暂停
		playOrPause(context) {
			context.state.playStatus
				? context.commit('ADUDIOPAUSE')
				: context.commit('ADUDIOPLAY')
		},
		// 切换歌曲
		changeIndex(context, value: number) {
			if (value < 0)  value =context.state.audioList.length - 1
			if (value >context.state.audioList.length - 1) value = 0
			// 先停止
			context.commit('AUDIOSTOP')
			// 切换歌曲
			context.commit('CHANGEINDEX', value)
			music.src =context.state.audioList[value].src
			// 播放音乐
			context.commit('ADUDIOPLAY')
		},
	    // 滑动
		sliderToplay(context,value){
			 context.commit('ADUDIOSEEK',value)
			 if(!context.state.playStatus){
			  	// 如果暂停下拖到就播放
			  	// context.commit('ADUDIOPLAY')
			  	context.state.currentTime=+value
			  	// music.startTime=context.state.currentTime		  	
			  }	
		},
		// 切换白天黑夜
		ChangeNightFlag(context){
		  context.state.nightFlag=!context.state.nightFlag
		}
	},


	getters: {

	},
}