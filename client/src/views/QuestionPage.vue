<template>
  <div class="detail">
      <div>{{currentQuestion.title}}</div>
      <div>{{currentQuestion.description}}</div>
      <div v-for="(answer, i) in currentQuestion.answers" :key="i">
          {{answer.description}}
      </div>
      <p>woe</p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      question: ''
    }
  },
  methods: {
    ...mapMutations(['setCurrentQuestion']),
    ...mapActions(['getQuestionById'])
  },
  computed: {
    ...mapState(['questions', 'currentQuestion'])
  },
  created: function () {
    for (let i = 0; i < this.questions.length; i++) {
      console.log(this.questions)
      if (this.questions[i]._id === this.$route.params.id) {
        this.setCurrentQuestion(this.questions[i])
      }
    }
  }
}
</script>

<style>
.detail {
    display:flex;
    flex-direction: column;
}
</style>
