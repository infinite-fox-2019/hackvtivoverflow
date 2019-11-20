<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
        <q-input outlined v-model="username" type="email" label="username" />
      <q-input outlined v-model="email" type="email" label="email" />
      <q-input outlined v-model="password" label="password" type="password"/>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      username : "",
    };
  },
  watch : {
      email : function(){
          this.$emit('chemail' , this.email)
      },
      password : function(){
          this.$emit('chpass' , this.password)
      },
      username : function(){
          this.$emit('chusername' , this.username)
      }
  }
};
</script>

<style>
</style>