<template>
  <div>
    <div class="header">
      <div>
        <h1>{{ question.title }}</h1>
      </div>
      <div>
        <router-link to="/questions/ask"><button class="button is-info">Ask Question</button></router-link>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column question-counts has-text-grey">
        <div class="question-counts-item" @click="upvote">
          <b-icon class="vote"
            pack="fas"
            icon="caret-up">
          </b-icon>
        </div>
        <div class="question-counts-item num">
          {{ totalVote }}
        </div>
        <div class="question-counts-item" @click="downvote">
          <b-icon class="vote"
            pack="fas"
            icon="caret-down">
          </b-icon>
        </div>
      </div>
      <div class="column question-details is-two-thirds">
        <div class="question-details-item" v-html="question.description">
        </div>
      </div>
      <div class="column question-poster has-text-grey">
        <div class="question-poster-item">
        {{ timeAgoDate }}
        </div>
        <div class="question-poster-item">
          <button class="button is-dark">{{ userInitial }}</button>
          {{ question.user.username }}
        </div>
      </div>
    </div>
    <div class="answer-count">{{ question.answers.length }} Answers</div>
    <hr>
    <div>
      <Answers></Answers>
    </div>
  </div>
</template>

<script>
import timeAgo from '../helpers/timeAgo'
import { mapState } from 'vuex'
import Answers from '../components/Answers'

export default {
  name: 'QuestionContent',
  components: {
    Answers
  },
  computed: {
    ...mapState(['question']),
    timeAgoDate () {
      return timeAgo.format(new Date(this.question.created_at))
    },
    userInitial () {
      return this.question.user.username.charAt(0).toUpperCase()
    },
    totalVote () {
      return this.question.upvotes.length - this.question.downvotes.length
    }
  },
  methods: {
    getQuestion (id) {
      this.$store.dispatch('fetchQuestion', id)
    },
    upvote () {
      this.$store.dispatch('vote', {
        collection: 'questions',
        type: 'upvote',
        id: this.question._id,
        questionId: this.question._id
      })
    },
    downvote () {
      this.$store.dispatch('vote', {
        collection: 'questions',
        type: 'downvote',
        id: this.question._id,
        questionId: this.question._id
      })
    }
  },
  created () {
    this.getQuestion(this.$route.params.id)
  }
}
</script>

<style scoped>
.questions{
  text-align: left;
}
.question-counts {
  text-align: center;
}
.question-details {
  text-align: left;
  flex-grow: 1;
}
.question-poster {
  text-align: left;
  font-size: 12px;
}
.num {
  font-size: 25px;
}
.q-title {
  font-size: 22px;
  cursor: pointer;
}
.columns {
  padding: 5px;
}
h1 {
  font-size: 28px;
}
.header {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}
.vote {
  cursor: pointer;
}
.answer-count {
  font-size: 20px;
  margin-left: 10px;
}
@media (max-width: 600px) {
  .question-counts {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
