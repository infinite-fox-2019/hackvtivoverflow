<template>
    <div class="container my-5">

        <h1 class="text-center">{{ question.title }}</h1>
        <div class="answer-ask d-flex">
            <p v-html="question.description"></p>
            <div class="answer-vote d-flex flex-column justify-content-center align-items-center mr-3">
                      <i @click.prevent="upVoteQuestion(question._id)" class="fas fa-caret-up text-success"></i>
                          <p class="mt-2">{{ getNumVoteQuestion(question) }}</p>
                      <i @click.prevent="downVoteQuestion(question._id)" class="fas fa-caret-down text-danger"></i>
            </div>
        </div>

          <div class="mt-5" id="quill">
            <h3>Your Answer:</h3>
            <input v-model="answer.title" class="answer-title" type="text" placeholder="Enter title">
             <quill-editor v-model="answer.description"
                ref="myQuillEditor"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
            </quill-editor>
            <div v-if="isEdit">
                <button  @click.prevent="updateAnswer" class="btn btn-success mt-3 mx-1">Update Answer</button>
                <button  @click.prevent="cancelUpdate" class="btn btn-danger mt-3 mx-1">Cancel</button>
            </div>
            <button v-else @click.prevent="createAnswer" class="btn btn-primary mt-3">Post Your Answer</button>
        </div>

        <div v-if="answers.length">
            <!-- TEMPLATE -->
            <div v-for="answer in answers"  :key="answer._id" class="answers d-flex align-items-center">

                <div class="answer-vote d-flex flex-column justify-content-center align-items-center">
                    <i @click.prevent="upVote(answer._id)" class="fas fa-caret-up"></i>
                        <p class="mt-2">{{getNumVote(answer)}}</p>
                    <i @click.prevent="downVote(answer._id)" class="fas fa-caret-down"></i>
                </div>

                <div class="answer-content">
                    <div class="des">
                        <h3 class="text-center" v-html="answer .title"></h3>
                        <p v-html="answer.description"></p>
                    </div>
                    <div  class="author">
                        <p class="text-right">{{ answer.userId.email + ' | '+  dateFormat(answer.createdAt)}} | <a v-if="answer.userId._id == userId" href="#quill" @click.prevent="findOneAnswer(answer._id)">edit</a></p>
                    </div>
                </div>
            </div>
            <!-- TEMPLATE -->
        </div>
        <div v-else>
            <h1 class="text-center mt-5">no answer yet.. be the first one</h1>
            <img src="../../public/empty.svg" style="height: 300px;">
        </div>

    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'answer',
  data () {
    return {
      answer: {
        title: '',
        description: '',
        id: ''
      },
    }
  },
  methods: {
    getNumVote (answer) {
      return answer.upvotes.length - answer.downvotes.length
    },
    upVote (answerId) {
      let questionId = this.$route.params.id
      this.$store.dispatch('upVoteAnswer', { answerId, questionId })
    },
    downVote (answerId) {
      let questionId = this.$route.params.id
      this.$store.dispatch('downVoteAnswer', { answerId, questionId })
    },
    getNumVoteQuestion (question) {
      return question.upvotes.length - question.downvotes.length
    },
    upVoteQuestion (questionId) {
      this.$store.dispatch('upVoteQuestion', questionId)
    },
    downVoteQuestion (questionId) {
      this.$store.dispatch('downVoteQuestion', questionId)
    },
    createAnswer () {
      let title = this.answer.title
      let description = this.answer.description
      let questionId = this.$route.params.id
      this.$store.dispatch('createAnswer', { title, description, questionId })
      this.answer.title = ''
      this.answer.description = ''
    },
    deleteAnswer (answerId) {
      let questionId = this.$route.params.id
      this.$store.dispatch('deleteAnswer', { answerId, questionId })
    },
    findOneAnswer (answerId) {
      let questionId = this.$route.params.id
      this.$store.dispatch('edit')
      this.$store.dispatch('findOneAnswer', { answerId, questionId })
    },
    cancelUpdate () {
      this.$store.dispatch('cancelUpdate')
      // this.$store.dispatch('edit')
      this.answer.title = ''
      this.answer.description = ''
      this.answer.id = ''
      
    },
    updateAnswer () {
      let answerId = this.answer.id
      let questionId = this.$route.params.id
      let title = this.answer.title
      let description = this.answer.description
      this.$store.dispatch('updateAnswer', { title, description, answerId, questionId })
      this.answer.title = ''
      this.answer.description = ''
      this.$store.dispatch('edit')
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    dateFormat (date) {
      let event = new Date(date)
      let options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      return event.toLocaleDateString('en-US', options)
    }
  },
  computed:
    mapState(['answers', 'oneAnswer', 'question', 'userId', 'isEdit']),
  created () {
    this.$store.dispatch('getAnswers', this.$route.params.id)
    this.$store.dispatch('getOneQuestion', this.$route.params.id)
  },
  mounted () {
    console.log('this is current quill instance object', this.editor)
  },
  watch: {
    'oneAnswer': function () {
      this.answer.title = this.oneAnswer.title
      this.answer.description = this.oneAnswer.description
      this.answer.id = this.oneAnswer._id
    }
  }
}
</script>

<style>
.answer-ask {
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    padding: 15px;
    border-radius: 15px;
    border-left: 10px solid #9633FF;
    box-shadow: 0px 0px 33px -2px rgba(95, 14, 149, 0.28);
}

.answers {
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    padding: 15px;
    margin-top: 30px;
    border-radius: 15px;
    border-right: 5px solid rgb(107, 109, 236);
    box-shadow: 0px 0px 33px -2px rgba(14, 11, 17, 0.28);
}

.answer-vote {
    height: 100%;
    width: 10%;
}

.answer-vote i {
    font-size: 60px;
    text-align: center;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.643);
    cursor: pointer;
}

.answer-content {
    height: 100%;
    width: 90%;
}

.des {
    height: 85%;
    width: 100%;
}

.author {
    height: 15%;
    width: 100%;
}

.author p {
    font-size: 12px;
}

.author a {
    font-size: 15px;
    background-color: #9633FF;
    padding: 1px 5px;
    color: white;
    border-radius: 15px;
}

.ql-editor{
    min-height: 150px !important;
    border-radius: 30px !important;
}

.answer-title{
    width: 70%;
    margin: 5px 0;
    border-radius: 15px;
    border: none;
    border: 1px solid #9633FF;
    padding: 2px 10px;
    outline: none;
}

</style>
