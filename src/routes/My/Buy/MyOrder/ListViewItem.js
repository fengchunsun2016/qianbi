import React, { PureComponent } from 'react';
import { connect } from 'dva';
import  styles from  './index.less'
import  Entrance from  '../../../../../public/entrance.png';
import {orderState} from '../../../../utils/global-config';
import  {dataTime} from '../../../../utils/date-time';
@connect()
export default  class ListViewItem extends PureComponent {

  // 手提琴回调
  onChange = (key) => {
    console.log(key);
  };

  renderStatus=(status='2')=>{
    return  orderState[status]
  };


  render(){
    const  {data,startTime,toPay,toConfirmReceive,toDelayReceive,toOrderLocus,toOrderEvaluate,
      toOrderRefund,toOrderCancel,toOrderCancelAudit,toOrderDelayPayment}=this.props;
    const {status,delayPayStatus,buyerCancelStatus,buyerDelayReceive,sellerCancelStatus}=data;
    // 背景颜色
    let  statusStyle=null;
    // 红色字体
    let  viewRed=null;
// 支付状态
    let viewTransactionPrice=null;

// 倒计时
    let viewCountDown=null;

    // 延长收货
    let  viewReceive=null;
    // viewReceive= <div className={styles.style_yanchang} onClick={()=>toDelayReceive(data)}>延长收货</div>;
    // 查看物流
    let viewLocus=null;
    // viewLocus= <div className={styles.style_wuliu} onClick={()=>toOrderLocus(data)}>查看物流</div>;
    // 退货
    let  viewRefund=null;
    // viewRefund= <div className={styles.style_tuihuo} onClick={()=>toOrderRefund(data)}>退货</div>;
    // 退款
    let  viewMoney=null;
    // viewMoney= <div className={styles.style_queren} onClick={()=>toOrderRefund(data)}>退款</div>;
    // 取消订单
    let  viewCancel=null;
    //  viewCancel=    <div className={styles.style_quxiao} onClick={()=>toOrderCancel(data)}>取消订单</div>;

    // 取消审核
    let viewCancelAudit=null;
    //  viewCancelAudit= <div className={styles.style_wuliu} onClick={()=>toOrderCancelAudit(data)}>取消审核</div>;
    // 延时支付
    let viewDelayPayment=null;
    //  viewDelayPayment=<div className={styles.style_wuliu} onClick={()=>toOrderDelayPayment(data)}>延迟支付</div>;
    // 评价
    let  viewEvaluate=null;
    //  viewEvaluate=<div className={styles.style_wuliu} onClick={()=>toOrderEvaluate(data)}>评价</div>;
    if (status==='1'){
      statusStyle=styles.style_statustexthong;
      const {day,hour,minute} =  dataTime(startTime.datetime,data.lastPayTime);
      viewCountDown=<div className={styles.style_time}>{`付款倒计时  ${day}${hour}${minute}`}</div>;
      viewTransactionPrice= <div className={styles.style_transactionPrice}>成交价{data.transactionPrice}</div>;
      // 申请延时支付
      switch (delayPayStatus) {
        // 0:未申请
        case '0':
          viewDelayPayment=<div className={styles.style_wuliu} onClick={()=>toOrderDelayPayment(data)}>延迟支付</div>;
          break;
        // 1:买家申请
        case '1':
          viewTransactionPrice= <div className={styles.style_transactionPrice}>{`成交价 ¥${data.transactionPrice}  `}<span style={{color:'#922729'}}>卖家处理中</span></div>;

          break;
        // 2:卖家同意
        case '2':


          break;
        // 3:卖家拒绝）
        case '3':
          viewTransactionPrice= <div className={styles.style_transactionPrice}>{`成交价 ¥${data.transactionPrice}  `}<span style={{color:'#922729'}}>卖家拒绝延时支付</span></div>;
          viewDelayPayment=<div className={styles.style_wuliu} onClick={()=>toOrderDelayPayment(data)}>延迟支付</div>;
          break;
        default:
          break;
      }
      // 取消订单
      switch (buyerCancelStatus) {
        // 0:无
        case '0':
          viewRed=  <div className={styles.style_queren} onClick={()=>toPay(data)}>付款</div>;
          viewCancel= <div className={styles.style_quxiao} onClick={()=>toOrderCancel(data)}>取消订单</div>;
          break;
        // 1:买家申请
        case '1':
          viewRed=  <div className={styles.style_queren} onClick={()=>toPay(data)}>付款</div>;
          viewTransactionPrice= <div className={styles.style_transactionPrice}>{`成交价 ¥${data.transactionPrice}  `}<span style={{color:'#922729'}}>卖家处理中</span></div>;
         // viewCancelAudit= <div className={styles.style_wuliu} onClick={()=>toOrderCancelAudit(data)}>取消审核</div>;
          break;
        // 2:卖家同意
        case '2':
          viewCountDown=<div className={styles.style_time}>{`付款倒计时  ${day}${hour}${minute}`}</div>;
          viewTransactionPrice= <div className={styles.style_transactionPrice}>成交价{data.transactionPrice}</div>;
          viewDelayPayment=null;
          break;
        // 3:卖家拒绝）
        case '3':
          viewTransactionPrice= <div className={styles.style_transactionPrice}>{`成交价 ¥${data.transactionPrice}  `}<span style={{color:'#922729'}}>卖家拒绝取消订单</span></div>;
          viewRed=  <div className={styles.style_queren} onClick={()=>toPay(data)}>付款</div>;
          viewCancel= <div className={styles.style_quxiao} onClick={()=>toOrderCancel(data)}>取消订单</div>;
          break;
        default:
          break;
      }
      // 卖家取消状态
      switch (sellerCancelStatus) {
        // 0:无
        case '0':

          break;
        // 1:卖家申请
        case '1':
          viewRed=  <div className={styles.style_queren} onClick={()=>toPay(data)}>付款</div>;
          viewTransactionPrice= <div className={styles.style_transactionPrice}>{`成交价 ¥${data.transactionPrice}  `}<span style={{color:'#922729'}}>卖家处理中</span></div>;
          viewCancel=null;
           viewCancelAudit= <div className={styles.style_wuliu} onClick={()=>toOrderCancelAudit(data)}>取消审核</div>;
          break;
        // 2:买家同意
        case '2':
          viewCountDown=<div className={styles.style_time}>{`付款倒计时  ${day}${hour}${minute}`}</div>;
          viewTransactionPrice= <div className={styles.style_transactionPrice}>成交价{data.transactionPrice}</div>;
          viewCancel=null;
          viewDelayPayment=null;
          viewCancelAudit=null
          break;
        // 3:买家拒绝）
        case '3':
          viewTransactionPrice= <div className={styles.style_transactionPrice}>{`成交价 ¥${data.transactionPrice}  `}<span style={{color:'#922729'}}>卖家拒绝取消订单</span></div>;
          viewRed=  <div className={styles.style_queren} onClick={()=>toPay(data)}>付款</div>;
          viewDelayPayment=<div className={styles.style_wuliu} onClick={()=>toOrderDelayPayment(data)}>延迟支付</div>;
          break;
        default:
          break;
      }
    }else if (status==='2'){
      statusStyle=styles.style_statustexthei;

      viewCancelAudit= <div className={styles.style_wuliu} onClick={()=>toOrderCancelAudit(data)}>取消审核</div>;
      viewCancel=    <div className={styles.style_quxiao} onClick={()=>toOrderCancel(data)}>取消订单</div>;
      viewMoney= <div className={styles.style_queren} onClick={()=>toOrderRefund(data)}>退款</div>;
    }else if (status==='3'){
      statusStyle=styles.style_statustexthong;
      viewRefund= <div className={styles.style_tuihuo} onClick={()=>toOrderRefund(data)}>退货</div>;
      viewLocus= <div className={styles.style_wuliu} onClick={()=>toOrderLocus(data)}>查看物流</div>;
      viewReceive= <div className={styles.style_yanchang} onClick={()=>toDelayReceive(data)}>延长收货</div>;
      viewRed=  <div className={styles.style_queren} onClick={()=>toConfirmReceive(data)}>确认收货</div>;
    }else if (status==='4'){
      statusStyle=styles.style_statustexthei;
      viewLocus= <div className={styles.style_wuliu} onClick={()=>toOrderLocus(data)}>查看物流</div>;
      viewEvaluate=<div className={styles.style_wuliu} onClick={()=>toOrderEvaluate(data)}>评价</div>;
    }else if (status==='5'){
      statusStyle=styles.style_statustexthei;
    }else if (status==='6'){
      statusStyle=styles.style_statustexthei;
    } else if (status==='7'){
      statusStyle=styles.style_statustexthei;
    }else if (status==='8'){
      statusStyle=styles.style_statustexthei;
    }else if (status==='9'){
      statusStyle=styles.style_statustexthei;
    }

    return(
      <div className={styles.style_top}>
        <div className={styles.style_shangjia_top}>
          <img
            alt='头像'
            src={data.sellerLogoUrl}
            style={{width:'.71rem',height:'.71rem',marginLeft:'.24rem'}}
          />
          <div className={styles.style_store_name}>{data.sellerStoreName}</div>
          <img
            alt='头像'
            src={Entrance}
            style={{width:'.14rem',height:'.25rem',marginLeft:'.18rem'}}
          />
          <div className={statusStyle}>
            {this.renderStatus(status)}
          </div>
        </div>
        <div className={styles.style_introduce}>
          <img
            alt='商家图片'
            src={data.photoUrl}
            style={{width:'1.68rem',height:'1.68rem',marginLeft:'.17rem',marginTop:'.25rem',marginBottom:'.23rem'}}
          />
          <div className={styles.style_introduce1}>
            <div className={styles.style_title}>{data.title}</div>

            {viewTransactionPrice}
            {viewCountDown}
          </div>
        </div>
        <div className={styles.style_bottom}>

          {viewEvaluate}

          {viewDelayPayment}
          {viewCancelAudit}
          {viewCancel}
          {viewRefund}
          {viewLocus}
          {viewReceive}
          {viewMoney}
          {viewRed}

        </div>
      </div>
    )
  }

}
