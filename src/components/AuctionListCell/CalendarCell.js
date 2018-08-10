import React, { PureComponent } from 'react';

import styles from './CalendarCell.less';

import focus from '../../../public/foucs_select.png';
import focusNo from '../../../public/focus_no.png';

import hot from '../../../public/hot_small.png';
import preview from '../../../public/preview_small.png';
import ended from '../../../public/ended_small.png';
/*
* 即将开始专场列表cell
*
* doFocus:关注/取消回调 {object}
* goToDerail: cell被点击回调 {object}
*
* 属性 obj对象 ----
* title: 标题
* total: 拍品数量
* transactionTotal: 	成交数量
* abortiveTotal: 	流拍数量
* beginTime:	竞拍开始时间（yyyy-MM-dd HH:mm:ss）
* endTime:	竞拍结束时间（yyyy-MM-dd HH:mm:ss）
* priceTotal:	出价次数
* focus：专场是否关注（true：已关注，false：未关注）
* focusTotal:	关注数量
* transactionPriceTotal:	总成交金额（仅已结拍专场存在）
* status:	状态（1:预展中，2:进行中，3:已结拍）
* itemList: []  -> photoUrl 拍品图片URL
* hotItem: {} -> id: 	拍品编号 lot:  专场拍品编号 transactionPrice: 	当前价
*
* */

export default class AuctionListCell extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isFocus: props.obj.focus || false,
    }
  }

  doFocus = (e) => {
    const { isFocus } = this.state;
    e.stopPropagation();
    this.setState({
      isFocus: !isFocus,
    });
    const {
      obj,
      doFocus,
    } = this.props;
    doFocus(obj);
  };

  render() {

    const {
      obj,
      goToDerail,
    } = this.props;

    const { title = '', total = 0, beginTime = '', itemList = [], status = '1', focusTotal = 0 } = obj;

    const {isFocus} = this.state;

    const date = beginTime.length > 11 ? beginTime.substr(11) : '';
    const tipBgColor = status === '1' ? '#DB8400' : status === '2' ?  '#922729' : '#333';
    const tipImg = status === '1' ? preview : status === '2' ? hot : ended;
    const tipTitle = status === '1' ? '预展中' : status === '2' ? '热拍中' : '已结拍';
    const totalColor = status === '3' ?  '#333' : '#922729';

    const list = [];
    itemList.map((item, index) => {
      const {photoUrl} = item;
      list.push(
        <img className={styles.footerImg} key={index.toString()} src={photoUrl} alt="图片" />
      );
      return item;
    });

    return(
      <div className={styles.cell} onClick={()=>goToDerail(obj)}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div>{title}</div>
            <div style={{marginTop:'.1rem', fontSize: '.24rem'}}>共<span style={{color: totalColor}}>{total}</span>件 <span style={{textDecoration: 'underline'}}>开拍时间 {date}</span></div>
          </div>
          {
            status === '3' ?
              (
                <div className={styles.endedInfo}>
                  <p>￥14,000.00</p>
                  <p>成交额</p>
                </div>
              ) : ''
          }
          <div className={styles.focus} onClick={this.doFocus}>
            <img src={isFocus ? focus :focusNo} alt="" style={{width: '.44rem', height: '.44rem'}} />
            <div style={{fontSize:'.24rem', color:'#333', marginTop:'.06rem'}}>{focusTotal}</div>
          </div>
        </div>
        <div className={styles.footer}>
          {list}
          <div className={styles.tip} style={{background: tipBgColor}}>
            <img src={tipImg} alt="" style={{width:'.36rem', height: '.36rem'}} />
            <span className={styles.tipTitle}>{tipTitle}</span>
          </div>
        </div>
      </div>
    );
  }
}
