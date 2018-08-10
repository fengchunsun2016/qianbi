import { get ,post} from '../utils/request';


// 新增收货地址
export  async function addressCreate(params) {
  return post('/address/create', params);
}

