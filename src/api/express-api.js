// Created by szatpig at 2018/11/28.
import fetch from '@/utils/api'
import api from '@/utils/config'

export const expressSearch = async data => await fetch( api.api + '/api/express/search',{
  data
});
