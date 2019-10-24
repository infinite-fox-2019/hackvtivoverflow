<template>
  <div class="row" style="max-width: 100vw;">
    <div class="col">
      <div class="q-pa-md q-gutter-md">
        <q-list bordered class="rounded-borders">
          <q-item-label header>Questions</q-item-label>
          <div v-for="(question, index) in questions" :key="index">
            <OptionizedQuestion
              @requestRefresh="refresh"
              :question="question"
              :index="index"
            />
          </div>
        </q-list>
      </div>
    </div>
    <div class="col">
      <div class="q-pa-md q-gutter-md">
        <q-list bordered class="rounded-borders">
          <q-item-label header>Answers</q-item-label>
          <div v-for="(answer, index) in answers" :key="index">
            <OptionizedAnswer
              @requestRefresh="refresh"
              :answer="answer"
              :index="index"
            />
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import OptionizedQuestion from "./OptionizedQuestion.vue";
import OptionizedAnswer from "./OptionizedAnswer.vue";
import Axios from "axios";

export default {
  name: "Collection",
  components: {
    OptionizedQuestion,
    OptionizedAnswer
  },
  data() {
    return {
      questions: [],
      answers: []
    };
  },
  methods: {
    fetchQuestions() {
      Axios({
        method: "get",
        url: "http://localhost:3000/question",
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.questions = data;
        })
        .catch(console.log);
    },
    fetchAnswers() {
      Axios({
        method: "get",
        url: "http://localhost:3000/answer",
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.answers = data;
        })
        .catch(console.log);
    },
    refresh() {
      this.fetchQuestions();
      this.fetchAnswers();
    }
  },
  mounted() {
    this.fetchQuestions();
    this.fetchAnswers();
  },
  watch: {
    "$store.state.user"() {
      if (!this.$store.state.user) {
        this.$router.push("/");
      }
    }
  }
};
</script>
