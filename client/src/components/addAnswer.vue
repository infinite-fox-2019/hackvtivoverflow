<template>
    <div>
        <div class="addAnswer">
            <h4>Add Answer :</h4>
            <quill v-model="content" output="html" :config="config" style="height: 200px;"></quill>
        </div>
        <div class="flex center">
            <button class="btn btn-primary" @click="addAnswer">Add Answer</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
import Swal from 'sweetalert2'

Vue.use(VueQuill)
export default {
  name: 'answer',
  data () {
    return {
      content: '',
      config: {
        placeholder: 'Description Here ...',
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
        }
      }
    }
  },
  methods: {
    addAnswer () {
      this.$store.dispatch('addAnswer', { description: this.content })
        .then(data => {
          return this.$store.dispatch('updateQuestionAnswer', data._id)
        })
        .then(data => {
          return this.$store.dispatch('getAnswer', this.$route.params.id)
        })
        .then(data => {
          this.content = ''
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: `Success Add Answer`,
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: JSON.parse(err.response.request.response).message[0]
          })
        })
    }
  },
  created () {
    this.$store.dispatch('getAnswer', this.$route.params.id)
      .then(data => {

      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: JSON.parse(err.response.request.response).message[0]
        })
      })
  }
}
</script>

<style>
    .addAnswer {
        margin: 4% 0;
    }
</style>
