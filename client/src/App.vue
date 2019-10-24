<template>
  <div id="app">
    <Navbar />
    <router-view />
    <notifications group="foo" position="bottom right" />
    <VueElementLoading :active="showCustomizeLoader" class="VueElementLoading">
      <img src="./assets/loading.gif" :is-full-screen="true" />
    </VueElementLoading>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import VueElementLoading from "vue-element-loading";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Navbar,
    VueElementLoading
  },
  computed: {
    showCustomizeLoader() {
      return this.$store.state.showCustomizeLoader;
    }
  },
  created() {
    this.$store.dispatch("getTag");
  }
};
</script>

<style>
.VueElementLoading {
  position: fixed;
  height: 100vh;
}
img {
  height: 100px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
