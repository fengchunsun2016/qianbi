// 我的竞拍
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  SegmentedControl,
  WhiteSpace,
  NavBar,
  SearchBar,
} from 'antd-mobile';
import  styles from  './index.less';
import AuctionModule from  './AuctionModule.js';
import AuctionModule2 from  './AuctionModule2.js';
const  itms=['限时竞拍', '专场竞拍'];
@connect()
export default  class  MyAuction extends PureComponent{
  constructor(){
    super();
    this.state = {
      view:<AuctionModule type={1} />,
      selectedIndex:0,
    };
  }
  ;
// 点击切换 view
  onChange = (e) => {
    const value=e.nativeEvent.selectedSegmentIndex;
    const  views =[<AuctionModule  />,<AuctionModule2  />];
    this.setState({selectedIndex:value,view:views[value]})
  };

  render(){
    const  {view,selectedIndex}=this.state;
    return(
      <div>
        <NavBar mode="light">我的竞拍</NavBar>
        <div style={{width:'7.50rem',height:'0.01rem',background:'#e7e7e7'}} />
        { selectedIndex===9?(
          <div>
            <SearchBar placeholder="请输入拍品关键字" maxLength={10} />
          </div>
        ):(<div />)
        }
        <div className={styles.style_top}>
          <WhiteSpace size="lg" />
          <SegmentedControl
            className={styles.style_sc}
            values={itms}
            selectedIndex={selectedIndex}
            onChange={this.onChange}
            tintColor="#922729"
          />
        </div>
        {view}
      </div>
    )
  }
}
