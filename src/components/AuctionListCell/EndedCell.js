import React, { PureComponent } from 'react';
import styles from './StartingCell.less';

/*
* 结束专场列表cell
*
*
* goToDerail: cell被点击回调 {object}
* */

export default class EndedCell extends PureComponent {

  render() {
    const {
      obj,
      goToDerail,
    } = this.props;

    const { title = '', endTime = '', itemList = [] } = obj;

    const list = [];

    itemList.map((item, index) => {
      const {photoUrl} = item;
      list.push(
        <img className={styles.footerImg} key={index.toString()} src={photoUrl} alt="图片" />
      );
      return null;
    });

    return(
      <div className={styles.cell} onClick={()=>goToDerail(obj)}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div>{title}</div>
            <div style={{marginTop:'.1rem', fontSize: '.24rem'}}><span style={{textDecoration: 'underline'}}>结拍时间 {endTime}</span></div>
          </div>
        </div>
        <div className={styles.footer}>
          {list}
        </div>
      </div>
    );
  }
}
