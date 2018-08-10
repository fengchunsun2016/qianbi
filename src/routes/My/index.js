// 我的
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  SegmentedControl,
  WhiteSpace,
} from 'antd-mobile';
import  styles from  './index.less'
import BuyHome from  './buyHome.js';
import SellHome from  './sellHome.js';
import WalletHome from  './walletHome.js';

const isShop=true;
const  itms1= ['买家中心', '卖家中心', '我的钱包'];
const  itms2= ['买家中心',  '我的钱包'];
@connect(({ my, loading }) => ({
  my,
  loading: loading.effects['my/mylogin'],
}))

export default  class My extends PureComponent {

  constructor(){
    super();
    this.state = {
      view:<BuyHome isShop={isShop} />,
      selectedIndex:0,
    };
  };


  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'my/mylogin',
    //   payload:{id:"dsadsadsadasdas"},
    // });
  }

  onChange = (e) => {
    const value=e.nativeEvent.selectedSegmentIndex;
  let views=[];
    if (isShop){
      views =[<BuyHome isShop={isShop} />,<SellHome />, <WalletHome money={500.25} />];
    } else{
      views =[<BuyHome isShop={isShop} />, <WalletHome money={500.25} />];
    }

    this.setState({selectedIndex:value,view:views[value]})
  };



  render(){
    const  {view,selectedIndex}=this.state;
    let itms=[];
    if (isShop){
      itms=itms1;
    } else{
      itms= itms2;
    }
    return(
      <div className={styles.style_vessel}>
        <WhiteSpace size="lg" />
        {
          isShop===true?(
            <SegmentedControl
              className={styles.style_sc}
              values={itms}
              onChange={this.onChange}
              selectedIndex={selectedIndex}
              tintColor="#922729"
            />
          ):(
            <SegmentedControl
              className={styles.style_sc}
              values={itms}
              selectedIndex={selectedIndex}
              onChange={this.onChange}
              tintColor="#922729"
            />
          )
        }
        {view}
      </div>
    )
  }
}
