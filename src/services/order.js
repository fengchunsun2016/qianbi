import { get,post } from '../utils/request';

// 买家订单
export async function orderList(params) {
  return get('/buyer/order/list', params);
}

// 确认收货
export async function confirmReceive(params) {
  return post('/buyer/order/confirmReceive', params);
}

// 延长收货
export async function delayReceive(params) {
  return post('/buyer/order/delayReceive', params);
}

// 查看物流
export async function orderLocus(params) {
  return get('/buyer/order/locus', params);
}

// 获取时间
export async function dateTime(params) {
  return get('/datetime', params);
}
