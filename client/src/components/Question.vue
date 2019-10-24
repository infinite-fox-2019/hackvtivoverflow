<template>
  <div
    v-if="this.question"
    class="column"
    style="width: 80vw; margin-left: 10vw;"
  >
    <div class="col-10">
      <h4>{{ question.title }}</h4>
      <p><span disabled>Asked</span> {{ time }}</p>
      <q-separator />
    </div>
    <div class="col row">
      <div class="col-1" style="max-width: 5vw;">
        <q-icon
          id="voteButton"
          @click="upvote(question._id)"
          name="keyboard_arrow_up"
          size="50px"
        />
        <h4 style="margin: 0px; margin-left: 1vw !important;">{{ votes }}</h4>
        <q-icon
          id="voteButton"
          @click="downvote(question._id)"
          name="keyboard_arrow_down"
          size="50px"
        />
      </div>
      <div class="col" style="padding: 30px; width: 70vw;">
        <span v-html="question.description"> </span>
      </div>
    </div>
    <div class="col">
      <h6 disabled style="margin: 20px;">{{ answerLength }}</h6>
      <q-separator />
      <div v-for="(answer, index) in answers" :key="index">
        <Answer
          @requestRefresh="fetchAnswers(question._id)"
          :answer="answer"
          :question="question"
        />
        <q-separator v-if="index + 1 !== answers.length" />
      </div>
      <Editor
        @requestRefresh="fetchAnswers(question._id)"
        :question="question"
      />
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Answer from "./Answer.vue";
import Editor from "./Editor.vue";

export default {
  name: "Question",
  components: {
    Answer,
    Editor
  },
  data() {
    return {
      question: null,
      answers: [],
      time: null
    };
  },
  methods: {
    fetchQuestion(question_id) {
      Axios({
        method: "get",
        url: `http://localhost:3000/question/${question_id}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.question = data;
        })
        .catch(console.log);
    },
    fetchAnswers(question_id) {
      Axios({
        method: "get",
        url: `http://localhost:3000/answer/${question_id}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.answers = data;
        })
        .catch(console.log);
    },
    upvote(questionId) {
      Axios({
        method: "post",
        url: `http://localhost:3000/question/upvote/${questionId}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          const { response } = data;
          this.fetchQuestion(questionId);
          this.$awn.success(response);
        })
        .catch(console.log);
    },
    downvote(questionId) {
      Axios({
        method: "post",
        url: `http://localhost:3000/question/downvote/${questionId}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          const { response } = data;
          this.fetchQuestion(questionId);
          this.$awn.success(response);
        })
        .catch(console.log);
    }
  },
  created() {
    if (!this.$store.state.user) {
      this.$router.push("/");
    } else {
      this.fetchQuestion(this.$route.params.id);
      this.fetchAnswers(this.$route.params.id);
    }
  },
  watch: {
    question() {
      this.$store.dispatch("timelapse", this.question.created_at).then(data => {
        this.time = data;
      });
    }
  },
  computed: {
    votes() {
      return this.question.upvote.length - this.question.downvote.length;
    },
    answerLength() {
      if (this.answers.length === 1) {
        return `${this.answers.length} Answer`;
      } else {
        return `${this.answers.length} Answers`;
      }
    }
  }
};
</script>

<style scoped>
#voteButton:hover {
  transform: scale(1.5, 1.5);
}
</style>
