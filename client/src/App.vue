<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />

    <q-dialog v-model="seamless" seamless position="bottom" transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width: 350px bg-primay text-white">
        <q-card-section class="row items-center no-wrap">
          <div class="text-black">{{ quote }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import io from "socket.io-client";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
export default {
  name: "Main",
  components: {
    Navbar,
    Login
  },
  data() {
    return {
      seamless: false,
      quote: "",
      socket: io.connect("http://18.136.123.15")
    };
  },
  created() {
    this.socket.on("server", data => {
      this.seamless = true;
      this.quote = data.message;
      setTimeout(() => {
        this.seamless = false;
        this.quote = "";
      }, 5000);
    });

    this.$store.dispatch("fetchTrendingTag");
    this.$store.dispatch("fetchQuestion");
    if (localStorage.getItem("token")) {
      this.$store.commit("CHECKLOGIN", true);
    } else {
      this.$store.commit("CHECKLOGIN", false);
    }
  }
};
</script>

<style>
#app {
  padding: 0;
  margin: 0;
}
</style>
