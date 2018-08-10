import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  WhiteSpace,
  Tabs,
  NavBar,
} from 'antd-mobile';

import  AuctionItems from  './AuctionItems';
import  Special from  './Special.js';
import  Store from  './Store';
const tabs = [
  { title: '关注的拍品' },
  { title: '专注的专场' },
  { title: '关注的店铺' },
];

export default class MyFcous extends  PureComponent{



  render(){

    return(
      <div>
        <NavBar mode="light">我的关注</NavBar>
        <WhiteSpace size="lg" />
        <Tabs
          tabs={tabs}
          initialPage={0}
          prerenderingSiblingsNumber={0}
          swipeable={false}
          tabBarBackgroundColor='#FFF'
          tabBarActiveTextColor='#922729'
          tabBarInactiveTextColor='#333'
          tabBarUnderlineStyle={{borderColor:'#922729'}}
        >
          <AuctionItems />
          <Special />
          <Store />
        </Tabs>

      </div>
    )
  }

}
