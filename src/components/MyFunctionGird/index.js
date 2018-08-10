import React, { PureComponent } from 'react';
import {connect} from 'dva'
import {
  Grid,
} from 'antd-mobile'
import {routerRedux} from 'dva/router';
/**
 * FunctionList gird数据展示必穿
 * number 列数默认是4,
 */
@connect()
export default  class MyFunctionGird extends PureComponent{

  to=(value,index)=>{
    console.log("value",value,index);
    const {dispatch}=this.props;
    const {url} =value;
    dispatch(routerRedux.push(url));
  };

  render(){
    const  {FunctionList=[],number=4}=this.props;
    return(
      <Grid
        data={FunctionList}
        columnNum={number}
        hasLine={false}
        onClick={this.to}
        renderItem={dataItem => (
          <div>
            <div className={{ position: 'relative'}}>
              <img src={dataItem.icon} style={{ width: '.58rem', height: '.58rem' }} alt="" />
            </div>
            <div style={{ color: '#333', fontSize: '.24rem', marginTop: '.13rem' }}>
              {dataItem.text}
            </div>
          </div>
    )}
      />
    )
  }
}
