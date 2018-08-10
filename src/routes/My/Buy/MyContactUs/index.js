// 联系我们
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  List,
  NavBar,
} from 'antd-mobile';
import  styles from './index.less';
import appLogo from  '../../../../../public/app_logo.png';

@connect()
export default class MyContactUs extends  PureComponent{
  render(){
    return(
      <div>
        <NavBar
          mode="light"
        >联系我们
        </NavBar>
        <div className={styles.style_img}>
          <img
            alt='商家图片'
            src={appLogo}
            style={{width:'1.24rem',height:'1.24rem'}}
          />
        </div>
        <List className="my-list">
          <List.Item extra={<p style={{  fontSize:'.24rem',color:'#2855A6'}}>4255-54225-444</p>}><p style={{  fontSize:'.30rem',color:'rgba(51,51,51,1)'}}>客服热线</p></List.Item>
          <List.Item extra={<p style={{  fontSize:'.24rem'}}>待定邮箱</p>}><p style={{  fontSize:'.30rem',color:'rgba(51,51,51,1)'}}>联系邮箱</p></List.Item>
          <List.Item extra={<p style={{  fontSize:'.24rem'}}>待定邮箱</p>}><p style={{  fontSize:'.30rem',color:'rgba(51,51,51,1)'}}>联系地址</p></List.Item>
        </List>
      </div>
    )
  }
}
