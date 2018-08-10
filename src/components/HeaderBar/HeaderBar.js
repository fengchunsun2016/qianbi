import React from 'react';

import styles from "./HeaderBar.less";

/**
 * Created by feng on 2018/7/28.
 */




export default ({title = '泉拍'}) => {

  return (
    <div className={styles.header}>{title}</div>
  )

}






