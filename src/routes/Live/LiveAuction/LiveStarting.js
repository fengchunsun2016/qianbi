import React, { PureComponent } from 'react';
import { ListView, PullToRefresh } from 'antd-mobile';
import { connect } from 'dva/index';
import {routerRedux} from 'dva/router';
import StartingCell from '../../../components/AuctionListCell/StartingCell';

@connect(({ live, focus, loading }) => ({
  live,
  focus,
  loading: loading.effects['live/updateStarting'],
}))

export default class LiveCalendar extends PureComponent {

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
    this.updateData();
  }

  componentWillReceiveProps(nextProps) {
    const { live: {startingItems} } = nextProps;
    const { live: {startingItems : oldData}} = this.props;
    const { dataSource } = this.state;
    if (startingItems !== oldData) {
      if (startingItems.length !== 0) {
        const hasMore = startingItems.length % 10 === 0;
        this.setState({
          dataSource: dataSource.cloneWithRows(startingItems),
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
    this.updateData();
  };

  // 上拉加载
  onEndReached = () => {
    this.loadMoreData();
  };

  // 请求第一页数据  刷新
  updateData = () => {
    this.setState({
      refreshing: true,
      isLoading: true,
    });
    this.pageIndex = 1;

    const { dispatch } = this.props;
    dispatch({
      type: 'live/updateStarting',
      payload: {
        page: this.pageIndex,
      },
    });
  };

  // 加载更多数据
  loadMoreData = () => {
    this.setState({ isLoading: true });

    const {isLoading,hasMore} = this.state;

    if (!hasMore && isLoading) {
      return;
    }

    this.pageIndex += 1;

    const { dispatch } = this.props;

    dispatch({
      type: 'live/loadMoreStarting',
      payload: {
        page: this.pageIndex,
      },
    });
  };

  render() {

    const {

      live:{ startingItems = [] },

    } = this.props;

    const { isLoading, dataSource, refreshing, hasMore } = this.state;

    // listView间隔组件
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

    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      // 跳转去专场详情页面
      const goToDerail = (obj) => {
        const {dispatch}=this.props;
        const url = `/live/liveAuctionDetail?id=${obj.id}&title=${obj.title}`;
        dispatch(routerRedux.push(url));
      };

      // 专场关注按钮被点击
      const doFocus = (obj) => {
        const {focus, id} = obj;
        const { dispatch } = this.props;
        dispatch({
          type: 'focus/auctionFocusTotal',
          payload: {
            id,
            cancel: focus,
            dataName: 'startingItems',
          },
        });
      };

      // item 子组件
      const obj = startingItems[index];
      index += 1;
      return (
        <div
          key={rowID}
          style={{
            padding: '0',
            backgroundColor: 'white',
          }}
        >
          <StartingCell obj={obj} goToDerail={goToDerail} doFocus={doFocus} />

        </div>
      );
    };

    return (
      <div style={{height: 'calc(100vh - 148px)'}}>
        <ListView
          key='1'
          renderFooter={() => (
            <div style={{ padding: 20, textAlign: 'center' }}>
              {
                hasMore ? isLoading ? '正在刷新...' : '加载完成...' : '没有更多数据了'
              }
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
          pageSize={4}
        />
      </div>
    )
  }
}
