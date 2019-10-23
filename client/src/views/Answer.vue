<template>
    <div class="container my-5">
        <h1 class="text-center">{{ answers[0].questionId.title }}</h1>
        <div class="answer-ask">
            <p v-html="answers[0].questionId.description"></p>
        </div>
        <div>
            <!-- TEMPLATE -->
            <div  v-for="answer in answers"  :key="answer._id" class="answers d-flex align-items-center">

                <div class="answer-vote d-flex flex-column justify-content-center align-items-center">
                    <i class="fas fa-caret-up"></i>
                        <p class="mt-2">200</p>
                    <i class="fas fa-caret-down"></i>
                </div>

                <div class="answer-content">
                    <div class="des">
                        <h3 class="text-center" v-html="answer.title"></h3>
                        <p v-html="answer.description"></p>
                    </div>
                    <div class="author">
                        <p class="text-right">{{ answer.userId.email + ' | '+  dateFormat(answer.createdAt)}} <a  @click.prevent="findOneAnswer(answer._id)" href="">edit</a> | <a @click.prevent="deleteAnswer(answer._id)" href="">remove</a></p>
                    </div>
                </div>
            </div>
            <!-- TEMPLATE -->
        </div>
        <div class="mt-5">
            <h3>Your Answer:</h3>
            <input v-model="answer.title" class="answer-title" type="text" placeholder="Enter title">
             <quill-editor v-model="answer.description"
                ref="myQuillEditor"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
            </quill-editor>
            <button v-if="!isEdit" @click.prevent="createAnswer" class="btn btn-primary mt-3">Post Your Answer</button>
            <div v-else>
                <button  @click.prevent="updateAnswer" class="btn btn-success mt-3 mx-1">Update Answer</button>
                <button  @click.prevent="cancelUpdate" class="btn btn-danger mt-3 mx-1">Cancel</button>
            </div>
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
      isEdit: false
    }
  },
  methods: {
    createAnswer(){
        let title = this.answer.title
        let description = this.answer.description
        let questionId = this.$route.params.id
        this.$store.dispatch('createAnswer', { title, description, questionId })
        this.answer.title = ''
        this.answer.description = ''
    },
    deleteAnswer(answerId){
        let questionId = this.$route.params.id
        this.$store.dispatch('deleteAnswer', {answerId, questionId})
    },
    findOneAnswer(answerId){
        let questionId = this.$route.params.id
        this.$store.dispatch('findOneAnswer', {answerId, questionId})
    },
    cancelUpdate(){
       this.answer.title = ''
       this.answer.description = ''
       this.answer.id = ''
       this.isEdit = false
       this.$store.dispatch('cancelUpdate')

    },
    updateAnswer(){
        let answerId = this.answer.id
        let questionId = this.$route.params.id
        let title = this.answer.title
        let description = this.answer.description
        this.$store.dispatch('updateAnswer', { title, description, answerId, questionId })
        this.answer.title = ''
        this.answer.description = ''
        this.isEdit = false

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
    mapState(['answers', 'oneAnswer']),
  created () {
    this.$store.dispatch('getAnswers', this.$route.params.id)
  },
  mounted () {
    console.log('this is current quill instance object', this.editor)
  },
   watch: {
    'oneAnswer': function () {
       this.answer.title = this.oneAnswer.title
       this.answer.description = this.oneAnswer.description
       this.answer.id = this.oneAnswer._id
       this.isEdit = true
    }
  },
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

.ql-editor{
    min-height: 200px !important;
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
