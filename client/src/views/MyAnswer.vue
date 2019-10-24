<template>
  <section id="myanswer-page">
    <div class="row">
      <div v-for="answer in myAnswers" :key="answer._id" class="col-md-12 mb-2">
        <div class="card">
          <div class="card-header">
            Answer
            <br />
            <small>by: {{ answer.userId.name }}</small>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-2">
                <a @click.prevent="upvote({ answerId: answer._id })" href="#">
                  <i class="fa fa-sort-up"></i>
                </a>
                <p>{{ answer.upvotes.length - answer.downvotes.length }}</p>
                <a @click.prevent="downvote({ answerId: answer._id })" href="#">
                  <i class="fa fa-sort-down"></i>
                </a>
              </div>
              <div class="col-9">
                <div v-html="answer.description"></div>

                <button @click="edit(answer._id)" class="btn btn-info">
                  Edit
                </button>
                <button
                  @click="deleteAnswer(answer._id)"
                  class="btn btn-danger ml-1"
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
  name: "MyAnswer",
  computed: {
    myAnswers() {
      return this.$store.state.myAnswers;
    }
  },
  created() {
    this.fetchMyAnswer();
  },
  methods: {
    fetchMyAnswer() {
      this.$store.dispatch("fetchMyAnswer");
    },
    show(id) {
      this.$router.push(`/answer/${id}`);
    },
    upvote(data) {
      return this.$store.dispatch("upvoteA", data);
    },
    downvote(data) {
      return this.$store.dispatch("downvoteA", data);
    },
    deleteAnswer(id) {
      return this.$store.dispatch("deleteAnswer", id);
    },
    edit(id) {
      return this.$router.push(`/answer/edit/${id}`);
    }
  }
};
</script>

<style></style>
