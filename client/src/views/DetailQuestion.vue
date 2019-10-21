<template>
  <div id="userPostBlanket">
    <div id="userPostQuestion">
      <b-card id="questionCard">
        <b-card-title id="questionTitle">Why are cats rude?</b-card-title>
        <b-card-text
          id="questionDescription"
        >Like literally ignoring me and stuffs despite of the affection and being taken care of. Why?</b-card-text>

        <i class="fas fa-thumbs-up"></i> 4
        <i class="fas fa-thumbs-down ml-2"></i> 2
        <b-button id="editQuestion" class="ml-2" v-b-modal.edit variant="warning">
          <i class="fas fa-edit"></i>
        </b-button>
        <b-button id="deleteQuestion" class="ml-2" v-b-modal.delete variant="danger">
          <i class="fas fa-trash-alt"></i>
        </b-button>
      </b-card>

      <b-card id="answerCard">
        <b-card-title id="answerTitle">Answer:</b-card-title>
        <b-card-text
          id="answerDescription"
        >They are just like that, really. It's in their nature that they are highly individualistic animal, so they don't like to mingle with other creatures. Don't take it personally. It is just a cat.</b-card-text>

        <div id="voteButtonGroup" style="margin-top: 10px">
          <b-button id="upvoteButton" variant="outline-success">
            <i class="fas fa-thumbs-up"></i>
          </b-button>4
          <b-button id="downvoteButton" variant="outline-danger" class="ml-2">
            <i class="fas fa-thumbs-down"></i>
          </b-button>2
        </div>
      </b-card>

      <b-card id="answerCard">
        <b-card-title id="answerTitle">Answer:</b-card-title>
        <b-card-text
          id="answerDescription"
        >Don't waste your damn time contemplating this. Seriously.</b-card-text>

        <div id="voteButtonGroup" style="margin-top: 10px">
          <b-button id="upvoteButton" variant="outline-success">
            <i class="fas fa-thumbs-up"></i>
          </b-button>1
          <b-button id="downvoteButton" variant="outline-danger" class="ml-2">
            <i class="fas fa-thumbs-down"></i>
          </b-button>3
        </div>
      </b-card>
    </div>

    <!--Modal begins-->

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
export default {};
</script>

<style>
#userPostBlanket {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
}

#userPostQuestion {
  text-align: justify;
  max-width: 60%;
}

#questionCard {
  margin-bottom: 20px;
}

#voteButtonGroup {
  margin-top: 10px;
}
</style>