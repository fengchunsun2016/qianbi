import { get } from '../utils/request';

// 关注的拍品
export  async function buyerFocusTimeItemList(params) {
  return get('/buyer/focus/timeItemList',params)
}

// 关注的专场
export async function buyerFocusLiveList(params) {
  return get('/buyer/focus/liveList', params);
}
// 关注的店铺
export  async function buyerFocusStoreList(params) {
  return get('/buyer/focus/storeList', params);
}



