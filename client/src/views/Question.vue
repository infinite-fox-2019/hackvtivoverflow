<template>
  <b-container class="w-75">
    <!-- Question Section -->
    <b-row class="border-left">
      <QuestionSection :data="questionData" @updateResponse="fetchQuestionDetail"/>
    </b-row>

    <!-- Answer Section -->
      <b-row class="border-left mt-3">
        <h4 class="ml-3">Answer</h4>
        <AnswerSection @updateResponse="fetchQuestionDetail" v-for="(dataAnswer,index) in questionData.AnswerId" :key="index" :data="dataAnswer"/>
      </b-row>

    <!-- Your Answer Section -->
    <b-row class=" border-left border-top">
      <b-col class="my-4">
        <h4 class="mb-4">Your Answer</h4>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <b-button @click="addAnswer()" class="mr-2 mb-5 mt-3" size="" variant="success">Submit</b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import QuestionSection from '@/components/QuestionSection.vue'
import AnswerSection from '@/components/AnswerSection.vue'
import axios from '../api/server'

export default {
  components: {
    QuestionSection,
    AnswerSection
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: 'Write your answer here...'
      },
      questionData: {}
    }
  },
  methods: {
    addAnswer () {
      axios({
        method: 'post',
        url: '/answers',
        data: {
          QuestionId: this.$route.params.id,
          description: this.editorData
        },
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<<<<<')
          this.fetchQuestionDetail()
          this.editorData = ''
        })
        .catch(err => { console.log(err.response) })
    },
    fetchQuestionDetail () {
      axios({
        method: 'get',
        url: `/questions/${this.$route.params.id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<<<<<<<<<<')
          this.questionData = data
        })
        .catch(err => { console.log(err.response) })
    }
  },
  created () {
    this.fetchQuestionDetail()
  }
}
</script>

<style scope>
.ck-content { height:200px;}
</style>
