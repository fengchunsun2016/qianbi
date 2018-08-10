/**
 * Created by feng on 2018/7/28.
 */
import React from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';

import styles from '../style/SearchList.less'


export default class List extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: false,
      loading: false,
      hasMore:true,
    };
  }


  componentDidMount() {


  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps,'nextProps-----receive')
    if (nextProps.dataSource !== this.props.dataSource) {

      const {dataSource, refreshing, loading, hasMore} = nextProps;

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataSource),
        refreshing,
        loading,
        hasMore,
      });
    }
  }

  componentDidUpdate() {

    document.body.style.overflow = 'hidden';

  }

  onRefresh = () => {
    const {pullRefresh} = this.props;
    // console.log('this is refreshing!!!!');

    pullRefresh();

  };

  onEndReached = (event) => {
    const {loading,hasMore} = this.state;
    const {loadMore} = this.props;
    console.log('reachEnd and load more!!!!', event);
    if (loading || !hasMore) {
      return;
    }

    loadMore();

  };

  render() {
    const {refreshing,loading, dataSource = [],hasMore} = this.state;

    // console.log(refreshing,'refreshing',loading,'loading',dataSource,'dataSource',hasMore,'hasMore');

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#fff',
          height: 5,
        }}
      />
    );
    const index = dataSource.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        return (<div>***</div>)
      }

      // 根据返回状态初始化该显示的时间
      const timeInit = ()=>{
        if(rowData.status==='1'){
          return <div>开始时间：{rowData.beginTime}</div>
        }
        if(rowData.status==='2'){
          return <div>结拍时间：{rowData.endTime}</div>
        }
      }
      // 根据返回状态初始化该显示的价钱
      const priceInit = ()=>{

        if(rowData.status==='1'){
          return <div>当前价：{rowData.transactionPrice}</div>
        }
        if(rowData.status==='2'){
          return <div>当前价：{rowData.transactionPrice}</div>
        }
      }

      return (
        <div
          key={rowID}
          className={styles.itemBox}
        >
          <div className={styles.left}>
            <img src={rowData.photoUrl} alt="" />
          </div>

          <div className={styles.right}>
            <div className={styles.title}>{rowData.title}</div>
            <div className={styles.price}>{priceInit()}</div>
            <div className={styles.time}>{timeInit()}</div>
            <div className={styles.status}>{rowData.status==='1'?<div style={{color:'#922728'}}>热拍中</div>:<div>已成交</div>}</div>
          </div>
        </div>
      );
    };
    return (
      <div>

        <ListView
          key='1'
          dataSource={dataSource}

          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {loading ? '努力加载中...' :(hasMore? '加载完毕':'没有更多数据了...')}
            </div>
)}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll={false}
          style={{
          height: 'calc(100vh - 104px - 0.8rem)',
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
          pullToRefresh={<PullToRefresh
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            distanceToRefresh={50}
          />}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={100}

        />
      </div>
);
  }
}
