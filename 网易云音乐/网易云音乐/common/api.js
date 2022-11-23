import {ajax} from './ajax.js'

// 获取榜单
export const getTopListAPI=()=>
ajax({
	url:'/toplist',
	method:'GET',
})
// 获取榜单详情
export const getTopDetailAPI=(id)=>
	ajax({
		url:'/playlist/detail',
		method:'GET',
		data:{ id }
	})

// 获取歌曲详情
export const getMusicDetailAPI=(ids)=>
ajax({
	url:'/song/detail',
	method:'GET',
	data:{ids}
})
// 获取歌曲地址
export const getMusicUrlAPI=(id,level='exhigh')=>
ajax({
	url:'/song/url/v1',
	method:'GET',
	data:{id,level}
})
// 获取相识音乐
export const getMusicSimiAPI=(id)=>
ajax({
	url:'/simi/song',
	method:'GET',
	data:{id}
})
// 获取歌词
export const getMusiclyricAPI=(id)=>
ajax({
	url:'/lyric',
	method:'GET',
	data:{id}
})
// 获取歌曲评论
export const getMusiccommentAPI=(id,limit=20,offset=1)=>
ajax({
	url:'/comment/music',
	method:'GET',
	data:{id,limit,offset}
})
// 搜索/cloudsearch(更全)
export const searchKeywordsAPI=(keywords,limit=30,offset=1)=>
ajax({
	url:'/cloudsearch',
	method:'GET',
	data:{keywords,limit,offset}
})
// 热搜/search/hot/detail
export const searchHotAPI=()=>
ajax({
	url:'/search/hot/detail',
	method:'GET',
})
// 热搜/search/suggest
export const searchSuggestAPI=(keywords)=>
ajax({
	url:'/search/suggest',
	method:'GET',
	data:{keywords}
})