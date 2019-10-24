<template>
<div class="card25 card-blue-light">
  <div class="tittle">
    <h3>{{ getAnswer.QuestionId.title }}</h3>
    <div class="row">
      <div class="col">
        <small>Vote: {{ getAnswer.QuestionId.upvotes.length - getAnswer.QuestionId.downvotes.length }}</small>
      </div>
      <div class="col">
        <small>CreatedAt: {{ getAnswer.QuestionId.createdAt }}</small>
      </div>
    </div>
    <hr>
  </div>
  <div class="boddyy">
    <p v-html='getAnswer.response'></p>
    <hr>
  </div>
  <div class="foott">
    <div class="row">
      <div class="col-6">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['getAnswer']
}
</script>

<style>
.tittle {
  height: 100%;
}
.foott {
  height: 35px;
}
.boddyy {
  height:100%;
  margin-top: 5px;
}
</style>