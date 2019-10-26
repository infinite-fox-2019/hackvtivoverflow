<template>
  <section id="myquestion-page">
    <div class="row">
      <div
        v-for="question in myQuestions"
        :key="question._id"
        class="col-md-12 mb-2"
      >
        <div class="card">
          <div class="card-header">
            Question
            <br />
            <small>by: {{ question.userId.name }}</small>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-2">
                <a @click.prevent="upvote(question._id)" href="#">
                  <i class="fa fa-sort-up"></i>
                </a>
                <p>{{ question.upvotes.length - question.downvotes.length }}</p>
                <a @click.prevent="downvote(question._id)" href="#">
                  <i class="fa fa-sort-down"></i>
                </a>
              </div>
              <div class="col-9">
                <b>{{ question.title }}</b>
                <div v-html="question.description"></div>
                <div
                  class="mb-3"
                  v-if="question.tags && question.tags.length > 0"
                >
                  Tags :
                  <div
                    style="cursor: pointer"
                    v-for="(tag, index) in question.tags"
                    :key="index"
                    @click.prevent="pushWatchedTags(tag)"
                    class="badge badge-info mr-1"
                  >
                    {{ tag }}
                  </div>
                </div>
                <button
                  @click="show(question._id)"
                  class="btn btn-success mr-1 mt-1"
                >
                  {{ question.answers.length }} | Answers
                </button>
                <button
                  @click="edit(question._id)"
                  class="btn btn-info mr-1 mt-1"
                >
                  Edit
                </button>
                <button
                  @click="deleteQuestion(question._id)"
                  class="btn btn-danger mt-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MyQuestion",
  computed: {
    myQuestions() {
      return this.$store.state.myQuestions;
    }
  },
  created() {
    this.fetchMyQuestion();
  },
  methods: {
    fetchMyQuestion() {
      this.$store.dispatch("fetchMyQuestion");
    },
    show(id) {
      this.$router.push(`/question/${id}`);
    },
    upvote(_id) {
      return this.$store.dispatch("upvoteQ", _id);
    },
    downvote(_id) {
      return this.$store.dispatch("downvoteQ", _id);
    },
    deleteQuestion(id) {
      return this.$store.dispatch("deleteQuestion", id);
    },
    edit(id) {
      return this.$router.push(`/question/edit/${id}`);
    },
    pushWatchedTags(tag) {
      return this.$store.dispatch("pushWatchedTags", tag);
    }
  }
};
</script>

<style></style>
