<template>
  <div id="sidebar">
    <div class="toregist">
    <router-link to="/register">
      <h6>Register</h6>
    </router-link>
    </div>
    <div class="modallogin">
      <router-link to="/questions/create">
      <h6>Ask Question</h6>
    </router-link>
    </div>
    <div class="modallogin">
      <router-link to="/questions/tag">
      <h6>Tags</h6>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>

<style scoped>
#sidebar{
    width: 17vw;
    height: 100vh;
    background: brown
}

</style>
