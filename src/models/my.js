import { myLogin } from '../services/my';

export default {
  namespace: 'my',

  state: {
    myData:{},
  },

  effects: {
    *mylogin({payload}, { call, put }) {
      const response = yield call(myLogin,payload);
      yield put({
        type: 'saveLogin',
        payload: response.data || {},
      });
    },
  },

  reducers: {
    saveLogin(state, action) {
      return {
        ...state,
        myData: action.payload,
      };
    },
  },
};
