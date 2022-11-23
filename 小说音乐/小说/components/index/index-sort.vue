<template>
	<view v-if="sortArr.length" class="index-sort">
		<template v-for="(item,index) in sortArr" :key="index">
			<view class="index-sort-icon" @tap="Jump(index)">
				<global-icon :iconId="item.iconId" :iconColor="item.iconColor" :iconSize="65" />
				<text>{{item.name}}</text>
			</view>
		</template>
	</view>
</template>

<script lang="ts" setup>
interface Props{
	sortArr:Array<{
		iconId:string
		iconColor:string
		name:string
	}>
}
withDefaults(defineProps<Props>(),{sortArr:()=>[]})

const pageList={
	[0]:'/pages/index/indexList/indexList',
	[1]:'/pages/index/indexRead/indexRead',
	[2]:'/pages/index/indexMusic/indexMusic',
	[3]:'/pages/index/indexKnowledge/indexKnowledge',
}
// 跳转
const Jump=(index)=>{
	 uni.navigateTo({
		 url:pageList[index]
	 })
}
</script>

<style lang="scss"  scoped>
.index-sort{
	width: 80%;
	margin: 20rpx auto;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: space-between;
	.index-sort-icon{
		display: flex;
		flex-direction: column;
		text{
			color:rgb(0,0,0,0.5);
		}
	}
}
</style>
