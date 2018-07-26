import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Button, InputItem, Toast, Steps, WingBlank, WhiteSpace } from 'antd-mobile';

const { Step } = Steps;

const steps = [
  {
    title: '输入手机号',
  },
  {
    title: '输入验证码',
  },
  {
    title: '设置密码',
  },
].map((s, i) => <Step key={i} title={s.title} />);

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
export default class Register extends Component {
  state = {
    hasError: false,
    value: '',
  };

  onErrorClick = () => {
    const {hasError} = this.state;
    if (hasError) {
      Toast.info('Please enter 11 digits');
    }
  };

  onChange = value => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      value,
    });
  };

  render() {
    const {hasError,value} = this.state;


    return (
      <WingBlank mode={40} className="stepsExample">
        <Steps current={0} direction="horizontal" size="small">
          {steps}
        </Steps>
        <WhiteSpace size="lg" />

        <List>
          <InputItem
            type="phone"
            placeholder="请输入您的手机号码"
            error={hasError}
            onErrorClick={this.onErrorClick}
            onChange={this.onChange}
            value={value}
          />
        </List>
        <WhiteSpace size="lg" />
        <Button type="warning">获取验证码</Button>
        <WhiteSpace />
      </WingBlank>
    );
  }
}
