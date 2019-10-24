import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import CreateQuestion from "../views/CreateQuestion.vue";
import MyQuestion from "../views/MyQuestion.vue";
import QuestionByTag from "../views/QuestionByTag.vue";
import MyAnswer from "../views/MyAnswer.vue";
import MyTags from "../views/MyTags.vue";
import ShowQuestion from "../views/ShowQuestion.vue";
import EditQuestion from "../views/EditQuestion.vue";
import EditAnswer from "../views/EditAnswer.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/question/create",
      name: "CreateQuestion",
      component: CreateQuestion
    },
    {
      path: "/question/my",
      name: "MyQuestion",
      component: MyQuestion
    },
    {
      path: "/question/tag/:tag",
      name: "QuestionByTag",
      component: QuestionByTag
    },
    {
      path: "/answer/my",
      name: "MyAnswer",
      component: MyAnswer
    },
    {
      path: "/tag/my",
      name: "MyTags",
      component: MyTags
    },
    {
      path: "/question/:id",
      name: "ShowQuestion",
      component: ShowQuestion
    },
    {
      path: "/question/edit/:id",
      name: "EditQuestion",
      component: EditQuestion
    },
    {
      path: "/answer/edit/:id",
      name: "EditAnswer",
      component: EditAnswer
    }
  ]
});
