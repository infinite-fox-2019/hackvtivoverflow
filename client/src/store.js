import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import axios from './config/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    myQ: [],
    oneQ: {
      UserId: {},
      upvote: [],
      downvote: [],
      answer: [],
      tags: [],
    },
    myT: [],
    sameTags: [],
    top10: [],
    myA: [],
  },
  mutations: {
    GETQUESTIONS(state, payload) {
      state.questions = payload;
    },
    GETMYQUESTIONS(state, payload) {
      state.myQ = payload;
    },
    GETONEQ(state, payload) {
      state.oneQ = payload;
    },
    GETMYTAGS(state, payload) {
      state.myT = payload;
    },
    GETSAMETAGS(state, payload) {
      state.sameTags = payload;
    },
    GETTOP10(state, payload) {
      state.top10 = payload;
    },
    GETMYANSWERS(state, payload) {
      state.myA = payload;
    },
  },
  actions: {
    getQuestions(context, payload) {
      const token = localStorage.getItem('access_token');
      axios({
        method: 'GET',
        url: '/question',
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        const q = data.data;
        context.commit('GETQUESTIONS', q);
      });
    },
    getMyQuestions(context, payload) {
      const token = localStorage.getItem('access_token');
      axios({
        method: 'GET',
        url: '/question/mine',
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        const qq = data.data;
        context.commit('GETMYQUESTIONS', qq);
      });
    },
    getOneQuestion(context, payload) {
      const id = payload;
      const token = localStorage.getItem('access_token');
      axios({
        method: 'GET',
        url: `/question/mine/${id}`,
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        const oneq = data;
        context.commit('GETONEQ', oneq);
      }).catch((err) => {
        console.log(err);
      });
    },
    upvoteQ(context, payload) {
      const id = payload;
      const token = localStorage.getItem('access_token');
      Swal.fire({
        title: 'Upvoting...',
        allowOutsideClick: () => !Swal.isLoading(),
      });
      Swal.showLoading();
      axios({
        method: 'PATCH',
        url: `/question/upvote/${id}`,
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        Swal.close();
        Swal.fire('Success!', 'You successfully upvoted!', 'success');
        context.dispatch('getOneQuestion', id);
      }).catch((error) => {
        Swal.close();
        const message = (error.response.data && error.response.data.message)
          || 'Failed to Upvote';
        Swal.fire('Error!', message, 'error');
      });
    },
    downvoteQ(context, payload) {
      const id = payload;
      const token = localStorage.getItem('access_token');
      Swal.fire({
        title: 'Downvoting...',
        allowOutsideClick: () => !Swal.isLoading(),
      });
      Swal.showLoading();
      axios({
        method: 'PATCH',
        url: `/question/downvote/${id}`,
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        Swal.close();
        Swal.fire('Success!', 'You successfully downvoted!!', 'success');
        context.dispatch('getOneQuestion', id);
      }).catch((error) => {
        Swal.close();
        const message = (error.response.data && error.response.data.message)
          || 'Failed to Downvote';
        Swal.fire('Error!', message, 'error');
      });
    },
    answerUp(context, payload) {
      const { questionId } = payload;
      const { id } = payload;
      const token = localStorage.getItem('access_token');
      Swal.fire({
        title: 'Upvoting...',
        allowOutsideClick: () => !Swal.isLoading(),
      });
      Swal.showLoading();
      axios({
        method: 'PATCH',
        url: `/answer/upvote/${id}`,
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        Swal.close();
        Swal.fire('Success!', 'Your successfully upvoted!', 'success');
        context.dispatch('getOneQuestion', questionId);
      }).catch((error) => {
        Swal.close();
        const message = (error.response.data && error.response.data.message)
          || 'Failed to ';
        Swal.fire('Error!', message, 'error');
      });
    },
    answerDown(context, payload) {
      const { questionId } = payload;
      const { id } = payload;
      const token = localStorage.getItem('access_token');
      Swal.fire({
        title: 'Downvoting...',
        allowOutsideClick: () => !Swal.isLoading(),
      });
      Swal.showLoading();
      axios({
        method: 'PATCH',
        url: `/answer/downvote/${id}`,
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        Swal.close();
        Swal.fire('Success!', 'Your Account is Created!', 'success');
        context.dispatch('getOneQuestion', questionId);
      }).catch((error) => {
        Swal.close();
        const message = (error.response.data && error.response.data.message)
          || 'Failed to Downvote';
        Swal.fire('Error!', message, 'error');
      });
    },
    getMyTags({
      commit,
    }) {
      const token = localStorage.getItem('access_token');
      axios({
        method: 'GET',
        url: '/user/myTags',
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        commit('GETMYTAGS', data.tags);
      });
    },
    toTag({
      commit,
    }, payload) {
      const token = localStorage.getItem('access_token');
      const tags = payload;
      axios({
        method: 'GET',
        url: `/question/tags/${tags}`,
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        commit('GETSAMETAGS', data.filtered);
      });
    },
    getTop10({
      commit,
    }) {
      const token = localStorage.getItem('access_token');
      axios({
        method: 'GET',
        url: '/vote/topTen',
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        commit('GETTOP10', data.top10);
      });
    },
    getMyAnswers({
      commit,
    }) {
      const token = localStorage.getItem('access_token');
      axios({
        method: 'GET',
        url: '/answer/mine',
        headers: {
          token,
        },
      }).then(({
        data,
      }) => {
        commit('GETMYANSWERS', data.data);
      });
    },
  },
});
