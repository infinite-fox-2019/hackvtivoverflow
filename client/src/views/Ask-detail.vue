<template>
  <div class="container">
    <p style="font-size: 24px;">
      <strong v-text="ask.title"></strong>
    </p>

    <div class="mini-info">
      <p>published</p>
      <p>20 September 2019</p>
    </div>

    <div class="content">
      <div class="vote">
        <i class="fas fa-chevron-up fa-2x"></i>
        <p v-text="vote">23445</p>
        <i class="fas fa-chevron-down fa-2x"></i>
      </div>

      <div class="content-ask">
        <p v-html="ask.content"></p>
      </div>
    </div>

    <div class="answer-container">
      <p>{{ask.answers.length}} Answer</p>
      <div class="content" v-for="(answer, i) in ask.answers" :key="i">
        <div class="vote">
          <i class="fas fa-chevron-up fa-2x"></i>
          <p>13</p>
          <i class="fas fa-chevron-down fa-2x"></i>
        </div>

        <div class="content-answer">
          <p v-html="answer.content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eos excepturi dolore molestiae, sed minima totam dolor veniam tempora ducimus aut expedita consequatur. Perspiciatis saepe maiores iste atque in quia?.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, earum ab laborum cum dolores totam atque ullam aliquam veniam quisquam quas dolorum aut molestiae exercitationem, necessitatibus consectetur recusandae enim? Explicabo.
          </p>
        </div>
      </div>
    </div>

    <p>Your Answer</p>
    <Wysiwyg @passingcontent="passingcontent" />
    <button @click="postAnswer(ask._id)">Post Answer</button>
  </div>
</template>

<script>
import Wysiwyg from "../components/Wysiwyg.vue";
export default {
  name: `ask-detail`,
  data() {
    return {
      answers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      content: ""
    };
  },
  components: {
    Wysiwyg
  },
  computed: {
    ask() {
      return this.$store.state.ask;
    },
    vote() {
      return this.ask.upvote.length - this.ask.downvote.length;
    }
  },
  methods: {
    passingcontent(content) {
      this.content = content;
    },
    postAnswer(id) {
      let payload = {
        id,
        content: this.content
      };

      this.$store.dispatch("postAnswer", payload);
    }
  },
  created() {
    this.$store.dispatch("findAskById", this.$route.params.id);
  }
};
</script>

<style scoped>
.container {
  text-align: left;
  padding: 20px;
  width: 75vw;
  display: flex;
  flex-direction: column;
}
.mini-info {
  display: flex;
  margin-top: 10px;
}

.mini-info p {
  font-size: 10px;
  margin-right: 10px;
}

.content {
  padding-top: 20px;
  display: flex;
  margin-top: 20px;
  border-top: 1px solid black;
}

.vote {
  text-align: center;
  margin-right: 10px;
}

.answer-container {
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid black;
  border-bottom: 1px solid #000;
  width: 100%;
}
button {
  width: 150px;
  height: 40px;
  background-color: #007ed9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
}
</style>