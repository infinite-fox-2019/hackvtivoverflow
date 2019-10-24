<template>
<div class="container">
  <div class="main-page p-2 my-2">
    <div class="flex my-2 border border-gray-400 shadow bg-red-100">
      <div class="flex flex-wrap items-center border border-gray-400 bg-blue-200">
        <span class="m-2 w-full"><a href=""><i class="fas fa-caret-up text-4xl" @click.prevent="qUpVote"></i></a></span>
        <span class="m-2 w-full"><a href="">{{ question.upVotes.length - question.downVotes.length }}</a></span>
        <span class="m-2 w-full"><a href=""><i class="fas fa-caret-down text-4xl" @click.prevent="qDownVote"></i></a></span>
      </div>
      <div class="flex flex-wrap w-full">
        <div class="p-4 w-full text-lg">
          <h1><b>{{ question.title }}</b></h1>
        </div >
          <small class="px-4 italic">asked: {{ new Date(question.createdAt).toDateString() }} by : {{ question.userId.name }}</small>
          <hr>
        <div class="p-4 flex flex-wrap w-full" style="text-align:left;">
          <p v-html="question.description"></p>
        </div>
        <div>
          <div class="flex flex-wrap" >
            <a class="px-1 bg-green-300 mx-1 rounded cursor-pointer my-1" v-for="(tag, index) in question.tags" :key="index" @click.prevent="searchByTag(tag)">{{ tag }}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- ANSWERS -->
    <div class="flex my-4 border border-gray-400 shadow bg-blue-100 "  v-for="answer in answers" :key="answer._id">
      <div class="flex-column justify-start border border-gray-100 bg-yellow-200">
        <span class="m-2 w-full"><a href=""><i class="fas fa-caret-up text-4xl" @click.prevent="aUpVote(answer._id)"></i></a></span>
        <span class="m-2 w-full"><a href="">{{ answer.upVotes.length - answer.downVotes.length }}</a></span>
        <span class="m-2 w-full"><a href=""><i class="fas fa-caret-down text-4xl" @click.prevent="aDownVote(answer._id)"></i></a></span>
      </div>
      <div class="flex justify-start flex-wrap w-full p-2">
      <div class="w-4/5 content-area overflow-scroll" style="text-align:left;" v-html="answer.description"></div>
      <p class="italic text-xs w-full" style="text-align:left;">posted: {{ new Date(answer.createdAt).toDateString() }} by {{ answer.userId.name }}</p>
      <a href="#" class="italic text-blue-400 hover:text-blue-800" @click.prevent="editAnswer(answer._id)">edit</a>    </div>
      </div>
    <div class="m-4">
      <div>Post your answer here</div>
      <quill-editor v-model="description"
          ref="myQuillEditor"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
      <div>
        <button class="bg-blue-400 hover:bg-blue-700 text-white hover:text-gray-800 rounded p-2 m-2 align-left" @click.prevent="postAnswer">Post your Answer</button>
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
      description: ''
    }
  },
  created () {
    this.$store.dispatch('getQuestionById', { id: this.$route.params.id })
    this.$store.dispatch('fetchAnswers', { questionId: this.$route.params.id })
  },
  computed: {
    ...mapState(['question', 'answers'])
  },
  methods: {
    editAnswer (answerId) {
      this.$store.dispatch('getAnswer', { id: answerId })
    },
    qUpVote () {
      this.$store.dispatch('qUpVote', { questionId: this.$route.params.id })
    },
    qDownVote () {
      this.$store.dispatch('qDownVote', { questionId: this.$route.params.id })
    },
    aUpVote (answerId) {
      this.$store.dispatch('aUpVote', { answerId, questionId: this.$route.params.id })
    },
    aDownVote (answerId) {
      this.$store.dispatch('aDownVote', { answerId, questionId: this.$route.params.id })
    },
    postAnswer () {
      this.$store.dispatch('addAnswer', { description: this.description, questionId: this.$route.params.id })
      this.description = ''
    },
    searchByTag (keyword) {
      this.$store.commit('UPDATE_KEYWORD', { keyword })
      this.$router.push('/')
    }
  }
}
</script>

<style>

  .content-area::-webkit-scrollbar { width: 0 !important }
  .content-area { overflow: -moz-scrollbars-none; }
  .content-area { -ms-overflow-style: none; }
</style>
