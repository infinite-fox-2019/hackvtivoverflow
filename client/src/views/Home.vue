<template>
    <div class="container">
      <div v-for="(question, index) in this.$store.state.questions.slice().reverse()" :key="index" class="question">
        <div class="flex" @click="getAnswer(question._id)">
          <div class="col-6 ket">
            <h5> {{ question.upvotes.length-question.downvotes.length }} </h5>
            <h5> votes </h5>
          </div>
          <div class="col-6 ket">
            <h5> {{ question.answersId.length }} </h5>
            <h5> answer </h5>
          </div>
          <div class="col-6 ket">
            <h5> {{ question.views.length }} </h5>
            <h5> views </h5>
          </div>
          <div class="title">
            <div>
              <h4> {{ question.title }} </h4>
            </div>
            <div>
              <h6> by: {{ question.userId.username }} </h6>
            </div>
          </div>
          <!-- <h3 v-html="question.description"></h3> -->
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'home',
  // data () {
  //   return {

  //   }
  // },
  methods: {
    getAllQuestion () {
      this.$store.dispatch('getAllQuestion')
    },
    getAnswer (question) {
      this.$store.dispatch('addViews', question)
        .then(data => {
          this.$router.push(`/question/${question}`)
        })
    }
  },
  created () {
    this.getAllQuestion()
  }
}
</script>

<style scoped>
  .question {
    border-bottom: 5px solid #343a40;
    margin: 10px 0px;
  }
  .flex {
    display: flex;
  }
  .col-6 {
    flex: 0 0 0;
  }
  .title {
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    word-wrap:break-word;
    width: 50%;
  }
</style>
