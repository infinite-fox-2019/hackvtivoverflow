<template>
  <div>
      <nav>
         <div class="logo">
          <router-link to="/">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://image.flaticon.com/icons/png/512/36/36634.png' alt="symbol" height="40" width="40"/>
              </svg>
              <span style="color: white;">Hacktivoverflow</span>
          </router-link>
        </div>
         <div class="clickable">
            <router-link to="/" class="btn btn-primary">Home</router-link>
            <router-link to="/register" class="btn btn-primary">Register</router-link>
            <router-link to="/login" class="btn btn-primary">Login</router-link>
         </div>
      </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.btn {
  padding: 10px;
  margin: 5px;
}
nav {
  background-color: rgba(23, 93, 150, 0.562);
  height: 68px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
}
img {
  height: 250px;
  width: 100%;
}
.logo {
  margin-left: 14px;
  display: flex;
  align-items: center;
}
.logo:hover {
  cursor: pointer;
}
.click {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
</style>
