<template>
  <v-app id="inspire">
    <navbarout></navbarout>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login Form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right></v-tooltip>
              </v-toolbar>
              <v-form @submit.prevent="loginNow">
                <v-card-text>
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions id="loginButton" class="justify-center">
                  <v-btn type="submit" color="primary" class="mb-10">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navbarout from "../components/navbarout";
import axios from "../config/axios";
import Swal from "sweetalert2";
export default {
  components: {
    navbarout
  },
  data() {
    return {
      password: "",
      email: ""
    };
  },
  methods: {
    loginNow() {
      Swal.fire({
        title: "Loggin in...",
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      axios({
        method: "POST",
        url: "/user/signin",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          Swal.close();
          Swal.fire("Success!", "Your are logged in!", "success");
          localStorage.setItem("access_token", data.token);
          this.$router.push("/overflow/all").catch(() => {});
          this.clear();
        })
        .catch(error => {
          let message =
            (error.response.data && error.response.data.message) ||
            "Failed to Login";
          Swal.fire("Error!", message, "error");
          this.clear();
        });
    },
    clear() {
      password = "";
      email = "";
    }
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
#inspire {
  background-image: url("https://i.pinimg.com/originals/77/84/ba/7784baa4303bd0103e243fa9428b81bb.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
