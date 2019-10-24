<template>
  <section id="show-question-page">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Question
            <br />
            <small>by: {{ questionDetail.userId.name }}</small>
          </div>
          <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="col-2">
                  <a @click.prevent="upvote(questionDetail._id)" href="#">
                    <i class="fa fa-sort-up"></i>
                  </a>
                  <p>
                    {{
                      questionDetail.upvotes.length -
                        questionDetail.downvotes.length
                    }}
                  </p>
                  <a @click.prevent="downvote(questionDetail._id)" href="#">
                    <i class="fa fa-sort-down"></i>
                  </a>
                </div>
                <div class="col-9">
                  <b>{{ questionDetail.title }}</b>
                  <div v-html="questionDetail.description"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="answer in questionDetail.answers"
        :key="answer.id"
        class="col-md-12 my-2"
      >
        <div class="card">
          <div class="card-header">
            Answer
            <br />
            <small>by: {{ answer.userId.name }}</small>
          </div>
          <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="col-2">
                  <a
                    @click.prevent="
                      upvoteA({
                        answerId: answer._id,
                        questionId: questionDetail._id
                      })
                    "
                    href="#"
                  >
                    <i class="fa fa-sort-up"></i>
                  </a>
                  <p>{{ answer.upvotes.length - answer.downvotes.length }}</p>
                  <a
                    @click.prevent="
                      downvoteA({
                        answerId: answer._id,
                        questionId: questionDetail._id
                      })
                    "
                    href="#"
                  >
                    <i class="fa fa-sort-down"></i>
                  </a>
                </div>
                <div class="col-9">
                  <div v-html="answer.description"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 my-3">
        <div class="card">
          <div class="card-header">Enter Your Answer</div>
          <div class="card-body">
            <form
              @submit.prevent="addAnswer({ questionId: questionDetail._id })"
              action="#"
            >
              <div class="form-group">
                <label for="#">Description</label>
                <wysiwyg v-model="formAnswer.description"></wysiwyg>
              </div>
              <button type="submit" class="btn btn-primary px-3">
                Submit Answer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ShowQuestion",
  watch: {
    $route(to) {
      this.getQuestionDetail(to.params.id);
    }
  },
  computed: {
    formAnswer: {
      get() {
        return this.$store.state.formAnswer;
      },
      set(val) {
        return this.$store.commit("updateFormAnswer", val);
      }
    },
    questionDetail() {
      return this.$store.state.questionDetail;
    }
  },
  created() {
    this.getQuestionDetail(this.$route.params.id);
  },
  methods: {
    getQuestionDetail(id) {
      this.$store.dispatch("getQuestionDetail", id);
    },
    addAnswer(payload) {
      this.$store.dispatch("addAnswer", payload);
    },
    upvote(_id) {
      return this.$store.dispatch("upvoteQ", _id);
    },
    downvote(_id) {
      return this.$store.dispatch("downvoteQ", _id);
    },
    upvoteA(data) {
      return this.$store.dispatch("upvoteA", data);
    },
    downvoteA(data) {
      return this.$store.dispatch("downvoteA", data);
    }
  }
};
</script>

<style></style>
