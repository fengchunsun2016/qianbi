import { carousel,hotLive,hotTime} from '../services/home';

export default {
  namespace: 'home',

  state: {
    // 轮播图
    carousels: [],
    // 热门专场
    hotLives:[],
    // 限时热拍
    hotTime:[],
  },

  effects: {
    *carousel(_, { call, put }) {
      const response = yield call(carousel);

      yield put({
        type: 'saveCarousel',
        payload: response.data || [],
      });
    },
    *fetchHotLive(_, { call, put }) {
      const response = yield call(hotLive);

      yield put({
        type: 'saveHotlive',
        payload: response.data || [],
      });
    },
    *hotTime(_, { call, put }) {
      const response = yield call(hotTime);

      yield put({
        type: 'saveHotTime',
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
    saveHotlive(state, action) {
      return {
        ...state,
        hotLives: action.payload,
      };
    },
    saveHotTime(state, action) {
      return {
        ...state,
        hotTime: action.payload,
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
