import React, { PureComponent } from 'react';
import {
 Flex,
} from 'antd-mobile';
import  styles from  './index.less';

export  default  class  StoreModule extends  PureComponent{

  render(){
    const {storeData,goToDerail}=this.props;
    return(
      <Flex className={styles.style_head_flex} onClick={()=>goToDerail(storeData)}>
        <img
          alt='商家logo'
          src={storeData.logoUrl}
          style={{width:'.7rem',height:'.7rem',borderRadius:'.35rem',marginLeft:'0.24rem'}}
        />
        <Flex className={styles.style_head_flex1}>
          <div className={styles.style_storeName}>{storeData.storeName}</div>
          <div className={styles.style_focusTotal}>关注 {storeData.focusTotal}人   保证金 {storeData.sellerCashDeposit}元</div>
        </Flex>
        <div className={styles.style_focus}>进入店铺</div>
      </Flex>
    )
  }
}
