<template>
  <div class="container">

<!-- {{$store.state.oneQuestion}}
  <h1>ini QUEST DETAIL</h1> -->

  <div class="row mt-5">
    <div style="display:block;" class="w-100 h-100 col-md-2 border rounded">
      <div class="flex-column my-2">
        <h6> {{$store.state.oneQuestion.upvotes.length}} </h6>
        <small @click.prevent="upvote" class="btn btn-link" > UpVotes </small>
      </div>
      <div class="flex-column my-2">
        <h6> {{$store.state.oneQuestion.downvote.length}}</h6>
        <small @click.prevent="downvote" class="btn btn-link"> DownVotes </small>
      </div>
    </div>
    <div style="word-wrap; break-word" class="mx-auto w-75 border-bottom border-dark d-flex justify-content-center align-items-start flex-column">

         <h3><strong>{{$store.state.oneQuestion.title}}</strong></h3>
      <small>{{$store.state.oneQuestion.UserId.username}}</small>
      <h5 v-html="$store.state.oneQuestion.description"></h5>
    </div>

    <AnswerContainer
    v-for="answer in $store.state.oneQuestion.questionAnswers" :key="answer._id"
    :answer="answer"
    class="container"
    />

  </div>

  <div class="mt-5 ">
  <div class="mb-5 d-flex justify-content-start border-bottom">
    <h3><strong> Your Answer </strong></h3>
  </div>
  <form class="mb-3" @submit.prevent="giveAnswer">
    <div class="d-flex justify-content-start">
      <label><h4> Title Answer </h4> </label>
    </div>
    <input class="form-control my-3" v-model="answerTitle" type="text" placeholder="Your Answer Title" required autofocus>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
     <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Submit Answers!</button>
  </form>
  </div>

  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AnswerContainer from '../components/AnswerContainer'
export default {
  components: {
    AnswerContainer
  },
  data () {
    return {
      answerTitle: '',
      editor: ClassicEditor,
      editorData: 'Your Answers?',
      editorConfig: {
        // The configuration of the editor.
      }
    }
  },
  methods: {
    giveAnswer () {
      if (this.$store.state.isLogin === false) {
        this.$router.push('/login')
      } else {
        let payload = { id: this.$route.params.id, title: this.answerTitle, description: this.editorData }
        this.$store.dispatch('makeAnswer', payload)
        this.answerTitle = ''
        this.editorData = ''
      }
    },
    upvote () {
      this.$store.dispatch('upvote', this.$route.params.id)
    },
    downvote () {
      this.$store.dispatch('downvote', this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('getDetailQuest', this.$route.params.id)
  }
}
</script>

<style>

</style>
