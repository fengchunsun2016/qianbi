import { get,post } from '../utils/request';

// 登录
export  async function myLogin(params) {
  return post('/login',params)
}

// 首页轮播
export async function carousel(params) {
  return get('/home/carousel', params);
}
// 热门专场
export  async function hotLive(params) {
  return get('/home/hotLive', params);
}
// 限时热拍
export  async function hotTime(params) {
  return get('/home/hotTime', params);
}


