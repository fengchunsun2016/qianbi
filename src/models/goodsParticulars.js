import { liveAuctionItemInfo } from '../services/goods-particulars';

export default {
  namespace: 'goodsParticulars',

  state: {
    LiveAuction:{},
  },

  effects: {
    *liveAuction({payload}, { call, put }) {
      const response = yield call(liveAuctionItemInfo,payload);
      yield put({
        type: 'saveLiveAuctionItemInfo',
        payload: response.data || {},
      });
    },


  },

  reducers: {
    saveLiveAuctionItemInfo(state, action) {
      return {
        ...state,
        LiveAuction: action.payload,
      };
    },
  },
};
