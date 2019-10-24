<template>
    <div class="container allQues mt-5">
        <h2 style="color:white;">All Question</h2>
        <h2 style="margin-bottom: 50px;">All Question</h2>
        <div class="question" v-for="question in questions.slice().reverse()" :key="question._id">
            <div class="ques-item">
               <div class="vote-sesction mx-5">
                    <!-- <div class="votes mx-5"> -->
                        <p style="margin:0;">{{ question.upvotes.length }}</p>
                        <span style="color:gray;">Votes</span>
                    <!-- </div> -->
                    <!-- <div class="votes mx-5"> -->
                        <p style="margin:0;">{{ question.upvotes.length }}</p>
                        <!-- answer masih hardcore -->
                        <span style="color:gray;">Answer</span>
                    <!-- </div> -->
               </div>
                <div class="ques-content">
                    <div>
                        <a href="#">{{ question.title }}</a>
                    </div>
                    <div v-html="question.description">
                        <!-- {{ question.description }} -->
                    </div>
                    <div style="text-align:right;">
                        <!-- <img :src="this.$store.state.img" alt=""> -->
                        <p>{{ question.userId.username}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'AllQuestion',
  data () {
    return {
      questions: ''
    }
  },
  methods: {
    fetchData () {
      let timerInterval
      Swal.fire({
        title: 'Fetching Data',
        // html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            Swal.getContent().querySelector('b')
              .textContent = Swal.getTimerLeft()
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          axios({
            method: 'get',
            url: 'http://localhost:3000/question'
          })
            .then(({ data }) => {
              console.log(data, 'inidata')
              this.questions = data
            })
            .catch(err => {
              err = JSON.parse(err.response.request.response).message[0]
              console.log(err)
            })
        }
      })
    }
  },
  created () {
    this.fetchData()
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
