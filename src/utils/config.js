// Created by szatpig at 2018/7/27.

let siteConfig = {};

const commonUrl = '';

if(process.env.NODE_ENV === 'production'){
  siteConfig={
    api:'',
    task:commonUrl,
    wex:commonUrl,
    authorUrl:'',
    common:commonUrl,
    web:'http://10.1.20.254:3000',
  }
}else{
  siteConfig={
    api:'',
    task:'/task/helper',
    wex:'/wex',
    authorUrl:'',
    common:'/common',
    web:'http://10.1.20.254:3000',
  };
}


export default siteConfig
