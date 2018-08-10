import React, { createElement } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
    loading: () => {
      return <ActivityIndicator />;
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user'], () => import('../layouts/BasicLayout')),
    },
    '/home/main': {
      name: '首页',
      component: dynamicWrapper(app, ['home'], () => import('../routes/Home/Home')),
    },

    '/live/main': {
      name: '专场',
      component: dynamicWrapper(app, ['live','focus'], () => import('../routes/Live/Live')),
    },
    '/live/liveAuctionDetail': {
      name: '专场详情',
      component: dynamicWrapper(app, ['liveAuctionDetail','focus'], () => import('../routes/Live/LiveAuctionDetail/LiveAuctionDetail')),
    },
    '/live/live-auction-hall': {
      name: '专场拍卖大厅',
      component: dynamicWrapper(app, [], () => import('../routes/Live/LiveAuctionHall/LiveAuctionHall')),
    },
    '/time/main': {
      name: '限时',
      component: dynamicWrapper(app, ['time'], () => import('../routes/TimeLimit/TimeLimit')),
    },
    '/time/search': {
      name: '限时',
      component: dynamicWrapper(app, ['time'], () => import('../routes/TimeLimit/Search')),
    },
    '/time/list2': {
      name: '限时',
      component: dynamicWrapper(app, [], () => import('../routes/Live/Base')),
    },
    '/my/main': {
      name: '我的',
      component: dynamicWrapper(app, ['my'], () => import('../routes/My/index')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },

    '/shop/:id': {
      component: dynamicWrapper(app, ['shop'], () => import('../routes/Shop/index')),
    },
    '/goodsParticulars/:id':{
      component: dynamicWrapper(app, ['goodsParticulars'], () => import('../routes/GoodsParticulars/index')),
    },
    '/specialManage':{
      component: dynamicWrapper(app, [], () => import('../routes/My/Sell/specialManage')),
    },
    '/Personalsettings':{
      component: dynamicWrapper(app, ['personal'], () => import('../routes/My/Personal/PersonalSettings')),
    },
    '/PersonalInfor':{
      component: dynamicWrapper(app, ['personal'], () => import('../routes/My/Personal/PersonalInfor')),
    },
    '/newAddress':{
      component: dynamicWrapper(app, ['personal'], () => import('../routes/My/Personal/newAddress')),
    },
    '/myFocus':{
      component: dynamicWrapper(app, ['myFocus'], () => import('../routes/My/Buy/MyFocus/index')),
    },
    '/myContactUs':{
      component: dynamicWrapper(app, [], () => import('../routes/My/Buy/MyContactUs/index')),
    },
    '/myCashDeposit':{
      component: dynamicWrapper(app, ['myCashDeposit'], () => import('../routes/My/Buy/MyCashDeposit/index')),
    },
    '/payCashDeposit':{
      component: dynamicWrapper(app, [], () => import('../routes/My/Buy/MyCashDeposit/PayCashDeposit')),
    },
    '/myOrder':{
      component: dynamicWrapper(app, ['order'], () => import('../routes/My/Buy/MyOrder/index')),
    },
    '/shop': {
      component: dynamicWrapper(app, [], () => import('../layouts/ShopLayout')),
    },

    '/salesReturn':{
      component: dynamicWrapper(app, ['sales'], () => import('../routes/My/Buy/MyOrder/SalesReturn')),
    },





    '/myAuction':{
      component: dynamicWrapper(app, ['auction'], () => import('../routes/My/Buy/MyAuction/index')),
    },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());
  // Route configuration data  /:storeName/:logoUr
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter rouhttps://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    //    ting,
    //  // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
