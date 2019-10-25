<template>
  <div class="container mt-5 asking">
      <form @submit.prevent="postQuestion()">
          <div class="form-group">
              <label for="title" style="text-align:left !important; margin:0;">Title</label>
          <small class="form-text text-muted">Imagine you’re asking a question to another developer.</small>
          <input v-model="title" type="text" placeholder="e.g “Is there an R function for finding the index of an element in a vector?” " class="form-control">
          </div>
          <div class="form-group">
            <quill v-model="content" :config="config" output="html"></quill>
          </div>
          <button type="submit" class="btn-color" style="color:#fff; padding:5px 10px;">Submit</button>
      </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from 'axios'
import Swal from 'sweetalert2'
Vue.use(VueQuill)
export default {
  name: 'Ask',
  data () {
    return {
      title: '',
      content: '',
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'] // remove formatting button
          ]
        },
        placeholder: 'Description here'
      }
    }
  },
  methods: {
    postQuestion () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/question',
        headers: { token: localStorage.getItem('token') },
        data: { title: this.title, description: this.content }
      })
        .then(({ data }) => {
          this.title = ''
          this.content = ''
          this.$router.push('/questions')
        })
        .catch(err => {
          Swal.fire('error', err, 'error')
        })
    }
  }
}
</script>

<style>
.asking {
    padding-top: 100px;
    height: 80vh;
}
.btn-color {
    background-color: #f48024 !important;
    border: none !important;
}
</style>
