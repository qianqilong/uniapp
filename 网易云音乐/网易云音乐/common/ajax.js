const baseUrl="http://localhost:3000"

// 封装请求函数
export const ajax=(options={})=>{
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