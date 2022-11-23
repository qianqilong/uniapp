<template>
	<view class="tab-list">
	  <template v-for="(item,index) in tabArr" :key="index">
	  	<view class="tab-item" @tap="getTabIndex(index)">
			<view :class="{active:tabIndex===index}">{{item}}</view>
			<view v-if="tabIndex===index"></view>
		</view>
	  </template>
	</view>
</template>

<script lang="ts" setup>
	import {computed} from 'vue'
	interface Props{
		tabArr:Array<string>,
		index?:number
	}
	const props=withDefaults(defineProps<Props>(),{tabArr:()=>[],index:0})
	
	const emit=defineEmits<{(e:'getTabIndex',index:number):void}>()
	// const tabIndex=ref(props.index)
	const tabIndex=computed({
		get(){
			return props.index
		},
		set(index){
			emit('getTabIndex',index)
		}
	})
	const getTabIndex=(index:number)=>{
		tabIndex.value=index
		emit('getTabIndex',index)
	}
</script>

<style lang="scss" scoped>
.tab-list{
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: white;
	height: 80rpx;
	border-bottom:0.5rpx solid #a8b0c3 ;
	.tab-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding-top: 20rpx;
		height: 60rpx;
		.active{
		color:black;
		font-weight: 700;
		}
		view{
			font-size: 28rpx;
			color: rgba(0, 0, 0, 0.3);
			&:nth-child(2){
				width: 70rpx;
				border-radius: 35rpx;
				height: 8rpx;
				background-color: #fb5b39;
			}
		}
	}
}

</style>
