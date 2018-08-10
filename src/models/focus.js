import { focusSeller, focusAuction, focusLiveItem, focusTimeItem } from '../services/focus';

export default {
  namespace: 'focus',
  state: {
    // 关注卖家
    sellerData: {},
    // 关注专场
    auctionData: {},
    // 关注专场拍品
    liveItemData: {},
    // 关注限时拍品
    timeItemData: {},
  },

  effects: {

    // 请求卖家关注数
    *sellerFocusTotal({ payload }, { call, put }) {

      const response = yield call(focusSeller, payload);

      yield put({
        type: 'saveSeller',
        payload: response.data || {},
      });
    },
    // 请求专场关注数 payload{ id：xxx, focusTotal: xxx, dataName: 'xxxx' } dataName为存在state的数组变量名
    *auctionFocusTotal({ payload }, { call, put }) {

      const response = yield call(focusAuction, payload);

      const {data:{focusTotal}}=response;

      yield put({
          type:'live/updateLive',
          payload:{id:payload.id,focusTotal, dataName: payload.dataName},
      })
    },

    // 请求专场拍品关注数
    *liveItemFocusTotal({ payload }, { call, put }) {

      const response = yield call(focusLiveItem, payload);

      const {data:{focusTotal}}=response;

      yield put({
        type: 'liveAuctionDetail/updateGoodsFocusTotal',
        payload: {id:payload.id, focusTotal, dataName: payload.dataName},
      });
    },

    // 请求限时拍品关注数
    *timeItemFocusTotal({ payload }, { call, put }) {

      const response = yield call(focusTimeItem, payload);

      const {data:{focusTotal}} = response;
      yield put({
        type: 'time/timeListUpdate',
        payload: {id:payload.id,focusTotal},
      });

      yield put({
        type: 'saveTimeItem',
        payload: response.data || {},
      });
    },

  },

  reducers: {
    saveSeller(state, action) {
      return {
        ...state,
        sellerData: action.payload,
      };
    },
    saveLiveItem(state, action) {
      return {
        ...state,
        liveItemData: action.payload,
      };
    },
    saveTimeItem(state, action) {
      return {
        ...state,
        timeItemData: action.payload,
      };
    },
  },

}
