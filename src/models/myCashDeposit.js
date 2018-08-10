import { buyerCashDeposit} from '../services/my-cash-deposit';

export default {
  namespace: 'myCashDeposit',

  state: {
    // 买家保证金
    cashDeposit: {},

  },

  effects: {
    *getbuyerCashDeposit(_, { call, put }) {
      const response = yield call(buyerCashDeposit);
      yield put({
        type: 'saveCashDeposit',
        payload: response.data || {},
      });
    },


  },

  reducers: {
    saveCashDeposit(state, action) {
      return {
        ...state,
        cashDeposit: action.payload,
      };
    },
  },
};
