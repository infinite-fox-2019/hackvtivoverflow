<template>
    <div class="container">
        <div class="flex">
            <div>
                <h1>/\</h1>
                <h1>0</h1>
                <h1>\/</h1>
            </div>
            <div class="questionAnswer">
                <h3>Question by {{ this.$store.state.question.userId.username }} :</h3>
                <h2>{{ this.$store.state.question.title }}</h2>
                <div class="buttonflex">
                    <updateQuestion
                        :title="this.$store.state.question.title"
                        :description="this.$store.state.question.description"
                    ></updateQuestion>
                    <button class="btn btn-danger" @click="deleteQuestion">delete</button>
                </div>
            </div>
        </div>
        <div v-for="(answer, index) in this.$store.state.answers" :key="index">
            <div class="flex">
                <div>
                    <h1>/\</h1>
                    <h1>0</h1>
                    <h1>\/</h1>
                </div>
                <div class="questionAnswer">
                    <h4>{{ index+1 }}. Answer by {{ answer.userId.username }} :</h4>
                    <h6 v-html="answer.description"></h6>
                    <updateAnswer
                        :description="answer.description"
                        :id="answer._id"
                    ></updateAnswer>
                </div>
            </div>
        </div>
        <addAnswer></addAnswer>
    </div>
</template>

<script>
import addAnswer from '../components/addAnswer'
import updateQuestion from '../components/updateQuestion'
import updateAnswer from '../components/updateAnswer'
import Swal from 'sweetalert2'

export default {
  name: 'question',
  components: {
    addAnswer,
    updateQuestion,
    updateAnswer
  },
  methods: {
    deleteQuestion () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteQuestion', this.$route.params.id)
              .then(data => {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                this.$router.push('/')
              })
              .catch(err => {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: JSON.parse(err.response.request.response).message[0]
                })
              })
          }
        })
    }
  },
  created () {
    this.$store.dispatch('getAnswer', this.$route.params.id)
      .then(data => {

      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: JSON.parse(err.response.request.response).message[0]
        })
      })
  }
}
</script>

<style scoped>
    .container {
        margin-top: 4%;
        text-align: left;
    }
    .flex {
        display: flex;
    }
    .questionAnswer {
        word-wrap:break-word;
        width: 90%;
        margin: 0 4%;
    }
    .buttonflex {
        display: flex;
    }
    .center {
        justify-content: center;
        align-content: center;
    }
</style>
