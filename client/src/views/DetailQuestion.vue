<template>
  <div>
    <NavBar>
        <template v-slot:home>
        <router-link to="/" class="btn btn-primary">Home</router-link>
        </template>
        <template v-slot:question>
        <router-link to="/question" class="btn btn-primary">My Questions</router-link>
        </template>
        <template v-slot:answer>
        <router-link to="/answer" class="btn btn-primary">My Answers</router-link>
        </template>
        <template v-slot:signout>
        <a href="#" class="btn btn-primary" @click.prevent="signOut">SignOut</a>
        </template>
    </NavBar>
    <div class="container d-flex">
        <div class="row">
        <List v-for="(item, index) in listQuestion" :key="index" class="card" id="questionList">
        <template v-slot:totalVotes>
            <div class="col sm-1 ml-1">
            <h4>0</h4>
            <h6>Votes</h6>
            </div>
        </template>
        <template v-slot:totalAnswers>
            <div class="col sm-1 ml-1">
            <h4>0</h4>
            <h6>Answers</h6>
            </div>
        </template>
        <template v-slot:totalViews>
            <div class="col sm-1 ml-1">
            <h4>0</h4>
            <h6>Views</h6>
            </div>
        </template>
        <template v-slot:questionList>
            <div class="col-6">
            <a href='#' @click.prevent="questionDetail(item.id)">{{ item.title }}</a>
            <p v-if="item.description.length >= 30">{{ item.description.substring(0, 30) + '...' }}</p>
            <p v-else>{{ item.description }}</p>
            </div>
        </template>
        </List>
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import List from '../components/List'
import router from '../router.js'
import { mapState } from 'vuex'
export default {
  name: 'question',
  components: {
    NavBar,
    List
  },
  data: () => {
    return {
      title: '',
      tags: '',
      description: '',
      showFormQuestion: false
    }
  },
  methods: {
    signOut () {
      localStorage.clear()
      router.push('/')
    },
    showQuestion () {
      this.showFormQuestion = true
    },
    closeFormQuestion () {
      this.showFormQuestion = false
    },
    createQuestion () {
      let payload = {
        title: this.title,
        tags: this.tags,
        description: this.description
      }
      this.$store.dispatch('createQuestion', payload)
      this.showFormQuestion = false
      this.title = ''
      this.tags = ''
      this.description = ''
    },
    questionDetail (id) {
      this.$store.dispatch('questionDetail', id)
    }
  },
  computed: {
    ...mapState(['listQuestion'])
  },
  created () {
    this.$store.dispatch('setListQuestion')
  }
}
</script>

<style>

</style>
