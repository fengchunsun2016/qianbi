import React, { PureComponent } from 'react';

import { connect } from 'dva';

import {
  NavBar,
  InputItem,
  List,
  Modal,
  Button,
  Radio,
  Toast,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import  styles from  './PayCashDepositLess.less';
// 余额支付
import  Payment from  '../../../../../public/payment.png';
// 关闭
import  Shut from  '../../../../../public/shut.png';
// 微信支付
import  WXpay from  '../../../../../public/wxpay.png';
// 快捷支付
import  RapidPay from  '../../../../../public/rapidPay.png';

const RadioItem = Radio.RadioItem;


let  record=0;
let  payMoney;
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
class PayCashDeposit  extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      type: 'money',
      modal2: false,
      value: 0,
    };
  }

// 取消提示框
  onClose = () => {
    if (record>0){
      this.setState({
        modal2: false,
      });
    } else{
      Toast.info('请选择付款方式', 1);
    }


  };

// img取消提示框
  onImgClose = () => {
    this.setState({
      modal2: false,
    });
  };

  // 取消单选
  onChange = (value) => {
    record=value;
    this.setState({
      value,
    });
  };

  // 显示提示框
  onVirtualKeyboardConfirm=(v)=>{
    // v.preventDefault(); // 修复 Android 上点击穿透
    if (v>0){
      payMoney=v;
      this.setState({
        modal2 : true,
      });
    }

  };




  render(){
    const { getFieldProps } = this.props.form;
    const { type,value,modal2} = this.state;
    return(
      <div>
        <NavBar mode="light">缴纳保证金</NavBar>
        <div style={{width:'7.50rem',height:'0.01rem',background:'#e7e7e7'}} />
        <div className={styles.style_top}>
          缴纳成功后，可转出到账户余额抵扣拍品金额
        </div>
        <div style={{width:'7.50rem',height:'0.01rem',background:'#e7e7e7',marginLeft:'.24rem',marginRight:'.24rem'}} />
        <List>
          <InputItem
            {...getFieldProps('money2', {
              normalize: (v, prev) => {
                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                  if (v === '.') {
                    return '0.';
                  }
                  return prev;
                }
                return v;
              },
            })}
            style={{width:'4rem'}}
            type={type}
            placeholder="请输入金额"
            ref={el => this.inputRef = el}
            onVirtualKeyboardConfirm={this.onVirtualKeyboardConfirm}
            clear

          ><text style={{fontSize:'.36rem'}}>交易金额</text>
          </InputItem>
        </List>

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
                <div className={styles.style_jine}>支付金额 <p style={{color:'#922729'}}>  ¥ {payMoney}</p></div>
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

export default createForm()(PayCashDeposit);
