<template>
  <div>
    <x-header :left-options="{showBack: false}">我</x-header>

    <div class="shop">
      <div class="shop-header">
        <span class="myshop">我的店铺</span>
        <!--<span class="recommend-num">今日推送：xx 次</span>-->
      </div>
    </div>
    <group gutter="0" class="xswitch">
      <x-switch title="托管" class="shop-trust" value="true" v-model=trust @click.native="trustStatus()"></x-switch>
      <span class="shop-title">{{ shop.shop_name }}</span>
    </group>

    <div class="logout-wrap">
      <x-button type="warn" @click.native="logout()">退出系统</x-button>
    </div>

  </div>
</template>

<script>
  import { XHeader, Group, CellBox, XButton, Qrcode, Badge, Cell, Flexbox,
    FlexboxItem, TransferDomDirective as TransferDom, XDialog, XSwitch } from 'vux';
  import Vue from 'vue';
  import VueCookie from 'vue-cookie';
  import router from '../../router/index';

  Vue.use(VueCookie);
  export default {
    name: 'me',
    components: {
      Group,
      CellBox,
      XButton,
      Qrcode,
      XHeader,
      Badge,
      Cell,
      Flexbox,
      FlexboxItem,
      TransferDom,
      XDialog,
      XSwitch,
    },
    directives: {
      TransferDom,
    },
    data() {
      return {
        inviteCode: true,
        headSrc: '',
        options: {
          url: '/api/file/imageupload/',
          headers: {},
        },
        phone: '',
        popup: false,
        shop: {},
        trust: '',
      };
    },
    methods: {
      logout() {
        this.$cookie.delete('session');
        this.$cookie.delete('md_user_id');
        this.$cookie.delete('md_username');
        router.replace('/');
        this.$http.get('/auth/logout/').then((response) => {
          this.$vux.toast.text(response.data.data, 'top');
        });
      },
      trustStatus() {
        this.$http.post('user/info/', {
          trust: !this.trust,
        }).then(() => {
          // do nothing
          console.log(3);
        });
      },
    },
    created() {
      this.$http.get('user/info/').then((response) => {
        if (response.data.ret !== '0') {
          this.shop = response.data.data;
          this.trust = this.shop.trust;
        } else {
          this.tabledata = [];
        }
      });
      this.$parent.isShowBack = false;
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logout-wrap {
    margin: 20px 10px;
  }
  .shop {
    padding:0 17px;
    font-size:14px;
    color: #333;
  }
  .shop-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .myshop {
    float: left;
    color: #888;
  }
  .shop-title {
    float: left;
    height:30px;
    line-height:30px;
    font-size: 16px;
    font-weight:bold;
    padding-left: 15px;
  }
  .xswitch {
    width:100%;
  }
</style>

