<template>
  <div class="login">
    <form action="" autocomplete="off">
      <div class="form-group">
        <label for="useremail">Email</label>
        <input
          type="email"
          id="useremail"
          name="email"
          required="true"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required="true"
          v-model="password"
          autocomplete="off"
        />
      </div>
      <input v-model="seen" type="checkbox" />沒會員? 立即來註冊~~
      <input v-if="seen" type="submit" @click.prevent="addUser" value="註冊" />
      <input v-else type="submit" @click.prevent="selectUser" value="登入" />
    </form>
    <div class="loading" v-show="loading"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "test@test.com",
      password: "test",
      loading: false,
      seen: false, //checkbox 切換顯示內容
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        await axios
          .post(process.env.VUE_APP_LOGIN_URL, {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            this.$store.state.token = res.data.token;
          });
        setTimeout(() => {
          this.$store.state.logining = true;
          this.loading = false;
          this.$router.push("/dashboard");
        }, 500);
      } catch (err) {
        const accounts = this.$store.state.accounts;
        let account = accounts.find(
          (item) => item.email === this.email && item.password === this.password
        );
        if (account) {
          this.loading = true;
          this.$store.state.token = "";
          setTimeout(() => {
            this.$store.state.logining = true;
            this.loading = false;
            this.$router.push("/dashboard");
          }, 500);
        } else {
          this.loading = false;
          alert("Email或Password錯誤");
        }
      }
    },
    async addUser() {
      //新增用戶
      let name = this.email;
      let age = this.password;
      try {
        await axios
          .post("/api/user/addUser", {
            name,
            age,
          })
          .then((res) => {
            alert("註冊成功~ :)");
            return res;
          })
          .catch((err) => {
            alert("註冊失敗~ :(");
            console.log(err);
          });
        setTimeout(() => {
          this.$store.state.logining = true;
          this.loading = false;
          this.$router.push("/");
        }, 500);
      } catch (err) {
        const accounts = this.$store.state.accounts;
        let account = accounts.find(
          (item) => item.email === this.email && item.password === this.password
        );
        if (account) {
          this.loading = true;
          this.$store.state.token = "";
          setTimeout(() => {
            this.$store.state.logining = true;
            this.loading = false;
            this.$router.push("/dashboard");
          }, 500);
        } else {
          this.loading = false;
          alert("Email或Password錯誤");
        }
      }
    },
    //查詢用戶
    async selectUser() {
      try {
        //let name = this.keywords;
        axios
          .post("api/user/selectUser", {
            name,
          })
          .then((res) => {
            let data = res.data[0];
            this.userName = data.name;
            this.age = data.age;
          });
        setTimeout(() => {
          this.$store.state.logining = true;
          this.loading = false;
          this.$router.push("/");
        }, 500);
      } catch (err) {
        const accounts = this.$store.state.accounts;
        let account = accounts.find(
          (item) => item.email === this.email && item.password === this.password
        );
        if (account) {
          this.loading = true;
          this.$store.state.token = "";
          setTimeout(() => {
            this.$store.state.logining = true;
            this.loading = false;
            this.$router.push("/login");
          }, 500);
        } else {
          this.loading = false;
          alert("輸入錯誤 : 無此會員資料");
        }
      }
    },
  },
  computed: {
    account() {
      return this.$store.state.accounts;
    },
  },
  mounted() {
    if (this.$store.state.logining) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang='scss'>
</style>
