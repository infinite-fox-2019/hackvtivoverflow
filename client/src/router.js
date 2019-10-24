import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/Home.vue"),
      children: [
        {
          path: "/",
          name: "main",
          component: () =>
            import(/* webpackChunkName: "main" */ "./components/Main.vue")
        },
        {
          path: "/question/:id",
          name: "Question",
          component: () =>
            import(
              /* webpackChunkName: "question" */ "./components/Question.vue"
            )
        },
        {
          path: "/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "login" */ "./components/Login.vue")
        },
        {
          path: "/register",
          name: "register",
          component: () =>
            import(
              /* webpackChunkName: "register" */ "./components/Register.vue"
            )
        },
        {
          path: "/collection",
          name: "collection",
          component: () =>
            import(
              /* webpackChunkName: "collection" */ "./components/Collection.vue"
            )
        },
        {
          path: "/create",
          name: "create",
          component: () =>
            import(/* webpackChunkName: "create" */ "./components/Create.vue")
        },
        {
          path: "/update/:question",
          name: "updateQuestion",
          component: () =>
            import(/* webpackChunkName: "update" */ "./components/Update.vue")
        },
        {
          path: "/update/:question/:answer",
          name: "updateAnswer",
          component: () =>
            import(/* webpackChunkName: "update" */ "./components/Update.vue")
        }
      ]
    }
  ]
});
