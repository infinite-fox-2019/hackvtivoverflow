<template>
<div class="main-page w-1/4 sm:w-1/3 md:w-full p-2 my-2">
  <div class="flex justify-between shadow p-4 m-4 bg-white" v-for="question in questions" :key="question._id">
    <div class="flex justify-between w-1/4">
      <div class="flex-column">
        <b>{{ question.upVotes.length - question.downVotes.length }}</b>
        <p>votes</p>
      </div>
      <div class="flex-column">
        <b>{{ question.answers.length}}</b>
        <p>answers</p>
      </div>
    </div>
    <div class="flex justify-between w-2/4">
      <div class="w-full">
        <h3 class="cursor-pointer hover:text-blue-600" @click.prevent="goToDetail(question._id)">{{question.title}}</h3>
      </div>
      <div class="w-full">
        <small>asked on {{new Date(question.createdAt).toDateString()}}</small>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // questions: [{ _id: 'afdlafuodajfajfsa', title: 'Menjemput impian', votes: 40, createdAt: '10/02/2019' }]
    }
  },
  computed: {
    ...mapState(['questions', 'answers'])
  },
  created () {
    this.$store.dispatch('fetchQuestions')
  },
  methods: {
    goToDetail (id) {
      this.$router.push(`${id}`)
    }
  }
}
</script>

<style>
.main-page {
  margin-left: 10%;
  height: 100vh;
}
</style>
