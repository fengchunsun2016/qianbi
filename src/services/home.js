import { get } from '../utils/request';

// 首页轮播
export async function carousel(params) {
  return get('/home/carousel', params);
}
