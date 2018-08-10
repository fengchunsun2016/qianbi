import { starting, calendar, ended, liveAuctionListQuantity } from '../services/live';

export default {
  namespace: 'live',

  state: {
    // 即将开始
    startingItems: [],
    // 日历专场
    calendarItems: [],
    // 结束专场
    endedItems: [],
    // 专场场次
    auctionQuantity: [],
  },

  effects: {

    // 即将开始-列表-刷新
    *updateStarting({payload}, { call, put }) {

      const response = yield call(starting, payload);

      yield put({
        type: 'saveUpdateStarting',
        payload: response.data || [],
      });
    },

    // 即将开始-列表-加载
    *loadMoreStarting({payload}, { call, put }) {

      const response = yield call(starting, payload);

      yield put({
        type: 'saveLoadMoreStarting',
        payload: response.data || [],
      });
    },

    // 日历专场-刷新列表
    *updateCalendar({payload}, { call, put }) {

      const response = yield call(calendar, payload);

      yield put({
        type: 'saveUpdateCalendar',
        payload: response.data || [],
      });
    },

    // 日历专场-加载列表
    *loadMoreCalendar({payload}, { call, put }) {

      const response = yield call(calendar, payload);

      yield put({
        type: 'saveLoadMoreCalendar',
        payload: response.data || [],
      });
    },

    // 结束专场-刷新列表
    *updateEnded({payload}, { call, put }) {

      const response = yield call(ended, payload);

      yield put({
        type: 'saveUpdateEnded',
        payload: response.data || [],
      });
    },

    // 结束专场-加载列表
    *loadMoreEnded({payload}, { call, put }) {

      const response = yield call(ended, payload);

      yield put({
        type: 'saveLoadMoreEnded',
        payload: response.data || [],
      });
    },

    // 专场场次
    *liveAuctionListQuantity({payload}, { call, put }) {

      const response = yield call(liveAuctionListQuantity, payload);

      yield put({
        type: 'saveLiveAuctionListQuantity',
        payload: response.data || [],
      });
    },

  },

  reducers: {

    // 即将开始-列表-刷新
    saveUpdateStarting(state, action) {

      return {
        ...state,
        startingItems: action.payload,
      };
    },

    // 即将开始-列表-加载
    saveLoadMoreStarting(state, action) {

      const {startingItems}=state;

      return {
        ...state,
        startingItems:[...startingItems,...action.payload],
      };
    },

    // 日历专场-刷新列表
    saveUpdateCalendar(state, action) {

      return {
        ...state,
        calendarItems: action.payload,
      };
    },

    // 日历专场-加载列表
    saveLoadMoreCalendar(state, action) {

      const {calendarItems}=state;

      return {
        ...state,
        calendarItems:[...calendarItems,...action.payload],
      };
    },

    // 结束专场-刷新列表
    saveUpdateEnded(state, action) {
      return {
        ...state,
        endedItems: action.payload,
      };
    },

    // 结束专场-加载列表
    saveLoadMoreEnded(state, action) {

      const {endedItems}=state;

      return {
        ...state,
        endedItems:[...endedItems,...action.payload],
      };
    },

    // 专场场次
    saveLiveAuctionListQuantity(state, action) {

      return {
        ...state,
        auctionQuantity: action.payload,
      };
    },

    // 更改最新关注数
    updateLive(state,{payload}){

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
};
