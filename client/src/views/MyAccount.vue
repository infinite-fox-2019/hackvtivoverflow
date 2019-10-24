<template>
  <div class="main-page w-1/5 sm:w-1/3 md:w-3/4 p-4 my-2 mr-64">
  <div class="flex justify-between items-center shadow-lg p-6 m-4 bg-white" v-for="question in questions" :key="question._id">
    <div class="flex justify-between w-1/6">
      <div class="flex-column">
        <b>{{ question.upVotes.length - question.downVotes.length }}</b>
        <p>votes</p>
      </div>
      <div class="flex-column">
        <b>{{ question.answers.length}}</b>
        <p>answers</p>
      </div>
    </div>
    <div class=" w-3/6 flex-column items-start ml-10">
      <div class=" flex justify-start">
        <h3 class="cursor-pointer hover:text-green-700 text-lg font-bold" @click.prevent="goToDetail(question._id)">{{question.title}}</h3>
      </div>
      <div class="flex flex-wrap" >
        <a class="px-1 bg-green-300 mx-1 rounded text-sm cursor-pointer my-1" v-for="(tag, index) in question.tags" :key="index" @click.prevent="searchByTag(tag)">{{ tag }}</a>
      </div>
    </div>
    <div class="2/6">
      <div>
        <small>{{new Date(question.createdAt).toDateString()}}</small>
      </div>
        <small class="text-xs">by: {{question.userId.name}}</small>
    </div>
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
    },
    searchByTag (keyword) {
      this.$store.commit('UPDATE_KEYWORD', { keyword })
      this.$router.push('/')
    }
  }
}
</script>

<style>
.main-page {
  margin-left: 25%;
}
</style>
