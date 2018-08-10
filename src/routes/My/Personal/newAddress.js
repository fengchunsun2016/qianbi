/**
 * 新增收货地址
 *
 */
import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { List, WhiteSpace, NavBar, TextareaItem, Button, InputItem, Switch, Picker } from 'antd-mobile';
import { district } from 'antd-mobile-demo-data';
import styles from './Personal.less';


// 绑定数据   dav      loading监听   它 personal下面的 myBuyer
@connect()

class PersonalInfor extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      consignee:'',
    };
    console.log(district);
  }


  // 每列数据变化
  onPickerChange = (val) => {
    console.log(val);
    let colNum = 1;
    const datas = [...this.state.data];
    const asyncValue = [...val];
    if (val[0] === 'zj') {
      datas.forEach((i) => {
        if (i.value === 'zj') {
          colNum = 2;
          if (!i.children) {
            i.children = [{
              value: 'zj-nb',
              label: '宁波',
            }, {
              value: 'zj-hz',
              label: '杭州',
            }];
            asyncValue.push('zj-nb');
          } else if (val[1] === 'zj-hz') {
            i.children.forEach((j) => {
              if (j.value === 'zj-hz') {
                j.children = [{
                  value: 'zj-hz-xh',
                  label: '西湖区',
                }];
                asyncValue.push('zj-hz-xh');
              }
            });
            colNum = 3;
          }
        }
      });
    } else {
      colNum = 1;
    }
    this.setState({
      data: datas,
    });
  };

  // 联系人姓名
  onConsignee=(val)=> {
  
  }



  render() {
    const { getFieldProps } = this.props.form;
    return (

      <div>
        <div>
          <NavBar
            mode="light"
          >新增收货地址
          </NavBar>
          <div>
            <List className={styles.style_list}>
              <InputItem
                onChange={this.onConsignee}
                className={styles.style_phone}
              >
                <div style={{ color: '#B4B4B4' }}>收货人姓名</div>
              </InputItem>
              <InputItem
                type="phone"
              >
                <span style={{ color: '#B4B4B4' }}>手机号码</span>
              </InputItem>


              <List style={{ backgroundColor: 'white' }} className="picker-list">
                <Picker
                  data={district}
                  {...getFieldProps('district', {
                    initialValue: ['110000', '110100', '110112'],
                  })}
                  onOk={e => console.log('ok', e)}
                  onDismiss={e => console.log('dismiss', e)}
                >
                  <List.Item className="styles.picker_item"><span style={{ color: '#B4B4B4' }}>所在地区</span></List.Item>
                </Picker>
              </List>

              <TextareaItem
                placeholder="街道、小区门牌号等详细地址"
                data-seed="logId"
                autoHeight
                ref={el => this.customFocusInst = el}
                rows={3}
                count={50}
                clear
              />
            </List>
          </div>
          <div>

            <div className={styles.style_kong}/>

            <List.Item
              extra={<Switch
                {...getFieldProps('Switch1', {
                  initialValue: true,
                  valuePropName: 'checked',
                })}
                color="#922729"
                onClick={(checked) => {
                  console.log(checked);
                }}
              />}
            >
              设为默认地址
            </List.Item>
          </div>

          <Button className={styles.style_btn}>保存</Button><WhiteSpace/>
        </div>
      </div>
    );
  }
}

export default createForm()(PersonalInfor);
