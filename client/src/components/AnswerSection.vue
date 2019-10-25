<template>
  <div>
    <b-media class="pt-3">
      <p class="mb-2"><small class="text-primary">{{data.UserId.name}}</small></p>
      <template v-slot:aside>
        <b-container>
          <b-row>
            <b-col>
              <b-img @click="upvotes()" width="40" style="cursor:pointer;" src="https://image.flaticon.com/icons/svg/25/25223.svg" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="mb-0 text-center">{{votes}}</h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img @click="downvotes()" style="cursor:pointer;" src="https://image.flaticon.com/icons/svg/25/25623.svg" width="40" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img v-if="data.UserId && data.UserId.name == $store.state.isLoginName" @click="editAnswer()" src="https://image.flaticon.com/icons/svg/1160/1160515.svg" width="20" class="" alt="placeholder" style="cursor:pointer; margin-left:10px; margin-top:10px;"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="m-auto">
              <b-img v-if="data.UserId.name == $store.state.isLoginName" @click="deleteAnswer()" style="cursor:pointer; margin-left:10px; margin-top:10px;" src="https://image.flaticon.com/icons/svg/1632/1632708.svg" width="20" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <div v-if="!show" v-html="data.description"></div>

      <b-col v-if="show" class="ml-0 h-100">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <b-button @click="updateAnswerProcess()" class="mr-2 mb-5 mt-3" size="" variant="success">Edit answer</b-button>
      </b-col>

    </b-media>
  </div>
</template>

<script>
import axios from '../api/server'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'answersection',
  props: [
    'data'
  ],
  created () {
    console.log(this.data, 'ini data di answer')
    this.votes = this.data.upvotes.length - this.data.downvotes.length
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: this.data.description,
      editorConfig: {

      },
      votes: 0,
      show: false
    }
  },
  methods: {
    updateAnswerProcess () {
      axios({
        method: 'put',
        url: `/answers/${this.data._id}`,
        data: {
          description: this.editorData
        },
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$emit('updateResponse')
          this.show = false
        })
        .catch(err => { console.log(err.response) })
    },
    editAnswer () {
      this.show = !this.show
    },
    upvotes () {
      axios({
        method: 'patch',
        url: `/answers/upvotes/${this.data._id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('up')
          console.log(data)
          this.$store.dispatch('A_FETCH_QUESTION_LIST')
          this.$emit('updateResponse')
        })
        .catch(err => { console.log(err.response) })
    },
    downvotes () {
      axios({
        method: 'patch',
        url: `/answers/downvotes/${this.data._id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }

      })
        .then(({ data }) => {
          console.log('down')
          console.log(data)
          this.$store.dispatch('A_FETCH_QUESTION_LIST')
          this.$emit('updateResponse')
        })
        .catch(err => { console.log(err.response) })
    },
    deleteAnswer () {
      axios({
        method: 'delete',
        url: `/answers/${this.data._id}/${this.data.QuestionId}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$emit('updateResponse')
        })
        .catch(err => { console.log(err.response) })
    }
  },
  watch: {
    data () {
      this.votes = this.data.upvotes.length - this.data.downvotes.length
    }
  }
}
</script>

<style>

</style>
