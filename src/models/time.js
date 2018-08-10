/**
 * Created by feng on 2018/7/27.
 */

import { getTimeListSearch, getTimeList } from '../services/time-limit';


export default {
  namespace : 'time',

  state : {
    main:{
      mainData:[],
      refreshing:false,
      loading:false,
      hasMore:true,
      page:1,
      itemType:'',
      bidCountSort:'',
      endTimeSort:'',
      priceSort:'',
      selected:'',
    },

    search:{
      searchData : [],
      refreshing:false,
      loading:false,
      hasMore:true,
      page:1,
      query:'',
    },

  },

  effects : {
    // 主页面数据
    *listRefresh({param}, { call, put }) {
      yield put({
        type:'changeRefreshingHome',
      });
      const response = yield call(getTimeList,param);
      yield put({
        type : 'saveTimeListRefresh',
        payload : response.data || [],
        param,
      });
    },
    *listLoadMore({param,param:{page}}, { call, put }) {
      yield put({
        type:'changeLoadingHome',
      });
      const params = {...param,page:page+1};
      const response = yield call(getTimeList,params);
      yield put({
        type : 'saveTimeListLoadMore',
        payload : response.data || [],
        param:params,
      });
    },

    // 搜索页面数据
    *searchListQuery({params}, { call, put }) {
      yield put({
        type:'changeRefreshing',
      });
      const response = yield call(getTimeListSearch,params);
      yield put({
        type : 'saveSearchTimeListQuery',
        payload : response.data || [],
        param:params,
      });
    },
    *searchListRefresh({params}, { call, put }) {
      yield put({
        type:'changeRefreshing',
      });
      const response = yield call(getTimeListSearch,params);
      yield put({
        type : 'saveSearchTimeListRefresh',
        payload : response.data || [],
        param:params,
      });
    },
    *searchListLoadMore({params,params:{page}}, { call, put }) {
      yield put({
        type:'changeLoading',
      });
      const param = {...params,page:page+1};
      const response = yield call(getTimeListSearch,param);
      yield put({
        type : 'saveSearchTimeListLoadMore',
        payload : response.data || [],
        param,
      });
    },
  },

  reducers : {
    // 主页面
    changeRefreshingHome(state){
      return{
        ...state,
        main:{
          ...state.main,
          refreshing:true,
        },

      }
    },
    changeLoadingHome(state){
      return{
        ...state,
        main:{
          ...state.main,
          loading:true,
        },

      }
    },
    // 下拉刷新数据
    saveTimeListRefresh(state, action) {
      const dataLength = action.payload.length;
      const hasMore = dataLength===20;
      const params = ['bidCountSort','endTimeSort','priceSort'];
      const {param} = action;

      let selected=null;
      for(const key in param){
        for(let i=0;i<params.length;i++){
          if(key===params[i]){
            selected = params[i];
          }
        }

      }

      return {
        ...state,
        main:{
          ...state.main,
          mainData : action.payload,
          refreshing:false,
          loading:false,
          hasMore,
          ...action.param,
          selected,
        },
      }
    },
    // 点击关注时更新数据
    timeListUpdate(state, action) {
      const {id,focusTotal} = action.payload;
      const {main:{mainData}} = state;
      const mainDataUpdate = mainData.map((item)=>{
        if(item.id===id){
          item.focusTotal = focusTotal;
          item.focus = !item.focus;
        }
        return item;
      })

      return {
        ...state,
        main:{
          ...state.main,
          mainData : mainDataUpdate,

        },
      }
    },
    saveTimeListLoadMore(state, action) {
      const dataLength = action.payload.length;
      const hasMore = dataLength===20;
      console.log(action,'action............')
      return {
        ...state,
        main:{
          ...state.main,
          mainData : [...state.main.mainData,...action.payload],
          refreshing:false,
          loading:false,
          hasMore,
          ...action.param,
        },

      }
    },

    // 搜索页面
    changeRefreshing(state){
      return{
        ...state,
        search:{
          ...state.search,
          refreshing:true,
        },

      }
    },
    changeLoading(state){
      return{
        ...state,
        search:{
          ...state.search,
          loading:true,
        },

      }
    },
    // 根据关键字搜索
    saveSearchTimeListQuery(state, action) {
      const dataLength = action.payload.length;
      const hasMore = dataLength===20;

      return {
        ...state,
        search:{
          ...state.search,
          searchData : action.payload,
          refreshing:false,
          loading:false,
          hasMore,
          ...action.param,
        },

      }
    },
    // 下拉刷新数据
    saveSearchTimeListRefresh(state, action) {
      const dataLength = action.payload.length;
      const hasMore = dataLength===20;

      return {
        ...state,
        search:{
          ...state.search,
          searchData : action.payload,
          refreshing:false,
          loading:false,
          hasMore,
          ...action.param,
        },
      }
    },
    saveSearchTimeListLoadMore(state, action) {
      const dataLength = action.payload.length;
      const hasMore = dataLength===20;
      return {
        ...state,
        search:{
          ...state.search,
          searchData : [...state.search.searchData,...action.payload],
          refreshing:false,
          loading:false,
          hasMore,
          ...action.param,
        },

      }
    },
  },


}


