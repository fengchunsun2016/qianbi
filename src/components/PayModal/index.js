import React, { PureComponent } from 'react';

import {
  List,
  Modal,
  Button,
  Radio,
} from 'antd-mobile';

import { createForm } from 'rc-form';
import  styles from  './index.less';
// 余额支付
import  Payment from  '../../../public/payment.png';
// 关闭
import  Shut from  '../../../public/shut.png';
// 微信支付
import  WXpay from  '../../../public/wxpay.png';
// 快捷支付
import  RapidPay from  '../../../public/rapidPay.png';

const RadioItem = Radio.RadioItem;



const  modalData=[
  {
    icon:Payment,
    tltie:'余额支付',
    value:1,
  },
  {
    icon:WXpay,
    tltie:'微信支付',
    value:2,
  },
  {
    icon:RapidPay,
    tltie:'快捷支付',
    value:3,
  },
];
export default   class PayCashDeposit  extends PureComponent{


  render(){
    const { value=0,modal2=false,onClose,payMoney=0.00,onImgClose,onChange} = this.props;
    return(
      <div>
        <Modal
          popup
          visible={modal2}
          onClose={this.onClose}
          animationType="slide-up"
        >
          <List
            renderHeader={() => (
              <div className={styles.style_waywai}>
                <div className={styles.style_way}>
                  <div style={{width:'80%'}}>请选择支付方式</div>
                  <img alt='返回' src={Shut} style={{width:'.38rem',height:'.38rem'}} onClick={this.onImgClose} />
                </div>
                <div className={styles.style_jine}>支付金额 <p style={{color:'#922729'}}>¥{payMoney}</p></div>
              </div>
)}
            className="popup-list"
          >

            {
              modalData.map((itemData,index)=>(

                <RadioItem
                  thumb={itemData.icon}
                  key={index.toString()}
                  checked={value === itemData.value}
                  multipleLine
                  onChange={() => this.onChange(itemData.value)}
                >
                  {itemData.tltie}
                </RadioItem>

              ))
            }

            <List.Item>
              <Button type="primary" onClick={this.onClose}>确认支付</Button>
            </List.Item>
          </List>
        </Modal>

      </div>
    )
  }
}

createForm()(PayCashDeposit);
