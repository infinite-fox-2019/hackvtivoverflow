<template>
  <b-nav-form @submit.prevent="searchPost()">
    <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
  </b-nav-form>
</template>

<script>
export default {
  computed:{
    search:{
      get(){
        return this.$store.state.search
      },
      set(value){
        this.$store.commit('CHANGE_SEARCH', value)
      }
    }
  },
  methods:{
    searchPost(){
      if(!this.$store.state.search){
        this.$store.dispatch('fetchPosts')
      }
      else{
        this.$store.dispatch('searchPost')
      }
    }
  }
}
</script>

<style>

</style>
