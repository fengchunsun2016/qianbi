/*
* 专场详情
*
* */

import { get } from '../utils/request';

// 获取专场信息（买家）
export async function liveAuctionInfo(params) {
  return get('/liveAuction/info', params);
}

// 专场拍品列表
export async function liveAuctionItemList(params) {
  return get('/liveAuction/item/list', params);
}

// 卖家店铺
export async function liveStoreInfo(params) {
  return get('/store', params);
}

