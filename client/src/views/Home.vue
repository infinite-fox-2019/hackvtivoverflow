<template>
  <div id="dashboardBlanket">
    <div id="dashboardCard">
      <b-card id="questionCard">
        <b-card-title>Why do some cats cry?</b-card-title>
        <b-card-text>I have seen a couple of cats cry for no reason. Why?</b-card-text>

        <b-link href="#" class="card-link">2 Answers</b-link>
        <b-link href="#" class="card-link">
          <i class="fas fa-thumbs-up"></i> 4
        </b-link>
        <b-link href="#" class="card-link">
          <i class="fas fa-thumbs-down"></i> 2
        </b-link>
        <div id="buttonGroup">
          <b-button v-b-modal.edit variant="warning">Edit</b-button>
          <b-button v-b-modal.delete variant="danger">Delete</b-button>
        </div>
      </b-card>

      <b-card>
        <b-card-title>Why do cats behave so rude?</b-card-title>
        <b-card-text>I have showered my cats all the attention he needs. I feed them regularly. I clean his litter box and even give him toys. But he never wants to play with me. Whenever I ask him to play, he just ignores me completely or fiercely meowing at me than takes a leap and takes off. Why is my cat so rude? Why are cats generally rude?</b-card-text>

        <b-link href="#" class="card-link">5 Answers</b-link>
        <b-link href="#" class="card-link">
          <i class="fas fa-thumbs-up"></i> 2
        </b-link>
        <b-link href="#" class="card-link">
          <i class="fas fa-thumbs-down"></i> 3
        </b-link>
        <div id="buttonGroup">
          <b-button v-b-modal.answer variant="success">Answer</b-button>
        </div>
      </b-card>
    </div>

    <div id="modalAnswer">
      <b-modal
        id="answer"
        title="Why do some cats cry?"
        ok-title="Submit"
        ok-variant="success"
        cancel-variant="danger"
      >
        <p class="my-2">
          <b-form-group
            id="answerDescriptionGroup"
            label="Answer:"
            label-for="answerDescriptionLabel"
          >
            <b-form-textarea
              id="answerDescriptionEntry"
              required
              placeholder="Enter answer description"
              rows="3"
              max-rows="5"
            ></b-form-textarea>
          </b-form-group>
        </p>
      </b-modal>
    </div>

    <div id="modalEdit">
      <b-modal
        id="edit"
        title="Edit question"
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

    <div id="modalDelete">
      <b-modal
        id="delete"
        title="Delete question"
        ok-title="Yes"
        ok-variant="success"
        cancel-variant="danger"
      >
        <p class="my-2">
          Are you sure you want to delete this question?
          <br />Disclaimer: Answers of this question will also be deleted.
        </p>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style scoped>
#dashboardBlanket {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  font-family: Nunito;
}

#dashboardCard {
  text-align: justify;
  max-width: 60%;
}

#questionCard {
  margin-bottom: 20px;
}

#buttonGroup {
  margin-top: 10px;
}
</style>
