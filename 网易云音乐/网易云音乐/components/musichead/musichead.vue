<template>
	<view class="music-head" :style="{color:color}">
		<view class="music-head-icon" v-if="icon">
			<text class="iconfont iconzuojiantou-copy"  @click="handleToback"></text>|
			<text class="iconfont iconshouye"  @click="handleToHome"></text>
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
			},
			icon:{
				type:Boolean,
				default:true
			},
			color:{
				type:String,
				default:'black'
			}
		},
		name:"musichead",
		data() {
			return {
				
			};
		},
		methods:{
			// 返回上一级
			handleToback(){
				uni.navigateBack()
			},
			// 返回首页
			handleToHome(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
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