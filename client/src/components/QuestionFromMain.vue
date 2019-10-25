<template>
  <div>
    <q-item
      clickable
      @click="getDetail(question._id)"
      v-ripple
      style="padding: 20px;"
    >
      <q-item-section avatar>
        <div>{{ question.upvote.length }} Upvotes</div>
        <div>{{ answerLength }}</div>
        <div>{{ question.downvote.length }} Downvotes</div>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{ question.title }}</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold"
            >Asked By : {{ question.user.username }}</span
          >
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        {{ time }}
      </q-item-section>
    </q-item>
    <q-separator inset="item" v-if="index + 1 !== question.length" />
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "QuestionBar",
  props: {
    question: Object,
    index: Number
  },
  data() {
    return {
      answers: null,
      time: null
    };
  },
  methods: {
    getDetail(id) {
      this.$router.push(`/question/${id}`);
    },
    getNumOfAnswers(id) {
      Axios({
        method: "get",
        url: `http://hoverflow-server.ricky-works.online/answer/${id}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.answers = data.length;
        })
        .catch(console.log);
    }
  },
  mounted() {
    this.getNumOfAnswers(this.question._id);
    this.$store.dispatch("timelapse", this.question.created_at).then(data => {
      this.time = data;
    });
  },
  computed: {
    answerLength() {
      if (this.answers === 1) {
        return `${this.answers} Answer`;
      } else {
        return `${this.answers} Answers`;
      }
    }
  }
};
</script>

<style></style>
