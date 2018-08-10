import {orderRefund } from '../services/sales';

export default {
  namespace: 'sales',

  state: {
    // 商家信息
    orderRefundData: {},
    data:{},
  },

  effects: {
    *flushOrderRefund({payload}, { call, put }) {
      const response = yield call(orderRefund,payload);
      yield put({
        type: 'saveOrderRefund',
        payload: response.data || {},
      });
    },
  },

  reducers: {
    saveData(state, action) {
      return {
        ...state,
        data:action.payload,
      }
    },
    saveOrderRefund(state, action) {
      return {
        ...state,
        orderRefundData: action.payload,
      };
    },

  },
};
