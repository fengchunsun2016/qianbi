import React, { PureComponent } from 'react';
import {
  Grid,
  Badge,
} from 'antd-mobile'
import {connect} from 'dva'
import  styles from  './index.less';
import  Entrance from '../../../public/entrance.png';
import {routerRedux} from 'dva/router';
/**
 * sellList Gied展示数据比穿
 * number 列数 必穿
 * textSum  消息提示数 默认0
 */
@connect()
export default  class MyOrderGird extends PureComponent{

  to=(value)=>{
    const {dispatch}=this.props;
    const {url} =value;
    dispatch(routerRedux.push(url));
  };

  render(){
    const  {OrderList=[],number,textSum=0,onClickAll}=this.props;
    let styleAll=null;
    if (number>4){
      styleAll=styles.style_badge;
    }else {
      styleAll=styles.style_badge1;
    }
    return(
      <div className={styles.style_myorder} >
        <div className={styles.style_order} onClick={onClickAll}>
          <div className={styles.setyle_my}>我的订单</div>
          <div className={styles.setyle_myall}>查看全部
            <img
              alt='进入'
              src={Entrance}
              style={{width:'.25rem',height:'.25rem'}}
            />
          </div>
        </div>
        <Grid
          data={OrderList}
          columnNum={number}
          hasLine={false}
          onClick={this.to}
          renderItem={dataItem => (
            <div>
              <div className={styles.style_imgBadge}>
                <img src={dataItem.icon} style={{ width: '.58rem', height: '.58rem' }} alt="" />
                <Badge className={styleAll} text={textSum} overflowCount={99}  />
              </div>
              <div style={{ color: '#333', fontSize: '.24rem', marginTop: '.13rem' }}>
                {dataItem.text}
              </div>
            </div>
          )}
        />

      </div>

    )
  }
}
