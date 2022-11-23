<template>
	<view >
		<view class="popup" :animation="BottomanimationDataPopup">
		     <view class="popup-list" @tap="cancelColl">
				 <global-icon iconId="icon-xingxing" iconColor="red"/>
			    {{text}}
	      	 </view>
		     <view class="popup-cancel" @tap="hide">
			  取消
		     </view>
		</view>
		<view class="masking" v-if="flagMask" @tap="hide"></view>
	</view>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useAddanimate } from '@/hooks/reading'

interface Props{
  text:string
}	
defineProps<Props>()
// 执行取消
const emit =defineEmits<{(e:'cancelColl'):void}>()
// 蒙层
const flagMask=ref(false)
// 添加动画
const {BottomanimationDataPopup,showBottomPopup,hideBottomPopup}=useAddanimate('Popup') as any

//控制显示
const show=()=>{
	flagMask.value=true
	// -200rpx转换成px
	showBottomPopup(-200* uni.getSystemInfoSync().windowWidth / 750)
	uni.hideTabBar({
		animation:true
	})
}
// 控制隐藏 // 取消
const hide=()=>{
	flagMask.value=false
	uni.showTabBar({
		animation:true
	})
	hideBottomPopup()
}
// 点击取消收藏
const cancelColl=(callback)=>{
	emit('cancelColl')
	hide()
}

defineExpose({
	show
})

</script>

<style lang="scss" scoped>
.masking{
	position: absolute;
	width: 100%;
	height: 100%;
	top:0;
	left:0;
	right: 0;
	border: 0;
	background-color: rgba(0, 0, 0, 0.3);
}
.popup{
	width: 100%;
	height: 200rpx;
	z-index:1;
	background-color: white;
	position: fixed;
	bottom: -200rpx;
	.popup-list{
		padding-left: 30rpx;
		line-height: 100rpx;
		border-bottom: 5rpx solid rgba(0, 0, 0, 0.1);
		font-size: 28rpx;
	}
	.popup-cancel{
		border-top: 5rpx solid rgba(0, 0, 0, 0.1);
		text-align: center;
		line-height: 100rpx;
		font-size: 34rpx;
	}
}
</style>
