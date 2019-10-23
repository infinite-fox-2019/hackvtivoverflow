<template>
  <div class='main-container'>
    <div class="header">
      <div class="row">
        <div class="col-8">
          <div class="text">
            <h2>Top Question</h2>
          </div>
          <div>
            <p>{{ questions.length }} questions</p>
          </div>
        </div>
        <div class="col-4">
          <div class='askquestion'>
            <router-link to='/ask'><a class='h2'>Ask Question</a></router-link>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div class="body">
      <div v-for='(question,i) in questions' :key='i'>
        <QuestionHome :question='question' @fetchAgain='okeFetch'/>
    </div>
  </div>
    <div class="foot">
      'sfasa
    </div>
</div>
</template>

<script>
import QuestionHome from '../components/QuestionHome'

export default {
  data () {
    return {
      questions: ''
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
          console.log(data)
          this.questions = data
        })
        .catch(console.log);
    }
  },
  created () {
    this.fetchData();
  }
}
</script>

<style scoped lang='scss'>

.h2{
  font-size:14px;
  text-transform:uppercase;
  letter-spacing:3px;
}
.askquestion{
  margin-top: 10px;
  margin-left: 25px;
  font-size: 25px;
}
.col-4 {
  padding: 20px;
}
.h2{
  position: absolute
}
.header{
  height: 5vw;
  background-color: bisque;
}
p {
  font-size: 15px;
  margin-left: 25px;
}
.body{
  overflow: auto;
  height: 41vw;
}
.foot{
  height: 5vw;
  background-color: salmon;
}

</style>