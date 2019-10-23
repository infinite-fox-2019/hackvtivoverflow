<template>
  <div id="sidebar">
    <div class="toregist">
    <router-link to="/register">
      <h4>Register</h4>
    </router-link>
    </div>
    <div class="modallogin">
      <router-link to="/ask">
      <h4>Ask Question</h4>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
name:'sidebar'
}
</script>

<style scoped>
#sidebar{
    width: 16.8vw;
    height: 100vh;
    background: brown
}

</style>