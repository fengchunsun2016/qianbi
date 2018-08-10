// 个人设置
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List , NavBar , Icon} from 'antd-mobile';
import  styles from  './Personal.less';
import { Link } from 'dva/router';

const Item = List.Item;
const Brief = Item.Brief;
@connect()
export default class PersonalSettings extends  PureComponent{
  componentDidMount(){

  }

  render(){
    return(
      <div>
        <div>
          <NavBar
            mode="light"

          >个人设置
          </NavBar>

          <div className={styles.style_kong}></div>
          <Link to="/PersonalInfor">
          <List className={styles.style_list}>
            <Item
              className={styles.style_item}
              arrow="horizontal"
              onClick={() => {}}
            >
              <img
                alt='头像'
                src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1843140232,4000409481&fm=173&app=25&f=JPEG?w=480&h=729&s=7EDA08D74E2041154487D7F00300A01C"
                style={{width:'1.14rem',height:'1.14rem',borderRadius:'50%'}}
              />
              <span className={styles.style_name}>niyao w zeny</span>

            </Item>
          </List>
          </Link>
          <div className={styles.style_kong}></div>
        </div>
        <div>
          <List className={styles.style_list}>
            <Item extra={18212345678} onClick={() => {}} className={styles.style_phone}>

              <span>手机号</span>
            </Item>
            <Item
              className={styles.style_phone}
              extra="未认证"
              arrow="horizontal"
              onClick={() => {}}
            >
              <span>实名认证</span>
            </Item>
            <Link to="/newAddress">
            <Item
              className={styles.style_phone}
              arrow="horizontal"
              onClick={() => {}}
            >
              <span>收货地址</span>
            </Item>
            </Link>
          </List>
        </div>
      </div>
    )
  }
}
