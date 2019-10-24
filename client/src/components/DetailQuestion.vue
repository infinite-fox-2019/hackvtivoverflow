<template>
  <div class="left">
    <article class="media">
  <figure class="media-left">
    <a @click="upVote(questionDetail._id)"><i class="fas fa-caret-up fa-3x"></i></a>
    <p style="text-align:center">{{questionDetail.value}}</p>
    <a @click="downVote(questionDetail._id)"><i class="fas fa-caret-down fa-3x"></i></a>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{questionDetail.title}}</strong>
        <br>
      </p>
      <p v-html="questionDetail.description"></p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <div style="display: inline;margin: 5px;" v-for="(tag, index) in questionDetail.tag" :key="index">
            <b-tag style="background-color: hsl(216, 41%, 82%); height:18px;color: rgb(30, 97, 160)">{{ tag }}</b-tag>
        </div>
      </div>
    </nav>
  </div>
</article><hr>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DetailQuestion',
  props: ['questionDetail'],
  methods: {
    upVote (id) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/question/${id}/upVote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ msg }) => {
          this.$buefy.toast.open({
            message: `success`,
            type: 'is-success'
          })
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    downVote (id) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/question/${id}/downVote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ msg }) => {
          this.$buefy.toast.open({
            message: `success`,
            type: 'is-success'
          })
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
}
</script>
<style scoped>
.left {
  margin-left: 2%;
}
a {
  color: rgb(105, 103, 103);
}
</style>
