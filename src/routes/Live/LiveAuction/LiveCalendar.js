import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { routerRedux } from 'dva/router';
import { ListView, PullToRefresh } from 'antd-mobile';
import CalendarView from '../../../components/CalendarView/CalendarView';
import CalendarCell from '../../../components/AuctionListCell/CalendarCell';


@connect(({ live, focus, loading }) => ({
  live,
  focus,
  loading: loading.effects['live/updateCalendar'],
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
    const date = new Date();
    const y = date.getFullYear(); // 获取当前年份
    const m = (date.getMonth()+1).toString().padStart(2,'0'); // 获取当前月份
    const d = date.getDate().toString().padStart(2,'0'); // 获取当前日期
    this.date = `${y}${m}${d}`;
  }

  componentDidMount() {
    // this.updateData();
  }

  componentWillReceiveProps(nextProps) {
    const { live: {calendarItems} } = nextProps;
    const { live: {calendarItems : oldData}} = this.props;
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
    this.updateData();
  };

  // 上拉加载
  onEndReached = () => {
    this.loadMoreData();
  };

  // 刷新数据
  updateData = () => {
    this.setState({
      refreshing: true,
      isLoading: true,
    });

    this.pageIndex = 1;

    const { dispatch } = this.props;

    dispatch({
      type: 'live/updateCalendar',
      payload: {
        page: this.pageIndex,
        date: this.date,
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
      type: 'live/loadMoreCalendar',
      payload: {
        page: this.pageIndex,
        date: this.date,
      },
    });
  };

  // 点击日期回调
  dateOnClick = (obj) => {
    const dateArray = obj.date.split('-');
    this.date = `${dateArray[0]}${dateArray[1]}${dateArray[2]}`;
    this.updateData();
  };

  render() {
    const {

      live:{ calendarItems = [] },

    } = this.props;

    const { isLoading, dataSource, refreshing, hasMore } = this.state;

    // 定制ListView分隔组件
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

    // 需要渲染的ListView子组件
    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      // 点击cell，跳转专场详情页面
      const goToDerail = (obj) => {
        const {dispatch}=this.props;
        const url = `/live/liveAuctionDetail?id=${obj.id}&title=${obj.title}`;
        dispatch(routerRedux.push(url));
      };
      // 点击关注按钮
      const doFocus = (obj) => {
        const {focus, id} = obj;
        const { dispatch } = this.props;
        dispatch({
          type: 'focus/auctionFocusTotal',
          payload: {
            id,
            cancel: focus,
            dataName: 'calendarItems',
          },
        });
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
          <CalendarCell obj={obj} goToDerail={goToDerail} doFocus={doFocus} />
        </div>
      );
    };

    return (
      <div style={{height: 'calc(100vh - 148px)'}}>
        <CalendarView dateOnClick={this.dateOnClick} />
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
            height: 'calc(100vh - 148px - 2.4rem)',
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
