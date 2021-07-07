<template>
  <div class="home">
    <Sidebar />
    <router-view style="margin-left: 250px;" />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "home",
  components: {
    Sidebar
  }
};
</script>
