<template>
<div class="content">
  <div class="row">
    <div class="col-6">
      <div class="topp">
        <h3 >My Question</h3>
      </div>
      <div v-for='(question, i) in questions' :key='i' class='tiapcard'>
        <QuestionProfile 
          :get-question='question' 
          @fetchProfile='okeyfetchQuestion'
          @oldQuestion='okeyGotOldQuestion'
          />
      </div>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Edit"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleSubmit"
        >
        <form ref="form" @submit.prevent="handleSubmit">
          <b-form-group
            :state="nameState"
            label="Title"
            label-for="name-input"
            invalid-feedback="Title is required"
          >
            <b-form-input
              id="name-input"
              v-model="oldTitle"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label='Description'
            invalid-feedback='Description is required'
          >
            <vue-editor v-model='oldDescription'></vue-editor>
          </b-form-group>
        </form>
      </b-modal>


    </div>
    <div class="col-6">
      <div class="topp">
        <h3>My Answer</h3>
      </div>
      <div v-for='(answer, i) in answers' :key='i' class='tiapcard'>
        <AnswerProfile :get-answer='answer' />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import QuestionProfile from '../components/QuestionProfile';
import AnswerProfile from '../components/AnswerProfile';
import axios from 'axios'

export default {
  data () {
    return {
      id: '',
      oldTitle: '',
      oldDescription: '',
      title: '',
      nameState: null,
      submittedNames: [],
      questions: '',
      answers: '',
      id: this.$store.state.user._id
    }
  },
  components: {
    QuestionProfile,
    AnswerProfile
  },
  methods: {
    okeyGotOldQuestion (data) {
      this.id = data.id
      this.oldTitle = data.title;
      this.oldDescription = data.description
    },
    okeyfetchQuestion () {
      this.fetchQuestion()
      this.fetchAnswer()
    },
    fetchQuestion () {
      axios({
        method: 'get',
        url: `http://localhost:3000/questions/profile`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          if(data.length == 0) {
            this.questions = [
              {
                title: 'You have no Questions',
                upvotes: [],
                downvotes: [],
                createdAt: 0,
                description: ''
              }
            ]
            this.$awn.info(this.questions[0].title)
          } else {
            this.questions = data
            this.$awn.success('We got your questions')
          }
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg +' we will send u to Login page in 2 second')
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000);
        })
    },
    fetchAnswer () {
      axios({
        method: 'get',
        url: `http://localhost:3000/answers`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          if(data.length == 0) {
            this.answers = [
              {
                response: '',
                QuestionId: {
                  upvotes: [],
                  downvotes: [], 
                  createdAt: 0, 
                  title: 'You have no answers'
                }
              }
            ]
            this.$awn.info(this.answers[0].QuestionId.title)
          } else {
            this.answers = data
            this.$awn.success('We got your Answer')
          }
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        axios({
          method: 'put',
          url: `http://localhost:3000/questions/${this.id}`,
          data: {
            title: this.oldTitle,
            description: this.oldDescription
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.$awn.success(data.msg)
            this.fetchQuestion()
          })
          .catch(err => {
            if(err.response.data.msg == 'objectId') {
              this.$awn.warning('cant update from empty database, 2 second u will redirect to form ask question')
              setTimeout(() => {
                this.$router.push('/ask')
              }, 2000);
            }
            console.log(err)
          })
          .finally(_ => {
            this.$nextTick(() => {
              this.$refs.modal.hide()
            })
          })
      }
  },
  created () {
    this.fetchQuestion()
    this.fetchAnswer()
  }
}
</script>

<style lang='scss'>
.tiapcard{
  padding-top:10px;
}
.topp {
  text-align: center
}
.card25 {
  width: 100%;
  padding: 20px;
  position: relative;
  transition: .3s all;
  box-shadow: 0 2px 5px 0 rgba(3,6,26,0.15);
  &:hover {
    transform: scale(1.05);
  }
  @media screen and (max-width: 1480px) {
    width: 23%;
  }
  @media screen and (max-width: 1420px) {
    width: 31.3333333333%;
  }
  @media screen and (max-width: 1240px) {
    width: 48%;
  }
  @media screen and (max-width: 820px) {
    width: 98%;
    margin-top: 2%;
    margin-bottom: 2%;
  }
  h3 {
    text-transform: uppercase;
    margin-bottom: 10px;
  }
}

.button {
  position: absolute;
  left: 50px;
  bottom: -28px;
  font-size: 14px;
  color: white;
  background: rgba(0,0,0,.2);
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px 20px;
  transition: .3s all;
  &:hover {
    background: rgba(255,255,255,.8);
    color: #2e2e2e;
  }
}

.pad-top {
  padding-top: 20px;
}

.card-blue-light {
  background: #5caff8;
  color: white;
}

</style>