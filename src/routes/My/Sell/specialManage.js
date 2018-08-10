import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  SegmentedControl,
  WhiteSpace,
} from 'antd-mobile';

@connect()
export default class specialManage extends  PureComponent{
componentDidMount(){
  const { location } = this.props;


  const  str=location.search
  const s1=str.substring(1);
  const sss=s1.split("&");
  const obj={}
  for(const key  in sss){
    obj[key]=sss[key]
  }
  console.log(obj);

  console.log("params>>>>>",sss);
 //  let  str=location.search
 // let sss=str.split("=");
 //  console.log("arr>>>",sss)
}

  render(){
    return(
      <div>
        这是专场
      </div>
    )
  }
}
