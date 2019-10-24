<template>
  <div class="container-fluid" style="padding-top:20px">
    <div class="row">
      <div class="col-sm-2 border-right">
        <div class="container">
          One of three columns
        </div>
      </div>
      <div class="col-sm-8" style="padding: 0px">
        <div class="container">
          <div class="row" style="padding:10px">
            <div class="col-sm-8">
              <h3 style="word-wrap: break-word;">{{ post.title }}</h3>
            </div>
            <div class="col-sm-4 d-flex justify-content-end">
              <button type="button" class="btn btn-primary btn-sm" @click.prevent="askQuestion()">Ask Question</button>
            </div>
          </div>
          <div class="row" style="margin: 0px">
            <div class="col-sm" style="margin: 0">
              <small class="text-muted"> viewed: </small>
              <small>{{ post.views.length }} people</small>
            </div>
          </div>
          <div class="row" style="padding:10px">
          </div>
          <!-- posts -->
          <div class="row border-top border-bottom" style="height: auto">
            <div class="col-sm-8" style="word-wrap: break-word;">
              <div class="d-flex flex-row">
                <div class="d-flex flex-column align-items-center" style="margin-right: 15px; margin-top:10px">
                  <span class="badge badge-success" v-if="postUpVote" @click.prevent="removeUpVote(post._id)" style="cursor:pointer">
                    <img src="../assets/up.png" alt="upvote">
                  </span>
                  <span class="badge badge-light" v-else @click.prevent="addUpVote(post._id)" style="cursor:pointer">
                    <img src="../assets/up.png" alt="upvote">
                  </span>
                  <div>
                    {{ post.upVotes.length - post.downVotes.length }}
                  </div>
                  <span class="badge badge-danger" v-if="postDownVote" @click.prevent="removeDownVote(post._id)" style="cursor:pointer">
                    <img src="../assets/down.png" alt="downvote">
                  </span>
                  <span class="badge badge-light" v-else @click.prevent="addDownVote(post._id)" style="cursor:pointer">
                    <img src="../assets/down.png" alt="downvote">
                  </span>
                </div>
                <div style="padding:15px; word-wrap: break-word;" v-html="post.description">
                </div>
              </div>
              <div class="d-flex flex-row justify-content-end">
                <div v-if="showUD">
                  <img src="../assets/edit.png" alt="delete" style="width:20px; height:20px; cursor:pointer" @click.prevent="toggleModal()">
                  <img src="../assets/trash.png" alt="delete" style="width:20px; height:20px; cursor:pointer" @click.prevent="deletePost(post._id)">
                </div>
                <div>
                  Author: {{ post.author_post.displayName }}
                </div>
              </div>
              <div class="">
                <h4 v-if="post.comments_post.length !== 0">Answers:</h4>
                <h4 v-else>No Answers</h4>
              </div>
            </div>
          </div>

          <div v-if="post.comments_post.length !== 0">
            <Answer v-for="comment in post.comments_post" :key="comment._id" :comment="comment"/>
          </div>

          <form style="padding-top:10px" @submit.prevent="addComment(post._id)">
            <div class="form-group">
              <h5>Your Answer</h5>
              <ckeditor :editor="editor" v-model="description"></ckeditor>
              <button class="btn btn-primary" type="submit" style="margin-top:10px">Submit Answer</button>
            </div>
          </form>

        </div>
      </div>
      <div class="col-sm-2 border-right">
        <div class="container">
          One of three columns
        </div>
      </div>
    </div>
    <!-- modal -->
    <b-modal ref="my-modal" hide-footer :title="post.title">
      <div class="d-block text-center">
        <h3>
          <div class="container" style="margin-top:10px">
            <form >
              <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Your Title" v-model="editTitle">
              </div>
              <div class="form-group">
                <label>Description</label>
                <ckeditor :editor="editor" v-model="editDescription"></ckeditor>
              </div>
            </form>
          </div>
        </h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click.prevent="toggleModal()">Close</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click.prevent="editPost(post._id)">Edit Post</b-button>
    </b-modal>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Answer from '../components/Answer'

export default {
  components:{
    Answer
  },
  data(){
    return{
      editor: ClassicEditor,
      postUpVote: false,
      postDownVote: false,
      showUD: false
    }
  },
  created(){
    const id = this.$route.params.id
    const user_id = localStorage.getItem('user_id')
    this.$store.dispatch('addViews', id)
      .then(data=>{
        return this.$store.dispatch('fetchOnePost', id)
      })
      .then(data=>{
        const user_id = localStorage.getItem('user_id')
        this.post.downVotes.forEach(downVote=>{
          if(downVote == user_id){
            this.postDownVote = true
          }
        })
        this.post.upVotes.forEach(upVote=>{
          if(upVote == user_id){
            this.postUpVote = true
          }
        })
        if(this.post.author_post._id == user_id){
          this.showUD = true
          // console.log(this.showUD);
          
        }
      })
      .catch(err=>{
        console.log(err)
      })
  },
  computed:{
    post(){
      return this.$store.state.onePost
    },
    description:{
      get(){
        return this.$store.state.addComment.description
      },
      set(value){
        this.$store.commit('CHANGE_DESCRIPTION_COMMENT', value)
      }
    },
    editTitle:{
      get(){
        return this.$store.state.editPost.title
      },
      set(value){
        this.$store.commit('CHANGE_TITLE_EDIT_POST', value)
      }
    },
    editDescription:{
      get(){
        return this.$store.state.editPost.description
      },
      set(value){
        this.$store.commit('CHANGE_DESCRIPTION_EDIT_POST', value)
      }
    }
  },
  methods:{
    askQuestion(){
      this.$router.push('/post')
    },
    addComment(id){
      this.$store.dispatch('addComment', id)
        .then(info=>{
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
          this.$store.commit('CHANGE_DESCRIPTION_COMMENT', '')
        })
    },
    addUpVote(id){
      this.$store.dispatch('addUpVotePost', id)
        .then(info=>{
          this.postUpVote = true
          this.postDownVote = false
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    removeUpVote(id){
      this.$store.dispatch('removeUpVotePost', id)
        .then(info=>{
          this.postUpVote = false
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    addDownVote(id){
      this.$store.dispatch('addDownVotePost', id)
        .then(info=>{
          this.postDownVote = true
          this.postUpVote = false
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    removeDownVote(id){
      this.$store.dispatch('removeDownVotePost', id)
        .then(info=>{
          this.postDownVote = false
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    deletePost(id){
      this.$store.dispatch('deletePost', id)
        .then(info=>{
          this.$store.dispatch('fetchPosts')
          this.$router.push('/')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    editPost(id){
      this.$store.dispatch('editPost', id)
      this.$store.dispatch('fetchOnePost', id)
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    toggleModal() {
      const title = this.post.title
      const description = this.post.description
      this.$store.commit('CHANGE_TITLE_EDIT_POST', title)
      this.$store.commit('CHANGE_DESCRIPTION_EDIT_POST', description)
      this.$refs['my-modal'].toggle('#toggle-btn')
    }
  }
}
</script>

<style>

</style>
