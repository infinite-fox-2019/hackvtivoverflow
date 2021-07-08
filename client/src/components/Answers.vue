<template>
  <div>
    <div class="columns" v-for="answer in answers" :key="answer._id">
      <div class="column question-counts has-text-grey">
        <div class="question-counts-item" @click="upvote(answer._id)">
          <b-icon class="vote"
            pack="fas"
            icon="caret-up">
          </b-icon>
        </div>
        <div class="question-counts-item num">
          {{ totalVote(answer.upvotes, answer.downvotes) }}
        </div>
        <div class="question-counts-item" @click="downvote(answer._id)">
          <b-icon class="vote"
            pack="fas"
            icon="caret-down">
          </b-icon>
        </div>
      </div>
      <div class="column question-details is-two-thirds">
        <div>{{ answer.title }}</div>
        <div class="question-details-item" v-html="answer.description">
        </div>
      </div>
      <div class="column question-poster has-text-grey">
        <div class="question-poster-item">
        {{ timeAgoDate(answer.created_at) }}
        </div>
        <div class="question-poster-item">
          <button class="button is-dark">{{ userInitial(answer.user.username) }}</button>
          {{ answer.user.username }}
        </div>
      </div>
    </div>
    <hr>
    <AnswerForm></AnswerForm>
  </div>
</template>

<script>
import timeAgo from '../helpers/timeAgo'
import AnswerForm from './AnswerForm'

export default {
  name: 'Answers',
  components: {
    AnswerForm
  },
  computed: {
    answers () {
      return this.$store.state.question.answers
    }
  },
  methods: {
    timeAgoDate (date) {
      return timeAgo.format(new Date(date))
    },
    userInitial (username) {
      return username.charAt(0).toUpperCase()
    },
    totalVote (upvotes, downvotes) {
      return upvotes.length - downvotes.length
    },
    upvote (id) {
      this.$store.dispatch('vote', {
        collection: 'answers',
        type: 'upvote',
        id,
        questionId: this.$route.params.id
      })
    },
    downvote (id) {
      this.$store.dispatch('vote', {
        collection: 'answers',
        type: 'downvote',
        id,
        questionId: this.$route.params.id
      })
    }
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
@media (max-width: 600px) {
  .question-counts {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
