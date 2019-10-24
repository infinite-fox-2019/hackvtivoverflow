<template>
  <div class="question">
    <b-container>
      <b-row>
        <div class="col-1">
          <h3>Left</h3>
        </div>
        <div class="col-8">
          <div class="d-flex justify-content-between px-2">
            <h3>All Questions</h3>
            <b-button variant="primary" to="/ask">Ask Question</b-button>
          </div>
          <div class="mt-5">
            <b-list-group id="list-question">
              <b-list-group-item v-for="question in questions" :key="question.title">
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
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <div class="col-3">
          <h3>Right</h3>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Question',
  data () {
    return {
      questions: ''
    }
  },
  methods: {
    linkto (questionId) {
      this.$router.push(`/question/${questionId}`)
    }
  },
  created () {
    this.$store
      .dispatch('fetchQuestions')
      .then(result => {
        this.questions = result
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style >
.question {
  margin-top: 100px;
}
.link {
  cursor: pointer;
}
.link p {
  color:lightseagreen;
  margin: 0;
}
</style>
