<template>
  <div>
    <NavBar class="" style="width: 100%;">
        <template v-slot:home>
        <router-link to="/" class="btn btn-primary">Home</router-link>
        </template>
        <template v-slot:question>
        <router-link to="/question" class="btn btn-primary">My Questions</router-link>
        </template>
        <template v-slot:signout>
        <a href="#" class="btn btn-primary" @click.prevent="signOut" id="btn-left">SignOut</a>
        </template>
    </NavBar>
    <br>
    <div class="container d-flex">
        <div class="col">
        <List class="card" id="questionList">
        <template v-slot:totalVotes>
            <div class="col sm-1 ml-1">
            <a class="" @click.prevent="upVotes(question._id)">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://image.flaticon.com/icons/svg/25/25649.svg' alt="symbol" height="40" width="40"/>
              </svg>
            </a>
            </div>
        </template>
        <template v-slot:totalAnswers>
            <div class="col sm-1 ml-1">
            <h4>{{ question.hasil.length }}</h4>
            <h6>Answers</h6>
            </div>
            <div class="col sm-1 ml-1">
            <h4>{{ question.upVotes.length - question.downVotes.length }}</h4>
            <h6>Votes</h6>
            </div>
        </template>
        <template v-slot:totalViews>
            <div class="col sm-1 ml-1">
            <a @click.prevent="downVotes(question._id)">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://image.flaticon.com/icons/svg/25/25623.svg' alt="symbol" height="40" width="40"/>
              </svg>
            </a>
            </div>
        </template>
        <template v-slot:questionList>
            <div class="col-6">
              <h1>{{ question.title }}</h1>
              <div class="row" style="align-items:center">
              <a @click.prevent="showUpdate(question._id)">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://www.flaticon.com/premium-icon/icons/svg/46/46395.svg' alt="symbol" height="40" width="40"/>
              </svg>
              </a>
              <a @click.prevent="deleteQuestion(question._id)">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://image.flaticon.com/icons/png/512/61/61848.png' alt="symbol" height="40" width="40"/>
              </svg>
              </a>
              </div>
              <p v-html="question.description"></p>
              <h4>Asked by: {{ question.UserId.name }}</h4>
            </div>
            <div v-if="showUpdateForm">
              <h1>Update Question</h1>
            <button type="button" class="close" @click.prevent="closeFormUpdate">&times;</button>
            <form @submit.prevent="updateQuestion" >
                <label>Title</label>
                <br>
                <input type="text" v-model="temp.title" placeholder="Input your title answer">
                <br>
                <ckeditor :editor="editor" v-model="temp.description" style="heigth: 100%; width: 100%;"></ckeditor>
                <input type="submit" class="btn btn-primary" value="Submit">
              </form>
            </div>
        </template>
        <template v-slot:answerList>
          <div v-for="(item, index) in question.hasil" v-bind:key="index">
            <div class="col">
              <h1>{{ item.title }}</h1>
              <div class="" style="align-items:center">
                <a @click.prevent="showUpdateAnswer(item._id, index)">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://www.flaticon.com/premium-icon/icons/svg/46/46395.svg' alt="symbol" height="40" width="40"/>
              </svg>
              </a>
              <a @click.prevent="deleteAnswer(item._id)">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://image.flaticon.com/icons/png/512/61/61848.png' alt="symbol" height="40" width="40"/>
              </svg>
              </a>
              <br>
              <a class="" @click.prevent="upVotesAnswer(item._id)">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://image.flaticon.com/icons/svg/25/25649.svg' alt="symbol" height="40" width="40"/>
              </svg>
              </a>
              <div class="col sm-1 ml-1">
                <h4>{{ item.upVotes.length - item.downVotes.length }}</h4>
                <h6>Votes</h6>
              </div>
              <a @click.prevent="downVotesAnswer(item._id)">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://image.flaticon.com/icons/svg/25/25623.svg' alt="symbol" height="40" width="40"/>
              </svg>
              </a>
              </div>
              <p v-html="item.description"></p>
              <h4>Answered by: {{ item.UserId.name }}</h4>
            </div>
          </div>
          <div v-if="showUpdateAnswerForm">
              <h1>Update Answer</h1>
            <button type="button" class="close" @click.prevent="closeFormUpdateAnswer">&times;</button>
            <form @submit.prevent="updateAnswer" >
                <label>Title</label>
                <br>
                <input type="text" v-model="answer.title" placeholder="Input your title answer">
                <br>
                <ckeditor :editor="editor" v-model="answer.description" style="heigth: 100%; width: 100%;"></ckeditor>
                <input type="submit" class="btn btn-primary" value="Submit">
              </form>
            </div>
        </template>
        </List>

        <form @submit.prevent="createAnswer(question._id)">
          <label>Title</label>
          <br>
          <input type="text" v-model="title" placeholder="Input your title answer">
          <br>
          <ckeditor :editor="editor" v-model="editorData" style="heigth: 400px"></ckeditor>
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import List from '../components/List'
import router from '../router.js'
import { mapState } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  name: 'detailquestion',
  components: {
    NavBar,
    List
  },
  data: () => {
    return {
      _id: '',
      title: '',
      tags: '',
      description: '',
      showFormQuestion: false,
      showUpdateForm: false,
      showUpdateAnswerForm: false,
      editor: ClassicEditor,
      editorData: '',
      answer: {
        title: '',
        description: '',
        _id: ''
      },
      temp: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    downVotesAnswer (id) {
      let temp = localStorage.getItem('_id')
      let payload = {
        UserId: temp,
        _id: id
      }
      this.$store.dispatch('downVotesAnswer', payload)
    },
    upVotesAnswer (id) {
      let temp = localStorage.getItem('_id')
      let payload = {
        UserId: temp,
        _id: id
      }
      this.$store.dispatch('upVotesAnswer', payload)
    },
    deleteAnswer (id) {
      this.$store.dispatch('deleteAnswer', id)
    },
    updateAnswer () {
      let payload = {
        _id: this.answer._id,
        title: this.answer.title,
        description: this.answer.description
      }
      this.$store.dispatch('updateAnswer', payload)
    },
    closeFormUpdateAnswer () {
      this.showUpdateAnswerForm = false
    },
    showUpdateAnswer (number, index) {
      this.answer._id = number
      this.answer.title = this.question.hasil[index].title
      this.answer.description = this.question.hasil[index].description
      this.showUpdateAnswerForm = true
    },
    closeFormUpdate () {
      this.showUpdateForm = false
    },
    updateQuestion () {
      let payload = {
        _id: this._id,
        title: this.temp.title,
        description: this.temp.description
      }
      this.$store.dispatch('updateQuestion', payload)
    },
    showUpdate (number) {
      this._id = number
      this.temp.title = this.question.title
      this.temp.description = this.question.description
      this.showUpdateForm = true
    },
    deleteQuestion (number) {
      this.$store.dispatch('deleteQuestion', number)
    },
    createAnswer (number) {
      let payload = {
        description: this.editorData,
        title: this.title,
        QuestionId: number
      }
      this.$store.dispatch('createAnswer', payload)
      this.editorData = ''
      this.title = ''
    },
    downVotes (number) {
      let temp = localStorage.getItem('_id')
      let payload = {
        UserId: temp,
        _id: number
      }
      this.$store.dispatch('downVotesQuestion', payload)
    },
    upVotes (number) {
      let temp = localStorage.getItem('_id')
      let payload = {
        UserId: temp,
        _id: number
      }
      this.$store.dispatch('upVotesQuestion', payload)
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
    this.$store.dispatch('questionDetail', this.$route.params.id)
  }
}
</script>

<style>
.card {
  padding: 10px;
  margin: 10px;
}
#btn-left {
  margin-right: 40px;
}
</style>
