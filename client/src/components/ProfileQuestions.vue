<template>
  <div>
    <strong class="has-text-info">Questions</strong>
    <div v-for="question in profileQuestions" :key="question._id">
      <div class="columns">
        <div class="column">
          {{ question.title }}
        </div>
        <div class="column">
          <button @click="$router.push(`/users/update/question/${question._id}`)" class="button is-info">Update</button>
          <button @click="deleteQuestion(question._id)" class="button" style="margin-left: 10px;">Delete</button>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../helpers/axios'
import alert from '../helpers/alert'

export default {
  name: 'ProfileQuestions',
  computed: {
    ...mapState(['profileQuestions'])
  },
  methods: {
    fetchProfileQuestions () {
      this.$store.dispatch('fetchProfileQuestions')
    },
    deleteQuestion (id) {
      axios.delete(`/questions/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.fetchProfileQuestions()
          this.$store.dispatch('fetchQuestions')
          this.$router.push('/users')
        })
        .catch(alert)
    }
  },
  created () {
    this.fetchProfileQuestions()
  }
}
</script>

<style scoped>
.column {
  text-align: left;
  margin: 10px;
}
</style>
