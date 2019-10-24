<template>
  <div class="container mt-5 asking">
      <form @submit.prevent="updateQuestion()">
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
import { mapState } from 'vuex'
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from 'axios'
import Swal from 'sweetalert2'
Vue.use(VueQuill)
export default {
  name: 'Update',
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
    updateQuestion () {
      let payload = {
        _id: this.$route.params.id,
        title: this.title,
        description : this.content
      }
      console.log(payload,'ini payloaddd');
      
      this.$store.dispatch('updateQue',payload)
      this.$router.push('/myquestion')
    }
  },
  computed: {
    ...mapState(['detailQuestion'])
  },
  created() {
    this.title = this.detailQuestion.title
    this.content = this.detailQuestion.description
    console.log(this.title,'ini title');
    
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
