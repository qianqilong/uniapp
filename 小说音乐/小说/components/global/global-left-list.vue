<template>
	<view class="left-list " :animation="LeftanimationDataleft"  :class="props.class" >
		 <slot></slot>		
	   </view>
	<view class="masking" v-if="flagMask" @tap="hide"></view>
</template>

<script lang="ts" setup>
	import {ref} from 'vue'
	import {useAddanimate} from '@/hooks/reading'
	interface Props{
		class:string
	}
	const {LeftanimationDataleft,
		showLeftleft,
		hideLeftleft,}=useAddanimate('left') as any
	const props=defineProps<Props>()
		
	// 控制蒙层
	const flagMask=ref(false)
	// 主显示
	const flag=ref(false)
	// 控制显示
	const show=()=>{
		// 右边隐藏为-400rpx转换成px  num * uni.getSystemInfoSync().windowWidth / 750
	    showLeftleft(400* uni.getSystemInfoSync().windowWidth / 750)
		flagMask.value=true
		flag.value=true
	}
	// 控制隐藏
	const hide=()=>{		
		hideLeftleft()
		flagMask.value=false
		flag.value=false
	}
defineExpose({
	show,hide
})
</script>

<style lang="scss" scoped>
 .left-list{
	 position:fixed;
	 top:0;
	 left:-400rpx;
	 height: 100%;
	 width: 400rpx;
	 background-color: white;
	 z-index: 2;
 }
 .masking{
 	position: absolute;
 	width: 100%;
 	height: 100%;
 	top:0;
 	left:0;
	z-index: 1;
 	right: 0;
 	border: 0;
 	background-color: rgba(0, 0, 0, 0.3);
 }
</style>
