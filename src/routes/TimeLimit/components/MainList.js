/**
 * Created by feng on 2018/8/6.
 */

import React from 'react';
import { PullToRefresh, Flex } from 'antd-mobile';
import { Link, routerRedux } from 'dva/router';


import GoodsItem from '../../../components/GoodsItem/GoodsItem';

import styles from '../style/MainList.less'



export default ({mainData=[],dispatch,focusOrNo,refresh,loadMore})=>{

  return (
    <div className={styles.main}>
      <PullToRefresh
        onRefresh={refresh}
        style={{height:'calc(100vh - 50px - 2.76rem)'}}
      >
        <PullToRefresh
          direction='up'
          onRefresh={loadMore}
          distanceToRefresh={5}
          indicator={{ deactivate: <div style={{height:'50px',lineHeight:"50px"}}>上拉可以刷新</div> }}
        >
          <Flex justify='between' wrap='wrap'>

            {
              mainData.map(item=>(
                <Link to={`/goodsparticulars/${item.id}`} key={item.id}>
                  <GoodsItem key={item.id} data={item} dispatch={dispatch} focusOrNo={focusOrNo} />
                </Link>

              ))
            }

          </Flex>
        </PullToRefresh>


      </PullToRefresh>

    </div>
  )

}










