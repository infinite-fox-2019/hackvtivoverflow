<template>
    <div class="container allQues mt-5">
        <h2 style="color:white;">All Question</h2>
        <h2 style="margin-bottom: 50px;">My Question</h2>
        <div class="question" v-for="(question,index) in myQuestion" :key="index">
            <div class="ques-item">
               <div class="vote-sesction mx-5">
                    <div class="votes mx-5">
                        <p style="margin:0;">{{ question.upvotes.length }}</p>
                        <span style="color:gray;">Votes</span>
                    </div>
                    <div class="votes mx-5">
                        <p style="margin:0;">{{ question.upvotes.length }}</p>
                        <!-- answer masih hardcore -->
                        <span style="color:gray;">Answer</span>
                    </div>
               </div>
                <div class="ques-content">
                    <div>
                        <a href="" @click.prevent="myDetail(question._id)">{{ question.title }}</a>
                    </div>
                    <div v-html="question.description">
                        {{ question.description }}
                    </div>
                    <div style="text-align:right;">
                        <p>{{ question.userId.username}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name: 'MyQuestion',
  data () {
    return {
    //   questions: ''
    }
  },
  methods: {
      myDetail(id) {
          this.$store.dispatch('getMyDetail',id)
          this.$router.push(`/myquestion/${id}`)
      }
  },
  created () {
    this.$store.dispatch('personalQuestion')
  },
  computed: {
      ...mapState(['myQuestion'])
  }
}
</script>

<style>
.allQues {
    height: 100%;
    margin-top: 50px !important;
}
.question {
    /* background-color: gray; */
    border-top: 1px solid gray;
    padding: 20px 0;
}
.ques-item {
    display: flex;
}
.votes {
    width: 20%;
}
.ques-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
}
.vote-section {
    display: flex;
    flex-direction: column;
    text-align: center;
}
</style>
