<template>
	<view>
		<template v-for="(item,index) in bookResources" :key="index">
			<global-listHeader >
				<template #title>{{item.headerTitle}}</template>
				查看全部
			</global-listHeader>
			<commonList :books="item.books"/>
		</template>		
	</view>
</template>

<script lang="ts" setup>
import commonList from '../common/common-list.vue'

interface books {
id:string
imgurl:string
name:string
synopsis:string
}
	
interface Props{
	bookResources:Array<{books:Array<books>,headerTitle:string}>
}
withDefaults(defineProps<Props>(),{bookResources:()=>[]})
</script>

<style lang="scss" scoped>
	
</style>
