// 我的钱包
import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import {
  Grid,
  WhiteSpace,
  Badge,
} from 'antd-mobile';
// 背景
import  Rectangle from '../../../public/rectangle.png';
// 参保保证金 红色
import  CashDepositReds from  '../../../public/cashdepositred.png';
// 设置
import  Settings from  '../../../public/setting.png';
// 银行卡
import  Bank from  '../../../public/bank.png';
// 提现
import  Withdraw from  '../../../public/withdraw.png';
// 充值
import  Recharge from  '../../../public/recharge.png';
// 明细
import Detail from  '../../../public/detail.png';
import  styles from './index.less';
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
// 钱包功能
const  walletFunctionData=[
  {
    icon:Recharge,
    text:"充值",
    url:'',
  },
  {
    icon:Withdraw,
    text:"提现",
  },
  {
    icon:Detail,
    text:"账单明细",
  },
  {
    icon:Bank,
    text:"我的银行卡",
  },
  {
    icon:CashDepositReds,
    text:"参拍保证金",
  },
  {
    icon:Settings,
    text:"支付设置",
  },
];
/**
 *
 * 我的钱包页面
 * money 金额
 *
 */
export default  class walletHome extends PureComponent{

  render(){
    const {money}=this.props;

    const  FunctionData={
      FunctionList:walletFunctionData,
      number:4,
    };
    return(
      <div>
        <div className={styles.style_money}>
          <div className={styles.style_money_beijing}>
            <img
              alt='背景'
              src={Rectangle}
              style={{width:'3.91rem',height:'2.63'}}
            />
            <div className={styles.style_balance}>账户余额(元)</div>
            <div className={styles.money}>{money>0?money:0.00}</div>
          </div>
        </div>
        <div className={styles.style_wallet_beijing}>
          <div style={{width:'100%',height:'.30rem',color:'#333',fontSize:'.30rem',marginTop:'.50rem',marginLeft:'.24rem'}}>
            我的钱包
          </div>
          <MyFunctionGird {...FunctionData} />
        </div>
      </div>

    )
  }
}
