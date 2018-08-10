import React,{PureComponent} from 'react';
import { WhiteSpace,Flex} from 'antd-mobile';
import  styles from  './index.less'
import focusNo from  '../../../public/focus_no.png';
import foucsSelect from  '../../../public/foucs_select.png';

export  default  class  GoodsIntroduce extends  PureComponent {

  constructor() {
    super();
    this.state = {};
  };

  render() {
    const  {livesList=[],doGoodsFocus}=this.props;
    return (
      <div>
        {
          livesList.map((data,pos)=>(
            <div key={`${data.id+pos}`}>
              <div className={styles.style_head}>

                <div className={styles.style_top}>
                  <div className={styles.style_title}>{data.title}</div>
                  { data.status==='1'?(<div className={styles.style_status1}>未开始</div>):(<div />)  }
                  {data.status==='2'?(<div className={styles.style_status2}>预展中</div>):(<div />)}
                  {data.status==='3'?(<div className={styles.style_status3}>拍卖中</div>):( <div />)}
                  {data.status==='4'?(<div className={styles.style_status4}>已结拍</div>):(<div />)}
                </div>

                <Flex direction='row'>
                  <div className={styles.style_centre}>
                    <div className={styles.style_time}> 开拍时间 {data.beginTime}</div>
                    <div className={styles.style_all}>共{data.total}件,已拍{data.transactionTotal}件,{data.priceTotal}出价</div>
                  </div>
                  {data.status==='4'?(<div />):(
                    <div className={styles.style_end} onClick={()=>doGoodsFocus(data)}>
                      {data.focus===true?(
                        <img
                          alt=''
                          src={foucsSelect}
                          className={styles.style_img}

                        />
                  ):(
                    <img
                      alt=''
                      src={focusNo}
                      className={styles.style_img}
                    />
                  )}
                      <div className={styles.style_focusTotal}>{data.focusTotal}</div>
                    </div>
              )
              }
                </Flex>
              </div>
              <WhiteSpace size="lg" />
            </div>
          ))
        }

      </div>
    )

  }
}
