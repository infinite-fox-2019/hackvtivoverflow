<template>
<div>
  <Navbar />
  <section class="container" style="margin-top: 50px;">
    <form @submit.prevent="register">
      <b-field label="Username">
        <b-input type="text" v-model="username"></b-input>
      </b-field>

      <b-field label="Email" type="is-danger" message="This email is invalid">
        <b-input type="email" v-model="email" ></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal></b-input>
      </b-field>
      <button @click.prevent="register" class="button is-primary">register</button>
    </form>
  </section>
</div>
</template>
<script>
import Navbar from '../components/Navbar'
export default {
  name: 'FormRegister',
  components: {
    Navbar
  }
}
</script>
