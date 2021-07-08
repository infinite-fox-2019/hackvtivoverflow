<template>
  <div class="columns">
    <div class="column question-counts has-text-grey">
      <div class="question-counts-item num">
        {{ totalVote }}
      </div>
      <div class="question-counts-item">
        votes
      </div>
        <div class="question-counts-item num">
        {{ question.answers.length }}
      </div>
      <div class="question-counts-item">
        answers
      </div>
    </div>
    <div class="column question-details is-three-fifths">
      <span class="q-title has-text-info" @click="$router.push(`/questions/${question._id}`)">
        {{ question.title }}
      </span>
      <div class="question-details-item">
        {{ normalizedDescription }}
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
</template>

<script>
import timeAgo from '../helpers/timeAgo'

export default {
  name: 'Question',
  props: ['question'],
  computed: {
    timeAgoDate () {
      return timeAgo.format(new Date(this.question.created_at))
    },
    userInitial () {
      return this.question.user.username.charAt(0).toUpperCase()
    },
    normalizedDescription () {
      const div = document.createElement('div')
      div.innerHTML = this.question.description
      let result = div.textContent || div.innerText || ''
      if (result.length > 200) {
        result = result.substring(0, 200) + '...'
      }
      return result
    },
    totalVote () {
      return this.question.upvotes.length - this.question.downvotes.length
    }
  }
}
</script>

<style>
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
@media (max-width: 600px) {
  .question-counts {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
