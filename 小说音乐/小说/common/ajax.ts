// /app_index
const baseUrl="http://ceshi.dishait.cn"

export const ajax=(options:{url:string;method:'GET'|'POST';data?:any})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
				url: baseUrl + options.url,
				method: options.method,
				data: options.data,
				success: (response) => {
					return resolve(response.data)
				},
				fail: (fail) => {
					console.log('fail',fail)
					return reject(fail);
				}
			})
	})
}