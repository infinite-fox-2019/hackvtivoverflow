<template>
  <div class="container-fluid" style="padding-top:20px">
    <div class="row">
      <div class="col-sm-2 border-right">
        <div class="container">
          One of three columns
        </div>
      </div>
      <div class="col-sm-8" style="padding: 0px">
        <div class="container">
          <div class="row" style="padding:10px">
            <div class="col-sm-8 ">
              <h3 v-if="search">{{ search }}</h3>
              <h3 v-else>All Questions</h3>
            </div>
            <div class="col-sm-4 d-flex justify-content-end">
              <button type="button" class="btn btn-primary btn-sm" @click.prevent="askQuestion()">Ask Question</button>
            </div>
          </div>
          <div class="row" style="padding:10px">
            <div class="col-sm-8">
              <div>{{ posts.length }} Questions found</div>
            </div>
          </div>
          <!-- posts -->
          <Posts :post="post" v-for="post in posts" :key="post._id"/>

        </div>
      </div>
      <div class="col-sm-2 border-right">
        <div class="container">
          One of three columns
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from '../components/Posts.vue'
import { mapState } from 'vuex'

export default {
  created () {
    this.$store.dispatch('fetchPosts')
  },
  computed:mapState([
    // map this.count to store.state.count
    'posts',
    'search'
  ]),
  methods:{
    askQuestion(){
      this.$router.push('/post')
    }
  },
  components:{
    Posts
  }
}
</script>

<style scoped>
</style>
