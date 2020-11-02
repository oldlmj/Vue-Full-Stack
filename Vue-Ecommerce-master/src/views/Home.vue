<template>
  <div class="home">
    <Slider />
    <div v-show="!products.length" class="loading"></div>
    <h2 v-show="!products.length">商品資料讀取中...</h2>
    <main v-if="products.length">
      <ul>
        <List
          v-for="(list, index) in lists"
          :class="{ active: list === currtype }"
          :list="list"
          :key="index"
          @selectType="selectType"
        />
      </ul>
      <div class="products">
        <Product
          v-for="product in filteredProducts.slice(
            (currPage - 1) * itemOfPage,
            currPage * itemOfPage
          )"
          :product="product"
          :key="product.id"
          @addToCart="addToCart(product)"
        />
      </div>
    </main>
    <Pagination
      :currPage="currPage"
      :totalPage="totalPage"
      @setPage="setPage"
    />
    <CartDrawer :cart="cart" />
    <div id="popup"></div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/Slider.vue";
import List from "@/components/List.vue";
import Product from "@/components/Product.vue";
import Pagination from "@/components/Pagination.vue";
import CartDrawer from "@/components/CartDrawer.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "vue-essence",
    meta: [
      {
        // set meta
        name: "keyWords",
        content: "",
      },
      {
        name: "description",
        content:
          "",
      },
    ],
  },
  name: "home",
  data() {
    return {
      currtype: "全部",
      currPage: 1,
      user: [],

      flag: true
    };
  },
  components: {
    Slider,
    List,
    Product,
    Pagination,
    CartDrawer,
    Footer,
  },
  methods: {

    getProducts() {
      this.$store.dispatch("getProducts", process.env.VUE_APP_PRODUCTS_URL);
    },
    selectType(list) {
      if (this.currtype !== list) {
        this.currtype = list;
        this.currPage = 1;
        this.scrollToProducts();
      }
    },
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
    setPage(n) {
      if (this.currPage !== n) {
        this.currPage = n;
        this.scrollToProducts();
      }
    },
    scrollToProducts() {
      const getProductsPosition = document.getElementById("slider")
        .scrollHeight;
      window.scrollTo(0, getProductsPosition);
    },


  },
  computed: {
    ...mapState(["lists", "products", "cart", "itemOfPage"]),
    filteredProducts: function () {
      if (this.currtype === "全部") {
        return this.products;
      }
      return this.products.filter(
        (item) => item.category.indexOf(this.currtype) > -1
      );
    },
    totalPage() {
      return Math.ceil(this.filteredProducts.length / this.itemOfPage);
    },

  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
</style>
