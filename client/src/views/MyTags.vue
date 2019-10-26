<template>
  <section id="watchedtags-page">
    <div class="row">
      <div class="col-md-12">
        <div
          class="btn-group mr-3 mb-3"
          role="group"
          v-for="(tag, index) in watchedTags"
          :key="index"
        >
          <button
            @click="getQuestionByTag(tag)"
            type="button"
            class="btn btn-lg btn-info"
          >
            {{ tag }}
          </button>
          <button
            @click="pullWatchedTags(tag)"
            type="button"
            class="btn btn-lg btn-info"
          >
            <i class="fa fa-eye-slash"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MyTags",
  computed: {
    watchedTags() {
      return this.$store.state.watchedTags;
    }
  },
  created() {
    this.getWatchedTags();
  },
  methods: {
    getWatchedTags() {
      this.$store.dispatch("getWatchedTags");
    },
    pullWatchedTags(tag) {
      this.$store.dispatch("pullWatchedTags", tag);
    },
    getQuestionByTag(tag) {
      this.$router.push(`/question/tag/${tag}`);
    }
  }
};
</script>

<style></style>
