<template>
<div>
  <div v-for='(question,i) in questions' :key='i'>
    <QuestionHome :question='question' @fetchAgain='okeFetch'/>
  </div>
</div>
</template>

<script>
import QuestionHome from '@/components/QuestionHome'

export default {
  data () {
    return {
      questions: []
    }
  },
  components: {
    QuestionHome
  },
  methods: {
    okeFetch () {
      this.fetchData()
    },
    fetchData () {
      this.$store.dispatch('fetchData')
        .then(data => {
          this.questions = data
        })
        .catch(console.log);
    }
  },
  created () {
    this.fetchData()
    setTimeout(() => {
      console.log(this.questions)
    }, 800);
  }
}
</script>

<style>

</style>