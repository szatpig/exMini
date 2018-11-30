// Created by szatpig at 2018/11/30.
import { SAVEADDRESS } from '../types';

const state={
    addressInfo:'',
    formatted_addresses:'',
};

const getters={
    pois:state => state.addressInfo.pois,
    recommend: state => state.formatted_addresses.recommend,
    address:state => state.addressInfo.address
};


const mutations={
    [SAVEADDRESS](state,res){
        state.formatted_addresses = res.formatted_addresses;
        state.addressInfo = res;
    }
};

const actions={
    //列表状态刷新flag
    saveAddress({ commit }, res) {
        commit(SAVEADDRESS, res);
    }
};



export default {
    state,
    getters,
    mutations,
    actions
}

