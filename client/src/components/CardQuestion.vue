<template>
  <div>
      <div v-if="questions.length" class="card-question d-flex flex-column align-items-center">
        <div class="card-item" v-for="question in questions" :key="question._id">
            <div class="content mb-2">
                <h4>{{ question.title }}</h4>
                  <div v-if="actions" class="actions">
                      <span style="cursor: pointer;"  @click.prevent="toEdit(question._id)">edit</span> |
                      <span style="cursor: pointer;"  @click.prevent="deleteQuestion(question._id)">remove</span>
                  </div>
              <p  style="cursor: pointer;" @click.prevent="toAnswer(question._id)" class="card-des" v-html="question.description.substring(0, 500)"></p>
            </div>

          <div class="d-flex justify-content-between">
              <div class="tags">
                  <span class="tag" v-for="(tag, index) in question.tags" :key="index" @click.prevent="getQuestionByTag(tag)">#{{tag}}</span>
              </div>
              <div class="ask-by">
                  Ask by:  {{ question.userId.email +' | '+ dateFormat(question.createdAt)}}
              </div>
          </div>
        </div>
    </div>
    <div v-else>
            <h1 class="text-center mt-5">you never ask anything</h1>
            <p class="text-center">your question goes here</p>
            <div class="d-flex justify-content-center">
              <img src="../../public/empty.svg" style="height: 300px;">
            </div>
        </div>
  </div>
</template>

<script>
export default {
  props: ['questions', 'actions'],
  methods: {
    dateFormat (date) {
      let event = new Date(date)
      let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return event.toLocaleDateString('en-US', options)
    },
    toAnswer (questionId) {
      this.$router.push(`/answer/${questionId}`)
    },
    deleteQuestion (questionId) {
      this.$store.dispatch('deleteQuestion', questionId)
    },
    toEdit (questionId) {
      this.$router.push(`/update/${questionId}`)
    },
    getQuestionByTag (tag) {
      this.$store.dispatch('getQuestionByTag', tag)
    }
  }
}
</script>

<style>
.card-question{
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.card-item{
    width: 80%;
    border-radius: 15px;
    box-shadow: 10px -8px 60px -13px rgba(150, 51, 255, 0.253);
    padding: 15px;
    margin-top: 20px;
}

.card-item:hover{
  background-color: rgba(61, 61, 61, 0.102);
}

.content {
    max-height: 250px;
    overflow: hidden;
}

.card-item h4{
    text-align: center;
    color: rgba(0, 0, 0, 0.856);
}

.tags{
    width: 60%;
    display: flex;
    flex-wrap: wrap;
}

.tag {
    padding: 3px 10px;
    background-color: rgba(150, 51, 255, 0.342);
    border-radius: 15px;
    color: white;
    margin: 2px;
    cursor: pointer;
}

.card-des{
    font-family: 'Montserrat', sans-serif;
}

.ask-by {
    font-size: 11px;
    color: gray;
}

.actions span{
    font-size: 12px;
    transition: 300ms;
}

.actions span:first-child{
      color: rgb(0, 110, 255);
}

.actions span:last-child{
    color: tomato;
}

.actions span:hover{
    font-size: 15px;
}

</style>
