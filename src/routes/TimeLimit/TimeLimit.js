/**
 * Created by feng on 2018/7/27.
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';


import HeaderBar from '../../components/HeaderBar/HeaderBar';
import SubHeader from './components/SubHeader';
import NavBar from './components/NavBar';
import MainList from './components/MainList';



import styles from './TimeLimit.less';



@connect(({ time }) => ({
  time,
}))
export default class TimeLimit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nav:{
        selected:'1',
        sort:'1',
      },
    }

    this.toSearch = this.toSearch.bind(this);
    this.onClickCount = this.onClickCount.bind(this);
    this.onClickEndTime = this.onClickEndTime.bind(this);
    this.onClickPrice = this.onClickPrice.bind(this);
    this.onClickType = this.onClickType.bind(this);
    this.clickNav = this.clickNav.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.focusOrNo = this.focusOrNo.bind(this);
    this.refresh = this.refresh.bind(this);
    this.loadMore = this.loadMore.bind(this);

  }

  componentDidMount() {
    document.getElementsByTagName('title')[0].innerText='泉拍';


    const { dispatch } = this.props;

    dispatch({
      type : 'time/listRefresh',
      param:{
        page:1,
        bidCountSort:'desc',
      },
    });

  }

  onClickCount(){
    this.clickNav('1');
  }

  onClickEndTime(){
    this.clickNav('2');
  }

  onClickPrice(){
    this.clickNav('3');
  }

  onClickType(){

  }

  clickNav(index){
    const {nav:{selected,sort}} = this.state;
    const {dispatch, itemType} = this.props;

    const params = {};
    if(itemType!==''){
      params.itemType = itemType;
    }
    params.page = 1;

    if(selected===index){
      if(index==='1'){
        if(sort==='1'){
          params.bidCountSort = 'asc';
        }else{
          params.bidCountSort = 'desc';
        }
        this.changeSort(sort);
      }

      if(index==='2'){
        if(sort==='1'){
          params.endTimeSort = 'asc';
        }else{
          params.endTimeSort = 'desc';
        }
        this.changeSort(sort);
      }

      if(index==='3'){
        if(sort==='1'){
          params.priceSort = 'asc';
        }else{
          params.priceSort = 'desc';
        }
        this.changeSort(sort);
      }

    }else{

      if(index==='1'){
        params.bidCountSort = 'desc';
      }
      if(index==='2'){
        params.endTimeSort = 'desc';
      }
      if(index==='3'){
        params.priceSort = 'desc';
      }

      this.setState({
        nav:{
          selected:index,
          sort:'1',
        },
      });
    }

    dispatch({
      type:'time/listRefresh',
      param:params,
    })

  }

  changeSort(sort){
    const {nav} = this.state;

    this.setState({
      nav:{
        ...nav,
        sort:sort==='1'?'2':'1',
      },
    })

  }

  toSearch(){
    const {dispatch} = this.props;
    dispatch(routerRedux.push('/time/search'));
  }

  focusOrNo(id){
    const {dispatch} = this.props;
    dispatch({
      type:'focus/timeItemFocusTotal',
      payload:{
        id,
      },
    })
  }

  // 主页列表数据刷新
  refresh(){
    const { dispatch, time:{main:{itemType}} } = this.props;

    const param = {
      page:'1',
      bidCountSort:'desc',
    };
    if(itemType){
      param.itemType = itemType;
    }

    dispatch({
      type:'time/listRefresh',
      param,
    })

  }

  // 上拉加载数据
  loadMore(){
    const { dispatch, time:{main,main:{page,itemType,selected}} } = this.props;

    let sort = null;
    for(const key in main){
      if(key===selected){
        console.log(selected,'sort..........')
        sort = main[key];
      }
    }

    const param = {
      page,
      [selected]:sort,
    };
    if(itemType){
      param.itemType = itemType;
    }

    dispatch({
      type:'time/listLoadMore',
      param,
    })

  }

  render() {
    const {dispatch,time:{main:{mainData}}} = this.props;
    console.log(mainData,'main');
    const {nav:{selected,sort}} = this.state;

    const subHeaderProps = {
      toSearch:this.toSearch,
    }

    const navProps = {
      selected,
      sort,
      onClickCount:this.onClickCount,
      onClickEndTime:this.onClickEndTime,
      onClickPrice:this.onClickPrice,
    }

    const mainListProps = {
      mainData,
      dispatch,
      focusOrNo:this.focusOrNo,
      refresh:this.refresh,
      loadMore:this.loadMore,
    }


    return (
      <div className={styles.main}>
        <div>
          <HeaderBar />
          <SubHeader {...subHeaderProps} />
          <NavBar {...navProps} />
        </div>

        <MainList {...mainListProps} />

      </div>

    )
  }


}












