## 1.前期准备
### 1.不要准备微信的app-id
```js
准备了微信的id微信开发者工具要对应的id的账号才能登录
```
### 2.导入字体图标
1. 进入网址www.iconfont.cn
2. 下载图标并引入文件
```js
iconfont.eot
iconfont.svg
iconfont.ttf
iconfont.woff
iconfont.woff2

引入iconfont.css并修改路径
```
### 3.自定义导航
1. 把navigationStyle设为custom
```js
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			...
			"style": {
				"navigationStyle": "custom"
				
			}
		}
	],
	...
}
```
2. 书写头部组件(设计稿要调节尺寸750px)
```js
<template>
	<view class="music-head">
		<view class="music-head-icon">
			<text class="iconfont iconzuojiantou-copy"></text>|
			<text class="iconfont iconshouye"></text>
		</view>
		
		{{title}}
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'网易云音乐'
			}
		},
		name:"musichead",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
 .music-head{
	 width: 100%;
	 height: 75px;
	 font-size: 16px;
	 line-height: 80px;
	 text-align: center;
	 color: black;
	 position: relative;
	 .music-head-icon{
		 position: absolute;
		 top:24px;
		 left: 8px;
		 width: 90px;
		 height: 30px;
		 background-color: rgba(0, 0, 0, .4 );
		 line-height: 31px;
		 color:white;
		 border-radius: 15px;
		 display: flex;
		 justify-content: space-evenly;
	 }
 }
</style>
```
3. 头部组件返回功能的实现
```html
<view class="music-head-icon">
			<text class="iconfont iconzuojiantou-copy"  @click="handleToback"></text>|
			<text class="iconfont iconshouye"  @click="handleToHome"></text>
</view>
<script>
	export default {
		...
		methods:{
			// 返回上一级
			handleToback(){
				uni.navigateBack()
			},
			// 返回首页
			handleToHome(){
				
			}
		}
	}
</script>
```
### 4.书写视区的样式
1. 添加内置滚动组件
```js
<template>
	<view>
		<Musichead title="网易云音乐" :icon="false"></Musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view v-for="item in 100">111</view>	
			</scroll-view>
		</view>
	</view>
</template>
```
2. 设置container为滚动区
```js
.container{
		width: 100%;
		height: calc(100vh - 70px);
		overflow: hidden;
		scroll-view{
			height: 100%;
		}
	}
```
### 5.uniapp请求的封装
1. 封装请求
```js
const baseUrl="http://localhost:3000"

// 封装请求函数
export const ajax=(options={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
				url: baseUrl + options.url,
				method: options.method,
				data: options.data,
				success: (response) => {
					return resolve(response.data)
				},
				fail: (fail) => {
					console.log('fail',fail)
					return reject(fail);
				}
			})
	})
}
```
2. 简单的使用
```js
import {ajax} from './ajax.js'

export const getTopListAPI=()=>
ajax({
	url:'/toplist',
	method:'GET',
})
```
### 4.时间戳和中国标准时间的格式化
```js
formatDate (d) {
			   let date = new Date(d);
			   let YY = date.getFullYear() + '-';
			   let MM =
			     (date.getMonth() + 1 < 10
			       ? '0' + (date.getMonth() + 1)
			       : date.getMonth() + 1) + '-';
			   let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			   let hh =
			     (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			   let mm =
			     (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
			     ':';
			   let ss =
			     date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			   return YY + MM + DD + ' ' + hh + mm + ss;
			 },

```
### 5.分离歌词的时间和歌词
1. 歌词字符串
```js
[00:00.000] 作词 : KKECHO/那奇沃夫
[00:01.000] 作曲 : KKECHO/那奇沃夫
[00:02.000] 编曲 : REDBOI
[00:03.000] 制作人 : REDBOI STUDIO@DR1P
[00:15.70]yeh backset
[00:17.36]cut off my passive mood
[00:19.07]I realize it
[00:20.38]I wake up in morning and I summarize
[00:30.39]那天躺在地上的时候我就在想
[00:34.30]曾经做过的事对妈老汉儿该咋个讲
[00:37.67]他们都对我有恩
[00:39.48]我不能够辜负他们我的心里很恼火
[00:42.31]能不能好好生活这个事情我都还要仔细去雕琢
[00:45.99]住在最贫穷的街区
[00:47.79]他们都觉得我太脏了
[00:49.58]有一天掀起了血雨
[00:51.20]手腕上全部都挂满了钢索
[00:53.34]wake up in the morning
[00:57.42]我根本没想躲避
[00:59.41]他们抓住我的软肋
[01:01.01]And they start hit my head
[01:02.97]As the young boi自己忏悔
[01:04.54]那年我才18岁
[01:06.63]这的空气让我有点反胃
[01:08.31]不太想承认我犯了罪
[01:10.40]没有21还是个savage
[01:12.11]觉得时间还能够浪费
[01:14.27]I will die
[01:15.27]实在很残忍
[01:15.94]If I dont succeed
[01:17.82]这些年确实没出息
[01:19.58]我性格非常的孤僻
[01:21.39]渐渐的我学会感恩
[01:23.26]慢慢开始变得更安分
[01:25.11]在泥泞之中不停的翻滚
[01:26.92]我能够成为想成为的人
[01:29.27]always cry
[01:29.99]长太乖
[01:30.90]经常被欺负
[01:32.73]我变得坏
[01:33.66]不想再
[01:34.52]被他们低估
[01:36.58]I choose
[01:38.16]I have a city to hide
[01:40.23]I choose
[01:41.96]I have a city to hide
[01:43.41]听我说妈妈
[01:44.77]今晚我可能就先不回家了
[01:48.50]我要把年少轻狂的自己弄了
[01:52.45]看着镜子里的人wtf eh
[01:57.52]bloods on my hands
[01:58.31]我逃啊逃啊逃
[02:00.96]黑色衣裳的人也跑直到
[02:04.91]到了死胡同
[02:06.71]我开始爆粗口
[02:08.55]他让我住口
[02:10.45]对话的是me and myself
[02:13.18]我逃出我的身体这感觉很微妙
[02:16.84]空气中弥漫着忏悔的味道
[02:20.53]彩色的气泡它们将我给围绕
[02:24.21]finally im free now
[02:26.06]finally im free now
[02:27.87]他们抓住我的软肋
[02:29.66]And they start hit my head
[02:31.59]As the young boi自己忏悔
[02:33.28]那年我才18岁
[02:35.19]这的空气让我有点反胃
[02:36.92]不太想承认我犯了罪
[02:38.89]没有21还是个savage
[02:40.62]觉得时间还能够浪费
[02:42.86]他们抓住我的软肋
[02:44.26]And they start hit my head
[02:46.32]As the young boi自己忏悔那年我才18岁
[02:49.94]这的空气让我有点反胃
[02:51.59]不太想承认我犯了罪
[02:53.67]没有21还是个savage
[02:55.31]觉得时间还能够浪费
[02:57.47]yeh backset
[02:59.41]cut off my passive mood
[03:01.59]I realize it
[03:02.97]I wake up in morning and I summarize
[03:07.49]混音：REDBOI
[03:08.41]采样：Past Lives-Slushii
[03:10.35]出品：网易子弹×青云LAB×DR1P
```
2. 格式化成对象
```js
    let reg=/\[([^\]]+)\]([^\[]+)/g;	
    const result=[]
    // $0整体,$1第一匹配结果,$2第二匹配结果
    lyric.replace(reg,function($0,$1,$2){
    	result.push({time:$1,lyric:$2})
    })
    console.log(result);
```
### 6.设置点击旋转
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div{
            width: 200px;
            height: 200px;
            animation:8s linear move infinite; 
			animation-play-state:paused;
            background-color: red;
        }
        .run{
            animation-play-state: running; 
        }
        @keyframes move{
            from{transform: rotateZ(0deg);}
            to{transform: rotateZ(360deg);}
        }
    </style>
</head>
<body>
   <div></div> 
</body>
<script>
  const div=  document.querySelector('div')
  div.addEventListener('click',()=>{
    div.style.animationPlayState= "running"; 
  })
</script>
</html>
```
### 7.实现音频播放
```js
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
				}

```
### 8.vue2的数据监听问题
1. 对象的监听
```js
// 如果一个对象的初始值为空对象
   data() {
			return {
				loading: true, // 加载
				MusicDetail: {}, // 音乐的详情
			}
		},
// 要用loading进行加载等待，不可以像vue3一样直接用v-if判空，如果没有loading空数据渲染就会报错
<view v-if="!loading"></view> // 空对象的值到了loading变成false
<view v-if="JSON.stringfy(MusicDetail)！=='{}'"></view> // 无法监听到
// 后期变化时要想监听到空对象中添加值的变化
this.$set(this.MusicDetail,'name',data.songs[0].name)
```
2. 数组的监听
```js
// 如果一个对象的初始值为空数组
   data() {
			return {
				MusicDetail: [], // 音乐的详情
			}
		},
// vue中用数组的push方法等方法
// 初次向数组直接改变数组可以监听到
this.$set(this.MusicDetail,1,'打台球')
```