import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel,
  Flex,
  SearchBar,
  Badge,
  Icon,
} from 'antd-mobile';
import styles from './HomeStyle.less';
import  MsgIcon from  '../../../public/msg.png'
import  starImg from  '../../../public/star_img.png';
import  Logo from '../../../public/logo@2x.png';
import Goods from '../../components/Goods';
@connect(({ home, loading }) => ({
  home,
  loading: loading.effects['home/carousel'],
}))
export default class Home extends PureComponent {
  constructor(){
    super();
    this.state = {
      imgHeight:'4.64rem',
    };
  };


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/carousel',
    });

    dispatch({
      type: 'home/fetchHotLive',
    });
    dispatch({
      type:'home/hotTime',
    })
  }

  render() {
    const  than=this.state;
    const {
      home: { carousels = [] ,
        hotLives=[],
        hotTime=[],
      },

    } = this.props;



    const goodsProps={
      list:hotTime,
      doFocus(is,pos){
        console.log('>>>',is);
      },
    }
    return (
      <div>
        <div className={styles.style_carousel}>
          <Carousel
            autoplay
            infinite
            autoplayInterval={800}
          >
            {carousels.map(val => (
              <Link
                key={val.redirectUrl}
                to="/live/Live?id=id"
                style={{ display: 'inline-block', width: '100%', height:'4.64rem' }}
              >
                <img
                  src={`${val.imgUrl}`}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top',height:'4.64rem' }}

                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              </Link>
            ))}
          </Carousel>
          <div className={styles.div_style}>
            <div className={styles.style_msg}>
              <img
                alt=''
                src={Logo}
                style={{width:'.9rem',height:'.58rem'}}
              />
            </div>
            <SearchBar
              placeholder="搜索您感兴趣的东西"
              maxLength={20}
              className={styles.search}
            />

            <div className={styles.style_msg}>
              <Badge dot>
                <img
                  alt='消息'
                  src={MsgIcon}
                  style={{width:'.4rem',height:'.4rem'}}
                />
              </Badge>
            </div>
          </div>
        </div>
        <Flex direction='row' style={{width:'7.50rem',height:'0.82rem',background:'#FFF'}}>
          <img
            alt=''
            src={starImg}
            style={{width:'0.11rem',height:'0.20rem',marginLeft:'0.33rem'}}
          />
          <div style={{width:'50%',color:'#333333',fontSize:'0.30rem',marginLeft:'0.11rem'}}>热门专场</div>
          <div style={{width:'50%',color:'#333333',fontSize:'0.30rem',marginRight:'0.24rem',textAlign:'right'}}>更多</div>
        </Flex>
        <Flex className={styles.style_hotLive}>
          { hotLives.map((data,pos)=>(
            <div className={styles.style_basepLate} key={pos.toString()}>
              <div style={{marginTop:'0.22rem',color:'#333',fontSize:'0.28rem',textAlign:'center',height:'0.26rem'}}>{data.title}</div>
              <div style={{marginTop:'0.25rem',color:'#333',fontSize:'0.24rem',textAlign:'center',height:'0.23rem'}}>共<text style={{color:'#922729',fontSize:'0.36rem',textAlign:'center',height:'0.28rem'}}>{data.total}</text>件</div>
              <div style={{marginTop:'0.38rem',color:'#333',fontSize:'0.22rem',textAlign:'center',height:'0.22rem'}}>开拍时间 {data.beginTime}</div>
            </div>
         ))}
        </Flex>
        <Flex direction='row' style={{width:'7.50rem',height:'0.82rem',background:'#FFF',marginTop:'0.20rem'}}>
          <img
            alt=''
            src={starImg}
            style={{width:'0.11rem',height:'0.20rem',marginLeft:'0.33rem'}}
          />
          <p style={{width:'50%',color:'#333333',fontSize:'0.30rem',marginLeft:'0.11rem'}}>限时热拍</p>
          <p style={{width:'50%',color:'#333333',fontSize:'0.30rem',marginRight:'0.24rem',textAlign:'right'}}>更多</p>
        </Flex>
        <Goods {...goodsProps} />
      </div>
    );
  }
}

