// 商品详情
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  WhiteSpace,
} from 'antd-mobile';
import  styles from  './index.less';
import Watch from '../../../public/watch.png';
import Report from '../../../public/report.png';
import Enshrine from '../../../public/enshrine.png';
@connect(({ goodsParticulars, loading }) => ({
  goodsParticulars,
  loading: loading.effects['goodsParticulars/liveAuction'],
}))
export default class GoodsParticulars extends PureComponent {
  constructor(){
    super();
    this.state = {
    };
  };

  componentDidMount() {
    const { dispatch,match:{params} } = this.props;
    const {ids}=params;
    console.log("params>>>>",params);
    dispatch({
      type: 'goodsParticulars/liveAuction',
      payload:{id:ids},
    });
  }

  render(){
    const  than=this.state
    const {
      goodsParticulars:{
        LiveAuction={},
      },
    }=this.props;
    const  imgs=  LiveAuction.imgList||[];
    const  status=LiveAuction.status||"";
    // 商品状态
    let  imgStatus=null;
    // 商品介绍
    let  introduce=null;
    if (status==='1'){
      imgStatus=(
        <div className={styles.style_date}>
          <img
            alt='表'
            src={Watch}
            style={{width:'.36rem',height:'.36rem',marginRight:'.11rem'}}
          />
          开拍时间{LiveAuction.beginTime}
        </div>
      );
      introduce= (
        <div className={styles.style_jieshao}>
          <div className={styles.style_title}>{LiveAuction.title}</div>

          <div className={styles.style_vessel_function}>
            <div className={styles.style_sp}>起拍价 <a className={styles.style_p}>¥{LiveAuction.startingPrice}</a></div>
            <div className={styles.style_enshrine1}>
              <img
                alt='表'
                src={Enshrine}
                style={{width:'.36rem',height:'.36rem',marginRight:'.06rem'}}
              />
              {LiveAuction.focusTotal}
            </div>
            <div className={styles.style_enshrine2}>
              <img
                alt='表'
                src={Report}
                style={{width:'.36rem',height:'.36rem',marginRight:'.06rem'}}
              />
              举报
            </div>
          </div>
          <div className={styles.style_line} />
          <div className={styles.style_description}>{LiveAuction.description}</div>
          <div className={styles.style_all}>更多说明</div>
        </div>

)
    }else if (status==='2'){

    } else if (status==='3'){
      imgStatus=(
        <div className={styles.style_date_pat}>
          <img
            alt='结拍'
            src={Watch}
            style={{width:'.29rem',height:'.29rem'}}
          />
          已结拍
        </div>
      );
      introduce= (
        <div className={styles.style_jieshao3}>
          <div className={styles.style_title}>{LiveAuction.title}</div>
          <div className={styles.style_vessel_function3}>
            <div className={styles.style_sp3}>成交价 <a className={styles.style_p}>¥{LiveAuction.transactionPrice}</a></div>
            <div className={styles.style_enshrine13}>
          出价 {LiveAuction.bidTotal}次
            </div>
            <div className={styles.style_enshrine23}>
              <img
                alt='表'
                src={Report}
                style={{width:'.26rem',height:'.30rem',alignContent:'center'}}
              />
            举报
            </div>
          </div>
          <WhiteSpace size="lg" />
          <div className={styles.style_all}>更多说明</div>
        </div>

      );

    }
    return(
      <div className={styles.style_vessel}>
        <div style={{position:'relative'}}>
          {
          imgs.map((imgUrl,pos)=>(
            <img
              key={pos}
              alt='商品图片'
              src={imgUrl}
              style={{width:'7.50rem',height:'7.62rem',position:'relative'}}
            />
          ))
        }
          {imgStatus}
        </div>
        <div className={styles.style_back}>
          》
          返
          回
          拍
          卖
          场
        </div>

        {introduce}
        <WhiteSpace size="lg" />
        <div className={styles.style_end}>
          <img
            alt='头像'
            src={Report}
            style={{width:'.7rem',height:'.7rem',  borderRadius:'.35rem'}}
          />
          <div className={styles.style_shopName}>雅昌古币 </div>
          <div className={styles.style_focus}> +关注</div>
          <Link to={`/shop/${LiveAuction.id}`}>  <div className={styles.style_goShop}>进入店铺</div></Link>
        </div>
        <WhiteSpace size="lg" />
      </div>
    )
  }
}
