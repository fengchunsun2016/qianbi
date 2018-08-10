import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  ListView, PullToRefresh,
} from 'antd-mobile';
import  styles from './index.less';
@connect(({ myFocus, loading }) => ({
  myFocus,
  loading: loading.effects['myFocus/flushFocusList'],
}))
export default class AuctionItems extends PureComponent{
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
    const  {dispatch}=this.props;
    // 关注的拍品
    dispatch({
      type: 'myFocus/flushFocusList',
      payload:{page:1},
    });
  }

  componentWillReceiveProps(nextProps) {
    const { myFocus: {timeItemList} } = nextProps;
    const { myFocus: {timeItemList : oldData}} = this.props;
    const { dataSource } = this.state;
    if (timeItemList !== oldData) {
      if (timeItemList.length !== 0) {
        const hasMore = timeItemList.length % 10 === 0;
        this.setState({
          dataSource: dataSource.cloneWithRows(timeItemList),
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
      type: 'myFocus/loadFocusList',
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
      type: 'myFocus/loadFocusList',
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
      myFocus:{
        timeItemList=[],
      },
      }=this.props;
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
    const {  dataSource, refreshing } = this.state;
    let index = 0;

    const row = (rowData, sectionID, rowID) => {
      const itemData = timeItemList[index];
      index += 1;
      return (
        <Link to={`/goodsparticulars/${itemData.id}`}>
          <div key={rowID} className={styles.style_list}>
            <img className={styles.style_itemImg} src={itemData.photoUrl} alt="asdadsa" />
            <div>{itemData.title}</div>
          </div>
        </Link>
      );
    };

    return (
      <div style={{height:'10rem'}}>
        <ListView
          key='1'
          ref={el => {this.lv = el}}
          renderSeparator={separator}
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
          onEndReachedThreshold={10}
          pageSize={4}
        />
      </div>
    )
  }
}
