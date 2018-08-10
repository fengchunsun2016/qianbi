/**
 * Created by feng on 2018/8/8.
 */

import React from 'react';
import { routerRedux } from 'dva/router';

import Focus from './Focus';

import styles from './GoodsItem.less';



export default ({data = {}, dispatch,focusOrNo})=>{

  function toShop(e){
    e.stopPropagation();
    e.preventDefault();

    dispatch(routerRedux.push(`/shop/${data.seller.userId}`));
  }

  return (
    <div className={styles.main}>
      <div className={styles.img}>
        <img src={data.photoUrl} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          {data.title}
        </div>
        <div className={styles.transactionPrice}>
          当前价: <span className={styles.red}>￥</span><span className={styles.red}>{data.transactionPrice}</span>
        </div>
        <div className={styles.bidTotal}>
          出价次数: <span>{data.bidTotal}</span>
        </div>
        <div className={styles.endTime}>
          结拍时间: <span>{data.endTime}</span>
        </div>
        {
          data.seller? (
            <div className={styles.seller} onClick={toShop}>
              卖家: <span className={styles.sellerName}>{data.seller&&data.seller.nickname}</span>


            </div>
):''
        }

        <Focus focus={data.focus} focusTotal={data.focusTotal} dispatch={dispatch} id={data.id} focusOrNo={focusOrNo} />

      </div>

    </div>
  )

}






