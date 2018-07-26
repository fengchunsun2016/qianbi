import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel, WingBlank } from 'antd-mobile';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects['home/carousel'],
}))
export default class Home extends PureComponent {
  state = {
    imgHeight: 176,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'home/carousel',
    });
  }

  render() {
    const {
      home: { carousels = [] },
    } = this.props;

    const {imgHeight} = this.state;

    // console.log('carousels', carousels);
    return (
      <WingBlank>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {carousels.map(val => (
            <Link
              key={val.redirectUrl}
              to="/live/one?id=id"
              style={{ display: 'inline-block', width: '100%', height: imgHeight }}
            >
              <img
                src={`${val.imgUrl}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </Link>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}
