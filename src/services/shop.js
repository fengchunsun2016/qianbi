import { get } from '../utils/request';

// 卖家店铺
export  async function load(params) {
  return get('/store',params)
}

// 卖家限时拍品
export  async function  storetimeItems(params) {
  return get('/store/timeItems',params)
}
// 卖家专场拍品
export  async function  storeLives(parame) {
  return get('/store/lives',parame)
}


