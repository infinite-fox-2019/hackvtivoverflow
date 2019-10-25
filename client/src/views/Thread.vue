<template>
  <div class="thread">
    <b-container>
      <b-row>
        <div class="col-1">
        </div>
        <div class="col-11">
          <div class="d-flex justify-content-between">
            <h3>{{ this.$store.state.question.title }}</h3>
            <b-button variant="primary" to="/ask">Ask Question</b-button>
          </div>
          <div class="mt-2">
            <b-list-group>
              <b-list-group-item>
                <b-media>
                  <template v-slot:aside>
                    <b-container class="text-center">
                      <b-row>
                        <b-col>
                          <img
                            src="https://image.flaticon.com/icons/svg/32/32323.svg"
                            alt="upvote"
                            style="height: 30px;"
                            @click="upvote"
                          >
                        </b-col>
                      </b-row>
                      <b-row class="p-1">
                        <b-col>
                          <h5>0</h5>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <img
                            src="https://image.flaticon.com/icons/svg/32/32195.svg"
                            alt="upvote"
                            style="height: 30px;"
                          >
                        </b-col>
                      </b-row>
                    </b-container>
                  </template>
                  <p class="text-break" v-html="this.$store.state.question.desc"></p>
                </b-media>
              </b-list-group-item>
            </b-list-group>
            <h5 class="mt-5">0 Answer</h5>
            <b-list-group>
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
            <div id="answer" class="mt-3">
              <form>
                <div class="form-group">
                  <label style="margin: 0;"><h4>Your Answer</h4></label>
                  <quill v-model="answer" :config="config" output="html"></quill>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Post your answer</button>
              </form>
            </div>
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
      questionId: '',
      answer: '',
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic'],
            ['link', 'blockquote', 'code-block', 'image'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }]
          ]
        },
        theme: 'snow'
      }
    }
  },
  methods: {
    upvote () {
      this.$store
        .dispatch('upVote', this.$route.params.id)
        .then()
        .catch(error => {
          this.$notify({
            group: 'notify',
            title: 'Vote error',
            text: `${error.data.message}`,
            type: 'error'
          })
        })
    },
    downvote () {

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
.ql-container {
  min-height: 100px;
}
</style>
