<template>
  <div>
    <div class="luar">
      <navbarout></navbarout>
      <div class="awal">
        <div class="dalam">
          <h1>Welcome To Hacktivoverflow</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbarout from "../components/navbarout.vue";
export default {
  components: {
    navbarout
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.awal {
  display: flex;
  justify-content: center;
  height: 95%;
  width: 100%;
  align-items: center;
  background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff2ca5d0-5633-4ef7-b22f-934c6516d5f0/d5k14s4-37fd37c5-bddd-4ec5-9893-322e4c6fd5c6.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZmMmNhNWQwLTU2MzMtNGVmNy1iMjJmLTkzNGM2NTE2ZDVmMFwvZDVrMTRzNC0zN2ZkMzdjNS1iZGRkLTRlYzUtOTg5My0zMjJlNGM2ZmQ1YzYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.A00wSVpYZ_Mo003BCSvgiaDoSG9-C88GJYnJ2GWSK1k");
}
h1 {
  position: relative;
  text-transform: uppercase;
  font-size: 4em;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: animate 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}
.luar {
  height: 100vh;
}

@keyframes animate {
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
}
</style>
