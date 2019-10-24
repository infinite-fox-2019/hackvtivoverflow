<template>
  <div>
    <div v-for='(question, i) in questions' :key='i'>
      <RatingCard :send-question='question'/>
    </div>
  </div>
</template>

<script>
import RatingCard from '../components/RatingCard'

export default {
  data () {
    return {
      questions: ''
    }
  },
  components: {
    RatingCard
  },
  methods: {
    getQuestion () {
      this.$store.dispatch('fetchData')
        .then(data => {
          this.questions = data
          this.$awn.success('Fetching Voting')
        })
        .catch(err => {
          this.$awn.warning(err)
        })
    }
  },
  created () {
    this.getQuestion()
  }
}
</script>

<style>

</style>