/**
 * Created by szatpig on 2017/10/9.
 */
import { USER_INFO, USER_TOKEN, USER_LOGIN_OUT, USER_OPENID} from '../types';

const state={
    userInfo:wx.getStorageSync('userInfo') || {},
    userToken:wx.getStorageSync('userToken') || null,
    openId:wx.getStorageSync('openId') || '',
};

const getters={

};


const mutations={
  [USER_INFO](state,res){
    state.userInfo=res;
    state.userAvatar=res.avatar;
  },
  [USER_TOKEN](state,token){
    state.userToken=token;
  },
  [USER_LOGIN_OUT](state){
    state.userToken=null;
    state.userInfo=[];
  },
  [USER_OPENID](state,openId){
    state.openId = openId;
  }
};

const actions={
  //保存用户信息
  userInfo({ commit }, res) {
    wx.setStorageSync('userInfo',res);
    commit(USER_INFO, res);
  },

  //保存用户token
  userToken({ commit }, token) {
    wx.setStorageSync('userToken',token);
    commit(USER_TOKEN,token)
  },

  //用户退出
  userLoginOut({commit}){
    wx.clearStorageSync();
    commit(USER_LOGIN_OUT)
  },

  //保存用户openId
  userOpenId({commit},openId){
    wx.setStorageSync('openId',openId);
    commit(USER_OPENID,openId);
  }
};



export default {
  state,
  getters,
  mutations,
  actions
}


