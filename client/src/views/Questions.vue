<template>
  <div class="questions">
    <div class="header">
      <div>
        <h1>All Questions</h1>
      </div>
      <div>
        <router-link to="/questions/ask"><button class="button is-info">Ask Question</button></router-link>
      </div>
    </div>
    <hr>
    <Question v-for="question in questions" :key="question._id" :question="question">
    </Question>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Question from '../components/Question'

export default {
  name: 'Questions',
  components: {
    Question
  },
  computed: {
    ...mapState(['questions'])
  },
  created () {
    if (this.questions.length === 0) {
      console.log('masuk fetch created')
      this.$store.dispatch('fetchQuestions')
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 28px;
}
.header {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}
</style>
