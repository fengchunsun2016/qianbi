/**
 * Created by feng on 2018/8/9.
 */

import React, { PureComponent } from 'react';
import styles from "./Focus.less";

const CollectNo = require('../../../public/collect_no.png');
const CollectSelect = require('../../../public/collect_select.png');


export default ({ focus, focusTotal, id, focusOrNo }) => {


  return (
    <div className={styles.main}>
      <div
        className={styles.focus}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          focusOrNo(id)
        }}
      >
        {
          focus ? <img src={CollectSelect} alt="" /> : <img src={CollectNo} alt="" />
        }

      </div>
      <div className={styles.num}>
        {
          focusTotal
        }
      </div>
    </div>

  )


}





