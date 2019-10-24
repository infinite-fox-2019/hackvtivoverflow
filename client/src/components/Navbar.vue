<template>
  <nav>
    <div class="logo" @click.prevent="home">
      <img src="../assets/logo.png" alt="Code Overflow" />
      <p>
        Code
        <strong>Overflow</strong>
      </p>
    </div>
    <div class="search">
      <i class="fas fa-search"></i>
      <form>
        <input type="search" placeholder="search question" />
        <input type="submit" value="Search" />
      </form>
    </div>
    <div class="sign">
      <p v-if="isLogin" @click.prevent="logout">Logout</p>
      <router-link to="/login" style="color : black; text-decoration:none" v-else>Login</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {};
  },
  computed: {
    isLogin() {
      if (localStorage.getItem("token")) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    home() {
      this.$router.push("/ask");
    },
    logout() {
      localStorage.removeItem("token");
      this.$notify({
        group: "foo",
        type: "success",
        position: "top right",
        title: "Success",
        text: "Bye Bye! Logged Out success!"
      });
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
nav {
  box-shadow: 0px 3px 6px 0px rgba(224, 215, 224, 1);
  border-top: 3px solid #f38024;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafb;
  padding: 2px 10px;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo p {
  font-size: 18px;
}
img {
  height: 30px;
}

form {
  height: 100%;
}

.search {
  height: 35px;
  width: 500px;
  border: 1px solid #d3d3d3;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding-left: 5px;
}

input[type="search"] {
  width: 400px;
  height: 100%;
  border: none;
  margin-left: 5px;
  background-color: transparent;
}

input[type="search"]:focus {
  outline: none;
}

input[type="submit"] {
  background-color: #f38024;
  height: 100%;
  border: none;
  width: 72px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
}
.sign {
  display: flex;
  cursor: pointer;
}
</style>