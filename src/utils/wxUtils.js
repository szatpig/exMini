// Created by szatpig at 2018/7/30.

const wxAuthorize = async (type) =>{
  try {
     return await wx.getSetting({
        success:(res)=> {
            console.log(res);
            if (res.authSetting[type]) {
               return  Promise.resolve(true);
            }
             wx.authorize({
                  scope: type,
                  success:() =>{
                    return  Promise.resolve(true);
                  },
                  fail:(e)=>{
                    return  Promise.reject(e);
                  }
             })
        },
        fail:(e)=>{
          return  Promise.reject(e);
        }
     })
  }catch (e) {
    return new Promise.reject(e);
  }
};

const reverseGeocoder = async function(qqmapsdk,{lng,lat}) {
    return await qqmapsdk.reverseGeocoder({
        location: {
            latitude: lat,
            longitude: lng
        },
        success:(data) =>{
            return  Promise.resolve(data);
        },
        fail:(e)=>{
            return  Promise.reject(e);
        }
    })
}


function path() {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1]
  const url = `/${currentPage.route}`
  return url
}

//当前页面路径
function fullPath() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route;
  const options = currentPage.options;
  let route = `/${url}?`;
  for (let key in options) {
    const value = options[key];
    route += `${key}=${value}&`
  }
  route = route.substring(0, route.length - 1)
  return route
}

export {
  wxAuthorize,
  reverseGeocoder,
  path,
  fullPath
}
