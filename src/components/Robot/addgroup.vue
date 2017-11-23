<template>
  <div>
    <x-header :left-options="{showBack: true}">兴盛优选--添加群</x-header>
    <checklist title='添加群' :label-position='labelPosition' required :options='commonList' @on-change='change'></checklist>
    <x-button type="primary" class="addgroup" @click.native="addgroup()">确定</x-button>
  </div>
</template>



<script>
  import Vue from 'vue';
  import { Group, CellBox, Checklist, Cell, Divider, XButton, XHeader, ToastPlugin } from 'vux';
  import router from '../../router/index';

  Vue.use(ToastPlugin);
  export default {
    name: 'addgroup',
    components: {
      Group,
      Checklist,
      Cell,
      Divider,
      XButton,
      CellBox,
      XHeader,
    },
    methods: {
      change(val) {
        const data = val;
        this.changegroup = [];
        data.forEach((item) => {
          this.changegroup.push(this.userinfo[this.commonList.indexOf(item)].username);
        });
      },
      addgroup() {
        const req = {
          action: 1,
          cr_username_list: this.changegroup,
        };
        this.$http.post('user/chatroom-is-send/', req).then(() => {
          // do
          router.push('robotlist');
        });
      },
      getParams() {
        // 取到路由带过来的参数
        const routerParams = this.$route.params.robotname;
        // 将数据放在当前组件的数据内
        this.robotname = routerParams;
      },
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      $route: 'getParams',
    },
    data() {
      return {
        fullValues: [],
        labelPosition: '',
        error: '',
        userinfo: [],
        commonList: [],
        changegroup: [],
        robotname: '',
      };
    },
    created() {
      this.$http.get('user/get-chatroom/').then((response) => {
        // 取到路由带过来的参数
        this.robotname = this.$route.params.robotname;
        const groupdata = response.data.data;
        groupdata.forEach((item) => {
          if (item.name === this.robotname) {
            const data = item.group;
            for (let i = 0; i < data.length; i += 1) {
              this.userinfo.push(data[i]);
              this.commonList.push(data[i].nickname);
            }
          }
        });
        this.$vux.loading.hide();
      }, () => {
        this.$vux.loading.hide();
        router.push('/login');
      });
    },
  };
</script>

<style scoped>
  .error {
    padding-left: 15px;
    line-height: 28px;
    color: #888;
    font-size: 12px;
  }
  .addgroup {
    margin-top: 20px;
    width: 50%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 35px;
  }
</style>
