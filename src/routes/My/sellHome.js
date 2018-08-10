// 卖家
import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import {
  WhiteSpace,
} from 'antd-mobile';
import  Entrance from '../../../public/entrance.png';
// 待发货
import  StaysHipments from  '../../../public/stayshipments .png';
// 待评价
import  StaysEvaluate from  '../../../public/staysevaluate.png';
// 待收货
import  StaysTake from  '../../../public/staystake.png';
// 售后
import  Service from  '../../../public/service.png';
// 保证金
import  CashDeposit from  '../../../public/cashdeposit.png';
// 联系我们
import  ContactUs from  '../../../public/contactus.png';
// 寻求帮助
import  Help from  '../../../public/help.png';
// 限时管理
import  TimeLimitManage from  '../../../public/timelimitmanage.png';
// 专场
import  SpecialManage from  '../../../public/specialmanage.png';
import  styles from './index.less';
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
// 卖家功能
const   sellFunctionData=[
  {
    icon: StaysHipments,
    text: '待收货',

  },
  {
    icon: StaysTake,
    text: '待收货',
  },
  {
    icon: StaysEvaluate,
    text: '待评论',
  },
  {
    icon: Service,
    text: '售后',
  },
];
// 卖家订单
const  sellOrderData=[
  {
    icon: SpecialManage,
    text: '专场管理',
    url:'/specialManage?id=12155&name=dongqingfeng',
  },
  {
    icon: TimeLimitManage,
    text: '限时拍品管理',

  },
  {
    icon: CashDeposit,
    text: '参保保证金',
  },
  {
    icon: ContactUs,
    text: '联系我们',
  },
  {
    icon: Help,
    text: '寻求帮助',
  },
];
export default  class sellHome  extends  PureComponent{

  render(){



    const  OrderData={
      OrderList:sellFunctionData,
      number:4,
    };
const  FunctionData={
  FunctionList:sellOrderData,
  number:4,
};
    return(
      <div>
        <Link to="/PersonalSettings">
        <div className={styles.style_head_portrait}>     .

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
