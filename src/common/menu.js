import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '主页',
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
    path: 'home',
    children: [
      {
        name: '首页',
        path: 'main',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '专场',
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
    path: 'live',
    children: [
      {
        name: '基础表单',
        path: 'base',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '限时',
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
    path: 'time',
    children: [
      {
        name: '查询表格',
        path: 'list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
    ],
  },
  {
    name: '我的',
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
    path: 'my',
    children: [
      {
        name: '基础详情页',
        path: 'main',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },

  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    hideInMenu: true, // 隐藏该组
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

function baseformatter(data, parentPath = '/') {
  const list = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }

    if (!item.hideInMenu) {
      const result = {
        ...item,
        path,
      };

      list.push(result);
    }
  }
  return list;
}

// 获取基础数据
export const getBaseMenuData = () => baseformatter(menuData);

export const getMenuData = () => formatter(menuData);
