<template>
  <div class="question-form">
      <div>Ask a public question</div>
      <div class="question-form-body">
        <div class="question-form-main-card">
            <label class="main-label">Title</label>
            <label>Be specific and imagine you're asking a question to another person</label>
            <input type="text" v-model="title"/>
            <label class="main-label">Body</label>
            <label>Include all the information someone would need to answer your question</label>
            <wysiwyg v-model="myHTML" />
            <label class="main-label">Tags</label>
            <label>Add up to 5 tags to describe what your quesiton is about</label>
            <input type="text" v-model="tags" placeholder="e.g (string ajax swift)"/>
            <button @click="addQuestionLocal">Ask your question</button>
        </div>
        <div class="question-form-instructions-card">
            <div>Step 1: Draft your question</div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: function () {
    return {
      myHTML: '',
      title: '',
      tags: ''
    }
  },
  methods: {
    addQuestionLocal: function () {
      const payload = {
        title: this.title,
        description: this.myHTML,
        tags: this.tags
      }
      this.addQuestion(payload)
    },
    ...mapActions(['addQuestion'])
  }
}
</script>

<style>
.question-form {
    display: flex;
    width: 80vw;
    flex-direction: column;
}

.question-form-body {
    display: flex;
    flex-wrap: wrap;
}

.question-form-main-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    margin: 2%;
    padding: 2%;
    width: 55%
}

.question-form-main-card input {
    width: 100%
}

.question-form-instructions-card {
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 2%;
    width: 30%;
}

.main-label {
    font-weight: bold
}
</style>
