
## 显示tab和隐藏tab

## rpx和px之间相互转换的方法
```js
// 基本方法	
 Torpx = num => 750 * num /  uni.getSystemInfoSync().windowWidth, // px转rpx
 Topx = num => num * uni.getSystemInfoSync().windowWidth / 750; // rpx转px
```
## 计算剩余高度的hooks
```js
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
```

