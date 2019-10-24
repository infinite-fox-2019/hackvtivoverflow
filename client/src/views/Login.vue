<template>
  <div class="container">
    <img src="../assets/logo.png" alt="logo" />
    <div class="login">
      <form @submit.prevent="login">
        <div class="email">
          <label style="align-self:flex-start">
            <strong>Email</strong>
          </label>
          <input type="email" v-model="email" />
        </div>

        <div class="password">
          <label style="align-self:flex-start">
            <strong>Password</strong>
          </label>
          <input type="password" v-model="password" />
        </div>

        <input type="submit" value="Log in" />
      </form>
    </div>
    <p>
      Don't have a account?
      <router-link to="/register" style="color:black; text-decoration: none">Sign up</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {},
  methods: {
    login() {
      this.$store.commit("LOADER", true);
      axios({
        method: `post`,
        url: `http://localhost:3000/user/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          setInterval(() => {
            this.$store.commit("LOADER", false);
          }, 2000);
          localStorage.setItem("token", data.token);
          this.$notify({
            group: "foo",
            type: "success",
            position: "top right",
            title: "Success",
            text: "Welcome! Logged In success!"
          });
          this.$router.push("/ask");
        })
        .catch(err => {
          this.$store.commit("LOADER", false);
          this.$notify({
            group: "foo",
            type: "error",
            position: "top center",
            title: "Error!",
            text: `Ups! ${err.response.data.message}`
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #eff0f1;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img {
  height: 50px;
}

.login {
  background-color: #fff;
  width: 300px;
  height: 300px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

.email {
  display: flex;
  flex-direction: column;
}

.password {
  display: flex;
  flex-direction: column;
}

input {
  height: 40px;
  width: 250px;
  border-radius: 5px;
  border: 1px solid #eff0f1;
  padding: 5px;
  font-size: 20px;
}

input[type="submit"] {
  background-color: #007ed9;
  color: white;
}
</style>