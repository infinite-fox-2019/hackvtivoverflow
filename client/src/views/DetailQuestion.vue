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
        <div class="Ccol">
        <List class="card" id="questionList">
        <template v-slot:totalVotes>
            <div class="col sm-1 ml-1">
            <button type="button" class="btn btn-default" aria-label="Left Align" @click.prevent="downVotes">
              <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
            </button>
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
            <button type="button" class="btn btn-default" aria-label="Left Align" @click.prevent="upVotes">
              <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
            </button>
            </div>
        </template>
        <template v-slot:questionList>
            <div class="col-6">
            <h1>{{ question.title }}</h1>
            <p v-html="question.description"></p>
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
  name: 'detailquestion',
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
    downVotes () {

    },
    upVotes () {

    },
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
    ...mapState(['question'])
  },
  created () {
    this.$store.dispatch('setListQuestion')
  }
}
</script>

<style>

</style>
