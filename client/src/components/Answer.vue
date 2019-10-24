<template>
  <div class="row">
    <div class="col-1" style="max-width: 5vw;">
      <q-icon
        id="voteButton"
        @click="upvote(answer._id)"
        name="keyboard_arrow_up"
        size="50px"
      />
      <h4 style="margin: 0px; margin-left: 1vw !important;">{{ votes }}</h4>
      <q-icon
        id="voteButton"
        @click="downvote(answer._id)"
        name="keyboard_arrow_down"
        size="50px"
      />
    </div>
    <div style="width: 70vw; margin:20px;">
      <h4 style="margin: 0px;">{{ answer.title }}</h4>
      <br />
      <span v-html="answer.description"> </span>
      <br /><br />
      <span disabled>Answered</span> {{ time }}
      <br />
      <span disabled>By</span> {{ answer.user.username }}
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Answer",
  props: {
    answer: Object,
    question: Object
  },
  data() {
    return {
      time: null
    };
  },
  methods: {
    upvote(answerId) {
      Axios({
        method: "post",
        url: `http://localhost:3000/answer/${this.question._id}/upvote/${answerId}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          const { response } = data;
          this.$emit("requestRefresh");
          this.$awn.success(response);
        })
        .catch(console.log);
    },
    downvote(answerId) {
      Axios({
        method: "post",
        url: `http://localhost:3000/answer/${this.question._id}/downvote/${answerId}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          const { response } = data;
          this.$emit("requestRefresh");
          this.$awn.success(response);
        })
        .catch(console.log);
    }
  },
  computed: {
    votes() {
      return this.answer.upvote.length - this.answer.downvote.length;
    }
  },
  mounted() {
    this.$store.dispatch("timelapse", this.question.created_at).then(data => {
      this.time = data;
    });
  }
};
</script>

<style></style>
