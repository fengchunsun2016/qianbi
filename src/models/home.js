import { carousel } from '../services/home';

export default {
  namespace: 'home',

  state: {
    // 轮播图
    carousels: [],
  },

  effects: {
    *carousel(_, { call, put }) {
      const response = yield call(carousel);

      yield put({
        type: 'saveCarousel',
        payload: response.data || [],
      });
    },
  },

  reducers: {
    saveCarousel(state, action) {
      return {
        ...state,
        carousels: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
