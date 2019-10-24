<template>
  <div class="row">
    <div  class="col-md-2 border rounded">
      <div class="flex-column my-2">
        <h6> {{question.upvotes.length - question.downvote.length}} </h6>
        <small> Votes </small>
      </div>
      <div class="flex-column my-2">
        <h6> {{question.questionAnswers.length}} </h6>
        <small> Answer </small>
      </div>
    </div>
    <div class="col-md-9 border rounded d-flex justify-content-center align-items-start flex-column text-truncate">
      <button @click="toDetail" class="btn btn-link pl-0">
         <h5><strong>{{question.title}}</strong></h5>
      </button>
      <small>{{question.UserId.username}}</small>
      <p v-html="question.description" style="word-wrap; break-word"></p>
    </div>
        <div class="col-md-1 d-flex justify-content-center flex-column text-truncate">
      <button @click="deleteQuest" v-if="question.UserId._id === $store.state.userId" class="btn btn-danger justify-content-center mb-2"><img src="https://image.flaticon.com/icons/svg/109/109602.svg" alt="" width="25px"></button>
       <button @click="updateQuest" v-if="question.UserId._id === $store.state.userId" class="btn btn-warning justify-content-center"><img src="https://image.flaticon.com/icons/svg/1159/1159633.svg" alt="" width="25px" ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    toDetail () {
      this.$router.push(`/questions/${this.question._id}`)
    },
    deleteQuest () {
      this.$store.dispatch('deleteQuest', this.question._id)
    },
    updateQuest () {
      let payload = { id: this.question._id, title: this.question.title, description: this.question.description }
      this.$store.commit('DATATOUPDATE', payload)
      this.$router.push('/updateQuestion')
    }
  }
}
</script>

<style>

</style>
