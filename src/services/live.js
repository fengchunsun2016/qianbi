import { get } from '../utils/request';

// 即将开始专场列表
export async function starting(params) {
  return get('/liveAuction/list/starting', params);
}

// 日历专场列表
export async function calendar(params) {
  return get('/liveAuction/list/calendar', params);
}

// 结束专场列表
export async function ended(params) {
  return get('/liveAuction/list/ended', params);
}

// 专场场次
export async function liveAuctionListQuantity(params) {
  return get('/liveAuction/list/quantity', params);
}

