<template>
  <div id="app">
    <Nav />
    <div class="container bg-light">
      <b-row class='mainn'>
        <b-col cols="3" class ='left' >
          <Left />
        </b-col>
        <b-col cols="9" class='right'>
          <router-view />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav';
import Left from './components/leftBar';

export default {
  components: {
    Nav,
    Left
  },
  methods: {
  },
  created () {
    this.$store.dispatch('checklogin')
  }
}
</script>

<style>
.mainn{
  margin-top: 20px;
}
.left{
  height: 150px;
}
.right{
  height:100%;
  padding: 10px;
}
</style>
