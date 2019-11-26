<template>
  <div class="row">
    <div class="col-2" style="border: 1px solid black">
      <!-- upvote here -->
      <div><q-icon name="arrow_drop_up" class='vote' :style="{color:activeColorUp} " @click='vote(1)'/></div>
      <div id="score">{{this.score}}</div>
      <!-- downvote here -->
      <div><q-icon name="arrow_drop_down" class='vote' :style="{color:activeColorDown} " @click='vote(0)'/></div>
    </div>
    <div class="col-10" style="border: 1px solid black" id="containt">
      <div v-html="answer.desc"></div>
    </div>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'

export default {
  props:['answer'],
  data(){
    return{
      size : 'xl',
      score : 0,
      activeColorUp : '#cccccc',
      activeColorDown : '#cccccc'
    }
  },
  methods : {
    getAnswerScore(){
      console.log(this.answer)
      let id = this.answer._id
      this.$store.dispatch('getAnswerScore',id)
        .then(({data})=>{
          console.log(data)
          this.score = data
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    vote(num){
      // console.log(this.answer)
      let token = localStorage.getItem('token')
      let id = this.answer._id
      if (token){
        if(num){
          console.log('upvote')
          this.$store.dispatch('upvoteAnswer',id)
            .then(()=>{
              this.getAnswerScore()
              this.verifyingToken()
              // this.$store.dispatch('getQuestions')
              // nanti nge dispatch action buat update pertanyaann
            })
            .catch((err)=>{
              console.log(err)
            })
        } else {
          console.log('downvote')
          this.$store.dispatch('downvoteAnswer',id)
          .then(()=>{
              this.getAnswerScore()
              this.verifyingToken()
              // this.$store.dispatch('getQuestions')
              // nanti nge dispatch action buat update pertanyaan
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
      console.log(verify)
      // console.log(this.answer)
      this.setArrowColor(verify.id)
    },
    setArrowColor(userId){
      let votedUser = this.answer.votes
      console.log(votedUser)
      let questionId = this.answer.questionId
      if(votedUser.length === 0){
        this.activeColorUp = '#cccccc'
          this.activeColorDown = '#cccccc'
      }
      votedUser.forEach(el => {
        console.log(el)
        // console.log(el)
        if(userId == el.userId){
          // console.log(userId)
          // console.log(el.userId)
            // console.log(el.vote)
          if (el.vote == 1){
            // console.log(userId)
          // console.log(el.userId)
            console.log('masuk omsss')
            this.activeColorUp = '#FF7A00' 
            this.activeColorDown = '#cccccc'
            // this.$store.dispatch('getQuestion',questionId)
          } else if (el.vote == -1) {
            // console.log(userId)
          // console.log(el.userId)
            console.log('masuk omssasdasds')
            this.activeColorUp = '#cccccc'
            this.activeColorDown = '#FF7A00' 
            // this.$store.dispatch('getQuestion',questionId)
          } else {
            // console.log(userId)
          // console.log(el.userId)
            console.log('masuk omsss1123123')
            this.activeColorUp = '#cccccc'
          this.activeColorDown = '#cccccc'
          // this.$store.dispatch('getQuestion',questionId)
          }
        } else {
          // console.log(userId)
          // console.log(el.userId)
          console.log('masuk omsss090909')
          this.activeColorUp = '#cccccc'
          this.activeColorDown = '#cccccc'
          // this.$store.dispatch('getQuestion',questionId)
        }
      });
    }
  },
  created(){
    if(this.answer){
      this.getAnswerScore()
      // this.verifyingToken()
    }
  }
}
</script>

<style>
.vote{
  font-size: 2rem; 
  cursor: pointer
}
</style>