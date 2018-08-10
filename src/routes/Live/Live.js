import React, { PureComponent } from 'react';
import { WhiteSpace, Tabs, Badge } from 'antd-mobile';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import LiveStarting from './LiveAuction/LiveStarting';
import LiveCalendar from './LiveAuction/LiveCalendar';
import LiveEnded from './LiveAuction/LiveEnded';
import styles from './Live.less';

export default class Live extends PureComponent {

  render() {

    const tabs = [
      { title: <Badge>即将开始</Badge> },
      { title: <Badge>日历专场</Badge> },
      { title: <Badge>结束专场</Badge> },
    ];

    return (
      <div className={styles.live}>
        <HeaderBar />
        <WhiteSpace />
        <div className={styles.box}>
          <Tabs
            tabs={tabs}
            initialPage={0}
            tabBarInactiveTextColor='#333333'
            tabBarActiveTextColor='#922729'
            tabBarUnderlineStyle={{borderColor: '#922729'}}
            tabBarBackgroundColor='#fff'
            swipeable={false}
            tabBarTextStyle={{fontSize: '.32rem'}}
            prerenderingSiblingsNumber={0}
          >
            <LiveStarting className={styles.list} />
            <LiveCalendar className={styles.list} />
            <LiveEnded className={styles.list} />
          </Tabs>
        </div>
      </div>
    );
  }
}
