<template>
  <section id="home-page">
    <div class="row">
      <div
        class="col-md-12 mb-2"
        v-for="question in allQuestions"
        :key="question.id"
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
                <button @click="show(question._id)" class="btn btn-success">
                  {{ question.answers.length }} | Answers
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
  name: "home",
  computed: {
    allQuestions() {
      return this.$store.state.allQuestions;
    }
  },
  created() {
    this.fetchAllQuestion();
  },
  methods: {
    fetchAllQuestion() {
      this.$store.dispatch("fetchAllQuestion");
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
    pushWatchedTags(tag) {
      return this.$store.dispatch("pushWatchedTags", tag);
    }
  }
};
</script>

<style></style>
