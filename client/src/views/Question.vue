<template>
<div class="container ">
    <div class="d-flex">
        <div class="mr-auto d-flex justify-content-start mt-5 align-items-start flex-column">
            <h1>All Questions</h1>
            <h4>{{this.$store.state.questions.length}} Questions</h4>
        </div>
        <div class="d-flex align-items-center">
            <button @click="ask" class="btn btn-info">Ask Question</button>
        </div>
    </div>

    <QuestionContainer
      class="mt-3 mb-5"
      v-for="question in $store.state.questions" :key="question._id"
      :question="question"
    />

</div>

</template>

<script>
import QuestionContainer from '@/components/QuestionContainer'
export default {
  components: {
    QuestionContainer
  },
  methods: {
    ask () {
      if (this.$store.state.isLogin === false) {
        this.$store.dispatch('inLoginPage', true)
      } else {
        this.$router.push('/ask')
      }
    }
  },
  created () {
    this.$store.dispatch('generateQuestions')
  }
}
</script>

<style>

</style>
