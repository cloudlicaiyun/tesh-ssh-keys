import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Robot from '@/components/Robot';
import ResetPsw from '@/components/ResetPsw';
import RobotList from '@/components/Robot/RobotList';
import Recommend from '@/components/Robot/recommend';
import Me from '@/components/Robot/Me';
import SigninHost from '@/components/Robot/SigninHost';
import AddGroup from '@/components/Robot/addgroup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      // 首页，介绍页
      path: '/',
      name: 'index',
      component: Login,
    }, {
      // 登录
      path: '/login',
      name: 'login',
      component: Login,
    }, {
      // 注册
      path: '/register',
      name: 'register',
      component: Register,
    }, {
      // 登录进入后首页
      path: '/robot',
      name: 'robot',
      component: Robot,
      children: [
        {
          // 机器人列表
          name: 'robotlist',
          path: 'robotlist',
          component: RobotList,
        },
        {
          // 群
          name: 'recommend',
          path: 'recommend',
          component: Recommend,
        },
        {
          // 我
          name: 'me',
          path: 'me',
          component: Me,
        },
        {
          // 登录机器人
          name: 'signinhost',
          path: 'signinhost',
          component: SigninHost,
        },
        {
          // 添加群
          name: 'addgroup',
          path: 'addgroup',
          component: AddGroup,
        },
      ],
    }, {
      // 重置密码
      path: '/resetpsw',
      name: 'resetpsw',
      component: ResetPsw,
    },
  ],
});
