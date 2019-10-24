<template>
  <section id="create-answer-page">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Edit Answer</div>
          <div class="card-body">
            <form @submit.prevent="editAnswer" action="#">
              <div class="form-group">
                <label for="#">Your Answer</label>
                <wysiwyg v-model="formAnswer.description"></wysiwyg>
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
export default {
  name: "edit-answer",
  created() {
    this.fetchAnswerForm();
  },
  destroyed() {
    this.formAnswer["description"] = "";
  },
  computed: {
    formAnswer: {
      get() {
        return this.$store.state.formAnswer;
      },
      set(val) {
        return this.$store.commit("updateFormAnswer", val);
      }
    }
  },
  methods: {
    editAnswer() {
      this.$store.dispatch("editAnswer", this.$route.params.id);
    },
    fetchAnswerForm() {
      this.axios({
        url: `/answer/show/${this.$route.params.id}`,
        method: "get",
        baseURL: this.baseURL
      })
        .then(response => {
          let { data } = response;
          this.formAnswer.description = data.description;
        })
        .catch(err => {
          this.Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    }
  }
};
</script>

<style></style>
