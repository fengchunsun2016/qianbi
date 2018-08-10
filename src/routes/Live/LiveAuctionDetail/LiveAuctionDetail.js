import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Grid, PullToRefresh } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import LiveGoods from '../../../components/LiveGoods/LiveGoods';
import { paraseQuery } from '../../../utils/my-utils';
import styles from './LiveAuctionDetail.less';
import time from '../../../../public/time.png';
import focus from '../../../../public/foucs_select.png';
import focusNo from '../../../../public/focus_no.png';
import help from '../../../../public/auction_help.png';

@connect(({ liveAuctionDetail, loading }) => ({
  liveAuctionDetail,
  loading: loading.effects['liveAuctionDetail/fetchLiveAuctionInfo'],
}))

export default class LADetail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      lines: 2,
      display: 'block',
      refreshing: false,
      hasMore: true,
    };
    this.page = 0;
  }

  componentDidMount(){
    this.fetchLiveAuctionAndSellerStoreInfo();
    this.fetchLiveAuctionItemList();
  }

  componentWillReceiveProps(nextProps) {
    const { liveAuctionDetail: {goodsList} } = nextProps;
    const { liveAuctionDetail: {goodsList : oldData}} = this.props;
    if (goodsList !== oldData) {
      if (goodsList.length !== 0) {
        const hasMore = goodsList.length % 10 === 0;
        this.setState({
          refreshing: false,
          hasMore,
        })
      }
    }
  }

  // 点击专场关注按钮
  doFocusAuction = (e) => {
    const { isFocus } = this.state;
    e.stopPropagation();
    this.setState({
      isFocus: !isFocus,
    });
    this.fetchFocusLiveAuction();
  };

  // 点击更多说明调用方法
  moreInstructions = () => {
    this.setState({
      lines: 99,
      display: 'none',
    })
  };

  // 进入店铺
  goToStore = () => {
    const { location: {search: params} } = this.props;
    const { id } = paraseQuery(params);
    const {dispatch}=this.props;
    const url = `/shop/${id}`;
    dispatch(routerRedux.push(url));
  };

  // 进入拍卖大厅
  goToAuctionHall = () => {
    console.log('进入拍卖大厅');
    const { dispatch } = this.props;
    const { location: {search: params} } = this.props;
    const { id } = paraseQuery(params);
    const url = `/live/live-auction-hall?id=${id}`;
    dispatch(routerRedux.push(url));

  };

  // 进去帮助页面
  goToHelpPage = () => {
    console.log('进入帮助页面');
  };

  // 请求专场信息和卖家店铺信息接口，获取数据
  fetchLiveAuctionAndSellerStoreInfo = () => {
    const { dispatch } = this.props;
    const { location: {search: params} } = this.props;
    const { id } = paraseQuery(params);
    dispatch({
      type: 'liveAuctionDetail/fetchLiveAuctionAndSellerStoreInfo',
      payload: {
        id,
      },
    });
  };

  // 请求专场拍品列表接口
  fetchLiveAuctionItemList = () => {
    const { hasMore } = this.state;
    if (!hasMore) {
      return;
    }
    this.setState({
      refreshing: true,
    });
    const { dispatch } = this.props;
    const { location: {search: params} } = this.props;
    const { id } = paraseQuery(params);
    this.page += 1;
    dispatch({
      type: 'liveAuctionDetail/fetchLiveAuctionItemList',
      payload: {
        id,
        page: this.page,
      },
    });
  };

  // 更新专场关注数
  fetchFocusLiveAuction = (cancel) => {
    const { dispatch } = this.props;
    const { location: {search: params} } = this.props;
    const { id } = paraseQuery(params);
    dispatch({
      type: 'liveAuctionDetail/fetchFocusLiveAuction',
      payload: {
        id,
        cancel,
      },
    });
  };

  // 更新拍品关注数
  fetchGoodsFocusTotal = (obj) => {
    const {focus: cancel, id} = obj;
    const { dispatch } = this.props;
    dispatch({
      type: 'focus/liveItemFocusTotal',
      payload: {
        id,
        cancel,
        dataName: 'goodsList',
      },
    });
  };

  render() {

    const {

      liveAuctionDetail: {
        auctionInfo,
        goodsList,
        storeInfo,
      },

    } = this.props;

    const {isFocus, lines, display , refreshing, height} = this.state;
    const {title = '', description = '', status = '1', beginTime = '', endTime = '', total = 0, focusTotal = 0} = auctionInfo;
    const {storeName, logoUrl, cashDeposit} = storeInfo;
    const beginDate = beginTime.length > 5 ? beginTime.substr(5) : '';
    const endDate = endTime.length > 11 ? endTime.substr(11) : '';

    const item = (data, index) => {

      // 跳转去商品详情
      const goToGoodDerail = (obj) => {
        // const {dispatch}=this.props;
        // const url = `/live/liveAuctionDetail?id=${obj.id}&title=${obj.title}`;
        // dispatch(routerRedux.push(url));
        console.log('去商品详情',obj);
      };

      // 点击拍品的关注按钮
      const doFocusGoods = (obj) => {
        this.fetchGoodsFocusTotal(obj);
      };

      return(
        <LiveGoods obj={data} goToGoodDerail={goToGoodDerail} index_={index} doFocusGoods={doFocusGoods} />
      )

    };

    return(

      <div className={styles.LADetail}>
        <HeaderBar />
        <PullToRefresh
          damping={60}
          style={{overflow: 'auto', height}}
          indicator={{activate: '加载更多数据', finish:'加载完成'}}
          direction="up"
          refreshing={refreshing}
          onRefresh={this.loadMore}
          ref={el => {this.ptr = el}}
          distanceToRefresh={50}
        >
          <div>
            {
            status === '1' ?
              (
                <div className={styles.time} style={{background: '#DB8400'}}>
                  <img src={time} alt="" style={{width: '.44rem', height: '.44rem'}} />
                  <p>开拍时间  {beginDate}</p>
                </div>
              ) : status === '2' ?
              (
                <div className={styles.time} style={{background: '#E70C0C'}}>
                  热拍中
                </div>
              ) : (
                <div className={styles.time} style={{background: '#555'}}>
                  <img src={time} alt="" style={{width: '.44rem', height: '.44rem'}} />
                  <p>结拍时间  {endDate}</p>
                </div>
              )
          }
            <div className={styles.topView}>
              <div className={styles.title}>{title}</div>
              <div className={styles.line} />
              <div className={styles.store}>
                <div style={{marginLeft: '.24rem', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                  <img src={logoUrl} alt="" style={{width: '.7rem', height: '.7rem', borderRadius: '.35rem', background: 'red'}} />
                  <div style={{marginLeft: '.17rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
                    <p style={{color: '#333', fontSize: '.28rem'}}>{storeName}</p>
                    <p style={{color: '#555', fontSize: '.2rem'}}>共{total}件  保证金 {cashDeposit}元</p>
                  </div>
                </div>
                <div style={{border:'1px solid #922729', width: '1.38rem', height: '.48rem', borderRadius: '.24rem', textAlign: 'center', lineHeight: '.48rem', font: '.24rem', color: '#922729', marginRight: '.24rem'}} onClick={this.goToStore}>进入店铺</div>
              </div>
              <div className={styles.focus} onClick={this.doFocusAuction}>
                <img src={isFocus ? focus :focusNo} alt="关注" style={{width: '.44rem', height: '.44rem'}} />
                <div style={{fontSize:'.24rem', color:'#333', marginTop:'.06rem'}}>{focusTotal}</div>
              </div>
            </div>
            <div className={styles.instructions}>
              <div style={{lineHeight: '.32rem', display:'-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: `${lines}`, WebkitBoxOrient: 'vertical', fontSize: '.24rem', color: '#888'}}>
                {description}
              </div>
              <div style={{color: '#2855A6', fontSize: '.24rem', width: '1.5rem', height: '.5rem', lineHeight: '.5rem', float: 'right', textAlign: 'right', display: `${display}`}} onClick={this.moreInstructions}>
              更多说明
              </div>
            </div>
          </div>

          <div
            style={{backgroundColor:"#F0F3F8",padding:'0 0.24rem'}}
          >
            <Grid
              data={goodsList}
              activeStyle={false}
              columnNum={2}
              renderItem={item}
              hasLine={false}
              square={false}
              itemStyle={{paddingTop: '0', background:'#F0F3F8'}}
            />
          </div>
        </PullToRefresh>

        <div className={styles.footer}>
          <div className={styles.footerLeft} onClick={this.goToHelpPage}>
            <img src={help} alt="图片" className={styles.helpImg} />
            <p className={styles.helpText}>帮助</p>
          </div>
          <div className={styles.footerRight} onClick={this.goToAuctionHall}>
            进入拍卖大厅
          </div>
        </div>

      </div>
    )
  }
}
