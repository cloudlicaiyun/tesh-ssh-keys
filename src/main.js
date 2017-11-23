// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import moment from 'moment';
import FastClick from 'fastclick';
import 'babel-polyfill';
import 'eventsource-polyfill';
import axios from 'axios';
import VueClip from 'vue-clip';
import App from './App';
import router from './router';
import AxiosPlugin from './AxiosPlugin';

Vue.use(AxiosPlugin);
Vue.use(VueClip);

FastClick.attach(document.body);

Vue.config.productionTip = false;

axios.defaults.baseURL = '/api';

Vue.filter('date', (date, format) => moment(date).format(format));

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
