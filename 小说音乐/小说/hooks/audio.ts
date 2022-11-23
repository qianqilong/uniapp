import { computed, Ref } from "vue";
import { useStore } from 'vuex'

// 获取时长信息
export const useTime = () => {
	const store = useStore()

	const formatTime = (time) => {
		let m = Math.floor(time / 60)
		let s = Math.floor(time % 60)
		// 补0
		const zero = (x: number) => ('0').repeat(2 - x.toString().length)
		return `${zero(m > 0 ? m : 1) + m}:${zero(s > 0 ? s : 1) + s}`
	}
	// 总时长
	const durationTime = computed(() => {
		console.log(store.state.audio.durationTime);
		const time = store.state.audio.durationTime
		return [formatTime(time), time]
	})
	// 当前时长
	const currentTime = computed(() => {
		const time = store.state.audio.currentTime
		return [formatTime(time), time]
	})
	return [durationTime, currentTime]
}

// 获取音乐的信息
export const useMusicInfo = (index: Ref<number>, list: any) => {
	return computed(() => {
		const info = list.value[index.value]
		return info ? [info.name, info.singer.name,info.singer.synopsis,info.id] : ['', '','','']
	})
}

// 处理音乐的信息
export const useSetMusic = () => {
	const store = useStore()
	// 播放的状态
	const flag = computed(() => {
		return store.state.audio.playStatus
	})
	// 播放音频
	const playOrPause = () => {
		store.dispatch('audio/playOrPause')
	}
	// 处理进度条
	const sliderToplay = (e) => {
		store.dispatch('audio/sliderToplay', e.detail.value)
	}
	return { flag, playOrPause, sliderToplay }
}

// 切换音乐
export const useSwitchMusic = () => {
	const store = useStore()
	// 第几首音乐
	const Index: Ref<number> = computed({
		set(value) {
			if (value < 0) value = audioList.value.length - 1
			if (value > audioList.value.length - 1) value = 0
			store.dispatch('audio/changeIndex', value)
		},
		get() {
			return store.state.audio.indexPlay
		}
	})
	// 切换音乐
	const changeIndex = (start) => {
		switch (start){
			case '+':Index.value++ 
				break;
			case '-':Index.value--
				break;
	       default: Index.value=start
		        break;
		}
		// start === '+' ? Index.value++ : Index.value--
	}
	// 音乐列表
	const audioList = computed(() => {
		return store.state.audio.audioList
	})
	return { Index, changeIndex, audioList }
}
// 切换夜间模式
export const useChnagenight=()=>{
  const store=useStore()
  const nightFlag=computed({
  set(){
	  store.dispatch('audio/ChangeNightFlag')  
  },
  get(){
	 	return store.state.audio.nightFlag  
  }
  })
  return nightFlag
}