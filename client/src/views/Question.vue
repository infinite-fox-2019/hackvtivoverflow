<template>
  <div>
    <NavBar>
        <template v-slot:home>
        <router-link to="/" class="btn btn-primary">Home</router-link>
        </template>
        <template v-slot:question>
        <router-link to="/question" class="btn btn-primary">My Questions</router-link>
        </template>
        <template v-slot:answer>
        <router-link to="/answer" class="btn btn-primary">My Answers</router-link>
        </template>
        <template v-slot:signout>
        <a href="#" class="btn btn-primary" @click.prevent="signOut">SignOut</a>
        </template>
    </NavBar>
    <button @click.prevent="showQuestion" class="btn btn-primary">Ask Question !</button>
    <div class="container" style="width: 800px" v-if="showFormQuestion">
      <button type="button" class="close" @click.prevent="closeFormQuestion">&times;</button>
      <form @submit.prevent="createQuestion">
        <label>Title</label>
        <br>
        <input type="text" v-model="title" required placeholder="Input your title of question">
        <br>
        <label>Description</label>
        <br>
        <ckeditor :editor="editor" v-model="editorData"></ckeditor>
        <br>
        <label>Tags</label>
        <br>
        <select v-model="tags">
          <option>Java</option>
          <option>Kotlin</option>
          <option>javaScript</option>
          <option>Vue</option>
          <option>C++</option>
          <option>Swift</option>
          <option>Ruby</option>
          <option>Bootstrap</option>
          <option>Phyton</option>
          <option>C#</option>
          <option>Typescript</option>
        </select>
        <br>
        <input type="submit" class="btn btn-primary" value="Create Question">
      </form>
    </div>
    <div class="container d-flex">
        <div class="row">
        <List v-for="(item, index) in listQuestion" :key="index" class="card" id="questionList">
        <template v-slot:totalVotes>
            <div class="col sm-1 ml-1">
            <h4>0</h4>
            <h6>Votes</h6>
            </div>
        </template>
        <template v-slot:totalAnswers>
            <div class="col sm-1 ml-1">
            <h4>0</h4>
            <h6>Answers</h6>
            </div>
        </template>
        <template v-slot:totalViews>
            <div class="col sm-1 ml-1">
            <h4>0</h4>
            <h6>Views</h6>
            </div>
        </template>
        <template v-slot:questionList>
            <div class="col-6">
            <a href='#' @click.prevent="questionDetail(item._id)">{{ item.title }}</a>
            <p v-html="getDescription(index)"></p>
            </div>
        </template>
        </List>
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
  name: 'question',
  components: {
    NavBar,
    List
  },
  data: () => {
    return {
      title: '',
      tags: '',
      description: '',
      showFormQuestion: false,
      editor: ClassicEditor,
      editorData: ''
    }
  },
  methods: {
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
        description: this.editorData
      }
      this.$store.dispatch('createQuestion', payload)
      this.$store.dispatch('setListQuestion')
      this.showFormQuestion = false
      this.title = ''
      this.tags = ''
      this.description = ''
    },
    questionDetail (id) {
      this.$store.dispatch('questionDetail', id)
    },
    getDescription (index) {
      let arr = this.listQuestion[index]
      if (arr.description.length >= 50) {
        return arr.description.slice(0, 50) + '...'
      } else {
        return arr.description
      }
    }
  },
  computed: {
    ...mapState(['listQuestion'])
  },
  created () {
    this.$store.dispatch('setListQuestion')
  }
}
</script>

<style>

</style>
