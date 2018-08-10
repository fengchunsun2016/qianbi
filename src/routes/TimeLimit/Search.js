/**
 * Created by feng on 2018/7/27.
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { link } from 'dva/router';
import { SearchBar } from 'antd-mobile';

import HeaderBar from '../../components/HeaderBar/HeaderBar';
import List from './components/SearchList';
import styles from './TimeLimit.less';


@connect(({ time, loading }) => ({
  time,
  loading: loading.effects['time/searchListRefresh'],
}))
export default class TimeLimit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      searchData:[],
      refreshing : false,
      loading:false,
      hasMore:true,
      page:1,
      query:'',
    };

    this.pullRefresh = this.pullRefresh.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.pullRefresh();

  }

  componentWillReceiveProps(nextProps){

    if(nextProps.time !== this.props.time){
      const {search:{searchData,refreshing,loading,hasMore,page,query}} = nextProps.time;

      this.setState({
        searchData,
        refreshing,
        loading,
        hasMore,
        page,
        query,
      })
    }
  }

  onChange(value){
    this.setState({
      value,
    })
  }

  onSubmit(){

    const { dispatch } = this.props;
    const { value } = this.state;

    dispatch({
      type : 'time/searchListQuery',
      params:{page:1, query:value},
    });

  }

  pullRefresh(){

    const { dispatch } = this.props;

    dispatch({
      type : 'time/searchListRefresh',
      params:{page:1, query:''},
    });
  }

  loadMore(){

    const { dispatch } = this.props;
    const { page, query} = this.state;

    dispatch({
      type : 'time/searchListLoadMore',
      params:{
        page,
        query,
      },
    });
  }



  render() {
    const { value } = this.state;
    const { searchData = [], refreshing, loading, hasMore } = this.state;

    const listProps = {
      dataSource:searchData,
      refreshing,
      loading,
      pullRefresh:this.pullRefresh,
      loadMore:this.loadMore,
      hasMore,
    };

    return (
      <div className={styles.main}>


        <HeaderBar />

        <SearchBar
          value={value}
          placeholder="请输入拍品关键字"
          onSubmit={this.onSubmit}
          onClear={value => console.log(value, 'onClear')}
          onFocus={() => console.log('onFocus')}
          onBlur={() => console.log('onBlur')}
          onCancel={() => console.log('onCancel')}
          showCancelButton={false}
          onChange={this.onChange}
        />

        <List {...listProps} />

      </div>

    )
  }


}













