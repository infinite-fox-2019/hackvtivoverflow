<template>
<div>
  <div v-for='(question,i) in questions' :key='i'>
    <QuestionHome :question='question'/>
  </div>
</div>
</template>

<script>
import axios from '@/apis/server.js'
import QuestionHome from '@/components/QuestionHome.vue'

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
    fetchByTag () {
      this.$Progress.start()
      axios({
        method: 'get',
        url: '/questions/watchTag',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.questions = data.questions
          this.$Progress.finish()
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
          this.$$Progress.fail()
        })
    }
  },
  created () {
    this.fetchByTag()
  }
}
</script>

<style>

</style>