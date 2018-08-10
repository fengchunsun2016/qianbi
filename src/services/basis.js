import { get } from '../utils/request';

// 未读消息数
export async function msgUnread(params) {
  return get('/msg/unread', params);
}

// 关注专场
export async function focusLiveAuction(params) {
  return get('/fcous/liveAuction', params);
}
