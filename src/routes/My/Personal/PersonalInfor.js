// 个人信息
import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import {
  List,
  NavBar,
  TextareaItem,
  Button,
  WhiteSpace,
  InputItem,
  Flex,
  Checkbox,
  ImagePicker,
} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './Personal.less';

const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;
const Brief = Item.Brief;
const data = [
  
];


const sexData = [
  { value: '1', label: '男' },
  { value: '2', label: '女' },
];
// 绑定数据   dav      loading监听   它 personal下面的 myBuyer
@connect(({ personal, loading }) => ({
  personal,
  loading: loading.effects['personal/myBuyer'],
}))
export default class PersonalInfor extends PureComponent {

  constructor() {
    super();
    this.state = {
      headFileId: '',
      nikename: '',
      sex: '',
      signature: '',
      displayExtra: true,
      modal2: false,
      files: data,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);

  }

  componentDidMount() {
    // 发送请求
    const { dispatch } = this.props;
    // 买家信息
    dispatch({
      type: 'personal/myBuyer',
    });
  }

  // input焦点事件
  onFocus() {
    this.setState({
      displayExtra: false,
    });
  }

  // 失去焦点事件
  onBlur(value) {
    if (value === '') {
      this.setState({
        displayExtra: true,
      });
    }

  }

  // 点击确定   发送请求
  submit = (e) => {
    e.preventDefault();
    const { dispatch, myDatas } = this.props;
    // 修改买家昵称

    const { nikename, sex, signature } = this.state;

    const parmas = {
      // headFileId: headFileId || myDatas.headImgUrl,
      nikename: nikename || myDatas.nikename,
      sex: sex || myDatas.sex,
      signature: signature || myDatas.signature,
    };
    console.log(this.state);
    dispatch({
      type: 'personal/buyerInfo',
      payload: { parmas },
      callback(res) {
        const { code } = res;
        if (code === '200') {
          // 跳转
          dispatch(routerRedux.push('./PersonalSettings'));
        } else {
          alert('参数有误');
        }
      },
    });
  };

  // sex 性别发生改变
  onSexChange = value => {
    this.setState({
      sex: value,
    });
  };

  // 修改昵称 val值
  handleChange = (val) => {
    this.setState({ nikename: val });
  };

  // 修改签名 val值
  textareaChange = (val) => {
    this.setState({ signature: val });
  };

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };




  render() {
    const { displayExtra, sex ,files } = this.state;
    const {
      personal: {
        myDatas = {},
      },
    } = this.props;

    return (

      <div>
        <div>
          <NavBar
            mode="light"
          >个人信息
          </NavBar>

          <div className={styles.style_kong}/>

          <List className={styles.style_list}>
            <Item
              className={styles.style_item}
            >
              <span>头像</span>
              <img
                alt='头像'
                className={styles.style_img}
                src={myDatas.headImgUrl}
                style={{ width: '1.14rem', height: '1.14rem', borderRadius: '50%' }}
              />

            </Item>
          </List>

          <ImagePicker
            className={styles.style_imgPicker}
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
          />


          <div className={styles.style_kong}/>
        </div>
        <div>
          <List className={styles.style_list}>
            <InputItem
              extra={displayExtra ? myDatas.nickname : ''}
              // defaultValue={myDatas.nickname}
              onChange={this.handleChange}
              className={styles.style_phone}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              clear
            >
              <span>昵称</span>
            </InputItem>

            <div className={styles.style_divs}>
              <Item
                className={styles.style_sex}
              >
                <span>性别</span>
              </Item>
              <List>
                <Flex>
                  {sex ? sexData.map(i => (
                    <CheckboxItem
                      className="my_radio"
                      key={i.value}
                      checked={sex === i.value}
                      onChange={() => this.onSexChange(i.value)}
                    >
                      <div className={styles.sex_div}>{i.label}</div>
                    </CheckboxItem>
                  )) : sexData.map(i => (
                    <CheckboxItem
                      className="my_radio"
                      key={i.value}
                      defaultChecked={myDatas.sex === i.value}
                      onChange={() => this.onSexChange(i.value)}
                    >
                      <div className={styles.sex_div}>{i.label}</div>
                    </CheckboxItem>
                  ))}
                </Flex>
              </List>
              <div />
            </div>
            <TextareaItem
              title="签名"
              placeholder="请输入不超过30个字"
              data-seed="logId"
              autoHeight
              rows={5}
              count={30}
              defaultValue={myDatas.signature}
              onChange={this.textareaChange}
            />
          </List>
        </div>

        <Button className={styles.style_btn} onClick={this.submit}>确定</Button><WhiteSpace/>

      </div>
    );
  }
}
