<template>
	<view >
		<template v-for="(item,index) in books" :key="item.id">
					<view class="index-books" :style="{height: flag?'250rpx':''}">
					   	  <image :src="item.imgurl" mode="aspectFill" :style="{width: flag?'200rpx':'',height: flag?'200rpx':''}"></image>
						  <view class="index-book-text">
						  	<text>{{item.name}}</text>
						  	<text>{{item.synopsis}}</text>
							<global-icon iconId="icon-diandian" :iconSize="30" class="index-book-icon" v-if="flag" @tap="cancalCollect(item.id)"/>
						  </view>
					</view>   
		</template>	
	</view>
</template>

<script lang="ts" setup>
interface books {
id:string
imgurl:string
name:string
synopsis:string
}
	
interface Props{
	books:Array<books>
	flag?:boolean
}
withDefaults(defineProps<Props>(),{books:()=>[],flag:false})

const emit=defineEmits<{(e:'cancalCollect',id):void}>()
// 取消收藏(通知父组件)
const cancalCollect=(id)=>{
	emit('cancalCollect',id)
}
</script>

<style lang="scss" scoped>
.index-books{
		display: flex;
		align-items: center;
		height: 320rpx;
		padding: 0 20rpx;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		image{
			flex-shrink: 0; // 不让flexb布局给其拉伸
			width: 250rpx;             
			height: 250rpx;
			border-radius: 20rpx;
			margin-right: 20rpx;
		}
		.index-book-text{
			display: flex;
			flex-wrap:wrap;
			flex-direction: column;
			position: relative;
			.index-book-icon{
				position: absolute;
				right: 0;
			}
		   text{
			   &:nth-child(1){
				   margin-bottom: 20rpx;
				   font-size: 35rpx;
				   font-weight: 700;
			   }
			   &:nth-child(2){
				   font-size: 28rpx;
				   color:rgba(0, 0, 0, 0.5);
			   }
		   }
		}
	}
		
</style>
