// order 列表
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  ListView,
  PullToRefresh,
} from 'antd-mobile';
import  ListViewItem from  './ListViewItem';
import  PayCashDeposit from  '../../../../components/PayModal';


@connect(({ order, loading }) => ({
  order,
  loading: loading.effects['order/flushOrderList'],
}))
export default  class MyOrder extends PureComponent {

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
    const  {dispatch,id}=this.props;
    dispatch({
      type: 'order/flushOrderList',
      payload:{status:id,page:this.pageIndex},
    });
   // 获取时间
    dispatch({
      type: 'order/ flushDateTime',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { order: {orderList} } = nextProps;
    const { order: {orderList : oldData}} = this.props;
    const { dataSource } = this.state;
    if (orderList !== oldData) {
      if (orderList.length !== 0) {
        const hasMore = orderList.length % 10 === 0;
        this.setState({
          dataSource: dataSource.cloneWithRows(orderList),
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
    const { dispatch,id } = this.props;
    dispatch({
      type: 'order/flushOrderList',
      payload:{status:id,page:this.pageIndex},
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
    const { dispatch,id } = this.props;
    dispatch({
      type: 'order/loadOrderList',
      payload:{status:id,page:this.pageIndex},
    });
  };


  render(){

    const  {dispatch,
      order:{
        orderList=[],
        DateTimeData={},
      },
    }=this.props;
    const { isLoading, dataSource, refreshing, hasMore } = this.state;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 10,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      const obj = orderList[index];

      const  IemtData={
        data:obj,
        startTime:DateTimeData,
        // 付款按钮
        toPay(data) {
          console.log("我要去付钱", data);

        },
        // 确认收货
        toConfirmReceive(receiveData){
          console.log("确认收货", receiveData);
          // dispatch({
          //   type: 'order/flushConfirmReceive',
          //   payload: {orderNo:receiveData.orderNo},
          // });
        },
        // 延长收货
        toDelayReceive(delayData){
          console.log("延长收货", delayData);
          dispatch({
            type: 'order/flushDelayReceive',
            payload: {orderNo:delayData.orderNo},
          });
        },
        // 查看物流
        toOrderLocus(LocusData){
          console.log("查看物流", LocusData);
          dispatch({
            type: 'order/flushOrderLocus',
            payload: {orderNo:LocusData.orderNo},
          });
        },
        // 退货
        toOrderRefund(OrderRefundData){
          console.log("退货", OrderRefundData);
          dispatch({
            type: 'sales/saveData',
            payload: OrderRefundData,
          });
          const  url=`/salesReturn`;
          dispatch(routerRedux.push(url))
        },
        // 取消订单
        toOrderCancel(OrderCancelData){
          console.log("取消订单", OrderCancelData);
        },
        // 取消审核
        toOrderCancelAudit(OrderCancelAuditData){
          console.log("取消审核", OrderCancelAuditData);
        },
        // 延时支付
        toOrderDelayPayment(OrderDelayPaymentData){
          console.log("延时支付", OrderDelayPaymentData);
        },
        // 评价
        toOrderEvaluate(OrderEvaluateData){
          console.log("评价", OrderEvaluateData);
        },
      };

      index += 1;
      return (
        <div
          key={rowID}
          style={{
            padding: '0',
            backgroundColor: 'white',

          }}
        >
          <ListViewItem {...IemtData} />
        </div>
      );
    };

    return(
      <div style={{height:'10rem'}}>
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
          renderSeparator={separator}
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
        <PayCashDeposit />
      </div>
    )
  }

}
