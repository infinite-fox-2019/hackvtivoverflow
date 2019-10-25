<template>
  <div id="navbar" class="d-flex justify-content-between align-items-center px-3">
      <div @click="toHome" class="logo d-flex">
           <i  class="fab fa-stack-overflow">   N</i>
           <h1>overflow</h1>
      </div>
     <div class="d-flex">
        <div class="searchbar">
          <input v-model="keyword" @change="getQuestions" class="search_input" type="text" name="" placeholder="Search...">
          <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
        </div>
        <button @click.prevent="toMyAccount" class="btn btn-primary mx-1 rounded-pill" style="font-family: 'Baloo Bhai', cursive;">My Account</button>
        <button v-if="!isLogin" @click.prevent="toLogin" class="btn btn-info mx-1 rounded-pill" style="font-family: 'Baloo Bhai', cursive;">login</button>
        <button v-else @click.prevent="logout" class="btn btn-info mx-1 rounded-pill" style="font-family: 'Baloo Bhai', cursive;">logout</button>
     </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar',
  computed: mapState(['isLogin']),
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    getQuestions () {
      let searchTerm = this.keyword
      this.$store.dispatch('getQuestion', searchTerm)
      this.$router.push('/')
    },
    toHome () {
      this.$router.push('/')
    },
    toLogin () {
      this.$router.push('/login')
    },
    logout () {
      this.$store.dispatch('logout')
      this.toLogin()
    },
    toMyAccount () {
      this.$router.push('/myaccount')
    }
  }
}
</script>

<style>

#navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: #f6f6f694;
  box-shadow: -1px 27px 75px -21px rgba(36, 36, 36, 0.363);
}

.logo i{
    padding: 0;
    margin: 0;
    font-size: 25px;

}
.logo h1{
    font-size: 25px;
    color: rgb(47, 47, 47);
    font-family: 'Baloo Bhai', cursive;
    cursor: pointer;
}

 .searchbar{
    margin-bottom: auto;
    margin-top: auto;
    height: 40px;
    background-color: rgb(60, 38, 83);
    border-radius: 30px;
    padding: 10px;
    font-family: 'Baloo Bhai', cursive;
    }

    .search_input{
    color: white;
    border: 0;
    outline: 0;
    background: none;
    width: 0;
    caret-color:transparent;
    line-height: 10px;
    transition: width 0.4s linear;
    }

    .searchbar:hover > .search_input{
    padding: 0 10px;
    width: 300px;
    caret-color:red;
    transition: width 0.4s linear;
    }

    .searchbar:hover > .search_icon{
    background: white;
    color: #e74c3c;
    }

    .search_icon{
    height: 25px;
    width: 25px;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color:white;
    }
</style>
