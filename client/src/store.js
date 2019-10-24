import Vue from 'vue'
import Vuex from 'vuex'
import axiosServer from '../configs/axiosServer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts:[],
    onePost:{},
    addPost:{
      title:'',
      description: ''
    },
    addComment:{
      description: ''
    },
    login:{
      email: '',
      password: ''
    },
    register:{
      displayName: '',
      email: '',
      password: ''
    },
    editPost:{
      title: '',
      description: ''
    },
    editComment:{
      description: ''
    },
    search: ''
  },
  mutations: {
    CHANGE_POST(state, posts){
      state.posts = posts
    },
    CHANGE_ONE_POST(state, post){
      state.onePost = post
    },
    CHANGE_TITLE_POST(state, title){
      state.addPost.title = title
    },
    CHANGE_DESCRIPTION_POST(state, description){
      state.addPost.description = description
    },
    CHANGE_DESCRIPTION_COMMENT(state, description){
      state.addComment.description = description
    },
    EMPTY_ADD_COMMENT(state){
      state.addComment.description = ''
    },
    EMPTY_ADD_POST(state){
      state.addPost.title = ''
      state.addPost.description = ''
    },
    CHANGE_EMAIL_REGISTER(state, payload){
      state.register.email = payload
    },
    CHANGE_PASSWORD_REGISTER(state, payload){
      state.register.password = payload
    },
    CHANGE_DISPLAY_NAME_REGISTER(state, payload){
      state.register.displayName = payload
    },
    CHANGE_EMAIL_LOGIN(state, payload){
      state.login.email = payload
    },
    CHANGE_PASSWORD_LOGIN(state, payload){
      state.login.password = payload
    },
    EMPTY_REGISTER(state){
      state.register.displayName = ''
      state.register.email = ''
      state.register.password = ''
    },
    EMPTY_LOGIN(state){
      state.login.email = ''
      state.login.password = ''
    },
    CHANGE_TITLE_EDIT_POST(state, payload){
      state.editPost.title = payload
    },
    CHANGE_DESCRIPTION_EDIT_POST(state, payload){
      state.editPost.description = payload
    },
    CHANGE_SEARCH(state, payload){
      state.search = payload
    },
    CHANGE_DESCRIPTION_EDIT_COMMENT(state, payload){
      state.editComment.description = payload
      
    }
  },
  actions: {
    login({state}){
      return new Promise ((resolve, reject)=>{
        const email = state.login.email
        const password = state.login.password
        if(!email || !password){
          swal('Empty Input Detected', 'Please insert email and password', 'error')
        }
        else{
          axiosServer({
            method: 'post',
            url: '/users/login',
            data:{
              email,
              password
            }
          })
            .then(({data})=>{
              localStorage.setItem('access_token', data.token)
              localStorage.setItem('user_id', data.user_id)
              resolve('success')
            })
            .catch(reject)
        }
      })
    },
    logout({commit}){
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_id')
      commit('EMPTY_LOGIN')
      commit('EMPTY_REGISTER')
    },
    register({state}){
      return new Promise ((resolve, reject)=>{
        const displayName = state.register.displayName
        const email = state.register.email
        const password = state.register.password
        if(!displayName || !email || !password){
          swal('Empty Input Detected', 'Please insert email and password', 'error')
        }
        else{
          axiosServer({
            method: 'post',
            url: '/users/register',
            data:{
              email,
              password,
              displayName
            }
          })
            .then(({data})=>{
              return axiosServer({
                method: 'post',
                url: '/users/login',
                data:{
                  email,
                  password
                }
              })
            })
            .then(({data})=>{
              localStorage.setItem('access_token', data.token)
              localStorage.setItem('user_id', data.user_id)
              resolve('success')
            })
            .catch(reject)
        }
      })
    },
    fetchPosts({commit}){
      axiosServer({
        method: 'get',
        url: '/posts'
      })
        .then(({data})=>{
          commit('CHANGE_POST', data)
        })
        .catch(err=>{
          console.log(err);
        })
    },
    fetchOnePost({commit}, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'get',
          url: `/posts/${id}`
        })
          .then(({data})=>{
            commit('CHANGE_ONE_POST', data)
            resolve('success')
          })
          .catch(reject)
      })
    },
    searchPost({state, commit}){
      const search = state.search
      axiosServer({
        method: 'post',
        url: `/posts/search/${search}`
      })
        .then(({data})=>{
          commit('CHANGE_POST', data)
        })
        .catch(err=>{
          console.log(err);
        })
    },
    addPost({state, commit}){
      return new Promise((resolve, reject)=>{
        const title = state.addPost.title
        const description = state.addPost.description
        if(!title || !description){
          swal("Empty input detected", "Please enter the title and description", "error")
        }
        else if(title.length < 10){
          swal("Title too short", "Title length should more than 10", "error")
        }
        else if(description.length < 50){
          swal("Description too short", "Description length should more than 50", "error")
        }
        else{
          axiosServer({
            method: 'post',
            url: `/posts`,
            data:{
              title,
              description
            }
          })
            .then(({data})=>{
              commit('EMPTY_ADD_POST')
              resolve('success')
            })
            .catch(reject)
        }
      })
    },
    addComment({state, commit}, payload){
      return new Promise((resolve, reject)=>{
        const description = state.addComment.description
        const post_comment = payload
        if(!description || !payload){
          swal("Empty input detected", "Please enter the title and description", "error")          
        }
        else{
          axiosServer({
            method: 'post',
            url: '/comments',
            data: {
              description,
              post_comment
            }
          })
            .then(({data})=>{
              commit('EMPTY_ADD_COMMENT')
              resolve('success')
            })
            .catch(reject)
        }
      })
    },
    addViews({state}, payload){
      return new Promise((resolve, reject)=>{
        console.log(payload);
        
        axiosServer({
          method: 'post',
          url: `/posts/views/${payload}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    addUpVotePost(context, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'post',
          url: `/posts/upvotes/add/${id}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    removeUpVotePost(context, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'post',
          url: `/posts/upvotes/remove/${id}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    addDownVotePost(context, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'post',
          url: `/posts/downvotes/add/${id}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    removeDownVotePost(context, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'post',
          url: `/posts/downvotes/remove/${id}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    addUpVoteComment(context, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'post',
          url: `/comments/upvotes/add/${id}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    removeUpVoteComment(context, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'post',
          url: `/comments/upvotes/remove/${id}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    addDownVoteComment(context, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'post',
          url: `/comments/downvotes/add/${id}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    removeDownVoteComment(context, id){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'post',
          url: `/comments/downvotes/remove/${id}`
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    deletePost(context, payload){
      return new Promise((resolve, reject)=>{
        axiosServer({
          method: 'delete',
          url: '/posts/',
          data:{
            id: payload
          }
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    editPost({state}, payload){
      return new Promise ((resolve, reject)=>{
        const id = payload
        const title = state.editPost.title
        const description = state.editPost.description
        axiosServer({
          method: 'patch',
          url: '/posts/',
          data:{
            id,
            title,
            description
          }
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    editComment({state}, payload){
      return new Promise((resolve, reject)=>{
        const id = payload
        const description = state.editComment.description
        axiosServer({
          method: 'patch',
          url: '/comments',
          data: {
            id,
            description
          }
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    },
    deleteComment({state}, payload){
      return new Promise((resolve, reject)=>{
        const id = payload
        axiosServer({
          method: 'delete',
          url: '/comments',
          data: {
            id
          }
        })
          .then(({data})=>{
            resolve('success')
          })
          .catch(reject)
      })
    }
  }
})
