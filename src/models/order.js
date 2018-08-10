import { orderList,confirmReceive,delayReceive,orderLocus} from '../services/order';

export default {
  namespace: 'order',

  state: {
    // 订单接口
    orderList:[],
    // 确认收货
    confirmReceiveData:{},
    // 延长收货
    delayReceiveData:{},
    // 查看物流
    orderLocusData:{},
    // 获取时间
    DateTimeData:{},
  },

  effects: {
    // 订单接口
    *flushOrderList({payload}, { call, put }) {
      const response = yield call(orderList,payload);
      yield put({
        type: 'saveFlushOrderList',
        payload: response.data || [],
      });
    },
    // 上拉加载订单接口
    *loadOrderList({payload}, { call, put }) {
      const response = yield call(orderList,payload);

      yield put({
        type: 'saveLoadOrderList',
        payload: response.data || [],
      });
    },
    // 确认收货
    *flushConfirmReceive({payload}, { call, put }) {
      const response = yield call(confirmReceive,payload);
      yield put({
        type: 'saveConfirmReceive',
        payload: response.data || {},
      });
    },
    // 延长收货
    *flushDelayReceive({payload}, { call, put }) {
      const response = yield call(delayReceive,payload);
      yield put({
        type: 'saveDelayReceive',
        payload: response.data || {},
      });
    },
    // 查看物流
    *flushOrderLocus({payload}, { call, put }) {
      const response = yield call(orderLocus,payload);
      yield put({
        type: 'saveOrderLocus',
        payload: response.data || {},
      });
    },
    // 获取时间
    *flushDateTime({payload}, { call, put }) {
      const response = yield call(orderLocus,payload);
      yield put({
        type: 'saveDateTime',
        payload: response.data || {},
      });
    },
  },

  reducers: {
    saveFlushOrderList(state, action) {
      return {
        ...state,
        orderList: action.payload,
      };
    },

    saveLoadOrderList(state, action) {
      const {detailItems}=state;
      return {
        ...state,
        orderList:[...detailItems,...action.payload],
      };
    },
    saveConfirmReceive(state, action) {
      return {
        ...state,
        orderList: action.payload,
      };
    },
    saveDelayReceive(state, action) {
      return {
        ...state,
        delayReceiveData: action.payload,
      };
    },
    saveOrderLocus(state, action) {
      return {
        ...state,
        delayReceiveData: action.payload,
      };
    },
    saveDateTime(state, action) {
   return {
    ...state,
     DateTimeData: action.payload,
  };
},
  },
};
