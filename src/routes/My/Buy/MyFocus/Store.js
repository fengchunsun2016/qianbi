import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { ListView, PullToRefresh } from 'antd-mobile';
import * as routerRedux from 'react-router-redux';
import  Store from '../../../../components/StoreModule';
@connect(({ myFocus, loading }) => ({
  myFocus,
  loading: loading.effects['myFocus/updateBuyerFocusStore'],
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
      type: 'myFocus/updateBuyerFocusStore',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { myFocus: {StoreListData} } = nextProps;
    const { myFocus: {StoreListData : oldData}} = this.props;
    const { dataSource } = this.state;
    if (StoreListData !== oldData) {
      if (StoreListData.length !== 0) {
        const hasMore = StoreListData.length % 10 === 0;
        this.setState({
          dataSource: dataSource.cloneWithRows(StoreListData),
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
      type: 'myFocus/updateBuyerFocusStore',
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
      type: 'myFocus/buyerFocusStore',
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
      myFocus:{StoreListData = []},
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
    const len = StoreListData.length;
    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      const goToDerail = (obj) => {
        const {dispatch}=this.props;
        const url = `/shop/${obj.sellerUserId}`;
        dispatch(routerRedux.push(url));
      };
        const obj = StoreListData[index];
        index += 1;
        return (
          <div
            key={rowID}
            style={{
              padding: '0',
              backgroundColor: 'white',
            }}
          >
            <Store storeData={obj} goToDerail={goToDerail} />
          </div>
        );

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
