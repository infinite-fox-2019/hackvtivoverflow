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
          <router-link to='/ask'><a class='btn-primary'>Ask Question</a></router-link>
        </div>
      </div>
      <hr>
    </div>
    <div class="body">
      <div v-for='(question,i) in questions' :key='i'>
        <QuestionHome />
    </div>
  </div>
    <div class="foot">
fsa
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
    fetchData () {
      this.$store.dispatch('fetchData')
        .then(data => {
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

<style scoped>
.col-4 {
  padding: 20px;
}
a{
  color: black;
}
a:hover{
  background-color: salmon;
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
  background-color: rosybrown;
}
.foot{
  height: 5vw;
  background-color: salmon;
}
</style>