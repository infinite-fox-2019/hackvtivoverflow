<template>
  <div class="row container">
    <div class="col-3"></div>
    <div class="q-gutter-md col-9">
      <q-list bordered class="rounded-borders" style="padding: 0 2vh 2vh 2vh;">
        <q-item>
          <q-item-section top class="col-1 gt-sm lem">
            <q-btn
              class="gt-xs"
              size="26px"
              flat
              dense
              :color="colorUpvote"
              round
              icon="keyboard_arrow_up"
              @click="upvote"
            />
            <q-btn
              class="gt-xs"
              size="26px"
              flat
              :color="colorDownvote"
              dense
              round
              icon="keyboard_arrow_down"
              @click="downvote"
            />
          </q-item-section>

          <q-item-section top class="col-1 gt-sm">
            <div class="vote">
              <div class="vote-val">
                <q-avatar rounded size="64px" color="orange">{{ question.score }}</q-avatar>
              </div>
            </div>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="2">
              <h4 class>{{ question.title }}</h4>
              <!-- <span class="text-weight-medium cursor-pointer">
                <b>author</b>
                : {{question.user.username}}
              </span>-->
            </q-item-label>
            <!-- <q-item-label caption lines="1">updated at : {{question.updatedAt.slice(0,10)}}</q-item-label> -->
            <q-item-label lines="1" class="q-mt-xs text-body2 text-primary">
              <span v-html="question.question"></span>
              <q-btn
                size="sm"
                outline
                rounded
                color="primary"
                :label="tag"
                v-for="(tag,i) in question.tags"
                :key="i"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div v-if="isLogin">
        <h5 class="text-center" style="margin: 4vh auto 1vh auto">Answer this question</h5>
        <q-editor
          min-height="20vh"
          toolbar-bg="orange-14"
          toolbar-text-color="white"
          v-model="answer"
          :definitions="{
            bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
            }"
        />
        <q-btn
          color="orange-14"
          :outline="true"
          icon-right="reply"
          label="ANSWER"
          style="width:400px; margin-top: 1vh;"
          class="float-right"
          @click="answerAsycn"
        />
      </div>

      <div class="answer">
        <Answer
          v-for="(answer, index) in question.answer"
          :key="index"
          :answer="answer"
          @fetchRequest="toFetch"
        ></Answer>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Answer from "../components/Answer";
import jwt from "jsonwebtoken";

export default {
  components: {
    Answer
  },
  data() {
    return {
      name: "readQuestion",
      question: {},
      answer: "",
      flagColor : null,
      colorUpvote : "grey-10",
      colorDownvote : "grey-10"
    };
  },
  methods: {
    generateVoteColorUpvote(){
      if(this.flagColor === 1){
        this.colorUpvote =  "orange-14"
      } else if(this.flagColor === -1){
        this.colorUpvote =  "grey-10"
      } else {
        this.colorUpvote =  "grey-10"
      }
    },
    generateVoteColorDownvote(){
      if(this.flagColor === -1){
        this.colorDownvote =  "orange-14"
      } else if(this.flagColor === 1){
        this.colorDownvote =  "grey-10"
      } else {
        this.colorDownvote =  "grey-10"
      }
    },
    answerAsycn() {
      this.$store
        .dispatch("answer", {
          questionId: this.question._id,
          answer: this.answer
        })
        .then(data => {
          this.answer = "";
          this.fetch();
        });
    },
    upvote() {
      this.$store.dispatch("upvoteQuestion", this.question._id).then(data => {
        this.fetch();
      });
    },
    downvote() {
      this.$store.dispatch("downvoteQuestion", this.question._id).then(data => {
        this.fetch();
      });
    },
    fetch() {
      let user = jwt.verify(localStorage.getItem("token"), "AROCKETTOTHEMOON");
      let id = user._id;
      this.$store.dispatch("fetchQuestion").then(data => {
        let question = this.questions.filter(question => {
          return question._id === this.$route.params.id;
        });
        this.question = question[0];
        let flag;
        let votes = this.question.votes
        votes.forEach(vote => {
          if(vote.user === id){
            if(vote.value === 1){
              flag = 1
            } else if(vote.value === -1){
              flag = -1
            } else {
              flag = 0
            }
          }
        });
        this.flagColor = flag
        this.generateVoteColorUpvote()
        this.generateVoteColorDownvote()
      });
    },
    toFetch() {
      this.fetch();
    }
  },
  computed: {
    ...mapState(["questions", "isLogin"])
  },
  created() {
    this.fetch();
  },
  watch: {}
};
</script>

<style scoped>
.container {
  margin-top: 2vh;
  margin-bottom: 15vh;
}
.vote-btn {
  margin: 0 -2vh 0 0;
  width: 20px !important;
}
.vote {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  margin-top: 12vh;
}
.vote .vote-val {
  padding: 0;
  margin: 0;
}
.lem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8vh;
}
h4 {
  padding: 0;
  margin: 6vh auto 1vh auto;
}
.answer {
  margin-top: 10vh;
}
</style>