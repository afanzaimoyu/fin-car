/*
    封装axios网络请求

*/
import axios from 'axios'
import qs from 'querystring'
//定义响应错误函数处理协议状态码信息提示
/**
 * 处理失败的方法
 *     status:状态
 *     info:错误信息
 */
const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("表示请求报文中存在语法错误");
            break;
        case 401:
            console.log("未经许可，需要通过HTTP认证");
            break;
        case 403:
            console.log("服务器拒绝该次访问（访问权限出现问题）");
            break;
        case 404:
            console.log("表示服务器上无法找到请求的资源");
            break;
        case 500:
            console.log("表示服务器在执行请求时发生了错误");
            break;
        case 503:
            console.log("表示服务器暂时处于超负载或正在进行停机维护");
            break;
        case 504:
            console.log("（网关超时）  服务器作为网关或代理，但是没有及时从上游服务器收到请求");
            break;
        default:
            console.log(info);
            break;
    }
}


//创建实例
const instance = axios.create({
    // baseURL: 'http://iwenwiki.com/',//请求的基本的路径地址
    baseURL: process.env.NODE_ENV == 'production' ? process.env.VUE_APP_BASE_URL : '', timeout: 5000,//等待响应的时间5s
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    if (config.method == 'post') {
        //参数传递：{useename:qq,password:123}  --->字符串  username=qq&password=123
        config.data = qs.stringify(config.data)
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    //解析返回的错误的状态码  给状态码解析含义 让前端更好的定位错误
    console.log('添加响应拦截器', error);
    const {response} = error;
    //response.status 错误状态   500 服务器错误
    errorHandle(response.status, response.info)
    // 对响应错误做点什么
    // return Promise.reject(error);
});


export default instance