/**
 * Created by feng on 2018/8/6.
 */

import React from 'react';
import { Icon } from 'antd-mobile';

import styles from '../style/SubHeader.less'


export default ({toSearch})=>{
  return (
    <div className={styles.main}>

      <Icon
        type='search'
        className={styles.icon}
        onClick={toSearch}
      />

      <div className={styles.text}>
        限时拍品
      </div>


    </div>
  )
}





