<template>
  <div class="wrap">
    <view-box>
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view></router-view>
      </transition>
      <tabbar slot="bottom">
        <tabbar-item link="/robot/robotlist" selected @on-item-click="cnzzEvent('tabbar', '我的门店群')">
          <span slot="icon" class="fa fa-weixin"></span>
          <span slot="label">我的门店群</span>
        </tabbar-item>
        <tabbar-item link="/robot/recommend" @on-item-click="cnzzEvent('tabbar', '推送商品')">
          <span slot="icon" class="fa fa-comments"></span>
          <span slot="label">推送商品</span>
        </tabbar-item>
        <tabbar-item link="/robot/me" @on-item-click="cnzzEvent('tabbar', '我')">
          <span slot="icon" class="fa fa-user"></span>
          <span slot="label">我</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import { XButton, Group, Flexbox, FlexboxItem, Tabbar, TabbarItem, Cell, ViewBox, Badge } from 'vux';
  import Vue from 'vue';
  import VueCookie from 'vue-cookie';
  import RobotList from './Robot/RobotList.vue';
  import router from '../router/index';

  Vue.use(VueCookie);
  export default {
    components: {
      XButton,
      Group,
      Flexbox,
      FlexboxItem,
      Tabbar,
      TabbarItem,
      Cell,
      RobotList,
      ViewBox,
      Badge,
    },
    data() {
      return {
        direction: 'forward',
        currentIndex: 0,
        hostList: [],
      };
    },
    computed: {
      hasHost() {
        return this.hostList.length !== 0;
      },
      currentHost() {
        const host = this.hostList[this.currentIndex];
        return host;
      },
      currentGroups() {
        const groups = this.groupList.filter(item =>
        item.host === this.hostList[this.currentIndex].id);
        if (!groups) return [];

        return groups;
      },
    },
    // 监听路由检查登录
    watch: {
      $route: 'checkLogin',
    },
    methods: {
      cnzzEvent(category, action) {
        /* eslint-disable no-underscore-dangle */
        window._czc.push(['_trackEvent', category, action, '', '', '']);
      },
      checkLogin() {
        // 检查是否存在session
        if (!this.$cookie.get('session') || !this.$cookie.get('session').includes('gfj')) {
          // 如果没有登录状态则跳转到登录页
          router.push('/login');
        } else {
          // 否则跳转到登录后的页面
          // router.push('/robot/robotlist');
        }
      },
    },
    created() {
      this.checkLogin();
      router.push('/robot/robotlist');
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    padding: 20px;
    background: #20A0FF;
    color: #fff;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }


  .wrap {
    height: 100%;
    width: 100%;
  }


  .fa {
    width: 27px;
    height: 27px;
    font-size: 20px;
    text-align: center;
    color: #949494;
    position: relative;
    top: 4px;
  }
  .weui-bar__item_on .fa{
    color: #09BB07;
  }


</style>
