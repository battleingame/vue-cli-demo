import axios from 'axios';
import router from '../router'
import {
  Message
} from 'element-ui';
import {uuid} from './common'
// 默认超时设置
axios.defaults.timeout = 50000;
console.log(process.env.VUE_APP_API, process.env)
// 相对路径设置
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/apiv1' : process.env.VUE_APP_API;

// console.log(localStorage.getItem('token'));
// http request 拦截器
const id = uuid();

axios.interceptors.request.use(
  config => {
    // 获取token
    // const token = localStorage.getItem('token');
    // 设置参数格式
    if (!config.headers['Content-Type']) {
      config.headers = {
        'Content-Type': 'application/json',
      };
    }
    // 添加token到headers
    if (id) {
      config.headers.uuid = id
    }
    // 鉴权参数设置
    if (config.method === 'get') {
      //get请求下 参数在params中，其他请求在data中
      config.params = config.params || {};
      //   let json = JSON.parse(JSON.stringify(config.params));
      //一些参数处理
    } else {
      config.data = config.data || {};
      //一些参数处理
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// response拦截器
axios.interceptors.response.use(
  response => {
    const {
      status,
      data
    } = response
    if (status === 200) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  error => {
    const {
      status,
    } = error.response
    if (status === 401) {
      router.push({
        name: 'Login'
      })
    }
    return Promise.reject(error);

    // console.log(error,111)
    // console.log(res.msg,'---error---');
    // Vue.$vux.toast.text(data.message || data.description || '');

  }
);


/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        if (response && response.code === 200) {
          //返回成功处理  这里传的啥 后续调用的时候 res就是啥
          resolve(response.data); //我们后台所有数据都是放在返回的data里所以这里统一处理了
        } else {

          //错误处理
          Message({
            message: response.message || '请求异常',
            type: 'warning'
          });
          reject(response)
        }
      })
      .catch(err => {
        let message = '请求失败！请检查网络';
        if (err.response) message = err.response.data.message;
        Message({
          message: message,
          type: 'warning'
        });
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response && response.code === 200) {
          //返回成功处理  这里传的啥 后续调用的时候 res就是啥
          // console.log(response, 111)
          resolve(response.data); //我们后台所有数据都是放在返回的data里所以这里统一处理了
        } else {
          // resolve(response.data)
          //错误处理
          reject(response)
          Message({
            message: response.message || '请求异常',
            type: 'warning'
          });
        }
      }).catch(err => {
        let message = '请求失败！请检查网络';
        if (err.response) message = err.response.data.message;
        Message({
          message: message,
          type: 'warning'
        });
        reject(err)
      })
  })
}