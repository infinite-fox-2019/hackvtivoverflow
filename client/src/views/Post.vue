<template>
  <div class="container" style="margin-top:10px">
    <h3>Add Question:</h3>
    <form @submit.prevent="addPost()">
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" placeholder="Your Title" v-model="title">
      </div>
      <div class="form-group">
        <label>Description</label>
        <ckeditor :editor="editor" v-model="editorData"></ckeditor>
      </div>
      <button type="submit" class="btn btn-primary">Add Post</button>
    </form>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data(){
    return{
      editor: ClassicEditor,
    }
  },
  methods:{
    addPost(){
      this.$store.dispatch('addPost')
        .then(info=>{
          this.$router.push('/')
        })
        .catch(err=>{
          console.log(err);
        })
    }
  },
  computed:{
    title:{
      get(){
        return this.$store.state.addPost.title
      },
      set(value){
        this.$store.commit("CHANGE_TITLE_POST", value)
      }
    },
    editorData:{
      get(){
        return this.$store.state.addPost.description
      },
      set(value){
        this.$store.commit('CHANGE_DESCRIPTION_POST', value)
      }
    }
  }
}
</script>

<style>

</style>