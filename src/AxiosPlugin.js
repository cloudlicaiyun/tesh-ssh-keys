import axios from 'axios';

const Axios = axios.create({
  baseURL: '/api',
});

// POST传参序列化(添加请求拦截器)
/* eslint-disable no-param-reassign */
// Axios.interceptors.request.use((config) => {
//   // 下面会说在什么时候存储 token
//   if (localStorage.token) {
//     config.headers.Authorization = `JWT ${localStorage.token}`;
//   }
//   return config;
// }, error => Promise.reject(error));

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => res, (error) => {
  if (error.response && error.response.status === 401) {
    // 401 说明 token 验证失败
    // 可以直接跳转到登录页面，重新登录获取 token
    // location.href = '/login';
    // localStorage.removeItem('token');
  } else {
    // do something
  }
  // 返回 response 里的错误信息
  return Promise.reject(error.response && error.response.data);
});

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios });
  },
};
