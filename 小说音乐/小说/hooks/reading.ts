import { getCurrentInstance, ref, reactive, computed } from 'vue'
import test from '@/common/test'
import { onLoad } from '@dcloudio/uni-app'
// 计算剩余高度()
export const useHeight = () => {
	const instance = getCurrentInstance()
	// 基本参数
	let screenWidth = uni.getSystemInfoSync().windowWidth, // 屏幕宽度
		screenHeight = uni.getSystemInfoSync().windowHeight; // 屏幕高度 

	const getSystemHeight = ({ isRpx = true }) => isRpx ? Torpx(screenHeight) : screenHeight; // 获取屏幕高度
	// 基本方法	
	const Torpx = num => 750 * num / screenWidth// px转rpx
	// 计算高度
	const calHeight = ref(getSystemHeight(true) - Torpx(instance.proxy.$height))// 页面高度

	return calHeight
}

// 小说的信息
export const useBookInfo = () => {
	// 小说的信息
	const bookInfo = reactive({
		name: test.name, // 书名
		Index: 0, // 当前章节标识
		loadContent: [], // 已经加载的章节
		pageLength: 1, // 章节的长度
		chapterCatalog: [], // 章节的信息
	})
	// 获取章节id
	onLoad((option) => {
		// 标识对应id-1
		bookInfo.Index = +option.id - 1
		// 加载的章节
		const content = test.content.find((item) => {
			if (item.id === bookInfo.Index + 1) {
				return item
			}
		})
		bookInfo.chapterCatalog = test.chapterCatalog
		bookInfo.loadContent[bookInfo.Index] = { text: content.text, chapterCatalog: content.chapter }
		// 获取章节的长度
		bookInfo.pageLength = test.chapterCatalog.length

	})
	// 切换章节
	const switchPage = (e) => {
		// 如果对应的数组位置部存在数据
		if (!bookInfo.loadContent[e.detail.current]) {
			const content = test.content.find((item) => {
				if (item.id === e.detail.current + 1) {
					return item
				}
			})
			bookInfo.loadContent[e.detail.current] = { text: content.text, chapterCatalog: content.chapter }
		}
		bookInfo.Index = e.detail.current
	}
	return [bookInfo, switchPage]
}

// 修改字体
export const useSetFont = () => {
	// 字体(本地存储中获取值)
	const font = reactive({
		fontSize: uni.getStorageSync('fontSize') ? uni.getStorageSync('fontSize') : 20,
		fontSpacing: uni.getStorageSync('fontSpacing') ? uni.getStorageSync('fontSpacing') : 20,
	})
	// 防抖
	const timer: any = ref()
	// 改变字体大小
	const changefontSize = (e) => {
		clearTimeout(timer.value)
		timer.value = setTimeout(() => {
			font.fontSize = e.detail.value
			uni.setStorageSync('fontSize', font.fontSize);
		}, 300)

	}
	// 改变字体间距
	const changefontSpacing = (e) => {
		clearTimeout(timer.value)
		timer.value = setTimeout(() => {
			font.fontSpacing = e.detail.value

			uni.setStorageSync('fontSpacing', font.fontSpacing)
		}, 300)
	}
	return { font, changefontSize, changefontSpacing }
}

// 设置亮度
export const useSetbrightNess = () => {
	const brightNess = ref(0)
	// 获取亮度
	uni.getScreenBrightness({
		success: (val) => brightNess.value = Math.floor(val.value) / 8 * 100
	})
	// 设置亮度
	const setBrightNess = (e) => {
		// #ifdef APP
		let newVal = e.detail.value
		brightNess.value = newVal
		uni.setScreenBrightness({
			value: newVal * 8 / 100
		})
		// #endif
	}
	return [brightNess, setBrightNess]
}

// 设置主题
export const useSetTheme = (themes: any) => {
	// 主题标识
	const themeIndex = ref(uni.getStorageSync('themeIndex') ? +uni.getStorageSync('themeIndex') : 3)// 主题的标识
	// 更改主题标识
	const changeTheme = (id) => {

		let curIndex = themes.findIndex(item => item.id === id)
		console.log(curIndex, id);
		themeIndex.value = curIndex
		uni.setStorageSync('themeIndex', themeIndex.value)
	}
	// 当前主题
	const thisTheme = computed(() => {
		return themes[+themeIndex.value].id
	})
	return [thisTheme, changeTheme]
}


// 添加动画
export const useAddanimate = (name:string) => {
	const height=getCurrentInstance().proxy.$height
	const obj={}
	// 防止引入同一动画对象
	const arrName=[
		"TopanimationData"+name,
		"Topanimation"+name,
		"showTop"+name,
		"hideTop"+name,
		
		"BottomanimationData"+name,
		"Bottomanimation"+name,
		"showBottom"+name,
		"hideBottom"+name,
		
		"LeftanimationData"+name,
		"Leftanimation"+name,
		"showLeft"+name,
		"hideLeft"+name,
	]
	
	// 添加动画
	obj[arrName[0]]= ref()
	// 创建动画
	obj[arrName[1]] = uni.createAnimation()
	// 上方显示动画(对应的定位写(-top)px)
	obj[arrName[2]] = (top: number) => {
		obj[arrName[1]].translate3d(0, top+height, 0).step()
		obj[arrName[0]].value = obj[arrName[1]].export()
	}
	// 上方隐藏动画
	obj[arrName[3]] = () => {
		obj[arrName[1]].translate3d(0, 0, 0).step()
		obj[arrName[0]].value = obj[arrName[1]].export()
	}
	
	// 添加动画
	obj[arrName[4]] = ref()
	// 创建动画
	obj[arrName[5]] = uni.createAnimation()
	// 下方显示动画(对应的定位写(bottom)px)
	obj[arrName[6]] = (bottom: number) => {
		obj[arrName[5]].translate3d(0, bottom, 0).step()
		obj[arrName[4]].value = obj[arrName[5]].export()
	}
	// 下方隐藏动画
	obj[arrName[7]] = () => {
		obj[arrName[5]].translate3d(0, 0, 0).step()
		obj[arrName[4]].value = obj[arrName[5]].export()
	}
	
	// 添加动画
	obj[arrName[8]]= ref()
	// 创建动画
	obj[arrName[9]] = uni.createAnimation()
	// 左边显示动画(对应的定位写(-top)px)
	obj[arrName[10]] = (left: number) => {
		obj[arrName[9]].translate3d(left, 0, 0).step()
		obj[arrName[8]].value = obj[arrName[9]].export()
	}
	// 左边隐藏动画
	obj[arrName[11]] = () => {
		obj[arrName[9]].translate3d(0, 0, 0).step()
		obj[arrName[8]].value = obj[arrName[9]].export()
	}
return 	{		
	 ...obj
	}
}
