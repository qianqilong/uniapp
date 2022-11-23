<template>
	<view>
		<view class="popup" v-if="flag">
		 {{text}}
		</view>
		<view class="masking" v-if="flag" @tap="flag=false"></view>
	</view>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

interface Props{
  text:string
}	
defineProps<Props>()
const flag=ref(false)
//控制显示
const show=()=>{
	flag.value=true
}
defineExpose({
	show
})
</script>

<style lang="scss" scoped>
.popup{
  position: absolute;
  top: 300rpx;
  left: 75rpx;
  width: 80%;
  height: 50vh;
  z-index: 200;
  border-radius: 50rpx;
  box-sizing: border-box;
  padding: 30rpx;
  background-color: white;
  font-size: 28rpx;
}
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
</style>
