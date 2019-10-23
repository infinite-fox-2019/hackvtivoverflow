<template>
  <div class="background">
      <sidebar></sidebar>
      <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
    name: 'questions',
    components: {
        Sidebar
    }
}
</script>

<style>
.background{
    display: flex;
    flex-direction: row;
    justify-content: space-between
}
sidebar{
    align-self: flex-start
}

</style>