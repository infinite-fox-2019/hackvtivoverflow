<template>
  <div class="row border-top border-bottom" style="height: auto">
    <div class="col-sm-8" style="word-wrap: break-word;">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column align-items-center" style="margin-right: 15px; margin-top:10px">
          <span class="badge badge-success" v-if="commentUpVote" @click.prevent="removeUpVote(comment._id)" style="cursor:pointer">
            <img src="../assets/up.png" alt="upvote">
          </span>
          <span class="badge badge-light" v-else @click.prevent="addUpVote(comment._id)" style="cursor:pointer">
            <img src="../assets/up.png" alt="upvote">
          </span>
          <div>
            {{ comment.upVotes.length - comment.downVotes.length }}
          </div>
          <span class="badge badge-danger" v-if="commentDownVote" @click.prevent="removeDownVote(comment._id)" style="cursor:pointer">
            <img src="../assets/down.png" alt="downvote">
          </span>
          <span class="badge badge-light" v-else @click.prevent="addDownVote(comment._id)" style="cursor:pointer">
            <img src="../assets/down.png" alt="downvote">
          </span>
        </div>
        <div style="padding:15px;" v-html="comment.description">
        </div>
      </div>
      <div class="d-flex flex-row justify-content-end">
        <div>
          <div v-if="showUD">
            <img src="../assets/edit.png" alt="delete" style="width:20px; height:20px; cursor:pointer" @click.prevent="toggleModal()">
            <img src="../assets/trash.png" alt="delete" style="width:20px; height:20px; cursor:pointer" @click.prevent="deleteComment(comment._id)">
          </div>
        </div>
        <div>
          Author: {{ comment.author_comment.displayName }}
        </div>
      </div>
    </div>
    <!-- modal -->
    <b-modal ref="my-modal" hide-footer title="Edit Comment">
      <div class="d-block text-center">
        <h3>
          <div class="container" style="margin-top:10px">
            <form >
              <div class="form-group">
                <label>Description</label>
                <ckeditor :editor="editor" v-model="description"></ckeditor>
              </div>
            </form>
          </div>
        </h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click.prevent="toggleModal()">Close</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click.prevent="editComment(comment._id)">Edit Post</b-button>
    </b-modal>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data(){
    return{
      commentDownVote: false,
      commentUpVote: false,
      showUD: false,
      editor: ClassicEditor
    }
  },
  methods:{
    coba () {

    },
    addUpVote(id){
      this.$store.dispatch('addUpVoteComment', id)
        .then(info=>{
          this.commentUpVote = true
          this.commentDownVote = false
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    removeUpVote(id){
      this.$store.dispatch('removeUpVoteComment', id)
        .then(info=>{
          this.commentUpVote = false
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    addDownVote(id){
      this.$store.dispatch('addDownVoteComment', id)
        .then(info=>{
          this.commentDownVote = true
          this.commentUpVote = false
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    removeDownVote(id){
      this.$store.dispatch('removeDownVoteComment', id)
        .then(info=>{
          this.commentDownVote = false
          const id = this.$route.params.id
          this.$store.dispatch('fetchOnePost', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    toggleModal() {
      const description = this.comment.description
      console.log(description);
      this.$store.commit('CHANGE_DESCRIPTION_EDIT_COMMENT', description)
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    deleteComment(id){
      const post_id = this.post._id
      this.$store.dispatch('deleteComment', id)
      this.$store.dispatch('fetchOnePost', post_id)
    },
    editComment(id){
      this.$store.dispatch('editComment', id)
        .then(info=>{
          const post_id = this.post._id
          this.$store.dispatch('fetchOnePost', post_id)
          this.$refs['my-modal'].toggle('#toggle-btn')
        })
        .catch(err=>{
          console.log(err);
          
        })
    }
  },
  created(){
    const user_id = localStorage.getItem('user_id')
    this.comment.downVotes.forEach(downVote=>{
      if(downVote == user_id){
        this.commentDownVote = true
      }
    })
    this.comment.upVotes.forEach(upVote=>{
      if(upVote == user_id){
        this.commentUpVote = true
      }
    })
    if(this.comment.author_comment._id == user_id){
      this.showUD = true
    }
    
  },
  computed:{
    post(){
      return this.$store.state.onePost
    },
    description:{
      get(){
        return this.$store.state.editComment.description
      },
      set(value){
        this.$store.commit('CHANGE_DESCRIPTION_EDIT_COMMENT', value)
      }
    }
  },
  props:['comment']
}
</script>

<style>

</style>