import React,{PureComponent} from 'react';
import {Link} from 'dva/router';
import { Flex,WhiteSpace} from 'antd-mobile';
import styles from  './index.less';
import CollectSelect from '../../../public/collect_select.png';
import CollectNo from '../../../public/collect_no.png';
/**
 * 进入商家店铺
 */


/**
 * list :[{
 *  title: 图片地址,
 *  title:商品名称,
 *   seller:卖家信息,
 *   priceTotal,
 *   id:
 * }]
 *
 * doFocus:关注/取消回调 {object}
 */
export default class Goods extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      isFocus: props.list.focus,
    };
  };

  doFocus = (e) => {
    const { isFocus } = this.state;
    const { obj, doFocus } = this.props;
    e.stopPropagation();
    this.setState({
      isFocus: !isFocus,
    });
    doFocus(obj);
  };

  render() {
    // /${item.seller.storeName}/${item.seller.logoUr}
    const {list=[],isData}=this.props;
    const {isFocus} = this.state;
    return (
      <Flex className={styles.style_flex}>
        {list.map((item,pos)=>(
          <div key={pos}>
            <Link to={`/goodsparticulars/${item.id}`}>
              <Flex direction='column' className={styles.styles_link}>
                <div className={styles.style_focus_flex}  onClick={this.doFocus}>
                  {
                    isFocus ===true?(
                      <img
                        alt=""
                        src={CollectSelect}
                        className={styles.style_focus}

                      />):(
                        <img
                          alt=""
                          src={CollectNo}
                          className={styles.style_focus}
                        />
                  )
                }
                  <div className={styles.style_focusTotal}>{item.focusTotal}</div>
                </div>

                <img
                  alt=""
                  src={item.photoUrl}
                  className={styles.ll_img}
                />
                <div className={styles.style_title}>{item.title}</div>
                <Flex direction='row' className={styles.style_price_flex}>
                  <div className={styles.style_price}>当前出价</div>
                  <div className={styles.style_transactionPrice}>¥ {item.transactionPrice}</div>
                </Flex>
                <div className={styles.style_priceTotal}>出价 {item.priceTotal}次</div>
                <div className={styles.style_endTime}>结拍时间 {item.endTime}</div>
                {
              isData===true?(
                <div />
              ):(
                <Flex direction='row' className={styles.style_store_flex}>
                  <div className={styles.style_store}>卖家 </div>
                  <Link to={`/shop/${item.id}`}> <div className={styles.style_storeName}>  {item.seller.storeName}</div></Link>
                </Flex>
              )
            }

              </Flex>
              <WhiteSpace size="lg" />
            </Link>
          </div>
          ))}

      </Flex>
    );
  }
}
