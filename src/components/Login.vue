<template>
  <div v-else class="hello">
    <x-header>兴盛优选--登录</x-header>
    <div class="login">
      <group title="手机号">
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="account" required></x-input>
      </group>
      <group title="密码">
        <x-input title="密码" name="password" placeholder="请输入密码" type="password" v-model="password" required></x-input>
      </group>
      <x-button type="primary" action-type="submit" @click.native="login" class="mv-10">登录</x-button>
      <br/>
      <flexbox>
        <flexbox-item>
          <x-button plain link="register">去注册</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button plain link="resetpsw">重置密码</x-button>
        </flexbox-item>
      </flexbox>
      <br>
      <x-button plain type="primary" link="https://www.kancloud.cn/yiqizhuan/organize-group/341910" target="_blank" @click.native="cnzzEvent('登陆', '帮助文档')">帮助文档</x-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueCookie from 'vue-cookie';
  import { XInput, XHeader, XButton, Group, Flexbox, FlexboxItem, ToastPlugin } from 'vux';
  import router from '../router/index';

  Vue.use(ToastPlugin);
  Vue.use(VueCookie);
  export default {
    components: {
      XInput,
      XHeader,
      XButton,
      Group,
      Flexbox,
      FlexboxItem,
    },
    data() {
      return {
        account: '',
        password: '',
        showMsg: false,
        vertical: 'bottom',
        horizontal: 'center',
        duration: 2000,
        loginLoading: false,
      };
    },
    created() {
      const token = localStorage.getItem('token');
      if (token !== null) {
        router.push('robot');
      }
    },
    methods: {
      onEnter() {
        this.login();
      },
      login() {
        if (this.account === '' || this.password === '') {
          this.$vux.toast.text('登录信息不完整', 'top');
        } else {
          this.loginLoading = true;
          this.$http.post('/auth/login/', {
            username: this.account,
            password: this.password,
          }).then((response) => {
            this.loginLoading = false;
//            const token = response.data.username; 下面两个位服务器返回的参数，暂时未使用，后面可能会用到
            const mdUserId = response.data.user_id;
            const mdUserName = response.data.username;
            if (response.data.ret === 1) {
              this.$vux.toast.text('登录成功！', 'top');
              // 如果登录成功则保存登录状态并设置有效期
              this.$cookie.set('session', 'gfj' + response.data.username, 7);
              this.$cookie.set('md_user_id', mdUserId, 7);
              this.$cookie.set('md_username', mdUserName, 7);
              router.push('robot/robotlist');
            } else {
              this.$vux.toast.text(response.data.data, 'top');
            }
          }, () => {
            this.$vux.toast.text('服务器错误！', 'top');
          });
        }
      },
      toRegister() {
        router.push('register');
      },
      cnzzEvent(category, action) {
        /* eslint-disable no-underscore-dangle */
        window._czc.push(['_trackEvent', category, action, '', '', '']);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .button {
    width: 88px;
  }

  .hello {

  }

  .login-wrap {
    background: url("/static/images/bg.png");
    background-size: cover;
    height: 180px;
  }
  .login-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    outline: none;
    position: relative;
    top: 60px;
  }
  .login {
    margin: 10px;
  }


  .mv-10{
    margin: 10px 0;
  }


</style>
