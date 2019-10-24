<template>
  <q-layout view="hHh Lpr fFf">

  <Navbar></Navbar>
    <q-drawer show-if-above v-model="left" side="left" behavior="desktop" bordered id="left" :width="200">
      <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above side="right" :width="100">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div style="width: 100%; height: 100px; border: 1px solid black" id="title">
        <!-- <h2>adsasdasd</h2> -->
        <h5>{{data.title}}</h5>
        <p>Asked {{momentConvert}}</p>
      </div>
      <hr>
      <section id="question">
        <div class="pa-md" style="margin-top: 10px">

          <div class="row">
            <div class="col-2" style="border: 1px solid black">
              <!-- upvote here -->
              <div><q-icon name="arrow_drop_up" class='vote' :style="{color:activeColorUp}" @click='vote(1)' id="arrowUp"/></div> 
              <div id="score">{{this.score}}</div>
              <!-- downvote here -->
              <div><q-icon name="arrow_drop_down"  class='vote' :style="{color:activeColorDown}"  @click='vote(0)' id="arrowDown"/></div>
            </div>
            <div class="col-10" style="border: 1px solid black" id="containt">
              <div v-html="data.desc"></div>
              <q-badge v-for="tag in data.tags" :key="tag.id" color="blue" id="tag">
              {{tag}}
            </q-badge>
            </div>
          </div>
          <!-- INI BATAS QUESTON -->
          <div id="answerCollection">
          <!-- INI START ANSWER -->
            <div v-if="!data.answerId" >
              <div id="answerCount">
                <h5>0 Answer</h5>
              </div>
              <div v-if="login">
                submit your answer here
                <q-editor
                v-model="descAns"
                :definitions="{
                  bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
                }"
                />
                <q-btn label="Submit" color="primary" @click="submit" id="submit"/>
              </div>
              <div v-if="!login">
                Please login to submit your answer
              </div>
            </div>

            <div v-if="data.answerId" >
              <div id="answerCount">
                <h5>{{data.answerId.length}} Answer</h5>
              </div>

              <div id="listAnswer">
                <Answers v-for="answer in data.answerId" :key="answer.id" :answer='answer'></Answers>
              </div>
              <div v-if="login">
                submit your answer here
                <q-editor
                v-model="descAns"
                :definitions="{
                  bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
                }"
                />
                <q-btn label="Submit" color="primary" @click="submit" id="submit"/>
              </div>
              <div id="submitAnswer" v-if="!login">
                Please login to submit your answer
              </div>
            </div>

          </div>
        </div>
        
      </section>
      <!-- <Card v-for="question in questions" :key="question.id" :question='question'></Card> -->
      <!-- <router-view /> -->
    </q-page-container>

  </q-layout>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import Answers from '@/components/Answer.vue'
import {mapState} from 'vuex'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export default {
  components : {
    Navbar,
    Answers
  },
  data(){
    return {
      left: false,
      data: {},
      size: "90px",
      score : 0,
      descAns: '',
      activeColorUp : '#cccccc',
      activeColorDown : '#cccccc'
    }
  },
  methods : {
    getQuestion(id){
      this.$store.dispatch('getQuestion',id)
        .then((question)=>{
          this.data = question.data
          this.verifyingToken()
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    getScore(id){
      this.$store.dispatch('getScore',id)
        .then((data)=>{
          this.score = data
        })
    },
    submit(){
      let id = this.$route.params.id
      let payload = {
        questionId : id,
        desc : this.descAns
      }
      this.$store.dispatch('submitAnswer',payload)
        .then((success)=>{
          console.log(success)
          this.getQuestion(this.$route.params.id)
          this.descAns = ''
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    vote(num){
      let token = localStorage.getItem('token')
      let id = this.$route.params.id
      if (token){
        if(num){
          this.$store.dispatch('upvoteQuest',id)
            .then(()=>{
              this.getScore(id)
              // this.verifyingToken()
              this.getQuestion(id)
            })
            .catch((err)=>{
              console.log(err)
            })
        } else {
          this.$store.dispatch('downvoteQuest',id)
          .then(()=>{
              this.getScore(id)
              // this.verifyingToken()
              this.getQuestion(id)
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      }else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `You must login before voting`
      })
      }
    },
    verifyingToken(){
      let token = localStorage.getItem('token')
      let verify = jwt.verify(token,'secretecommerce123')
      this.setArrowColor(verify.id)
    },
    setArrowColor(userId){
      let votedUser = this.data.votes
      if(votedUser.length === 0){
        this.activeColorUp = '#cccccc'
          this.activeColorDown = '#cccccc'
      }
      votedUser.forEach(el => {
        console.log(el.userId)
        if(userId == el.userId._id){
          if (el.vote == 1){
            this.activeColorUp = '#FF7A00' 
            this.activeColorDown = '#cccccc'
          } else if (el.vote == -1) {
            this.activeColorUp = '#cccccc'
            this.activeColorDown = '#FF7A00' 
          } else {
            this.activeColorUp = '#cccccc'
          this.activeColorDown = '#cccccc'
          }
        } else {
          this.activeColorUp = '#cccccc'
          this.activeColorDown = '#cccccc'
        }
      });
    }
  },
  created(){
    this.getQuestion(this.$route.params.id)
    this.getScore(this.$route.params.id)
  },
  computed: {
    ...mapState(['login']),
    momentConvert(){
       return moment(this.data.createdAt).from(new Date())
     
    }
  },

}
</script>

<style>
#containt{
  padding: 10px
}
#score{
  /* margin: 5px */
  font-size: 20px
}
#tag{
  margin: 3px;
  float: left;
}
.row .vote{
  font-size: 3rem; 
  cursor: pointer
}
</style>