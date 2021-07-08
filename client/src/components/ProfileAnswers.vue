<template>
  <div>
    <strong class="has-text-info">Answers</strong>
    <div v-for="answer in profileAnswers" :key="answer._id">
      <div class="columns">
        <div class="column">
          {{ answer.title }}
        </div>
        <div class="column">
          <button @click="$router.push(`/users/update/answer/${answer._id}`)" class="button is-info">Update</button>
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
  name: 'ProfileAnswers',
  computed: {
    ...mapState(['profileAnswers'])
  },
  methods: {
    fetchProfileAnswers () {
      this.$store.dispatch('fetchProfileAnswers')
    },
    deleteAnswer (id) {
      axios.delete(`/answers/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.fetchProfileAnswers()
          this.$store.dispatch('fetchAnswers')
          this.$router.push('/users')
        })
        .catch(alert)
    }
  },
  created () {
    this.fetchProfileAnswers()
  }
}
</script>

<style scoped>
.column {
  text-align: left;
  margin: 10px;
}
</style>
