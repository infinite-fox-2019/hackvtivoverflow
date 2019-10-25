<template>
  <div class="questions">
    <div class="question" v-for="(question, i) in questions" :key="i">
      <div class="question-count">
        {{question.upvotes.length}}
      </div>
      <div class="question-main">
        <a href="" @click.prevent="goToQuestionPage(question._id)">{{question.title}}</a>
        <p v-html="question.description"></p>
      </div>
    </div>
    <button @click="fetchQuestions">click me to fetch questions</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  methods: {
    goToQuestionPage: function (id) {
      this.$router.push(`/questions/${id}`)
    },
    ...mapActions(['fetchQuestions'])
  },
  computed: {
    ...mapState(['questions'])
  },
  created: function () {
    this.fetchQuestions()
  }
}
</script>

<style>

.question {
  display: flex;
}

.question-main {
  display: flex;
  flex-direction: column;
  width: 90%;
}

.question-count {
  width: 10%;
  display: flex;
  flex-direction: column;
}
</style>
