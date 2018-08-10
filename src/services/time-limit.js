/**
 * Created by feng on 2018/7/28.
 */

import {get} from '../utils/request';



export async function getTimeListSearch(params) {
  return get('/timeAuction/search',params);
}



export async function getTimeList(params) {
  return get('/timeAuction/list',params);
}





