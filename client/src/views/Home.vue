<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-2">
      <div class="q-pa-md" style="max-width: 350px">
        <span class="text-h5 text-weight-bold"># TRENDING TAGS</span>
        <q-list bordered separator>
          <TrendingTag v-for="(tag,i) in trendingTags" :key="i" :tag="tag"></TrendingTag>
        </q-list>  

      </div>

      <q-separator spaced />

      <div class="q-pa-md" style="max-width: 350px" v-if="isLogin">
        <q-list bordered separator>
          <q-item clickable v-ripple @click="fetchUserQuestion">
            <q-item-section avatar>
              <q-icon color="primary" name="textsms" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Your Question</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="seeAll">
            <q-item-section avatar>
              <q-icon color="primary" name="toc" />
            </q-item-section>
            <q-item-section>
              <q-item-label>See All Question</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="seeAnswer">
            <q-item-section avatar>
              <q-icon color="primary" name="face" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Your Answer</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="col-9">
      <div class="q-pa-md q-gutter-md" v-if="!userQuestion.status && !isAnswer">
        <q-list bordered class="rounded-borders" style="max-width: 900px">
          <QuestionList v-for="(question, index) in filteredQuestions" :key="index" :question="question"></QuestionList>
        </q-list>
      </div>

      <div class="q-pa-md q-gutter-md" v-if="userQuestion.status && !isAnswer">
        <q-list bordered class="rounded-borders" style="max-width: 900px">
          <QuestionList
            v-for="(question, index) in userQuestion.data"
            :key="index"
            :question="question"
          ></QuestionList>
        </q-list>
      </div>

      <div v-if="isAnswer">
          <AnswerList></AnswerList>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionList from "../components/QuestionList";
import TrendingTag from "../components/TrendingTag";
import AnswerList from "../components/AnswerList";

import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    QuestionList,
    TrendingTag,
    AnswerList
  },
  methods: {
    seeAll() {
      this.$store.commit("SEEALL");
    },
    seeAnswer(){
      this.$store.dispatch('fetchAnswerUser')
    },
    fetchUserQuestion() {
      this.$store
        .dispatch("fetchUserQuestion")
        .then(data => {})
        .catch(err => {});
    }
  },
  created() {
    this.$store.dispatch("fetchQuestion");
  },
  computed: {
    ...mapState(["questions", "userQuestion" , "trendingTags", "isLogin", "isAnswer", "search"]),
    filteredQuestions: function() {
      return this.questions.filter( question => {
        let tagsFlag = false
        question.tags.forEach(tag => {
          if(tag.match(this.search))tagsFlag = true
        })
        return question.title.match(this.search) || tagsFlag
      })      
    }
  }
};
</script>

<style scoped>
</style>
