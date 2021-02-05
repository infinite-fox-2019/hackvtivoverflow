<template>
  <div class="w-full flex justify-between items-center shadow-md" style="height: 7vh;">
    <div class="left ml-20">
      <div class="ml-12">
        <router-link to="/">
          <img src="@/assets/qmarks.png" alt class="object-contain h-40" />
        </router-link>
      </div>
    </div>
    <div class="right mr-20">
      <div class="mr-12">
        <router-link class v-if="!this.$store.state.isLogin" to="/login">
          <button>Login</button>
        </router-link>
        <button v-else @click.prevent="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      Swal.fire({
        title: "Logout",
        text: "Are you Sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then(result => {
        if (result.value) {
          this.$store.commit("SET_LOGIN", false);
          localStorage.removeItem("token"), localStorage.removeItem("id");
          Swal.fire("You've been logout!");
        }
      });
    }
  }
};
</script>

<style>
button {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  outline: none;
  color: white;
  border: none;
  background-color: #f57145;
  transition: 0.3s;
}
button:hover {
  cursor: pointer;
  background-color: #d12102;
}
</style>