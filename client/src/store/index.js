import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";
import Swal from "sweetalert2";

const SERVER = "http://35.247.133.81/";
// const SERVER = "http://localhost:3000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    user: {
      name: "",
      email: "",
      password: ""
    },
    formQuestion: {
      title: "",
      description: "",
      tag: "",
      tags: []
    },
    formAnswer: {
      description: ""
    },
    allQuestions: [],
    myQuestions: [],
    myAnswers: [],
    answerDetail: {},
    questionDetail: {
      userId: {
        name: ""
      },
      upvotes: [],
      downvotes: []
    },
    top: [],
    watchedTags: []
  },
  mutations: {
    updateWatchedTag(state, payload) {
      state.watchedTags = payload;
    },
    updateUser(state, payload) {
      state.user = {
        ...state.user,
        ...payload
      };
    },
    updateFormQuestion(state, payload) {
      state.formQuestion = {
        ...state.formQuestion,
        ...payload
      };
    },
    updateFormAnswer(state, payload) {
      state.formAnswer = {
        ...state.formAnswer,
        ...payload
      };
    },
    setToken(state) {
      state.token = localStorage.getItem("token");
    },
    setAllQuestions(state, payload) {
      const newAllQuestions = payload.allQuestions;
      state.allQuestions = newAllQuestions;
    },
    setMyQuestions(state, payload) {
      const newMyQuestions = payload.myQuestions;
      state.myQuestions = newMyQuestions;
    },
    setMyAnswers(state, payload) {
      const newMyAnswers = payload.myAnswers;
      state.myAnswers = newMyAnswers;
    },
    updateQuestionDetail(state, payload) {
      state.questionDetail = {
        ...state.questionDetail,
        ...payload
      };
    },
    updatAnswernDetail(state, payload) {
      state.answerDetail = {
        ...state.answerDetail,
        ...payload
      };
    },
    setTop(state, newTop) {
      state.top = newTop;
    }
  },
  actions: {
    login({ commit, state }) {
      axios({
        url: "/user/login",
        method: "post",
        baseURL: SERVER,
        data: {
          email: state.user.email,
          password: state.user.password
        }
      })
        .then(response => {
          let { data } = response;
          localStorage.setItem("token", data.token);
          commit("setToken");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    register({ commit, state }) {
      axios({
        url: "/user/register",
        method: "post",
        baseURL: SERVER,
        data: {
          name: state.user.name,
          email: state.user.email,
          password: state.user.password
        }
      })
        .then(response => {
          let { data } = response;
          localStorage.setItem("token", data.token);
          commit("setToken");
          Swal.fire({
            type: data.type,
            text: data.message
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    logout({ commit }) {
      Swal.fire({
        text: "Are you sure to logout?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
      }).then(result => {
        if (result.value) {
          localStorage.removeItem("token");
          commit("setToken");
        }
      });
    },
    createQuestion({ state }) {
      let tags = [];
      state.formQuestion.tags.forEach(el => {
        tags.push(el.text);
      });

      axios({
        url: "/question/create",
        method: "post",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          title: state.formQuestion.title,
          description: state.formQuestion.description,
          tags: tags
        }
      })
        .then(() => {
          router.push("/question/my");
          Swal.fire({
            type: "success",
            text: "question submited"
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    editQuestion({ state }, id) {
      let tags = [];
      state.formQuestion.tags.forEach(el => {
        tags.push(el.text);
      });
      axios({
        url: `/question/${id}`,
        method: "patch",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          title: state.formQuestion.title,
          description: state.formQuestion.description,
          tags: tags
        }
      })
        .then(() => {
          router.push("/question/my");
          Swal.fire({
            type: "success",
            text: "question updated"
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    fetchAllQuestion({ commit }) {
      axios({
        url: "/question/all",
        method: "get",
        baseURL: SERVER
      })
        .then(response => {
          let { data } = response;
          commit("setAllQuestions", data);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    fetchMyQuestion({ commit, state }) {
      axios({
        url: "/question/my",
        method: "get",
        baseURL: SERVER,
        headers: {
          token: state.token
        }
      })
        .then(response => {
          let { data } = response;
          commit("setMyQuestions", data);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    getQuestionDetail({ commit }, payload) {
      axios({
        url: `/question/show/${payload}`,
        method: "get",
        baseURL: SERVER
      })
        .then(response => {
          let { data } = response;
          commit("updateQuestionDetail", data);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    addAnswer({ dispatch, state }, payload) {
      Swal.fire({
        title: "process your answer",
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      axios({
        method: "post",
        url: "/answer/create",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          description: state.formAnswer.description,
          questionId: payload.questionId
        }
      })
        .then(() => {
          Swal.close();
          state.formAnswer.description = "";
          dispatch("getQuestionDetail", payload.questionId);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    upvoteQ({ dispatch, state }, _id) {
      return new Promise(resolve => {
        Swal.fire({
          title: "process your vote",
          allowOutsideClick: () => !Swal.isLoading()
        });
        Swal.showLoading();
        axios({
          url: "/question/upvote",
          method: "post",
          baseURL: SERVER,
          headers: {
            token: state.token
          },
          data: {
            _id
          }
        })
          .then(() => {
            resolve();
            Swal.close();
            dispatch("getQuestionDetail", _id);
            dispatch("fetchAllQuestion");
            dispatch("fetchMyQuestion");
          })
          .catch(err => {
            Swal.fire({
              type: "error",
              text: err.response.data.message[0]
            });
          });
      });
    },
    downvoteQ({ dispatch, state }, _id) {
      return new Promise(resolve => {
        Swal.fire({
          title: "process your vote",
          allowOutsideClick: () => !Swal.isLoading()
        });
        Swal.showLoading();
        axios({
          url: "/question/downvote",
          method: "post",
          baseURL: SERVER,
          headers: {
            token: state.token
          },
          data: {
            _id
          }
        })
          .then(() => {
            resolve();
            Swal.close();
            dispatch("getQuestionDetail", _id);
            dispatch("fetchAllQuestion");
            dispatch("fetchMyQuestion");
          })
          .catch(err => {
            Swal.fire({
              type: "error",
              text: err.response.data.message[0]
            });
          });
      });
    },
    getTop({ commit }) {
      axios({
        url: "/cron/top",
        method: "get",
        baseURL: SERVER
      })
        .then(({ data }) => {
          commit("setTop", data);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    deleteQuestion({ dispatch, state }, id) {
      axios({
        url: `/question/${id}`,
        method: "delete",
        baseURL: SERVER,
        headers: {
          token: state.token
        }
      })
        .then(() => {
          dispatch("fetchAllQuestion");
          dispatch("fetchMyQuestion");
          dispatch("fetchMyAnswer");
          dispatch("getTop");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    deleteAnswer({ dispatch, state }, id) {
      axios({
        url: `/answer/${id}`,
        method: "delete",
        baseURL: SERVER,
        headers: {
          token: state.token
        }
      })
        .then(() => {
          dispatch("fetchAllQuestion");
          dispatch("fetchMyQuestion");
          dispatch("fetchMyAnswer");
          dispatch("getTop");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    upvoteA({ dispatch, state }, payload) {
      Swal.fire({
        title: "process your vote",
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      axios({
        url: "/answer/upvote",
        method: "post",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          _id: payload.answerId
        }
      })
        .then(() => {
          Swal.close();
          if (payload.questionId)
            dispatch("getQuestionDetail", payload.questionId);
          dispatch("fetchAllQuestion");
          dispatch("fetchMyQuestion");
          dispatch("fetchMyAnswer");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    downvoteA({ dispatch, state }, payload) {
      Swal.fire({
        title: "process your vote",
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      axios({
        url: "/answer/downvote",
        method: "post",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          _id: payload.answerId
        }
      })
        .then(() => {
          Swal.close();
          if (payload.questionId)
            dispatch("getQuestionDetail", payload.questionId);
          dispatch("fetchAllQuestion");
          dispatch("fetchMyQuestion");
          dispatch("fetchMyAnswer");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    editAnswer({ state }, id) {
      axios({
        url: `/answer/${id}`,
        method: "patch",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          description: state.formAnswer.description
        }
      })
        .then(() => {
          router.push("/answer/my");
          Swal.fire({
            type: "success",
            text: "answer updated"
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    fetchMyAnswer({ commit, state }) {
      axios({
        url: "/answer/my",
        method: "get",
        baseURL: SERVER,
        headers: {
          token: state.token
        }
      })
        .then(response => {
          let { data } = response;
          commit("setMyAnswers", data);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    getAnswerDetail({ commit }, payload) {
      axios({
        url: `/answer/show/${payload}`,
        method: "get",
        baseURL: SERVER
      })
        .then(response => {
          let { data } = response;
          commit("updateAnswerDetail", data);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    getWatchedTags({ commit, state }) {
      axios({
        method: "get",
        baseURL: SERVER,
        url: "/user/getTags",
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          commit("updateWatchedTag", data);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    pushWatchedTags({ dispatch, state }, tag) {
      axios({
        method: "post",
        baseURL: SERVER,
        url: "/user/pushTag",
        data: {
          tag
        },
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          dispatch("getWatchedTags");
          Swal.fire({
            type: "success",
            text: data.message
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    },
    pullWatchedTags({ dispatch, state }, tag) {
      axios({
        method: "post",
        baseURL: SERVER,
        url: "/user/pullTag",
        data: {
          tag
        },
        headers: {
          token: state.token
        }
      })
        .then(() => {
          dispatch("getWatchedTags");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data.message[0]
          });
        });
    }
  }
});
