// goodsParticulars

import { get } from '../utils/request';

// 拍品详情
export  async function liveAuctionItemInfo(params) {
  return get('/liveAuction/item/info',params)
}



