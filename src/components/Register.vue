<template>
  <div>
    <x-header>兴盛优选--注册</x-header>
    <div class="container">
      <group title="手机号">
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="account" required></x-input>
      </group>
      <group title="密码">
        <x-input title="密码" name="password" placeholder="请输入密码" keyboard="password" type="password" v-model="password1" required></x-input>
      </group>
      <group title="密码">
        <x-input title="密码" name="password" placeholder="再次输入密码" keyboard="password" type="password" v-model="password2" required></x-input>
      </group>
      <x-button type="primary" action-type="submit" @click.native="register()" class="mv-10">注册</x-button>
      <br/>
      <x-button type="primary" plain @click.native="toLogin()">去登录</x-button>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import { XInput, XHeader, XButton, Group, Flexbox, FlexboxItem, ToastPlugin } from 'vux';
  import router from '../router/index';

  Vue.use(ToastPlugin);

  export default {
    name: 'hello',
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
        password1: '',
        password2: '',
        remainTime: 0,
        interval: null,
        msg: '',
        duration: 2000,
        invite_code: '',
      };
    },
    methods: {
      toLogin() {
        router.push({ name: 'login', params: { des: 'login' } });
      },
      register() {
        if (this.account === '' || this.password1 === '' || this.password2 === '' || this.validecode === '') {
          this.$vux.toast.text('填写信息不全', 'top');
          return;
        }
        if (this.password1 !== this.password2) {
          this.$vux.toast.text('两次输入密码不同，请重试', 'top');
          return;
        }
        const req = {
          username: this.account,
          password1: this.password1,
          password2: this.password2,
          verifyNum: this.validecode,
        };
        this.$http.post('/auth/register/', req).then((response) => {
          if (response.status === 200) {
            if (response.data.ret === 1) {
              this.$vux.toast.text(response.data.data, 'top');
              router.push('/login');
            } else {
              this.$vux.toast.text(response.data.data, 'top');
            }
          }
          if (response.status === 201) {
            this.$vux.toast.text('注册成功', 'top');
            router.push('/login');
          }
        }, (response) => {
          if (response.status === 500) {
            this.$vux.toast.text('服务器错误', 'top');
            return;
          }
          if (response.status === 400) {
            const msg = response.data.data;
            const arr = Object.values(msg);
            if (arr.length > 0) {
              this.$vux.toast.text(arr[0][0], 'top');
            }
          }
        });
      },
    },
    created() {
      if (this.$route.params.invite_code) {
        this.invite_code = this.$route.params.invite_code;
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin: 10px;
  }

  .mv-10 {
    margin: 10px 0;
  }
</style>
