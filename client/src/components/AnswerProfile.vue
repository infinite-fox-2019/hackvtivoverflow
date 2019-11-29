<template>
<div class="card25 card-blue-light">
  <div class="tittle">
  <h3>{{ getAnswer.QuestionId.title }}</h3>
  <div class="row">
    <div class="col">
      <!-- {{getAnswer}} -->
    <small>Vote: {{ getAnswer.QuestionId.upvotes.length - getAnswer.QuestionId.downvotes.length }}</small>
    </div>
    <div class="col">
    <small>CreatedAt: {{ getAnswer.QuestionId.createdAt }}</small>
    </div>
  </div>
  <hr>
  </div>
  <div class="boddyy">
  <p v-html='getAnswer.response'></p>
  <hr>
  </div>
  <div class="foott" v-if='getAnswer._id'>
    <div class="row">
      <div class="col-6">
        <button class="btn-outline-danger btn btn-md" @click='deleteAnswer(getAnswer._id)'>DELETE</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '@/apis/server.js'

export default {
  props: ['getAnswer'],
  methods: {
    deleteAnswer (id) {
      this.$Progress.start()
      axios({
        method: 'delete',
        url: `/answers/${id}`,
        headers:{
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$emit('fetchAnswer')
          this.$Progress.finish()
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
          this.$Progress.fail()
        })
    }
  },
  watch: {
    getAnswer (val) {
      this.getAnswer = val
    }
  }
}
</script>

<style>
.tittle {
  height: 100%;
}
.foott {
  height: 35px;
}
.boddyy {
  height:100%;
  margin-top: 5px;
}
</style>