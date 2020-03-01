<template>
  <div class="d-flex">
    <div class="box">
      <div class="header">
        <div>
        <h2>{{display}}</h2>
        <p>{{description}}</p>
        </div>
        <div class="end">
          <h5>{{totalques}} Questions</h5>
        </div>
      </div>
      <hr class="bold" />
      <div v-for="(question, index) in questions" :key="index">
        <OneQuestion :question="question"></OneQuestion>
        <hr v-if="index < questions.length-1" />
      </div>
    </div>
    <div class="righbar">
      <rightbar></rightbar>
    </div>
  </div>
</template>

<script>
import OneQuestion from '../components/OneQuestion.vue'
import Rightbar from '../components/Rightbar.vue'
export default {
  name: 'ListQues',
  data () {
    return {
      routename: this.$route.name
    }
  },
  components: {
    OneQuestion, Rightbar
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    display () {
      if (this.$route.name !== 'all') {
        return this.$store.state.tagname.display
      } else {
        return 'All Question'
      }
    },
    description () {
      if (this.$route.name !== 'all') {
        return this.$store.state.tagname.description
      } else {
        return 'Lorem ipsu seddolo eque commodi nobis minima sed, eius aspedolo eque commodi nobis minima sed, eius aspe, eius asperiores, enim iusto!'
      }
    },
    totalques () {
      return this.questions.length
    }
  },
  created () {
    if (this.$route.name === 'all') {
      this.$store.dispatch('getAll')
    } else if (this.$route.name === 'tagname') {
      this.$store.dispatch('getQuesTag', this.$route.params.tag)
    }
  }
}
</script>

<style>
.box {
  margin-top: 5px;
  margin-bottom: 30px;
  min-height: calc(100vh - 450px);
  width: 58vw;
  border-radius: 8px;
  background: rgb(255, 255, 255);
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
hr {
  margin: 4px !important;
  padding: 0;
}
.header {
  height: 180px;
  text-align: left;
  width: 80%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.bold {
  border: 1px solid rgb(136, 121, 121);
}
.rightbar{
  min-height: 100vh
}
.end{
  display: flex;
  align-items: flex-end
}
</style>
