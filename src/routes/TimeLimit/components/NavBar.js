/**
 * Created by feng on 2018/8/6.
 */
import React from 'react';
import {Flex} from 'antd-mobile';

import NavItem from './NavItem';


import styles from '../style/NavBar.less';

const FlexItem = Flex.Item;





export default ({selected, sort, onClickCount, onClickEndTime, onClickPrice})=>{

  return (
    <div className={styles.main}>
      <Flex justify='center' className={styles.flex}>
        <FlexItem onClick={onClickCount}>
          <NavItem title='出价次数' selected={selected==='1'} selectedIndex={sort} />
        </FlexItem>
        <FlexItem onClick={onClickEndTime}>
          <NavItem title='结拍时间' selected={selected==='2'} selectedIndex={sort} />
        </FlexItem>
        <FlexItem onClick={onClickPrice}>
          <NavItem title='当前价' selected={selected==='3'} selectedIndex={sort} />
        </FlexItem>
        <FlexItem>
          分类
        </FlexItem>
      </Flex>
    </div>
  )

}









