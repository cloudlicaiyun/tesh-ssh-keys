<template>
  <div>
    <x-header :left-options="{showBack: false}">兴盛优选--商品列表</x-header>
    <div class="shop">
      <div class="shop-header">
        <span class="myshop">我的店铺</span>
        <span v-show="isShow" class="time">{{message}}{{time}}</span>
        <!--<span class="recommend-num">今日推送：xx 次</span>-->
      </div>
      <div class="shop-body">
        <span class="shop-title">{{ shop.shop_name }}</span>
        <x-button class="shop-recommend" @click.native="pushShop()">推送店铺</x-button>
      </div>
    </div>
    <group title="可推送的商品">
      <cell-box class="goods-list" v-for="(goods, index) in goodsData">
        <flexbox>
          <flexbox-item :span="1/3" class="pic">
            <img :src="goods.ad_image" class="good-pic">
          </flexbox-item>
          <flexbox-item :span="2/3" class="desc">
            <span class="goods-title">{{ goods.name }}</span>
            <p class="goods-info">{{ goods.subtitle }}</p>
            <x-button  class="goods-recommend" @click.native="pushGoods(goods.product_id)">推送</x-button>
            <span class="discount-price">尖叫价：￥ <i>{{ goods.sale_price}}</i></span>
            <span class="origin-price">原价：￥ <i>{{ goods.org_price }}</i></span>
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Group, CellBox, XButton, XHeader, LoadingPlugin, Panel } from 'vux';
  import Vue from 'vue';
  import VueCookie from 'vue-cookie';

  Vue.use(LoadingPlugin);
  Vue.use(VueCookie);

  export default {
    name: 'recommend',
    components: {
      Group,
      CellBox,
      XButton,
      XHeader,
      Panel,
      Flexbox,
      FlexboxItem,
    },
    data() {
      return {
        goodsData: [],
        shop: {},
        endTime: '',
        message: '',
        isShow: false,
        flag: false,
        time: '',
      };
    },
    created() {
      this.$vux.loading.show({
        text: 'Loading',
      });
      this.$http.get('user/info/').then((response) => {
        this.shop = response.data.data;
        console.log(this.shop);
      });
      this.$http.get('product/info/').then((response) => {
        const data = response.data.data;
        this.goodsData = data;
        this.$vux.loading.hide();
      }, () => {
        this.$vux.loading.hide();
      });
    },
    mounted() {
      const time = setInterval(() => {
        if (this.flag === true) {
          clearInterval(time);
        }
        this.timeDown();
      }, 500);
    },
    methods: {
      pushShop() {
        this.$http.get('/api/product/push-shop/').then(() => {
          // do nothing
          console.log(1);
          this.isShow = true;
        }).then(() => {
          this.$http.get('user/get-pushtime/').then((response) => {
            // console.log(response.data.data);
            this.endTime = response.data.data;
          });
        });
      },
      pushGoods(goodsid) {
        this.$http.get(`/api/product/push-by-shop?product_id=${goodsid}`).then(() => {
          // do nothing
          console.log(2);
        });
      },
      timeDown() {
        // console.log(this.endTime);
        if (!this.endTime) {
          return;
        }
        const endTime = new Date(this.endTime);
        // console.log(endTime);
        const nowTime = new Date();
        // console.log(nowTime);
        const leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000, 10);
        // const d = parseInt(leftTime / (24 * 60 * 60), 10);
        // const h = this.formate(parseInt((leftTime / (60 * 60)) % 24, 10));
        const m = this.formate(parseInt((leftTime / 60) % 60, 10));
        const s = this.formate(parseInt(leftTime % 60, 10));
        if (leftTime <= 0) {
          this.flag = true;
          this.$emit('time-end');
          this.time = null;
          this.message = '可推送';
        } else {
          this.message = '距离下一次推送';
          this.time = `${m}分${s}秒`;
        }
      },
      formate(time) {
        if (time >= 10) {
          return time;
        } else {
          return `0${time}`;
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .recommend {
    padding: 0 17px;
  }
  .shop {
    padding:0 17px;
    font-size:14px;
    color: #333;
    border-bottom: 1px solid #ccc;
    padding-bottom: 22px;
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
  .time{
    float:right;
  }
  .recommend-num {
    float: right;
  }
  .shop-body {
    width: 100%;
    height: 30px;
    line-height: 40px;
  }
  .shop-title {
    float: left;
    height:30px;
    line-height:30px;
    font-size: 14px;
    font-weight:bold;
  }
  .shop-recommend {
    float: right;
    height: 20px;
    line-height: 17px;
    width: 75px;
    background-color: #29A529;
    color: #fff;
    border-radius: 5px;
    padding: 2px 5px;
    margin-top: 3px;
    text-align: center;
    font-size: 14px;
  }
  .goods-list {
    position: relative;
  }
  .pic {
    width: 100%;
    height:60px;
    overflow: hidden;
  }
  .desc {
    width:100%;
    height:90px;
    overflow: hidden;
    position: relative;
  }
  .good-pic {
    width: 100%;
  }
  .goods-title {
    font-size: 14px;
    font-weight:bold;
    color: #333;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    max-width:180px;
  }
  .goods-info {
    font-size: 12px;
    color: #888;
    line-height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .goods-recommend {
    height: 22px;
    line-height: 23px;
    background-color: #29A529;
    width: 65px;
    position: absolute;
    right: 17px;
    bottom: 5px;
    font-size: 12px;
    color: #fff;
  }
  .origin-price {
    position: absolute;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    left: 0px;
    bottom:5px;
  }
  .origin-price i{
    font-style: normal;
    text-decoration: line-through;
  }
  .discount-price {
    position: absolute;
    font-size: 16px;
    height: 20px;
    line-height: 20px;
    left: 0px;
    bottom:28px;
  }
  .discount-price i {
    font-style: normal;
    color: #ff0000;
  }
</style>
