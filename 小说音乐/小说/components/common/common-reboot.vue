<template>
	<view class="index-reboot">
		<template v-for="(item) in Rebooks" :key="item.id">
			<view @tap="toBookDetail(item.id)">
				<image :src="item.src" mode="widthFix"></image>
				<text>{{item.name}}</text>
				<global-icon iconId="icon-erji" class="icon" iconColor="#ffffff"/>
			</view>		
		</template>
	</view>
</template>

<script lang="ts" setup>
	interface Props{
		Rebooks:Array<{
			src:string
			name:string
		}>
	}
	withDefaults(defineProps<Props>(),{Rebooks:()=>[]})
	
	const toBookDetail=(id)=>{
		if(id===1){
			uni.navigateTo({
				url:'/pages/index/indexBookDetail/indexBookDetail'
			})
		}
	}
</script>

<style lang="scss"  scoped>
.index-reboot{
		margin: 20rpx auto;
		justify-content: center;
		text-align: center;
		display: flex;
		view{
			flex: 1;
			position: relative;	
			image{
				width: 100%;
				height: 100%;
			}
			text{
				font-size: 30rpx;
				color:rgba(0,0,0,0.5)
			}
			.icon{
			  position: absolute;
			  top:20rpx;
			  left:45rpx;
			}
		}
		
	}
</style>
