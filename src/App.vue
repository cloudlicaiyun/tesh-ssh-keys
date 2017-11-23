<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
*{
  -webkit-overflow-scrolling: touch;
}
body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
#app {
  width: 100%;
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
}
.vux-cell-box>div {
  width: 100%;
}
.vux-number-selector svg{
  fill: #29A529!important;
}
.vux-header .vux-header-title{
  margin: 0 44px!important;
}
.custom-btn {
  background-color: #29A529;
}
.weui-tabbar__label {
  color: #949494!important;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color: #29A529!important;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background-color: #29A529!important;
  color: #29A529!important;
}
.vux-tab-ink-bar {
  background-color: #29A529!important;
}

</style>

