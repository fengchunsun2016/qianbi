import { get } from '../utils/request';

// 登录
export  async function buyerCashDeposit(params) {
  return get('/buyer/cashDeposit',params)
}



