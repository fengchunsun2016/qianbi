import { get ,post} from '../utils/request';


// 买家信息
export  async function myBuyer(params) {
  return get('/buyer', params);
}
// 修改买家基本信息
export  async function buyerInfo(params) {
  return post('/buyer/info', params);
} 
