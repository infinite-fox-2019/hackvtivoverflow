<template>
  <div class="login has-background-light">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>

<style scoped>
.login {
  height: 100%;
}
</style>
