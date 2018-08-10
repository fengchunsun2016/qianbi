import { load,storetimeItems,storeLives} from '../services/shop';

export default {
  namespace: 'shop',

  state: {
    // 商家信息
    storeData: {},
    // 限时专场
    timeItems:[],
    lives:[],
  },

  effects: {
    *load({payload}, { call, put }) {
      const response = yield call(load,payload);
      yield put({
        type: 'saveLoad',
        payload: response.data || {},
      });
    },
    *storeTimeItems({payload}, { call, put }) {
      const response = yield call(storetimeItems,payload);
      yield put({
        type: 'saveTimeItems',
        payload: response.data || [],
      });
    },
    *fundestoreLives({payload}, { call, put }) {
      const response = yield call(storeLives,payload);
      yield put({
        type: 'saveStoreLives',
        payload: response.data || [],
      });
    },

  },

  reducers: {


    saveLoad(state, action) {
      return {
        ...state,
        storeData: action.payload,
      };
    },
    saveTimeItems(state, action) {
      return {
        ...state,
        timeItems: action.payload,
      };
    },
    saveStoreLives(state, action) {
      return {
        ...state,
        lives: action.payload,
      };
    },
  },
};
