import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import  styles from  './index.less'
import  Entrance from  '../../../public/entrance.png';

export default  class ListViewItem extends PureComponent {

  // 手提琴回调
  onChange = (key) => {
    console.log(key);
  };


  render(){
    const  {data,toPay,toConfirmReceive,toDelayReceive,toOrderLocus}=this.props;
    const {status}=data;
    // 状态
    let   statusText=null;
    // 背景颜色
    let  statusStyle=null;
    // 红色字体
    let  viewRed=null;

    if (status==='1'){
      statusText='待付款';
      statusStyle=styles.style_statustexthong;
      viewRed=  <div className={styles.style_queren} onClick={()=>toPay(data)}>付款</div>;
    }else if (status==='2'){
      statusText='待发货';
      statusStyle=styles.style_statustexthei;
    }else if (status==='3'){
      statusText='待收货';
      statusStyle=styles.style_statustexthong;
      viewRed=  <div className={styles.style_queren} onClick={()=>toConfirmReceive(data)}>确认收货</div>;
    }else if (status==='4'){
      statusText='已签收';
      statusStyle=styles.style_statustexthei;
    }else if (status==='5'){
      statusText='取消';
      statusStyle=styles.style_statustexthei;
    }else if (status==='6'){
      statusText='关闭';
      statusStyle=styles.style_statustexthei;
    }else if (status==='7'){
      statusText='已评价';
      statusStyle=styles.style_statustexthei;
    }else if (status==='8'){
      statusText='售后';
      statusStyle=styles.style_statustexthei;
    }else if (status==='9'){
      statusText='已退货';
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
            {statusText}
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
            <div className={styles.style_transactionPrice}>成交价{data.transactionPrice}</div>
            <div className={styles.style_time}>少时诵诗书3444</div>
          </div>
        </div>
        <div className={styles.style_bottom}>
          {/* <div className={styles.style_all}> */}
          {/* <Accordion accordion openAnimation={{}} onChange={this.onChange}> */}
          {/* <Accordion.Panel header="更多"> */}
          {/* 删除订单 */}
          {/* </Accordion.Panel> */}
          {/* </Accordion> */}
          {/* </div> */}

          <div className={styles.style_tuihuo}>退货</div>
          <div className={styles.style_wuliu} onClick={()=>toOrderLocus(data)}>查看物流</div>
          <div className={styles.style_yanchang} onClick={()=>toDelayReceive(data)}>延长收货</div>
          {viewRed}
        </div>
      </div>
    )
  }

}
