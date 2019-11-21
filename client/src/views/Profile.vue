<template>
<div class="content">
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="QUESTION" active>
        <div v-for='(question, i) in questions' :key='i' class='tiapcard mt-5'>
          <QuestionProfile 
            :get-question='question' 
            @fetchProfile='okeyfetchQuestion'
            @oldQuestion='okeyGotOldQuestion'
            />
        </div>
      </b-tab>
      <b-tab title="ANSWER">
        <!-- <div class="topp">
          </div> -->
          <!-- {{ answers }} -->
          <div v-for='(answer, i) in answers' :key='i' class='tiapcard'>
            <AnswerProfile :get-answer='answer' @fetchAnswer='okeyfetchQuestion'/>
          </div>
      </b-tab>

      <b-tab title="PROFILE">
        <router-link :to='{path: `/profile/${$store.state.user._id}`}'>Go To Profile</router-link>
      </b-tab>
    </b-tabs>
  </div>
  <b-modal 
    id="modal-xl" 
    size="xl" 
    title="Edit Question"
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
</template>

<script>
import QuestionProfile from '../components/QuestionProfile';
import AnswerProfile from '../components/AnswerProfile';
import axios from '@/apis/server.js'

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
    url: `/questions/profile`,
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
    url: `/answers`,
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
      console.log(this.answers)
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
      url: `/questions/${this.id}`,
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

<style lang='scss' scoped>
.tiapcard{
  padding-top:10px;
}
.topp {
  text-align: center
}

.pad-top {
  padding-top: 20px;
}

</style>