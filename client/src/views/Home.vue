<template>
  <div class="flex flex-row w-full" style="min-height: calc(100vh - 7vh)">
    <div class="flex flex-col w-1/6" style="min-height: calc(100vh-7vh)"></div>
    <div class="root w-8/12">
      <div class="flex flex-row justify-between w-full">
        <div class="ml-32">
          <p style="font-size: 1.8rem;">All Questions</p>
          <p v-text="totalQuestion()"></p>
        </div>
        <div class="flex items-center mr-64">
          <router-link to="/ask">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" style="border: none; font-size: 1rem; transition: 0.3s;">Ask Question</button>
          </router-link>
        </div>
      </div>
      <div class="question" v-for="(question, index) in this.$store.state.allQuestions" :key="index">
        <!-- <h1>{{question}}</h1> -->
        <div class="left">
          <div class="value">
            <p v-text="vote(question).num" class="number"></p>
            <p v-text="vote(question).text" class="word">votes</p>
          </div>
          <div class="value">
            <p v-text="answer(question).num" class="number"></p>
            <p v-text="answer(question).text" class="word">answers</p>
          </div>
        </div>
        <div class="right">
          <div class="mt-2">
            <a href style="text-decoration: none;" @click.prevent="toQuestion(question)">
              <h4 class="limit title text-red-700" v-text="question.title"></h4>
            </a>
          </div>
          <div class="description">
            <p class="limit desc" v-html="question.description" style="margin: 0px;"></p>
             <p class="text-right">Question by: {{question.user.username}}</p>

          </div>
        </div>

        
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    toQuestion(question) {
      this.$router.push(`/question/${question._id}`);
    },
    totalQuestion() {
      let num = this.numberWithCommas(this.$store.state.allQuestions.length);
      if (this.$store.state.allQuestions.length <= 1) {
        return `${num} question`;
      } else {
        return `${num} questions`;
      }
    },
    vote(question) {
      let total = question.upvotes.length - question.downvotes.length;
      if (total <= 1 && total >= -1) {
        return {
          num: total,
          text: "vote"
        };
      } else {
        let num = this.numberWithCommas(total);
        return {
          num,
          text: "votes"
        };
      }
    },
    answer(question) {
      if (question.answers.length <= 1) {
        return {
          num: question.answers.length,
          text: "answer"
        };
      } else {
        let num = this.numberWithCommas(question.answers.length);
        return {
          num,
          text: "answers"
        };
      }
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() {
    this.$store.dispatch("fetchQuestions");
  }
};
</script>

<style scoped>
.title {
  font-size: 1.3rem;
  font-weight: 600;
}
.limit {
  width: 60vw;
  height: 4vh;
  overflow: hidden;
  text-overflow: ellipsis;
}
.question .right {
  display: flex;
  flex-direction: column;
  padding: 1vh 1vw;
  width: 90%;
}
.value {
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.word {
  font-size: 0.8rem;
}
.number {
  font-size: 1.5rem;
}
.question .left p {
  margin: 0;
  color: #69737c;
}
.question .left {
  height: 100%;
  width: 10%;
}

.question {
  width: 100%;
  height: 20vh;
  border-top: 1px solid silver;
  display: flex;
}

.root {
  border-left: 1px solid silver;
  min-height: 93vh;
  display: flex;
  flex-direction: column;
}
.wrapper {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

button:hover {
  cursor: pointer;
}
</style>