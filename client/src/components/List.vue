<template>
<div>
  <div class="flex justify-between items-center shadow-lg p-6 m-4 bg-white" v-for="question in questions" :key="question._id">
    <div class="flex justify-between w-1/5">
      <div class="flex-column">
        <b>{{ question.upVotes.length - question.downVotes.length }}</b>
        <p>votes</p>
      </div>
      <div class="flex-column">
        <b>{{ question.answers.length}}</b>
        <p>answers</p>
      </div>
    </div>
    <div class=" w-2/5 flex-column items-start ml-10">
      <div class=" flex justify-start">
        <h3 class="cursor-pointer hover:text-green-700 text-lg font-bold" @click.prevent="goToDetail(question._id)">{{question.title}}</h3>
      </div>
      <div class="flex flex-wrap" >
        <a class="px-1 bg-green-300 mx-1 rounded text-sm cursor-pointer my-1" v-for="(tag, index) in question.tags" :key="index" @click.prevent="searchByTag(tag)">{{ tag }}</a>
      </div>
    </div>
    <div class="w-2/5">
      <div >
        <small>{{new Date(question.createdAt).toDateString()}}</small>
      </div>
        <small class="text-xs">by: {{question.userId.name}}</small>
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
      this.$router.push(`/question/${id}`)
    }
  }
}
</script>

<style>
</style>
