// 我的
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  NavBar,
  Tabs,
  Modal,
} from 'antd-mobile';
import MyOrderListView from './ListView';
import { paraseQuery} from '../../../../utils/my-utils';

const alert= Modal.alert;





const  tabs=[
  {
    title:"全部",
  },
  {
    title:"代收款",
  },
  {
    title:"待发货",
  },
  {
    title:"待收货",
  },
  {
    title:"待评价",
  },
  {
    title:"售后",
  },
];
@connect()
/**
 * @status 默认是全部订单
 * 1：待付款
 * 2：待发货
 * 3：待收货
 * 4：待评价
 * 8：售后
 * 默认为全部
 *
 */
export default  class MyOrder extends PureComponent {
  constructor(props){
    super(props);
    const { location: {search: params} } = props;
    const {status } = paraseQuery(params);
    this.state={
      view:<MyOrderListView id={status} />,
    }
  }


  onTabClick=(tab,index)=>{
    let views=null;
    // 点击售后的时候要给后台穿入第8个
    if (index===5){
      views=<MyOrderListView id={8} />
    }else{
      views=<MyOrderListView id={index.toString()} />
    }
    // 重新渲染一下页面
    this.setState({view:views})
  };

  render(){
    const { location: {search: params} } = this.props;
    const {  statusPage } = paraseQuery(params);
    const  {view}=this.state;
    return(
      <div>
        <NavBar mode="light">我的订单</NavBar>
        <div style={{width:'7.50rem',height:'0.01rem',background:'#e7e7e7'}} />
        <Tabs
          tabs={tabs}
          initialPage={Number(statusPage)}
          tabBarInactiveTextColor='#333333'
          tabBarActiveTextColor='#922729'
          tabBarUnderlineStyle={{borderColor: '#922729'}}
          tabBarBackgroundColor='#fff'
          swipeable={false}
          tabBarTextStyle={{fontSize: '.32rem'}}
          prerenderingSiblingsNumber={0}
          onTabClick={this.onTabClick}
        >
          {view}
        </Tabs>

      </div>
    )
  }

}
