<template>
  <div class="container">
    <p style="margin-bottom: 15px; cursor:pointer">
      <router-link to="/myask" style="color:black; text-decoration:none">My Question</router-link>
    </p>
    <p style="margin-bottom: 10px">Public</p>
    <div class="menu">
      <div style="display:flex; align-items:center">
        <img src="../assets/internet.png" alt="internet" />
        <p style="margin-left: 5px; cursor:pointer">
          <router-link to="/ask" style="color:black; text-decoration:none">Code Overflow</router-link>
        </p>
      </div>
      <div style="margin:10px 25px;">
        <p style="margin-bottom: 10px; cursor:pointer">
          <router-link to="/tags" style="color:black; text-decoration:none">Tag</router-link>
        </p>
        <p style="cursor:pointer">
          <router-link to="/users" style="color:black; text-decoration:none">User</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar"
};
</script>

<style scoped>
.container {
  width: 250px;
  height: 100%;
  border-right: 1px solid #dbdcdc;
  position: fixed;
  text-align: left;
  padding: 40px 20px;
}

img {
  height: 20px;
}
</style>