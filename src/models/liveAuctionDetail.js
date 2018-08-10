import { liveAuctionInfo, liveAuctionItemList, liveStoreInfo } from '../services/live-auction-detail';
import {focusAuction} from '../services/focus';

export default {

  namespace: 'liveAuctionDetail',

  state: {
    // 专场信息（买家）
    auctionInfo: {},
    // 专场拍品列表
    goodsList: [],
    // 卖家店铺信息
    storeInfo: {},
  },

  effects: {
    // 获取专场信息（买家）
    *fetchLiveAuctionAndSellerStoreInfo({payload}, { call, put }) {

      const response = yield call(liveAuctionInfo, payload);

      yield put({
        type: 'saveAuctionInfo',
        payload: response.data || {},
      });

      // 请求卖家店铺信息接口
      const {sellerUserId} = response.data;
      const subResponse = yield call(liveStoreInfo, {sellerUserId});

      yield put({
        type: 'saveStoreInfo',
        payload: subResponse.data || {},
      });
    },

    // 请求专场拍品列表接口
    *fetchLiveAuctionItemList({payload}, { call, put }) {

      const response = yield call(liveAuctionItemList, payload);

      yield put({
        type: 'saveGoodsList',
        payload: response.data || {},
      });
    },

    // 更新专场关注数
    *fetchFocusLiveAuction({payload}, { call, put}) {

      const response = yield call(focusAuction, payload);

      yield put({
        type: 'updateFocusTotal',
        payload: response.data || {},
      });
    },

  },

  reducers: {

    // 保存专场信息
    saveAuctionInfo(state, action) {

      return {
        ...state,
        auctionInfo: action.payload,
      };
    },

    // 保存专场拍品列表
    saveGoodsList(state, action) {

      const {goodsList}=state;

      return {
        ...state,
        goodsList:[...goodsList,...action.payload],
      };
    },

    // 卖家店铺信息
    saveStoreInfo(state, action) {

      return {
        ...state,
        storeInfo: action.payload,
      };
    },

    // 更新专场关注数
    updateFocusTotal(state, action) {
      const { auctionInfo } = state;
      const { focusTotal } = action.payload;
      auctionInfo.focusTotal = focusTotal;

      return {
        ...state,
        auctionInfo,
      }
    },

    // 更新拍品关注数
    updateGoodsFocusTotal(state, {payload}) {
      const { id,focusTotal,dataName } = payload;
      const  items = state[dataName];
      items.map(item => {
        if(item.id === id){
          item.focusTotal = focusTotal;
        }
        return item;
      });
      return {
        ...state,
        items,
      }
    },
  },
}
