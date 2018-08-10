import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Grid } from 'antd-mobile';
import styles from './CalendarView.less';
import calendarLeft from '../../../public/calendar_left.png';
import calendarRight from '../../../public/calendar_right.png';

/*
* 专场-日历专场-顶部日历模块
*
*
* */
function isNull(object){
  if(object == null || typeof object === "undefined"){
    return true;
  }
  return false;
};

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @returns {String}
 */
function getWeek(dateString){
  let date;
  if(isNull(dateString)){
    date = new Date();
  }else{
    const dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1, 0), dateArray[2]);
  }
  return `星期${  "日一二三四五六".charAt(date.getDay())}`;
};


function getBeginDate(dd) {
  let date;
  if (isNull(dd)) {
    date = new Date();
  }
  const y = date.getFullYear(); // 获取当前年份
  const m = (date.getMonth()+1).toString().padStart(2,'0'); // 获取当前月份
  const d = '01'; // 获取当前日期
  return `${y}-${m}-${d}`;
}

function getAddDate(addDayCount) {
  const dd = new Date();
  dd.setDate(dd.getDate() + addDayCount);
  const y = dd.getFullYear(); // 获取当前年份
  const m = (dd.getMonth()+1).toString().padStart(2,'0'); // 获取当前月份
  const d = dd.getDate().toString().padStart(2,'0'); // 获取当前日期
  return `${y}-${m}-${d}`;
}

@connect(({ live, loading }) => ({
  live,
  loading: loading.effects['live/liveAuctionListQuantity'],
}))

export default class CalendarView extends PureComponent {

  constructor() {
    super();
    // 开始日期  默认当前月1号
    this.beginDate = getBeginDate();
    // 今日日期 'yyyy-MM-dd'
    const todayDate = getAddDate(0);
    // 今日星期几
    const week = getWeek(todayDate);
    // 结束日期 默认为今日之后七天
    this.endDate = getAddDate(7);
    // 获取分页数
    const pageIndex = Math.floor((todayDate.split('-')[2] - 1)/6);
    // 当前选中下标
    const selectedIndex = todayDate.split('-')[2] - 1;

    this.date = new Date();
    const year = this.date.getFullYear();
    const month = (this.date.getMonth() + 1).toString().padStart(2,'0');

    this.state = {
      year,
      month,
      week,
      pageIndex,
      selectedIndex,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  componentWillReceiveProps(nextProps) {
    const { live: {auctionQuantity} } = nextProps;
    const { live: {auctionQuantity : oldData}} = this.props;
    const { selectedIndex } =this.state;
    if (auctionQuantity !== oldData) {
      if (auctionQuantity.length !== 0) {
        const {

          dateOnClick,

        } = this.props;

        dateOnClick(auctionQuantity[selectedIndex]);
      }
    }
  }

  // 点击左箭头
  selectDateLeft = () => {
    let year = this.date.getFullYear();
    let month = this.date.getMonth();
    if (month === 0) {
      month = 12;
      year -= 1;
    } 
    if (month < 10) {
      month = `0${  month}`;
    }

    this.date = new Date(year, month, 0);
    this.beginDate = `${year}-${month}-01`;
    this.endDate = `${year}-${month}-${this.date.getDate()}`;
    const week = getWeek(this.endDate);
    const pageIndex = Math.floor((this.date.getDate() - 1)/6);
    const selectedIndex = this.date.getDate() - 1;
    // 更新状态
    this.setState({
      year,
      month,
      week,
      pageIndex,
      selectedIndex,
    });

    // 请求数据
    this.requestData();
  };

  // 点击右箭头
  selectDateRight = () => {
    const date = new Date();
    const curMonth = date.getMonth() + 1;
    let year = this.date.getFullYear();
    let month = this.date.getMonth() + 1 + 1;

    if (month >= curMonth + 1 && year === date.getFullYear()) {
      return;
    }

    if (month === 13) {
      month = 1;
      year += 1;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    this.date = new Date(year, month, 0);
    this.beginDate = `${year}-${month}-01`;

    if (parseInt(month,0) === parseInt(curMonth,0)) {
      this.endDate = getAddDate(7);
    }else {
      this.endDate = `${year}-${month}-${this.date.getDate()}`;
    }

    const week = getWeek(this.beginDate);
    const pageIndex = 0;
    const selectedIndex = 0;
    // 更新状态
    this.setState({
      year,
      month,
      week,
      pageIndex,
      selectedIndex,
    });

    // 请求数据
    this.requestData();
  };

  dateClicked = (_el, index) => {

    const {selectedIndex} = this.state;

    if (index === selectedIndex) {
      return;
    }

    this.setState({

      selectedIndex: index,

    });

    const {

      dateOnClick,

    } = this.props;

    dateOnClick(_el);

  };

  requestData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'live/liveAuctionListQuantity',
      payload: {
        beginDate: this.beginDate,
        endDate: this.endDate,
      },
    });
  };

  render() {

    const {
      live: {auctionQuantity = []},

    } = this.props;

    const {year,month,week, pageIndex, selectedIndex} = this.state;

    const row = (item, index) => {

      const {quantity = 0, date = ''} = item;
      const dateArr = date.split('-');
      const bgColor = index === selectedIndex ? '#DB8400' : '#fff';
      const fontColor = index === selectedIndex ? '#fff' : '#333';
      const number = date === getAddDate(0) ? '今': parseInt(dateArr[2],0);
      return(
        <div style={{color: '#333', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{fontSize: '.36rem', width: '.63rem', height: '.63rem', background: bgColor, borderRadius: '.32rem', lineHeight: '.63rem', textAlign: 'center', color: fontColor}}>
            {number}
          </div>
          <div style={{fontSize: '.24rem',  marginTop: '3px'}}>
            {quantity}场
          </div>
        </div>
      )
    };

    return (
      <div className={styles.box}>
        <div className={styles.date}>
          <img src={calendarLeft} alt="" className={styles.img} onClick={this.selectDateLeft} />
          <p className={styles.month}>{month}月</p>
          <div style={{width: '1rem', fontSize: '.24rem', color: '#333'}}>
            <p>{week}</p>
            <p style={{marginTop: '.1rem'}}>{year}年</p>
          </div>
          <img src={calendarRight} alt="" className={styles.img} onClick={this.selectDateRight} />
        </div>

        <div className={styles.days}>
          <Grid
            data={auctionQuantity}
            isCarousel
            columnNum={6}
            carouselMaxRow={1}
            renderItem={row}
            hasLine={false}
            activeStyle={false}
            onClick={this.dateClicked}
            dots={false}
            square={false}
            itemStyle={{padding: '0', margin:'0', height: '1.5rem'}}
            selectedIndex={pageIndex}
          />
        </div>

      </div>
    )
  }

}
