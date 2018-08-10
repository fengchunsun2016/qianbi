import React, { PureComponent } from 'react';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import { paraseQuery } from '../../../utils/my-utils';

export default class LiveAuctionHall extends PureComponent {

  componentDidMount() {
    const { location: {search: params} } = this.props;
    const { id } = paraseQuery(params);
    console.log(id);
  }

  render() {
    return(
      <div>
        <HeaderBar />
        专场拍卖大厅
      </div>
    )
  }

}
