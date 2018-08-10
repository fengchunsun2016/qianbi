import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ListView, PullToRefresh } from 'antd-mobile';
import EndedCell from '../../../components/AuctionListCell/EndedCell';

@connect(({ live, loading }) => ({
  live,
  loading: loading.effects['live/updateEnded'],
}))

export default class LiveEnded extends PureComponent {

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
      type: 'live/updateEnded',
      payload: {
        page: this.pageIndex,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    const { live: {endedItems} } = nextProps;
    const { live: {endedItems : oldData}} = this.props;
    const { dataSource } = this.state;
    if (endedItems !== oldData) {
      if (endedItems.length !== 0) {
        const hasMore = endedItems.length % 10 === 0;
        this.setState({
          dataSource: dataSource.cloneWithRows(endedItems),
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

  onRefresh = () => {
    this.setState({
      refreshing: true,
      isLoading: true,
    });
    this.pageIndex = 1;

    const { dispatch } = this.props;
    dispatch({
      type: 'live/updateEnded',
      payload: {
        page: this.pageIndex,
      },
    });
  };

  onEndReached = () => {
    this.setState({ isLoading: true });

    const {isLoading,hasMore} = this.state;

    if (!hasMore && isLoading) {
      return;
    }

    this.pageIndex += 1;

    const { dispatch } = this.props;
    dispatch({
      type: 'live/loadMoreEnded',
      payload: {
        page: this.pageIndex,
      },
    });

  };

  render() {
    const {

      live: { endedItems = [] },

    } = this.props;

    const { isLoading, dataSource, refreshing, hasMore } = this.state;

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
      const goToDerail = (obj) => {

        const {dispatch}=this.props;

        const url = `/live/liveAuctionDetail?id=${obj.id}&title=${obj.title}`;

        dispatch(routerRedux.push(url));

      };
      const obj = endedItems[index];
      index += 1;
      return (
        <div
          key={rowID}
          style={{
            padding: '0',
            backgroundColor: 'white',
          }}
        >
          <EndedCell obj={obj} goToDerail={goToDerail} />
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
    );
  }
}
