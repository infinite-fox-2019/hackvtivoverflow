<template>

    <b-container class="w-75">

      <b-row>
        <b-col class="">
          <b-jumbotron header="Question List" class="p-5 bg-light border mb-0" lead="">
            <router-link to="/addquestion"><b-button class="mt-3" variant="primary">Add Question</b-button></router-link>
          </b-jumbotron>
        </b-col>
      </b-row>

      <QuestionList v-for="(dataQuestion,index) in question" :key="index" :data="dataQuestion" />

    </b-container>

</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'home',
  components: {
    QuestionList
  },
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('A_FETCH_QUESTION_LIST')
  },
  computed: {
    question () {
      return this.$store.state.questionList
    }
  }
}
</script>
