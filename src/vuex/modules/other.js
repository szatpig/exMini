// Created by szatpig at 2018/11/8.
import { HANDLEREFRESH } from '../types';

const state={
  refresh:wx.getStorageSync('refresh') || false
};

const getters={

};


const mutations={
  [HANDLEREFRESH](state,res){
    state.refresh = res;
  }
};

const actions={
  //列表状态刷新flag
  handleRefresh({ commit }, res) {
    wx.setStorageSync('refresh',res);
    commit(HANDLEREFRESH, res);
  }
};



export default {
  state,
  getters,
  mutations,
  actions
}

