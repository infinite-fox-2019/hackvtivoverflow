<template>
  <div class="profileUser2">
    <div class="mainProfile2">
      <div class='imageProfile2 mt-3 ml-3'>
        <div class="cardUser2">
          <div>
            <img :src="user.profile_image" alt="profile_image" style='width: 21vh'>
          </div>
          <div>
            <b-badge class='btntag ml-1 w-full' v-if='user.point > 800' style='width: 250px'>
              <unicon name='gold'></unicon> <a style='color: gold'>{{user.point}} &nbsp; <small>gold</small></a>
            </b-badge>
            <b-badge class='btntag ml-1' v-else-if='user.point > 200 && user.point < 800' style='width: 250px'>
              <unicon name='smile'></unicon> <a style='color: silver'>{{user.point}} &nbsp; <small>silver</small></a>
            </b-badge>
            <b-badge class='btntag ml-1' v-else style='width: 250px'>
              <unicon name='annoyed'></unicon> <a style='color: black'>{{user.point}} &nbsp; <small>bronze</small></a>
            </b-badge>
          </div>
        </div>
        <div class='ml-3 mt-2'>
          <h1>{{user.username.toUpperCase()}}</h1>
        </div>
      </div>
      <div class="rightProfile2 mt-3">
        <div class="right-topProfile">
          <div class="question2 mr-5">
            <div>
              <b>{{questions.length}}</b>
            </div>
            <div>
              Questions
            </div>
          </div>
          <div class="question2">
            <div>
              <b>{{answers.length}}</b>
            </div>
            <div>
              Answers
            </div>
          </div>
          <div>

          </div>
        </div>
        <div class='mt-2'>
          <unicon name='location-point'></unicon> {{ user.city }}
        </div>
        <div>
          <unicon name='eye'></unicon> {{user.views}} Profile Views
        </div>
      </div>
    </div>
    <div class="questionProfile2">
      <div v-for='question in questions' :key='question._id'>
        <QuestionforProfile :get-question='question'></QuestionforProfile>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/apis/server.js'
import QuestionforProfile from '@/components/QuestionforProfile.vue'

export default {
  data () {
    return {
      user: null,
      questions: null,
      answers: null
    }
  },
  components: {
    QuestionforProfile
  },
  watch: {
    user (val) {
      this.user = val
    }
  },
  methods: {
    fetchUser (id) {
      axios({
        method: 'get',
        url: `/users/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.questions = data.question;
          this.user = data.user;
          this.answers = data.answer
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.fetchUser(this.$route.params.id)
  }
}
</script>

<style >
.cardUser2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profileUser2 {
  display: flex;
  flex-direction: column;
  height: 79vh
}
.mainProfile2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 25vh;
}
.question2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.questionProfile2 {
  height: 54vh
}
.imageProfile2 {
  display: flex;
  flex-direction: row;
}
.rightProfile2 {
  display: flex;
  flex-direction: column;
  margin-right: 50px
}
.right-topProfile {
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>