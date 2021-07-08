<template>
  <div class="signup has-background-light">
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'

export default {
  name: 'Register',
  components: {
    RegisterForm
  }
}
</script>

<style scoped>
.signup {
  height: 100%;
}
</style>
