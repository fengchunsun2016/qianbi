import React, { PureComponent } from 'react'
import { comdify } from '../../utils/my-utils'
import styles from './LiveGoods.less'
import noFocusImg from '../../../public/collect_no.png';
import isFocusImg from '../../../public/collect_select.png';
import sellOut from '../../../public/sell_out.png';
import sellNoOut from '../../../public/sell_no_out.png';
/*
* id: 拍品编号
* lot: 本场拍品编号
* title: 拍品标题
* startingPrice: 起拍价
* focusTotal: 关注数量
* focus: 	拍品是否关注（true:已关注，false:未关注）
* status: 	状态 1:预展中，2:拍卖中，3:已成交，4:未成交
* transactionPrice: 	成交价（未成交时为当前价）
* transactionUser :	成交人昵称
* photoUrl: 	图片URL
*
* */
export default class LiveGoods extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isFocus: props.obj.focus || false,
    }
  }

  // 点击关注
  doFocus = (e) => {
    const { isFocus } = this.state;
    e.stopPropagation();
    this.setState({
      isFocus: !isFocus,
    });
    const {
      obj,
      doFocusGoods,
    } = this.props;
    doFocusGoods(obj);
  };

  render() {
    const {
      index_ = 0,
      obj = {},
      goToGoodDerail,
    } = this.props;

    const {
      title = '',
      startingPrice = 0,
      status = '1',
      transactionPrice = 0,
      photoUrl = '',
      focusTotal = 0,
    } = obj;
    const { isFocus } = this.state;
    const img = isFocus ? isFocusImg : noFocusImg;
    const msg = status === '1' ? '起拍价' : status === '2' ? '当前价' : status === '3' ? '成交价' : status === '4' ? '起拍价' : '';
    const price = status === '1' ? startingPrice : status === '2' ? transactionPrice : status === '3' ? transactionPrice : status === '4' ? startingPrice : '';
    // 给钱数添加千分符
    const rmb = comdify(price);

    return(
      <div className={styles.card} style={index_%2===0?{marginRight:"0.1rem"}:{marginLeft:"0.1rem"}} onClick={()=>goToGoodDerail(obj)}>

        <div className={styles.top}>
          <img src={photoUrl} alt="" style={{width: '100%', height: '100%'}} />
          {
            status === '1' ?
              (<div className={styles.tip} style={{background: '#DB8400'}}>预展中</div>) :
              status === '2' ?
                (<div className={styles.tip} style={{background: '#E70C0C'}}>热拍中</div>) : ''
          }

          <div className={styles.focus} onClick={this.doFocus}>
            <img src={img} alt="" style={{width: '.48rem', height: '.48rem'}} />
            <div style={{color: '#333', fontSize: '.2rem', width: '100%', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{focusTotal}</div>
          </div>
          {
            status === '3' ?
              (<img src={sellOut} alt="" className={styles.leftTip} />) :
              status === '4' ?
                (<img src={sellNoOut} alt="" className={styles.leftTip} />) :
                ''
          }
        </div>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '1.22rem', padding: '0 .2rem'}}>
          <div style={{color: '#333', fontSize: '.3rem', textAlign: 'left', padding: '0, .2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{title}</div>
          <div style={{color: '#333', fontSize: '.26rem', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
            {`${msg} `}
            <span style={{color: '#8D2628'}}>¥{rmb}</span>
          </div>
        </div>

      </div>
    )
  }
}

