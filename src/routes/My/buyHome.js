// 买家
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Grid,
  WhiteSpace,
  Badge,
} from 'antd-mobile';
import  styles from  './index.less';
import {routerRedux} from 'dva/router';

import  Entrance from '../../../public/entrance.png';
// 待发货
import  StaysHipments from  '../../../public/stayshipments .png';
// 待评价
import  StaysEvaluate from  '../../../public/staysevaluate.png';
// 待收货
import  StaysTake from  '../../../public/staystake.png';
// 代收款
import  StaysGathering from  '../../../public/staysgathering.png';
// 售后
import  Service from  '../../../public/service.png';
// 保证金
import  CashDeposit from  '../../../public/cashdeposit.png';
// 竞拍
import  Auction from  '../../../public/auction.png';
// 联系我们
import  ContactUs from  '../../../public/contactus.png';
// 申请开店
import  ApplyShop from '../../../public/applyshop.png';
// 关注
import  myfocus from  '../../../public/myfocus.png';
// 寻求帮助
import  Help from  '../../../public/help.png';
// 辅助
import  Assist from  '../../../public/assist.png';
import  MyOrderGird from  '../../components/MyOrderGird';
import  MyFunctionGird from  '../../components/MyFunctionGird';
/**
 *  grid 展示内容,以及点击跳转
 *    !!! 没有url 地址不会跳转
 *    !!! 没有url 地址不会跳转
 *    !!! 没有url 地址不会跳转
 *  ??? 有了url 没有在router配置也不会跳转
 *  ??? 有了url 没有在router配置也不会跳转
 *  ??? 有了url 没有在router配置也不会跳转
 * icon 图片
 * text 介绍
 * url 跳转地址
 *  如需跳转必须正确填写url
 */
// 买家功能
const    buyFunctionData1=[
  {
    icon: myfocus,
    text: '我的关注',
    url:'/myFocus',
  },
  {
    icon: Auction,
    text: '我的竞拍',
    url:'/myAuction',
  },
  {
    icon: CashDeposit,
    text: '参保保证金',
    url:'/myCashDeposit',
  },
  {
    icon: ApplyShop,
    text: '申请开店',
  },
  {
    icon: ContactUs,
    text: '联系我们',
    url:'/myContactUs',
  },
  {
    icon: Help,
    text: '寻求帮助',
  },
  {
    icon:Assist,
    text:'辅助控制',
  },
];
const    buyFunctionData2=[
  {
    icon: myfocus,
    text: '我的关注',
    url:'/myFocus',
  },
  {
    icon: Auction,
    text: '我的竞拍',
    url:'/myAuction',

  },
  {
    icon: CashDeposit,
    text: '参保保证金',
    url:'/myCashDeposit',
  },

  {
    icon: ContactUs,
    text: '联系我们',
    url:'/myContactUs',
  },
  {
    icon: Help,
    text: '寻求帮助',
  },
  {
    icon:Assist,
    text:'辅助控制',
  },
];
// 买家订单
const    buyOrderData=[
  {
    icon: StaysGathering,
    text: '待付款',
    url:'/myOrder?statusPage=1&status=1',
  },
  {
    icon: StaysTake,
    text: '待发货',
    url:'/myOrder?statusPage=2&status=2',
  },
  {
    icon: StaysHipments,
    text: '待收货',
    url:'/myOrder?statusPage=3&status=3',
  },
  {
    icon: StaysEvaluate,
    text: '待评论',
    url:'/myOrder?statusPage=4&status=4',
  },
  {
    icon: Service,
    text: '售后',
    url:'/myOrder?statusPage=5&status=8',
  },
];
/**
 *
 * 买家页面
 * isShop 判断是否开店了,
 *
 */
@connect()
export default  class buyHome extends  PureComponent{

  render(){
    const {isShop,dispatch}=this.props;
    // 买家功能
    let buyFunctionData=[];
    if (isShop){
      buyFunctionData=buyFunctionData1;
    }else{
      buyFunctionData=buyFunctionData2;
    }
    const  OrderData={
      OrderList:buyOrderData,
      number:5,
      onClickAll(){

        const url = `/myOrder?statusPage=0`;
        dispatch(routerRedux.push(url));
      },
    };
    const  FunctionData={
      FunctionList:buyFunctionData,
      number:4,
    };
    return(
      <div>
        <Link to="/PersonalSettings">
        <div className={styles.style_head_portrait}>
          <img
            alt='头像'
            src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1843140232,4000409481&fm=173&app=25&f=JPEG?w=480&h=729&s=7EDA08D74E2041154487D7F00300A01C"
            style={{width:'1.20rem',height:'1.20rem',borderRadius:'.60rem'}}
          />
          <div className={styles.style_msg}>
            <div className={styles.style_name}>你有毒</div>
            <div className={styles.style_phone}>13555006676</div>
          </div>
          <img
            alt='进入'
            src={Entrance}
            style={{width:'.36rem',height:'.36rem'}}
          />
        </div>
        </Link>
        <MyOrderGird {...OrderData} />
        <WhiteSpace size="lg" />
        <MyFunctionGird {...FunctionData} />
      </div>
    )
  }
}
