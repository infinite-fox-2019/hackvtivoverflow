<template>
  <div id="app">
    <Nav />
    <vue-progress-bar></vue-progress-bar>
    <div class="fluid-container bg-light">
      <b-row class='mainn'>
        <b-col cols="3" class ='left' >
          <Left />
        </b-col>
        <b-col cols="9" class='right'>
          <router-view />
        </b-col>
      </b-row>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from './components/Nav';
import Left from './components/leftBar';
import Footer from './components/Footer';
import { mapState } from 'vuex'

export default {
  components: {
    Nav,
    Left,
    Footer
  },
  methods: {
  },
  computed: {
    ...mapState([
      'islogin',
      'user'
    ])
  },
  created () {
    this.$store.dispatch('checklogin')
    this.$awn.asyncBlock(
      this.$store.dispatch('fetchData'),
      'Fetching Success',
      'Fetching Failed',
      'Fetching Question'
    )
    this.$store.dispatch('fetchTags')
  }
}
</script>

<style>
.mainn{
  margin-top: 20px;
  height: 1000px;
}
.left{
  height: 100%;
}
.right{
  height:100%;
  padding: 1px;
  overflow: auto
}
</style>
