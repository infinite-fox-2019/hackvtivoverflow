<template>
  <div class="main-page w-1/5 sm:w-1/3 md:w-3/4 p-4 my-2 mr-64">
  <div class="flex justify-between shadow p-4 m-4 bg-white" v-for="question in questions" :key="question._id">
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
    <div class="flex justify-between w-3/4">
      <div class="w-full">
        <h3 class="cursor-pointer hover:text-blue-600" @click.prevent="goToDetail(question._id)">{{question.title}}</h3>
      </div>
      <div class="w-full">
        <small>asked on {{new Date(question.createdAt).toDateString()}}</small>
      </div>
    </div>
        <small class="text-xs">by: {{question.userId.name}}</small>
        <div class="flex-column">
          <button class="p-1 text-xs text-blue-400 hover:text-blue-800" @click.prevent="goToEdit(question._id)">Edit</button>
          <button class=" p-1 text-xs  text-red-400 hover:text-red-800" @click.prevent="remove(question._id)">Delete</button>
        </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
    this.$store.dispatch('getMyQuestions')
  },
  computed: {
    ...mapState(['questions', 'answers'])
  },
  methods: {
    goToDetail (id) {
      this.$router.push(`/question/${id}`)
    },
    goToEdit (questionId) {
      this.$router.push(`/edit/${questionId}`)
    },
    remove (id) {
      this.$store.dispatch('deleteQuestion', { questionId: id })
    }
  }
}
</script>

<style>
.main-page {
  margin-left: 25%;
}
</style>
