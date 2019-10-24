<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input outlined v-model="email" type="email" label="email" />
      <q-input outlined v-model="password" label="password" type="password"/>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  watch : {
      email : function(){
          this.$emit('chemail' , this.email)
      },
      password : function(){
          this.$emit('chpass' , this.password)
      }
  }
};
</script>

<style>
</style>