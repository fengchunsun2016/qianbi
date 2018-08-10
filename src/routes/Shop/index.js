import React,{PureComponent} from 'react';
import { connect } from 'dva';
import  {ReactDOM} from 'react-dom'
import { Link} from 'dva/router';
import  Utils from '../../utils/my-utils';
import {
  Flex,
  Tabs,
  NavBar,
  PullToRefresh,
} from 'antd-mobile';
import Goods from '../../components/Goods';
import  GoodsIntroduce from '../../components/GoodsIntroduce';
import  styles from  './index.less'

const tabs = [
  { title: '限时拍品' },
  { title: '专场拍品' },
];
@connect(({ shop, loading }) => ({
  shop,
  loading: loading.effects['home/carousel'],
}))

export  default  class Shop extends  PureComponent{

  constructor(){
    super();
    this.state={
      refreshing: false,
    }
  }

  componentDidMount() {
    const { dispatch,match:{params} } = this.props;
    const {id}=params;
    dispatch({
      type: 'shop/load',
      payload:{sellerUserId:id},
    });
    dispatch({
      type: 'shop/storeTimeItems',
      payload:{sellerUserId:id},
    });
    dispatch({
      type: 'shop/fundestoreLives',
      payload:{sellerUserId:id},
    });
  }


  onRefresh = () => {
    const { dispatch,match:{params} } = this.props;
    const {id}=params;
    setTimeout(() => {
      dispatch({
        type: 'shop/fundestoreLives',
        payload:{sellerUserId:id,page:1},
      });
      this.setState({
        refreshing: false,
      });
    }, 600);
  };

  render(){
    const  than=this.state
    const {
      shop:{
        storeData={},
        timeItems=[],
        lives=[],
           },
    }=this.props;
    const goodsTimeProps={
      list:timeItems,
      isData:true,
      doFocus(obj){
        console.log(obj);
      },

    };
    const liveslist ={
      livesList:lives,
      doGoodsFocus(obj){
        console.log(obj);
      },
    };
    return(
      <div>
        <NavBar
          mode="light"
        >泉拍
        </NavBar>
        <div className={styles.style_head}>
          <div style={{width:'7.50rem',height:'0.02rem',background:'#e7e7e7'}} />
          <Flex className={styles.style_head_flex}>
            <img
              alt='商家logo'
              src={storeData.logoUrl}
              style={{width:'.7rem',height:'.7rem',borderRadius:'.35rem',marginLeft:'0.24rem'}}
            />
            <Flex className={styles.style_head_flex1}>
              <div className={styles.style_storeName}>{storeData.storeName}</div>
              <div className={styles.style_focusTotal}>关注 {storeData.focusTotal}人   保证金 {storeData.cashDeposit}元</div>
            </Flex>
            <div className={styles.style_focus}> +关注</div>
          </Flex>
          <div style={{width:'7.50rem',height:'0.02rem',background:'#e7e7e7',marginLeft:'0.24rem'}} />
          <div className={styles.style_description}>{storeData.description}</div>
          <div className={styles.style_all}>更多说明</div>
        </div>
        <div style={{marginTop:'.2rem'}}>
          <Tabs
            tabs={tabs}
            tabBarActiveTextColor='#922729'
            tabBarInactiveTextColor='#333'
            tabBarBackgroundColor='#fff'
            tabBarUnderlineStyle={{borderColor:'#922729'}}
            swipeable={false}
            tabBarTextStyle={{fontSize: '.32rem'}}
          >
            <div>
              <PullToRefresh
                distanceToRefresh={50}
                direction='up'
                refreshing={than.refreshing}
                onRefresh={this.onRefresh}
                damping={150}
              >
                <Goods {...goodsTimeProps} />
              </PullToRefresh>
            </div>
            <div>

              <GoodsIntroduce {...liveslist} />

            </div>

          </Tabs>
        </div>
      </div>
    )
  }
}
