// 参拍金额
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import  styles from  './index.less';

@connect(({ myCashDeposit, loading }) => ({
  myCashDeposit,
  loading: loading.effects['myCashDeposit/getbuyerCashDeposit'],
}))

export default  class  MyCashDeposit extends PureComponent{

  componentDidMount(){
    const  {dispatch }=this.props;
    // 请求数据
    dispatch({
      type:'myCashDeposit/getbuyerCashDeposit',
    })
  }

  render(){
    const {
      myCashDeposit:{
        cashDeposit={},
      },
    }=this.props;
    const {avlBalance=0,frzBalance=0}=cashDeposit;
    return(
      <div>

        <div className={styles.style_top}>
          <div className={styles.style_title}>保证金(元)</div>
          <div className={styles.style_deposit}>{(avlBalance+frzBalance)}</div>
          <div className={styles.style_bottom}>
            <div className={styles.style_frzBalance}>冻结金额 {frzBalance}</div>
            <div className={styles.style_avlBalance}>可用余额 {avlBalance}</div>
          </div>
        </div>
        <div className={styles.style_baozheng}>
          保证金说明:
          <div className={styles.style_specification}>
            1.保证金是为保护买卖双方而设定的金额<br />
            2.手动阀可视对讲反馈时间<br />
            3.第三节课发链接三块几点开始今飞凯达设计费地方加
          </div>
        </div>
        <div className={styles.style_button}>
          <div className={styles.style_rollout}>转出</div>

          <Link to="/payCashDeposit"> <div className={styles.style_payment}>缴纳</div></Link>
        </div>
      </div>
    )
  }
}
