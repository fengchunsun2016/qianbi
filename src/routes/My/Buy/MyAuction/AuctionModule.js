// 我的竞拍
import React, { PureComponent } from 'react';
import { ListView, PullToRefresh } from 'antd-mobile';
import { connect } from 'dva';
import { Link } from 'dva/router';

import  styles from  './index.less';
@connect(({auction , loading }) => ({
  auction,
  loading: loading.effects['auction/flushMyBid'],
}))
export default  class   AuctionModule extends PureComponent{

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      hasMore: true,
    };
    this.pageIndex = 1;
  }

  componentDidMount(){
    const  {dispatch}=this.props;
    dispatch({
      type: 'auction/flushMyBid',
      payload:{type:1,page:1},
    });
  }

  componentWillReceiveProps(nextProps) {
    const { auction: {myBidList} } = nextProps;
    const { auction: {myBidList : oldData}} = this.props;
    const { dataSource } = this.state;
    if (myBidList !== oldData) {
      if (myBidList.length !== 0) {
        const hasMore = myBidList.length % 10 === 0;
        this.setState({
          dataSource: dataSource.cloneWithRows(myBidList),
          refreshing: false,
          isLoading: false,
          hasMore,
        });
      }
    }

  }

  // 下拉刷新
  onRefresh = () => {
    const { flag } = this.state;

    this.setState({
      refreshing: true,
      isLoading: true,
      flag : !flag,
    });
    this.pageIndex = 1;

    const { dispatch } = this.props;
    dispatch({
      type: 'auction/flushMyBid',
      payload: {page: this.pageIndex},
    });
  };

  // 上拉加载
  onEndReached = () => {

    this.setState({ isLoading: true });

    const {isLoading,hasMore} = this.state;

    if (!hasMore && isLoading) {
      return;
    }

    this.pageIndex += 1;

    const { dispatch } = this.props;
    dispatch({
      type: 'auction/loadMyBid',
      payload: {page: this.pageIndex},
    });
  };


  render(){
    const  {
      auction:{
        myBidList=[],
      },
    }=this.props;

    const { isLoading, dataSource, refreshing, hasMore } = this.state;



    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      const obj = myBidList[index];
      index += 1;
      const {bid,transactionPrice}=obj;
      // 根据状态显示css样式
      let   styleTransition1=null;
      let   styleTransition2=null;
      if (bid===transactionPrice){
        styleTransition1=styles.style_bid1;
        styleTransition2=styles.style_transactionPrice1;
      }
      if (transactionPrice>bid){
        styleTransition1=styles.style_bid2;
        styleTransition2=styles.style_transactionPrice2;
      }
      return (
        <div
          key={rowID}
          style={{
            padding: '0',
            backgroundColor: 'white',
          }}
        >
          <div className={styles.style_text}>
            <div className={styles.style_title}>{obj.title}</div>
            <div className={styleTransition1}>¥{obj.bid} </div>
            <div className={styleTransition2}>¥{obj.transactionPrice}</div>
            <div className={styles.style_status}>{obj.status==='1'?"竞拍中":"结拍"}</div>
          </div>
        </div>
      );
    };


    return(
      <div className={styles.style_background}>
        <div className={styles.style_text}>
          <div className={styles.style_title}>名称</div>
          <div className={styles.style_bid}>出价 </div>
          <div className={styles.style_transactionPrice}>当前价</div>
          <div className={styles.style_status}>状态</div>
        </div>
        <ListView
          key='1'
          ref={el => {this.lv = el}}
          renderFooter={() => (
            <div style={{ padding: 20, textAlign: 'center' }}>
              {
                hasMore ? isLoading ? '正在刷新...' : '加载完成...' : '没有更多数据了'
              }
            </div>)}
          dataSource={dataSource}
          renderRow={row}
          useBodyScroll={false}
          style={{
            height: '100%',
            margin: '0',
          }}
          pullToRefresh={<PullToRefresh
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            distanceToRefresh={40}
          />}
          onEndReached={this.onEndReached}
          pageSize={4}
        />



      </div>
    )
  }
}
