import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import MetaInfo from "vue-meta-info";
Vue.use(MetaInfo);
Vue.component("Loading", Loading);

Vue.use(VueLazyload, {
  error: require('@/assets/error.png'),  //加載失敗的圖片
  loading: require('@/assets/loading.gif')//加載中圖片，一定要有，不然會一直重複加載佔位圖
});

import Astrict from '@/util/astrict'
Vue.use(Astrict)

import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false; //阻止 vue 在啟動時跳出開發提示

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
