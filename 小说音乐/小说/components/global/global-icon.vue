<template>
	<text class="iconfont" :class="[props.iconId]" :style="{fontSize:iconSize+'rpx',color:iconColor?iconColor:(color? '#343a40':'#c1cbcd')}"></text>
</template>

<script lang="ts" setup>
import {useChnagenight} from '@/hooks/audio'
const props=defineProps({
		iconId:{
		 type:String
		},
		iconColor:{
			type:String
		},
		iconSize:{
			type:Number,
			default:45
		}
	})
const color= useChnagenight()
</script>

<style lang="scss" scoped>
.color{
	
}
</style>
