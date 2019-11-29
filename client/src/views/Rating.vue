<template>
  <div>
  <div v-for='(question, i) in questions' :key='i'>
    <RatingCard :send-question='question'/>
  </div>
  </div>
</template>

<script>
import RatingCard from '../components/RatingCard'
import axios from '@/apis/server.js'

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
  getTopQuestion () {
    this.$Progress.start()
    axios({
      method: 'get',
      url: '/questions/top'
    })
      .then(({data}) => {
        this.questions = data.questions.reverse()
        this.$Progress.finish()
      })
      .catch(err => {
        this.$awn.warning(err.response.data.msg)
        this.$Progress.fail()
      })
    }
  },
  created () {
    this.getTopQuestion()
  }
}
</script>

<style>

</style>