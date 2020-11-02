import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
    isGet: true,
    accounts: [
      {
        email: "test@test.com",
        password: "test",
      },
    ],
    token: "",
    logining: false,
    form: {
      email: "123@test.com",
      username: "123",
      usertel: "123",
      useraddress: "123",
      message: "留言測試",
    },
    orders: [],
    lists: [
      "全部",
      "短T",
      "外套",
      "大學T",
      "帽T",
      "下身",
    ],
    cart: [],
    get totalPrice() {
      return this.cart.reduce(
        (total, product) => total + product.quantity * product.cost,
        0
      );
    },
    percentDiscount: 0,
    get discountPrice() {
      return Math.round((this.totalPrice * (100 - this.percentDiscount)) / 100);
    },
    products: [],
    coupons: [],
    itemOfPage: 9,
  },
  mutations: {
    //增加到購物車
    addToCart(state, product) {
      const cart = state.cart;
      if (cart.some((item) => item.id === product.id)) {
        const index = cart.findIndex((item) => item.id === product.id);
        cart[index].quantity += product.quantity;
      } else {
        cart.push({ ...product });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      const div = document.createElement("div");
      const text = document.createTextNode("商品已加入購物車");
      div.appendChild(text);
      document.getElementById("popup").appendChild(div);
      setTimeout(() => {
        document.getElementById("popup").removeChild(div);
      }, 2500);
    },
    //刪除購物車裡的商品
    deleteProduct(state, product) {
      const cart = state.cart;
      cart.splice(cart.indexOf(product), 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    ORDERS(state, payload) {
      state.orders = payload;
    },
    COUPONS(state, payload) {
      state.coupons = payload;
    },
  },
  actions: {
    // 首頁的商品資料，進入MySQL查詢後會傳JSON型態資料
    getProducts({ commit }) {
      commit("LOADING", true);
      //const api = payload;
      axios.get('/api/user/selectProduct').then(function (response) {
        //this.state.products = response.data;
        commit("PRODUCTS", response.data);
        commit("LOADING", false);
      });
    },
    getOrders({ commit }, payload) {
      commit("LOADING", true);
      const api = payload;
      axios.get(api).then(function (response) {
        commit("ORDERS", response.data);
        commit("LOADING", false);
      });
    },
    getCoupons({ commit }, payload) {
      commit("LOADING", true);
      const api = payload;
      axios.get(api).then(function (response) {
        commit("COUPONS", response.data);
        commit("LOADING", false);
      });
    },
  },
  getters: {},
  modules: {},
});
