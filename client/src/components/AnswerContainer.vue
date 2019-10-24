<template>
  <div class="row mt-3">
    <div  class="col-md-2 border-bottom border-top">
      <div class="flex-column my-2">
        <h6> {{answer.upvotes.length}} </h6>
        <small @click.prevent="upvoteAns" class="btn btn-link"> ThumbUp </small>
      </div>
      <div class="flex-column my-2">
        <h6> {{answer.downvote.length}} </h6>
        <small @click.prevent="downvoteAns"  class="btn btn-link"> ThumbDown </small>
      </div>
    </div>
    <div class="col-md-9 border-bottom border-top d-flex justify-content-center align-items-start flex-column">
      <h5 class="border-bottom border-dark"><strong>{{answer.title}}</strong></h5>
      <small>{{answer.UserId.username}}</small>
      <p class="mt-2" v-html="answer.description"></p>
    </div>
        <div class="col-md-1 d-flex justify-content-center flex-column text-truncate">
      <button @click="deleteAns" v-if="answer.UserId._id === $store.state.userId" class="btn btn-danger justify-content-center mb-2"><img src="https://image.flaticon.com/icons/svg/109/109602.svg" alt="" width="25px"></button>
      <button @click="updateAns" v-if="answer.UserId._id === $store.state.userId" class="btn btn-warning justify-content-center"><img src="https://image.flaticon.com/icons/svg/1159/1159633.svg" alt="" width="25px" ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['answer'],
  methods: {
    deleteAns () {
      let payload = { answerId: this.answer._id, questionId: this.answer.QuestionId }
      this.$store.dispatch('deleteAns', payload)
    },
    updateAns () {
      let payload = { id: this.answer._id, title: this.answer.title, description: this.answer.description, questionId: this.answer.QuestionId }
      this.$store.commit('UPDATEANSWER', payload)
      this.$router.push('/updateAnswer')
    },
    upvoteAns () {
      let payload = { answerId: this.answer._id, questionId: this.answer.QuestionId }
      this.$store.dispatch('upvoteAns', payload)
    },
    downvoteAns () {
      let payload = { answerId: this.answer._id, questionId: this.answer.QuestionId }
      this.$store.dispatch('downvoteAns', payload)
    }
  }
}
</script>

<style>

</style>
