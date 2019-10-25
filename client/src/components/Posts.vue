<template>
  <div>
    <div class="row border-top border-bottom" style="height: auto">
      <div class="col-sm-4 d-flex justify-content-around align-items-center" style="cursor:pointer" @click.prevent="toDetail(post._id)">
        <div class="d-flex flex-column" style="text-align:center; padding:10px">
          <small>{{ post.upVotes.length - post.downVotes.length }}</small>
          <small>votes</small> 
        </div>
        <div class="d-flex flex-column" style="text-align:center; padding:10px">
          <small>{{ post.comments_post.length }}</small>
          <small>answer</small> 
        </div>
        <div class="d-flex flex-column" style="text-align:center; padding:10px">
          <small>{{ post.views.length }}</small>
          <small>views</small> 
        </div>
      </div>
      <div class="col-sm-8" style="word-wrap: break-word;">
        <div class="d-flex flex-column">
          <div class="d-flex justify-content-between">
            <h5>
              <a href="#" @click.prevent="toDetail(post._id)">
                {{ post.title }}
              </a>
            </h5>
            <div v-if="show">
              <img src="../assets/edit.png" alt="delete" style="width:20px; height:20px; cursor:pointer" @click.prevent="toggleModal()">
              <img src="../assets/trash.png" alt="delete" style="width:20px; height:20px; cursor:pointer" @click.prevent="deletePost(post._id)">
            </div>
          </div>
          <small v-html="showDescription">
          </small>
        </div>
      </div>
    </div>
    <div>
      <b-modal ref="my-modal" hide-footer :title="post.title">
        <div class="d-block text-center">
          <h3>
            <div class="container" style="margin-top:10px">
              <form >
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" class="form-control" placeholder="Your Title" v-model="title">
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <ckeditor :editor="editor" v-model="description"></ckeditor>
                </div>
              </form>
            </div>
          </h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click.prevent="toggleModal()">Close</b-button>
        <b-button class="mt-2" variant="outline-warning" block @click.prevent="editPost(post._id)">Edit Post</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data(){
    return{
      show: false,
      editor: ClassicEditor,
    }
  },
  created(){
    // const id = this.post._id
    // this.$store.dispatch('fetchOnePost', id)
    const user_id = localStorage.getItem('user_id')
    if(this.post.author_post._id == user_id){
      this.show = true
    }
  },
  computed:{
    showDescription(){
      if(this.post.description.length >= 100){
        return this.post.description.slice(0,100) + '...'
      }
      else{
        return this.post.description
      }
    },
    title:{
      get(){
        return this.$store.state.editPost.title
      },
      set(value){
        this.$store.commit('CHANGE_TITLE_EDIT_POST', value)
      }
    },
    description:{
      get(){
        return this.$store.state.editPost.description
      },
      set(value){
        this.$store.commit('CHANGE_DESCRIPTION_EDIT_POST', value)
      }
    }
  },
  methods:{
    toDetail(id){
      this.$router.push(`/detailpage/${id}`)
    },
    deletePost(id){
      this.$store.dispatch('deletePost', id)
        .then(info=>{
          this.$store.dispatch('fetchPosts')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    editPost(id){
      this.$store.dispatch('editPost', id)
      this.$store.dispatch('fetchPosts')
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    toggleModal() {
      const title = this.post.title
      const description = this.post.description
      this.$store.commit('CHANGE_TITLE_EDIT_POST', title)
      this.$store.commit('CHANGE_DESCRIPTION_EDIT_POST', description)
      this.$refs['my-modal'].toggle('#toggle-btn')
    }
  },
  props:['post']
}
</script>

<style>

</style>