<template>
  <div class="thread">
    <b-container>
      <b-row>
        <div class="col-1">
          <h3>Left</h3>
        </div>
        <div class="col-11">
          <div class="d-flex justify-content-between">
            <h3>{{ this.$store.state.question.title }}</h3>
            <b-button variant="primary" to="/ask">Ask Question</b-button>
          </div>
          <div class="mt-5">
            <b-media>
              <template v-slot:aside>
                <b-container class="text-center">
                  <b-row>
                    <b-col>
                      <img src="https://image.flaticon.com/icons/svg/32/32323.svg" alt="upvote" style="height: 30px;">
                    </b-col>
                  </b-row>
                  <b-row class="p-1">
                    <b-col>
                      <h5>0</h5>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <img src="https://image.flaticon.com/icons/svg/32/32195.svg" alt="upvote" style="height: 30px;">
                    </b-col>
                  </b-row>
                </b-container>
              </template>
              <p v-html="this.$store.state.question.desc"></p>
            </b-media>
          </div>
          <div class="mt-5">
            <b-list-group id="list-question">
              <!-- <b-list-group-item v-for="question in questions" :key="question.title">
                <b-container>
                  <b-row>
                    <b-col cols="3" class="p-1">
                      <div class="d-flex text-center" style="font-size: 14px;">
                        <p class="px-1 text-muted" style="margin: 0;">1<br>votes</p>
                        <p class="px-1 text-muted" style="margin: 0;">1<br>answers</p>
                        <p class="px-1 text-muted" style="margin: 0;">1<br>views</p>
                      </div>
                    </b-col>
                    <b-col cols="9">
                      <a class="link" @click="linkto(question._id)"><p>{{ question.title }}</p></a>
                      <p v-html="question.desc"></p>
                    </b-col>
                  </b-row>
                </b-container>
              </b-list-group-item> -->
            </b-list-group>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Thread',
  data () {
    return {
      questionId: ''
    }
  },
  created () {
    this.$store.dispatch('fetchQuestionId', this.$route.params.id)
  }
}
</script>

<style>
.thread {
  margin-top: 100px;
}
</style>
