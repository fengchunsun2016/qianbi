/**
 * Created by feng on 2018/8/7.
 */

import React from 'react';


import styles from '../style/NavItem.less';




export default ({ title = '出价次数', selected = false, selectedIndex = '1' }) => {
  /*
  * params:
  *
  * title=>显示的文字
  * selected=>此项是否被选中
  * selectedIndex=>被选中的索引，1代表升序，2代表降序
  *
  *
  * */


  return (
    <div className={styles.main}>

      <div className={selected?styles['text-selected']:styles.text}>
        {title}
      </div>

      <div className={styles.icon}>
        <div className={selected?(selectedIndex==='1'?styles["up-selected"]:styles.up):styles.up}></div>
        <div className={selected?(selectedIndex==='2'?styles["down-selected"]:styles.down):styles.down}></div>
      </div>


    </div>
  )
}














