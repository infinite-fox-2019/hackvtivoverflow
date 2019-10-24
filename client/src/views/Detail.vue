<template>
<div class='main-container'>
  <div class="header bg-light">
    <div class="row">
      <div class="col-8">
        <div class="text">
          <h2> {{ question.title }} </h2>
        </div>
        <div class='tagss'>
          <div v-for='(tag,i) in question.tags' :key='i'>
              <Tag :get-tag='tag'/>
          </div>
        </div>
      </div>
      <div class="col-4">
        <router-link to='/ask'><a class='btn-primary'>Ask Question</a></router-link>
      </div>
    </div>
    <hr>
  </div>
  <div class="body bg-light">
      <div class="outside">
          <div class="question">
                  <div class="qleft col-1 bg-light">
                      <div class="upp">
                          <unicon name="arrow-up" fill="royalblue" @click='plusvote(question._id)'/>
                      </div>
                      <div class="total">
                          {{ data }}
                      </div>
                      <div class="downn">
                          <unicon name="arrow-down" fill="royalblue" @click='minvote(question._id)'/>
                      </div>
                  </div>
                  <div class='qright col-10 bg-light'>
                      <a v-html='question.description'></a>
                  <hr>
                  </div>
          </div>
          <div class='answer'>
              <a class='textAnswer'>Answer</a>
          </div>
          <div class="question2">
              <div v-for='(answer, i) in answers' :key='i'>
                  <Answer :get-answer='answer' @fetchAnswer='okeyFetchAnswer'/>
              </div>
          </div>
      </div>
</div>
  <div class="foot bg-light">
      <div>
          <vue-editor v-model='inputAnswer'></vue-editor>
      </div>
      <p>Know someone who can answer? Share a link to this question via email, Twitter, or Facebook.</p>
      <div class="btnsave">
          <b-button align='center' @click='postAnswer()'>Post Your Answer</b-button> 
      </div>
  </div>
</div>
</template>

<script>
import Tag from '../components/Tag'
import axios from 'axios'
import Answer from '../components/Answer'

export default {
    data () {
      return {
        inputAnswer: '',
        question: '',
        answers: '',
        upvote: '',
        downvote: ''
      }
    },
    components: {
      Tag,
      Answer
    },
    computed: {
      data: {
        get () {
            return this.question.upvotes.length - this.question.downvotes.length
        },
        set () {
            this.upvote= this.question.upvotes
            this.downvote= this.question.downvotes
        }
      }
    },
    methods: {
      plusvote (id) {
          this.$store.dispatch('plusVote', id)
            .then(data => {
              this.$awn.success('You like this question, u can add to favorite by click the star')
              this.fetchDataById()
            })
            .catch(err => {
              if(err.response.data.msg == 'Authentication Error!'){
                  this.$awn.warning(err.response.data.msg+ '.. hint: Login/Register yeah.. i will send the form in 3 second')
                  setTimeout(() => {
                  this.$router.push('/login')              
                  }, 3000);
              }else{
                  this.$awn.warning(err.response.data.msg)
              }
            })
      },
      minvote (id) {
        this.$store.dispatch('minVote', id)
          .then(data => {
            this.$awn.success('You dislike this question')
            this.fetchDataById()
          })
          .catch(err => {
            if(err.response.data.msg == 'Authentication Error!'){
              this.$awn.warning(err.response.data.msg+ '.. hint: Login/Register yeah.. i will send the form in 3 second')
              setTimeout(() => {
              this.$router.push('/login')              
              }, 3000);
            }else{
              this.$awn.warning(err.response.data.msg)
            }
          })
      },
      fetchDataById () {
        const id = this.$route.params.id
        axios({
          method : 'get',
          url: `http://localhost:3000/questions/search/${id}`,
        })
          .then(({data}) => {
            this.question = data
            this.$awn.success("fetchingData")
          })
          .catch(err => {
            this.$awn.warning(err.response.data.msg)
          })
      },
      okeyFetchAnswer () {
        console.log('trigger')
        this.fetchAnswer()
      },
      fetchAnswer () {
        const getId = this.$route.params.id
        this.$store.dispatch('getAnswer', getId)
          .then(data => {
            this.answers = data
          })
          .catch(err => {
            this.$awn.warning(err.response.data.msg)
          })
      },
      postAnswer () {
        const QuestionId = this.$route.params.id
        const UserId = this.$store.state.user._id
        const response = this.inputAnswer
        if(this.$store.state.islogin){
          axios({
            method: 'post',
            url: `http://localhost:3000/answers/${QuestionId}`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                response
            }
          })
            .then(({data}) => {
                this.inputAnswer = ''
                this.$awn.success('success post your answer!')
                this.fetchAnswer()
            })
            .catch(err => {
                this.$awn.warning(err.response.data.msg)
            })
        } else {
          this.$awn.warning('you cant post login First')
          this.$router.push('/login')
        }
      }
    },
    created () {
      this.fetchDataById()
      this.fetchAnswer()
    }
}
</script>

<style scoped>
.answer{
    margin-top: -35px;
    text-align:center
}
.textAnswer {
    font-size: 35px;
}
.total{
    color: black
}
.outside{
    display: flex;
    flex-direction: column;
}
.btnsave{
    margin-top:-10px;
  text-align: center;
}
.question{
    padding:20px;
    width: 100%;
    display:flex;
}
.col-4 {
  padding: 20px;
}
a{
  color: black;
}
a:hover{
  background-color: salmon;
}
.h2{
  position: absolute
}
.header{
  height: 100%;
}
p {
  font-size: 15px;
  margin-left: 25px;
}
.body{
  overflow: auto;
  height: 30vw;
}
.foot{
  height: 100%;
}
.tagss{
  padding: 2px;
  display: flex;
}
</style>