<template>
  <div class="sidebar">
    <button @click.prevent="toHome"  class="btn btn-secondary">Home</button>
    <button @click.prevent="toMyAccount" class="btn btn-info">My Account</button>
    <button class="btn btn-info">Tag</button>
    <button class="btn btn-info">Users</button>
  </div>
</template>

<script>
export default {
  methods: {
    toHome () {
      this.$router.push('/')
    },
    toMyAccount () {
      this.$router.push('/myaccount')
    }
  }

}
</script>

<style>

.sidebar{
    width: 300px;
    height: 450px;
    margin: 15px 5px 0 20px;
    padding: 15px;
    box-shadow: 4px 3px 28px -10px rgba(0, 0, 0, 0.212);
    border-radius: 20px;
}

.sidebar button{
  width: 100%;
  margin: 5px;
}

</style>
