<template>
  <div class="mygroup">
    <x-header :left-options="{showBack: false}">兴盛优选--我的门店群</x-header>
    <div class="header-wrap">
      <h3>我的发单机器人({{robotsData.length}})</h3>
      <x-button type="primary" link="signinhost" class="login-btn">登录机器人</x-button>
    </div>
    <group>
      <cell-box class="wrap" v-for="(item, index) in robotsData" :key="index">
        <div class="robot">
          <span class="point" :class="{ green: item.ret===1 }"></span>
          <span v-html="item.name" class="robotname"></span>
          <x-button class="addgroup" @click.native="toAddgroup(item.name)">添加群</x-button>
          <span v-if="item.ret===0" class="status">离线</span>
          <span v-if="item.ret===1" class="status">在线</span>
        </div>
        <ul class="group">
          <li v-for="(group, index) in item.production_list">
            <span v-html="group.nickname"></span>
            <x-button type="warn" class="delete" @click.native="removeItem(item.name, index)">删除</x-button>
          </li>
        </ul>
      </cell-box>
    </group>
    <div class="blank-bar"></div>
    <div class="bottom-tip">温馨提示：微信登录成功后，请耐心等待1~3分钟，机器人会自动发单。</div>

  </div>
</template>

<script>
  import { Group, CellBox, XButton, XHeader, LoadingPlugin, Flexbox, FlexboxItem, Badge, Icon } from 'vux';
  import Vue from 'vue';
  import VueCookie from 'vue-cookie';
  import Addgroup from './addgroup';
  import router from '../../router/index';

  Vue.use(LoadingPlugin);
  Vue.use(VueCookie);

  export default {
    name: 'robotlist',
    components: {
      Group,
      CellBox,
      XButton,
      XHeader,
      Flexbox,
      FlexboxItem,
      Badge,
      Icon,
      Addgroup,
    },
    data() {
      return {
        tabledata: [],
        is_online: false,
        onlineStyle: '#f74c31',
        hostName: '',
        isShow: true,
        robotsData: [],
        groupname: '',
        delgroup: [],
      };
    },
    created() {
      this.$parent.isShowBack = false;
      this.$vux.loading.show({
        text: 'Loading',
      });
      this.$http.get('user/chatroom-is-send/').then((response) => {
        const data = response.data.data;
        this.robotsData = data;
        this.$vux.loading.hide();
      }, () => {
        this.$vux.loading.hide();
        router.push('/login');
      });
    },
    methods: {
      removeItem(name, index) {
        this.delgroup = [];
        this.robotsData.forEach((item) => {
          if (item.name === name) {
            this.delgroup.push(item.production_list[index].username);
          }
          const req = {
            action: 0,
            cr_username_list: this.delgroup,
          };
          this.$http.post('user/chatroom-is-send/', req).then(() => {
            // do nothing
            if (item.name === name) {
              item.production_list.splice(index, 1);
            }
          });
        });
      },
      toAddgroup(name) {
        this.$router.push({
          path: 'addgroup',
          name: 'addgroup',
          params: {
            robotname: name,
          },
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .robotname {
    margin-left:70px;
  }
  h3 {
    font-size: 16px;
  }
  .header-wrap {
    height: 40px;
    line-height: 40px;
    position: relative;
    color: #333;
    font-size: 20px;
    margin-left:17px;
    padding-top: 10px;
    position: relative;
  }
  ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    width: 100%;
    position: relative;
    height: 35px;
    line-height: 35px;
  }

  a {
    color: #42b983;
  }

  .status {
    position: absolute;
    top: 0%;
    left: 17px;
    color: #969696;
  }
  .help-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 8px;
    right: 10px;
  }
  .help-link {
    padding: 10px 15px 10px 0;
    border-top: 1px solid #D9D9D9;
    position: relative;
    font-size: 14px;
    margin-left: 10px;
  }
  .help-link:first-child {
    margin-left: 0;
    padding-left: 10px;
  }

  .point {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: red;
    margin-right: 10px;
    position: absolute;
    top: 37%;
    left: 0px;
  }
  .green {
    background: #1AAD19;
  }

  .login-btn {
    background-color: #29A529;
    line-height:28px;
    position: absolute;
    right: 15px;
    top: 18px;
    width: 120px;
  }
  .blank-bar {
    height: 53px;
    background-color: #fbf9fe;
  }
  .bottom-tip {
    position: fixed;
    z-index: 500;
    bottom: 50px;
    background-color: #e3f5ff;
    color: #29A529;
    font-size: 12px;
    padding: 4px;

  }
  .info-icon {
    margin-right: 10px;
    color: #29A529;
  }
  .hold-on {
    font-size: 14px;
    position: relative;
    overflow: hidden;
  }
  .hold-on img{
    position: absolute;
    width: 25px;
    right: 12px;
    top: 8px;
  }
  .addgroup {
    position: absolute;
    top: 20%;
    right: 0px;
    color: #969696;
    background: url(/static/images/add.jpg) 6px center no-repeat;
    background-size: 15px 15px;
    padding: 3px 5px 3px 25px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80px;
    height: 24px;
    line-height: 18px;
  }
  .delete {
    position: absolute;
    right: 22px;
    top: 6px;
    font-size: 12px;
    width: 65px;
    color: #fff;
    background: #ff0000;
    height: 22px;
    line-height: 23px;
  }
  .robot {
    width:100%;
    height:40px;
    line-height:40px;
    position: relative;
  }
  .wrap {
    flex-direction: column;
  }
</style>
