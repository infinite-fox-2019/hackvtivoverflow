<template>
  <div id="navbar">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand>
        <i class="fas fa-comments"></i> Hacktivoverflow
      </b-navbar-brand>
      <b-button id="addQuestion" v-b-modal.add variant="success">Add Question</b-button>
    </b-navbar>

    <!--Modal to add new question-->
    <div id="modalAdd">
      <b-modal
        id="add"
        title="Add question"
        ok-title="Submit"
        ok-variant="success"
        cancel-variant="danger"
      >
        <p class="my-2">
          <b-form-group id="taskTitleGroup" label="Question title:" label-for="questionTitleLabel">
            <b-form-input id="questionTitleEntry" required placeholder="Enter question title"></b-form-input>
          </b-form-group>

          <b-form-group
            id="questionDescriptionGroup"
            label="Question description:"
            label-for="questionDescriptionLabel"
          >
            <b-form-textarea
              id="questionDescriptionEntry"
              required
              placeholder="Enter question description"
              rows="3"
              max-rows="5"
            ></b-form-textarea>
          </b-form-group>
        </p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#navbar {
  font-family: Nunito;
}
#addQuestion {
  margin-left: 30px;
}
</style>