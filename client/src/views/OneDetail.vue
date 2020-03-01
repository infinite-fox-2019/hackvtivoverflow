<template>
  <div class="qus">
    <div class="mx-4">
      <div class="header">
        <div class="d-flex flex-column align-items-center justify-content-center">
          <div @click="upVote">
            <i class="fas fa-caret-up fa-4x"></i>
          </div>
          <span>{{totalVote}}</span>
          <div @click="downVote">
            <i class="fas fa-caret-down fa-4x"></i>
          </div>
        </div>
        <div class="mt-4 head">
          <h1>{{question.title}}</h1>
        </div>
      </div>
      <div v-html="question.description" class="mx-4"></div>
    </div>
    <br />
    <div class="textx">
      <form action @submit.prevent="createAnswer">
        <h4>Give Answer</h4>
        <div class="write">
          <wysiwyg v-model="newAnswer"></wysiwyg>
        </div>
        <div class="buttonSub">
          <b-button variant="primary" @click="createAnswer">Submit</b-button>
        </div>
      </form>
    </div>
    <div class="box">
      <h2>Answers :</h2>
      <hr />
      <div class="boxkan" v-for="answer in question.answers" :key="answer._id">
        <div class="mx-4">
          <div class="header">
            <div class="d-flex flex-column align-items-center justify-content-center">
              <div @click="upVoteAn(answer._id)">
                <i class="fas fa-caret-up fa-4x"></i>
              </div>
              <span>{{answer.likes.length - answer.dislikes.length}}</span>
              <div @click="downVoteAn(answer._id)">
                <i class="fas fa-caret-down fa-4x"></i>
              </div>
            </div>
            <div class="mt-4 head d-flex flex-column justify-content-between">
              <div v-html="answer.answer" class="mx-4"></div>
              <div class="d-flex justify-content-end">
                <div class="d-flex flex-column" style="text-align:right">
                  <p>{{answer.createdAt}}</p>
                  <p>{{answer.user.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
// import OneAnswer from '../components/OneAnswer.vue'
import axios from '../config/axios'
export default {
  data () {
    return {
      newAnswer: ''
    }
  },
  components: {
    // OneAnswer
  },
  computed: {
    question () {
      return this.$store.state.oneQuestionDetail
    },
    totalVote () {
      return this.question.likes.length - this.question.dislikes.length
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    createAnswer () {
      if (!this.isLogin) {
        this.$store.commit('SHOWLOGIN_TRUE')
      } else {
        axios({
          method: 'post',
          url: `/answers/${this.$route.params.id}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            answer: this.newAnswer
          }
        })
          .then(data => {
            this.$store.dispatch('getOneQues', this.$route.params.id)
            this.newAnswer = ''
          })
          .catch(err => {
            let errors = err.response.data.errMsg.join('<br>')
            Swal.fire({
              type: 'error',
              title: 'Error!',
              html: errors
            })
            console.log(err.response.data.msg)
          })
      }
    },
    upVote () {
      console.log('up')
      axios({
        method: 'patch',
        url: '/questions/up/' + this.$route.params.id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getOneQues', this.$route.params.id)
        })
        .catch(err => {
          let errors = err.response.data.message
          if (err.response.status === 401) {
            this.$store.commit('CHANGE_SHOWLOGIN', true)
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error!',
              text: errors
            })
          }
        })
    },
    downVote () {
      console.log('down')
      axios({
        method: 'patch',
        url: '/questions/down/' + this.$route.params.id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$store.dispatch('getOneQues', this.$route.params.id)
        })
        .catch(err => {
          let errors = err.response.data.message
          if (err.response.status === 401) {
            this.$store.commit('CHANGE_SHOWLOGIN', true)
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error!',
              text: errors
            })
          }
        })
    },
    downVoteAn (id) {
      console.log(id, '<<<<< down');
      axios({
        method: 'patch',
        url: `/answers/down/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          this.$store.dispatch('getOneQues', this.$route.params.id)
        })
        .catch(err => {
          let errors = err.response.data.message
          if (err.response.status === 401) {
            this.$store.commit('CHANGE_SHOWLOGIN', true)
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error!',
              text: errors
            })
          }
        })
    },
    upVoteAn (id) {
      console.log(id, '<<<<< up');
      axios({
        method: 'patch',
        url: `/answers/up/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          this.$store.dispatch('getOneQues', this.$route.params.id)
        })
        .catch(err => {
          let errors = err.response.data.message
          if (err.response.status === 401) {
            this.$store.commit('CHANGE_SHOWLOGIN', true)
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error!',
              text: errors
            })
          }
        })
    }
  },
  created () {
    this.$store.dispatch('getOneQues', this.$route.params.id)
  }
}
</script>

<style scoped>
.head {
  width: 900px;
}
.header {
  height: 180px;
  width: 80%;
  display: flex;
  flex-direction: row;
}
.box {
  width: 90%;
  display: flex;
  min-height: 60vh;
  justify-content: center;
  margin: 35px;
  flex-direction: column;
}

.editr {
  width: 850px;
  background: white;
}

.textx {
  text-align: left;
  display: flex;
  justify-content: center;
}
h2 {
  text-align: center;
}

h3 {
  text-align: left;
  margin-top: 10px;
  font-weight: 300;
  margin-left: 35px;
}

h1 {
  text-align: left;
  margin-top: 10px;
  font-weight: 400;
  margin-left: 35px;
}

h2 {
  font-weight: 450;
}

.qus {
  background: white;
}
button {
  color: black;
  font-weight: 500;
  font-size: 12pt;
  width: 120px;
  height: 40px;
}
.buttonSub {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}

.bluin {
  color: rgb(104, 6, 117);
  text-decoration: underline;
}

form {
  margin: 40px;
}

span {
  font-size: 21pt;
}

.fas:hover {
  color: rgb(126, 10, 101);
  cursor: pointer;
}

.boxkan {
  min-height: 50px;
  width: 100%;
  background: white;
}
</style>
