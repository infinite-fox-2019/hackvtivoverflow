<template>
  <div id="form" class="q-pa-md">
    <q-form @submit.prevent="onSubmit" style=" width: 60vw; margin: 10vh 20vw; padding: 5%;" class="q-gutter-md shadow-2">
      <q-input
        rounded
        outlined
        v-model="email"
        color="orange"
        label="Your email *"
        hint="This Is Only For Us To Send Updates"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        rounded
        outlined
        type="password"
        v-model="password"
        color="orange"
        label="Your password *"
        hint="We Won't Share Your Password With Anyone"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <div>
        <q-btn label="Submit" type="submit" glossy color="orange" />
        <q-btn
          label="Register"
          @click="toggleRegister"
          color="orange"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      email: null,
      password: null
    };
  },

  methods: {
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", user)
        .then(({ data }) => {
          this.$store.commit("LOGIN", data);
          this.$router.push("/");
        })
        .catch(({ response }) => {
          const { msg } = response.data;
          Swal.fire("Oops!", msg, "error");
        });
    },
    toggleRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
form {
  margin-left: 35vw;
  width: 30vw;
}
</style>
