// Created by szatpig at 2018/7/26.

import store from '@/vuex/store'

import { fullPath } from "./wxUtils";

const Fly = require("flyio/dist/npm/wx");
const fly = new Fly();


fly.config.baseURL="http://10.1.20.254:3000";

//添加拦截器
fly.interceptors.request.use((config,promise)=>{
  //给所有请求添加自定义header
  config.headers["X-Tag"]="flyio";
  if (store.state.user.userToken) {
    config.headers.token = store.state.user.userToken;
  }
  return config;
},err =>{
  return Promise.reject(err);
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    switch (err.status) {
      case 401:
        // 401 清除token信息并跳转到登录页面
        wx.redirectTo({
          url: '/pages/login/login?redirect='+ fullPath()
        });
        break;
      case 403:
        break;
      case 404:
        wx.showToast({
          title:'网页丢失',
          image: '/images/error.png'
        });
        break;
      case 500:
        wx.showToast({
          title: '网络超时',
          image: '/images/error.png'
        });
        break;
      case 504:
        break;
      default:
        wx.showToast({
          title: '小意走丢了',
          image: '/images/error.png'
        });
    }
    return Promise.reject(err);
  }
);

export default async function fetch(url,options) {
    let opt = options || {};
    try{
        let response = await fly.request(url,opt.data,{
            method: opt.type || 'post',
            headers:opt.headers || {'Content-Type': 'application/json; charset=UTF-8'},//请求头
            //是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
            parseJson:true,
            timeout: opt.timeout || 30000//超时时间
        });
        if (response.code == 1) {
             return response;
        }else{
            switch (response.status) {
              case 10008:
                store.dispatch('userLoginOut');
                wx.redirectTo({
                  url: '/pages/login/login'
                });
                break;
              case 10006:
              case 10002:
              case 10003:
              case 10004:
              case 10020:
              case 10023:
              case 10033:
                store.dispatch('userLoginOut');
                wx.redirectTo({
                    url: '/pages/login/login',
                    success:()=>{
                        wx.showToast({
                            title: response.msg.length <= 7 ? response.msg : '小意走丢了' ,
                            image: '/images/error.png',
                            duration: 2000
                        });
                    }
                });

                break;
              case 10001:
                wx.showToast({
                  title: '账号或密码错误',
                  image: '/images/error.png'
                });
                break;
              default:
                wx.showToast({
                  title: response.msg.length <= 7 ? response.msg : '小意走丢了',
                  image: '/images/error.png'
                });
            }
            return Promise.reject(response)
        }
    }catch (e) {
        return Promise.reject(e)
    }

}


// return new Promise((resolve, reject) => {
//     fly.request(url,opt.data,{
//         method: opt.type || 'post',
//         headers:opt.headers || {'Content-Type': 'application/json; charset=UTF-8'},//请求头
//         //是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
//         parseJson:true,
//         timeout: opt.timeout || 30000//超时时间
//     }).then(data => {
//         if (data.status == 1000) {
//              resolve(data);
//         }else{
//              reject(data)
//         }
//     }).catch(e =>{
//        reject(e)
//     });
// })
