<template>
  <div>
      <nav>
         <div class="logo">
            <router-link to="/">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <image class="fa fa-stack-overflow" alt="symbol" height="40" width="40"/>
                </svg>
            </router-link>
         </div>
         <div class="clickable">
             <slot name="home"></slot>
             <slot name="login"></slot>
             <slot name="register"></slot>
             <slot name="question"></slot>
             <slot name="answer"></slot>
             <slot name="signout"></slot>
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
