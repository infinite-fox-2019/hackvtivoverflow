<template>
  <div id="app">
    <Navbar />
    <Jumbotron />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Jumbotron from "@/components/Jumbotron";

export default {
  data: function() {
    return {
      isAdmin: false
    };
  },
  components: {
    Navbar,
    Jumbotron
  }
};
</script>

<style>
</style>
