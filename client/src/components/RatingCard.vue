<template>
  <div class='ratingcard'>
      <b-card bg-variant="light" text-variant="black" :title="sendQuestion.title">
        <b-card-text>
          <p>Rating: {{ sendQuestion.upvotes.length - sendQuestion.downvotes.length }}<br>
          <small>Answer: {{ answerData.length }}</small>
          </p>
          <hr>
        </b-card-text>
        <b-button href="#" variant="secondary"><router-link :to='{ name:"detail", params: { id: sendQuestion._id }}'>Detail</router-link></b-button>
      </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      answerData: ''
    }
  },
  props: ['sendQuestion'],
  methods: {
    getAnswer () {
      const id = this.question._id
      this.$store.dispatch('getAnswer', id)
        .then(data => {
          this.answerData = data
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    sendDetail (id) {

    }
  },
  created () {
    this.getAnswer()
  }
}
</script>

<style>
.ratingcard {
  padding-top:10px;
}
</style>