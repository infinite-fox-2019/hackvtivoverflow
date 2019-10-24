import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    questions: []
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user;
      localStorage.setItem("token", user.token);
    },
    LOGOUT(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
    FETCHQUESTIONS(state, questions) {
      state.questions = questions;
    }
  },
  actions: {
    login(context, user) {
      return Axios({
        method: "post",
        url: "http://localhost:3000/user/login",
        data: user
      });
    },
    register(context, user) {
      return Axios({
        method: "post",
        url: "http://localhost:3000/user/register",
        data: user
      });
    },
    refresh({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        return Axios({
          method: "post",
          url: `http://localhost:3000/user/refresh/${token}`
        })
          .then(({ data }) => {
            commit("LOGIN", data);
          })
          .catch(console.log);
      }
    },
    fetchAllQuestions({ commit }) {
      Axios({
        method: "get",
        url: "http://localhost:3000/question/all"
      })
        .then(({ data }) => {
          commit("FETCHQUESTIONS", data);
        })
        .catch(console.log);
    },
    timelapse(context, created) {
      let then = new Date(created).getTime();
      let now = new Date().getTime();
      let difference = Math.ceil((now - then) / 1000);
      if (difference < 60) {
        return `${difference} Seconds Ago`;
      } else if (difference >= 60 && difference < 3600) {
        return `${Math.ceil(difference / 60)} Minutes Ago`;
      } else if (difference >= 3600 && difference < 3600 * 24) {
        return `${Math.ceil(difference / 3600)} Hours Ago`;
      } else {
        return `${Math.ceil(difference / (3600 * 24))} Days Ago`;
      }
    }
  }
});
