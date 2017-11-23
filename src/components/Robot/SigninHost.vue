<template>
  <div class="signhost">
    <x-header :left-options="{showBack: true}">兴盛优选--微信助手</x-header>
    <h3>扫码登录微信，一键推送商品</h3>
    <flexbox>
      <flexbox-item :span="12" class="qrcode-wrap">
        <div v-show="isQrcodeLoading" style="text-align: center">
          <spinner></spinner>
          <br>
          加载中
        </div>
        <img :src="qrcodeSrc" class="qrcode" @load="imgLoad" v-show="!isQrcodeLoading">
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueCookie from 'vue-cookie';
  import { CellBox, XButton, XHeader, Group, ToastPlugin, Flexbox, FlexboxItem, Spinner, LoadingPlugin } from 'vux';
  import router from '../../router/index';

  Vue.use(ToastPlugin);
  Vue.use(LoadingPlugin);
  Vue.use(VueCookie);
  let agreq;
  let uuidreq;
  export default {
    name: 'addhost',
    components: {
      CellBox,
      XButton,
      XHeader,
      Group,
      Flexbox,
      FlexboxItem,
      Spinner,
    },
    data() {
      return {
        qrcodeSrc: '',
        isQrcodeLoading: true,
        count: 0,
      };
    },
    methods: {
      refresh() {
        this.qrcodeSrc = '';
        this.isQrcodeLoading = true;
        const username = this.$cookie.get('md_username');
        this.$http.get(`/api/robot/getqrcode?username=${username}`, {
          before(req) {
            if (uuidreq) {
              uuidreq.abort();
            }
            uuidreq = req;
          },
        }).then((response) => {
          const uuid = response.data.uuid || '';
          if (uuid !== '') {
            this.qrcodeSrc = response.data.qrcode_url;
            this.interval = setInterval(() => {
              this.$http.get('auth/login', {
                baseURL: 'http://s-prod-07.qunzhu666.com:10024',
                headers: {
                  'Content-Type': 'text/plain',
                },
                withCredentials: true,
                params: {
                  uuid,
                  timeout: true,
                },
              }).then((request) => {
                console.log(request);
                if (request.data.ret === '0' && request.data.name !== '') {
                  this.$vux.loading.show({
                    text: '正在初始化机器人列表，请稍后...',
                  });
                } else if (request.data.ret === '1') {
                  this.$vux.toast.text('登录成功', 'top');
                  router.push({ name: 'robotlist' });
                  clearInterval(this.interval);
                } else {
                  this.count += 1;
                  if (this.count === 40) {
                    clearInterval(this.interval);
                    router.push({ name: 'robotlist' });
                  }
                }
              });
            }, 3000);
          }
        });
      },
      imgLoad() {
        this.isQrcodeLoading = false;
      },
    },
    created() {
      const username = this.$cookie.get('md_username');
      this.$http.get(`/api/robot/getqrcode?username=${username}`, {
        before(req) {
          if (uuidreq) {
            uuidreq.abort();
          }
          uuidreq = req;
        },
      }).then((response) => {
        const uuid = response.data.uuid || '';
        if (uuid !== '') {
          this.qrcodeSrc = response.data.qrcode_url;
          this.interval = setInterval(() => {
            this.$http.get('robot/is_uuid_login', {
              baseURL: 'http://s-prod-04.qunzhu666.com:10024',
              headers: {
                'Content-Type': 'text/plain',
              },
              withCredentials: true,
              params: {
                uuid,
                timeout: true,
              },
            }).then((request) => {
              console.log(request);
              if (request.data.ret === '0' && request.data.name !== '') {
                this.$vux.loading.show({
                  text: '正在初始化机器人列表，请稍后...',
                });
              } else if (request.data.ret === '1') {
                this.$vux.toast.text('登录成功', 'top');
                router.push({ name: 'robotlist' });
                clearInterval(this.interval);
              } else {
                this.count += 1;
                if (this.count === 40) {
                  clearInterval(this.interval);
                  router.push({ name: 'robotlist' });
                }
              }
            });
          }, 3000);
        }
      });
    },
    beforeDestroy() {
      if (agreq) {
        agreq.abort();
      }
      if (uuidreq) {
        uuidreq.abort();
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .signhost {
    background-color: #fff;
    height:100%;
  }
  h3 {
    margin-top: 60px;
    margin-bottom:5px;
    font-weight: normal;
    text-align: center;
    font-size: 16px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .bold {
    font-weight: 600;
  }

  .red-text {
    color: #f00;
  }
  .center {
    text-align: center;
  }
  .qrcode-wrap {
    position: relative;
  }
  .qrcode {
    position: absolute;
    width: 85%;
    left:50%;
    transform: translateX(-50%);
  }
  .desc {
    font-size: 14px;
  }

  .warn {
    font-size: 12px;
    color: #f7455b;
  }
  .btn {
    background-color: none;
    color: #29A529;
    border: 1px solid #29A529;
    font-size: 14px;
  }
  .mb-20 {
    margin-bottom: 10px;
  }
</style>
