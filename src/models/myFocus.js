import { buyerFocusTimeItemList,buyerFocusLiveList,buyerFocusStoreList} from '../services/my-focus';

export default {
  namespace: 'myFocus',
  state: {
    // 关注的拍品
    timeItemList:[],
    // 关注的专场
    calendarItems:[],
    // 关注的店铺
    StoreListData:[],
  },

  effects: {
    *flushFocusList({payload}, { call, put }) {
      const response = yield call(buyerFocusTimeItemList,payload);
      yield put({
        type: 'saveFlushFocusList',
        payload: response.data || [],
      });
    },
    *loadFocusList({payload}, { call, put }) {
      const response = yield call(buyerFocusTimeItemList,payload);
      yield put({
        type: 'saveLoadFocusList',
        payload: response.data || [],
      });
    },



    *buyerFocusLive({payload}, { call, put }) {
      const response = yield call(buyerFocusLiveList,payload);
      yield put({
        type: 'saveLiveList',
        payload: response.data || [],
      });
    },
    *updateBuyerFocusLive({payload}, { call, put }) {
      const response = yield call(buyerFocusLiveList,payload);
      yield put({
        type: 'saveUpdateCalendar',
        payload: response.data || [],
      });
    },
    *buyerFocusStore({payload}, { call, put }) {
      const response = yield call(buyerFocusStoreList,payload);
      yield put({
        type: 'saveStoreList',
        payload: response.data || [],
      });
    },
    // 刷新
    *updateBuyerFocusStore({payload}, { call, put }) {
      const response = yield call(buyerFocusStoreList,payload);
      yield put({
        type: 'saveUpdateStoreList',
        payload: response.data || [],
      });
    },

  },

  reducers: {
    saveFlushFocusList(state, action) {
      return {
        ...state,
        timeItemList: action.payload,
      };
    },


    saveLoadFocusList(state, action) {
      const {calendarItems}=state;
      return {
        ...state,
        timeItemList:[...calendarItems,...action.payload],
      };
    },

    saveUpdateCalendar(state, action) {
      return {
        ...state,
        calendarItems: action.payload,
      };
    },
    saveLiveList(state, action) {
      const {calendarItems}=state;

      return {
        ...state,
        calendarItems:[...calendarItems,...action.payload],
      };
    },

    saveUpdateStoreList(state, action) {
      return {
        ...state,
        StoreListData: action.payload,
      };
    },
    saveStoreList(state, action) {
      const {StoreListData}=state;
      return {
        ...state,
        StoreListData:[...StoreListData,...action.payload],
      };
    },
  },
};
