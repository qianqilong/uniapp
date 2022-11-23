<template>
	<view >
		<swiper indicator-dots autoplay circular class="carousel" @change="getIndex"  indicator-active-color="#ffffff"  v-if="imgArr&&imgArr.length!==0">
			<swiper-item v-for="(item,index) in imgArr" :key="index">
				<image :src="item.src" mode="aspectFill" style="width: 100%;height: 100%;" :class="{'myanimation':index===Index}" class="animated"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
	
 interface Props{
	imgArr:Array<{src:string}>
 }
 // 设置props默认值
withDefaults(defineProps<Props>(),{imgArr:()=>[]})


const Index=ref(0)
// 获取轮播图的index
const getIndex=(e)=>{
	Index.value=e.detail.current
}

</script>

<style lang="scss" scoped>
	@keyframes myfirst
	{
	    from {transform: scale(1.3);}
	}
.carousel{
	height: 380rpx; 
	width: 90%; 
	margin:0 auto;
	border-radius: 25rpx;
	overflow: hidden;
	.animated {
	  animation-duration: 1s;
	  animation-fill-mode: both;
	}
  .myanimation{
	  animation-name: myfirst; // 动画名
  }
}
</style>
