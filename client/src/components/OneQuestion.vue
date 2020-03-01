<template>
  <div class="d-flex ml-5 mr-1">
    <div class="vote mr-5 mt-2">
        <div class="my-3">
      <h4>{{totalVote}}</h4>
      <p>votes</p>
        </div>
   <h4>{{answers}}</h4>
      <p>answers</p>
    </div>
    <div class="one">
        <div class="date">
      <p class="mini">{{createdAt}}</p>
        </div>
        <div class="hover" @click="read">
      <h5 class="title">{{question.title}}</h5>
        </div>
      <div class="tags">
          <b-button class="mx-1 owneddd" v-for="(tag, index) in question.tags" style="font-size: 9pt" :key="index" size="sm" @click="toTag(tag)">{{tag}}</b-button>
      </div>
      <div v-html="question.description" class="contentnya mt-2"></div>
      <br />
      <div class="kanan">
      <p class="normal">{{question.user.name}}</p>
      <p class="mini">{{timePass}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['question'],
  computed: {
    timePass () {
      return moment(new Date(this.question.createdAt)).fromNow()
    },
    createdAt () {
      return new Date(this.question.createdAt).toDateString()
    },
    totalVote () {
      return this.question.likes.length - this.question.dislikes.length
    },
    answers () {
      // return 0
      return this.$store.state.questiondet.totalAnswer
    }
  },
  methods: {
    read () {
      this.$store.dispatch('getOneQues', this.question._id)
      this.$router.push(`/questions/${this.question._id}`)
    },
    toTag (tag) {
      this.$store.dispatch('getQuesTag', tag)
      this.$router.push(`/questions/tag/${tag}`)
    }
  },
  created () {
    this.$store.dispatch('getQuestions', this.question._id)
  }
}
</script>

<style scoped>
.contentnya{
    height: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 9pt;
}
.one {
  margin: 3px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
}
.normal {
font-size: 9pt;
margin:0;
text-align: right
}
.mini{
font-size: 6pt;
text-align: right;
margin:0
}
p{
    font-size: 8pt
}
.kanan{
   width: 100%;
   display: flex;
   justify-content: flex-end;
   flex-direction: column
}
.date{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end
}

.tags{
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
}

.owneddd{
    background: rgb(255, 196, 129);
    border: rgb(255, 196, 129);
    color: black
}

.hover:hover{
  color: rgb(250, 148, 52);
  text-decoration: underline;
  cursor: pointer;
}

</style>
