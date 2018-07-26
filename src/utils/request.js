import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import qs from 'qs';
import _ from 'lodash';
import https from 'https';
import store from '../index';
import config from '../config';
import { getToken } from './authority';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 基础地址
let baseUrl;
/**
 * 获取基础url
 */

export function getBaseUrl() {
  if (!baseUrl) {
    if (process.env.NODE_ENV === 'development') {
      baseUrl = config.dev_url;
    } else {
      return config.pro_url;
    }
  }
  return baseUrl;
}

function getOptions() {
  const url = getBaseUrl();
  if (url.split(':')[0] === 'https') {
    return {
      agent: new https.Agent({ rejectUnauthorized: false }),
      mode: 'cors',
    };
  } else {
    return {
      mode: 'cors',
    };
  }
}

/**
 * 组装公用的headers
 * @returns {{Authorization: *}}
 */
export function getHeaders() {
   const token = getToken();
  // const token = '7fcca3720bcd08e9d423';
  const headers = {
    token,
    'Access-Control-Allow-Origin': '*',
  };
  return headers;
}

/** *
 * 删除空参数
 * @param {*}
 * @returns {*}
 */
function removeEmptyObject(obj) {
  if (typeof obj === 'undefined') {
    return;
  }
  const resultObj = {};

  for (const i in obj) {
    // 如果不是undefind
    if (typeof obj[i] !== 'undefined' && obj[i] !== '' && obj[i] !== null && obj[i] !== 'all') {
      resultObj[i] = obj[i];
    }
    if (i === 'type' && obj[i] === 0) {
      resultObj[i] = 0;
    }
  }
  return resultObj;
}

/**
 *  Requests a URL, returning a promise.  method:get
 * @param url
 * @returns {Promise.<void>}
 */
export async function get(url = '', data) {
  const options = {
    ...getOptions(),
    headers: getHeaders(),
    method: 'GET',
  };

  // 去除空值
  const newData = addExtendProps(removeEmptyObject(data));
  const requestUrl = `${getBaseUrl()}${url}?${formatUrl(newData)}`;

  return request(requestUrl, options);
}

/**
 * data转url格式
 * @param data
 * @return string  a=b&c=d
 */
export const formatUrl = (data = {}) => {
  return qs.stringify(data);
};

/**
 * 增加指定的拓展参数
 * @param data
 * @return {*}
 */
export const addExtendProps = data => {
  if (_.isObject(data)) {
    return _.assignIn({ VERSION: '1.0.0', CLIENT: 'WEB' }, data);
  } else {
    return { VERSION: '1.0.0', CLIENT: 'WEB' };
  }
};

/** *
 * POST 提交
 * @param url
 * @param data
 * @returns {Promise.<Object>}
 */
export async function post(url, data) {
  const options = {
    ...getOptions(),
    headers: getHeaders(),
    method: 'POST',
    body: addExtendProps(data),
  };
  // 钩子，如果是登录，带一个loginRequest的标签，可以免token通过request
  if (data && data.loginRequest) {
    options.loginRequest = true;
  }
  return request(`${getBaseUrl()}${url}`, options);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  Toast.fail(errortext);

  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {};
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const { dispatch } = store;
      const status = e.name;
      if (status === 401) {
        dispatch({
          type: 'login/logout',
        });
        return;
      }
      if (status === 403) {
        dispatch(routerRedux.push('/exception/403'));
        return;
      }
      if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push('/exception/500'));
        return;
      }
      if (status >= 404 && status < 422) {
        dispatch(routerRedux.push('/exception/404'));
      }
    });
}
