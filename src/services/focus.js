import { post } from '../utils/request';

// 关注卖家
export async function focusSeller(params) {
  return post('/focus/seller', params);
}

// 关注专场
export async function focusAuction(params) {
  return post('/fcous/liveAuction', params);
}

// 关注限时拍品
export async function focusTimeItem(params) {
  return post('/focus/timeItem', params);
}

// 关注专场拍品
export async function focusLiveItem(params) {
  return post('/focus/liveItem', params);
}

