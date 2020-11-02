<template>
  <div class="product">
    <img
      v-lazy="require(`@/assets/products/${product.image_urlo}`)"
      :alt="product.product_name"
    />
    <div>{{ product.product_name }}</div>
    <div>${{ product.cost }}</div>
    <div>
      <router-link :to="{ path: '/product-detail/' + product.id }">
        <button>查看更多</button>
      </router-link>
      <button class="add" @click="addToCart">加到購物車</button>
    </div>
  </div>
</template>

<script>
//import Productdetail from "@/views/ProductDetail.vue";
export default {
  name: "Product",
  props: {
    product: Object,
  },
  data() {
    return { products: this.product }; //將父傳的值，用一個變數get ，但此處沒用到這個...
  },
  methods: {
    addToCart() {
      //this.$emit("addToCart");
      this.$store.commit("addToCart", this.product);

    },
  },
};
</script>

<style lang="scss">
</style>
