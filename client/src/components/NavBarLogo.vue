<template>
  <b-navbar-brand @click.prevent="toPage('/')" style="cursor:pointer">
    <img src="https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1482132470/vfmmn0twb17nn2epblee.png" class="d-inline-block align-top" alt="Kitten" style="width: 30px">
    HacktivOverflow
  </b-navbar-brand>
</template>

<script>
export default {
  methods: {
    toPage (destination) {
      this.$router.push(destination)
    }
  }
}
</script>

<style>

</style>
