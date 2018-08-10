import { buyerMyBid} from '../services/auction';

export default {
  namespace: 'auction',

  state: {
    // 我的竞拍
    myBidList:[],
  },

  effects: {
    *flushMyBid({payload}, { call, put }) {
      const response = yield call(buyerMyBid,payload);
      yield put({
        type: 'saveFlushMyBid',
        payload: response.data || [],
      });
    },
    *loadMyBid({payload}, { call, put }) {
      const response = yield call(buyerMyBid,payload);

      yield put({
        type: 'saveLoadMyBid',
        payload: response.data || [],
      });
    },
  },

  reducers: {
    saveFlushMyBid(state, action) {
      return {
        ...state,
        myBidList: action.payload,
      };
    },

    saveLoadMyBid(state, action) {

      const {detailItems}=state;

      return {
        ...state,
        myBidList:[...detailItems,...action.payload],
      };
    },

  },
};
