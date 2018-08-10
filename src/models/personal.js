import { myBuyer, buyerInfo } from '../services/personal';

export default {
  namespace: 'personal',

  state: {
    // 数据
    myDatas: {},
    myHeads: {},
  },
  /**
   *     effects
   *      异步请求
   */
  effects: {

    * myBuyer({ params }, { call, put }) {
      //          yield call(myBuyer,params) 请求接口
      const response = yield call(myBuyer, params);
      //  response 数据源
      yield put({
        type: 'saveBuyer',
        payload: response.data || {},
      });
    },
    // 保存数据
    * buyerInfo({ payload, callback }, { call, put }) {
      const response = yield call(buyerInfo, payload);

      if (callback) callback(response);
    },


  },

  /**
   *    reducers
   *    同步执行
   */
  reducers: {
    //     添加数据    添加state
    saveBuyer(state, action) {
      return {
        ...state,
        // 遍历到    myDatas
        myDatas: action.payload,
      };
    },
    buyerInfo(state, action) {
      return {
        ...state,
        myHeads: action.payload,
      };
    },


  },
};
