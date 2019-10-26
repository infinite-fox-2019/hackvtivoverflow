<template>
  <section id="create-question-page">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Create Question</div>
          <div class="card-body">
            <form @submit.prevent="createQuestion" action="#">
              <div class="form-group">
                <label for="#">Title</label>
                <input
                  v-model="formQuestion.title"
                  autofocus
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="#">Description</label>
                <wysiwyg v-model="formQuestion.description"></wysiwyg>
              </div>
              <div class="form-group">
                <label for="#">Tags</label>
                <vue-tags-input
                  v-model="formQuestion.tag"
                  :tags="formQuestion.tags"
                  @tags-changed="newTags => (formQuestion.tags = newTags)"
                />
              </div>
              <button class="btn btn-primary px-4">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "create-question",
  components: {
    VueTagsInput
  },
  created() {
    this.formQuestion = {
      title: "",
      description: "",
      tag: "",
      tags: []
    };
  },
  destroyed() {
    this.formQuestion = {
      title: "",
      description: "",
      tag: "",
      tags: []
    };
  },
  computed: {
    formQuestion: {
      get() {
        return this.$store.state.formQuestion;
      },
      set(val) {
        return this.$store.commit("updateFormQuestion", val);
      }
    }
  },
  methods: {
    createQuestion() {
      this.$store.dispatch("createQuestion");
    }
  }
};
</script>

<style></style>
