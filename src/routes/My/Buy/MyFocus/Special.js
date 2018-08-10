// 关注的专场

import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { ListView, PullToRefresh } from 'antd-mobile';
import  AuctionListCell from '../../../../components/AuctionListCell/StartingCell';
import * as routerRedux from 'react-router-redux';
@connect(({ myFocus, loading }) => ({
  myFocus,
  loading: loading.effects['myFocus/updateBuyerFocusLive'],
}))

export default class Special extends PureComponent {

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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'myFocus/updateBuyerFocusLive',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { myFocus: {calendarItems} } = nextProps;
    const { myFocus: {calendarItems : oldData}} = this.props;
    const { dataSource } = this.state;
    if (calendarItems !== oldData) {
      if (calendarItems.length !== 0) {
        const hasMore = calendarItems.length % 10 === 0;
        this.setState({
          dataSource: dataSource.cloneWithRows(calendarItems),
          refreshing: false,
          isLoading: false,
          hasMore,
        });
      }
    }


  }

  componentDidUpdate() {
    document.body.style.overflow = 'hidden';
  }

  // 下拉刷新
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.pageIndex = 0;
    const { dispatch } = this.props;
    dispatch({
      type: 'myFocus/updateBuyerFocusLive',
    });
  };

  // 上拉加载
  onEndReached = () => {
    const {isLoading,hasMore} = this.state;
    if (isLoading && !hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    this.pageIndex += 1;
    const { dispatch } = this.props;
    dispatch({
      type: 'myFocus/buyerFocusLive',
    });
  };

  genData = (pIndex = 0, rows = 0) => {
    const dataBlob = {};
    for (let i = 0; i < rows;) {
      i += 1;
      const ii = (pIndex * rows) + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
  };


  render() {
    const {
      myFocus:{calendarItems = []},
    } = this.props;
    const { isLoading, dataSource, refreshing } = this.state;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const len = calendarItems.length;
    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      if (index < len) {
        const doFocus = (obj) => {
          console.log('关注或取消按钮被点击了');
          console.log(obj);
        };
        const goToDerail = (obj) => {

          const {dispatch}=this.props;
          const url = `/live/liveAuctionDetail?id=${obj.id}&title=${obj.title}`;
          dispatch(routerRedux.push(url));

        };
        const obj = calendarItems[index];
        index += 1;
        return (
          <div
            key={rowID}
            style={{
              padding: '0',
              backgroundColor: 'white',
            }}
          >
            <AuctionListCell obj={obj} doFocus={doFocus} goToDerail={goToDerail} />
          </div>
        );
      } else {
        return (
          <div style={{display: 'none'}}>
            ---
          </div>
        )
      }
    };

    return (
      <div style={{height:'10rem'}}>
        <ListView
          key='1'
          ref={el => {this.lv = el}}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {isLoading ? 'Loading...' : 'Loaded'}
            </div>)}
          dataSource={dataSource}
          renderRow={row}
          renderSeparator={separator}
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
          onEndReachedThreshold={10}
          pageSize={4}
        />
      </div>
    )
  }
}
