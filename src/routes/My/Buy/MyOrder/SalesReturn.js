// 退货
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  NavBar,
  WhiteSpace,
  Checkbox,
  TextareaItem,

} from 'antd-mobile';
import { createForm } from 'rc-form';
import  styles from './index.less'
import  Entrance from '../../../../../public/entrance.png';
import { paraseQuery } from '../../../../utils/my-utils';
import starImg from '../../../../../public/star_img.png';
import {orderState} from '../../../../utils/global-config';

let boxIndex=1;
let  content;
@connect(({ sales, loading }) => ({
  sales,
  loading: loading.effects['sales/flushOrderRefund'],
}))
class SalesReturn extends PureComponent {
  constructor(){
    super();
    this.state={
      checkbox:1,

    }
  }


  // 选中第一个
  onChange1 = (val) => {
    boxIndex=val;
    this.setState({checkbox:1})
  };

  // 选中第二个
  onChange2 = (val) => {
    boxIndex=val;
    this.setState({checkbox:2})
  };

  // 获取文本内容
  onChangeData=(val)=>{
    content=val;
  };

  // 提交订单
  submitReport=(orderNo)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'sales/flushOrderRefund',
      payload:{orderNo,refundExpressType:boxIndex,refundReason:content},
    });
  };

  renderStatus=(status='2')=>{
     return  orderState[status]
  };

  render(){
    const { getFieldProps } = this.props.form;
    const {sales:{
      data={},
    } } = this.props;
    // 状态

    return(
      <div>
        <NavBar mode="light">退货退款</NavBar>
        <WhiteSpace size="lg" />
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
          <div className={styles.style_statustexthei}>
            {this.renderStatus(data.status)}
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
        <div className={styles.style_xia}>
          <div className={styles.style_qian}>
            <img
              alt=''
              src={starImg}
              style={{width:'0.20rem',height:'0.20rem',marginLeft:'0.24rem'}}
            />
            <div style={{flex:'1'}}>退款金额</div>
            <div className={styles.style_renminbi}>¥ {data.transactionPrice}</div>
          </div>
          <div className={styles.style_xuanze}>
            <img
              alt=''
              src={starImg}
              style={{width:'0.20rem',height:'0.20rem',marginLeft:'0.24rem'}}
            />
            <div style={{flex:'1'}}>物流费用</div>
            <div className={styles.style_checkbox}>
              <Checkbox onChange={() => this.onChange1(1)} checked={this.state.checkbox===1}>
                现付(本人承担邮费)
              </Checkbox>
              <Checkbox onChange={() => this.onChange2(2)} style={{marginTop:'.31rem'}} checked={this.state.checkbox===2}>
                到付(卖家承担邮费)
              </Checkbox>
            </div>
          </div>
          <div className={styles.style_yuanying}>
            <img
              alt=''
              src={starImg}
              style={{width:'0.20rem',height:'0.20rem',marginLeft:'0.24rem'}}
            />
            <div>退货退款原因</div>
          </div>
          <div style={{paddingLeft:'.24rem',paddingRight:'.24rem',paddingTop:'0.08rem',  paddingBottom:'.10rem'}}>
          <TextareaItem
            {...getFieldProps('count', {
              initialValue: content,
            })}
            className={styles.style_tl}
            placeholder='请输入不超过80字'
            rows={4}
            count={80}
            onChange={this.onChangeData}
          />
          </div>
        </div>
        <div className={styles.style_tijiao} onClick={()=>this.submitReport(data.orderNo)}>
          提交
        </div>
      </div>


    )
  }
}
export default  createForm()(SalesReturn);
