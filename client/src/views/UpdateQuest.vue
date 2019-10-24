<template>
      <div>
        <form @submit.prevent="updateQuestion" class="form-ask">
            <h3 class="d-flex justify-content-start my-2"><strong> Updated Question Title </strong></h3>
          <label for="questTitle" class="sr-only"></label>
          <input v-model="questTitle" type="text" id="questTitle" class="form-control mt-2" required autofocus>
          <h3 class="d-flex justify-content-start my-2"><strong> Updated Question Description </strong></h3>
          <label for="questDescription" class="sr-only">Question Description</label>
         <br>
         <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
            <br>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Update Question !</button>

        </form>
      </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  data () {
    return {
      questTitle: this.$store.state.updateTitle,
      editor: ClassicEditor,
      editorData: this.$store.state.updateDescription,
      editorConfig: {
        // The configuration of the editor.
      }
    }
  },
  methods: {
    updateQuestion () {
      let payload = { title: this.questTitle, description: this.editorData }
      this.$store.dispatch('updateQuestion', payload)
    }
  }
}
</script>

<style scoped>
div {
  height: 100%;
}

div {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-ask {
  width: 100%;

  padding: 15px;
  margin: auto;
}
.form-ask .checkbox {
  font-weight: 400;
}
.form-ask .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-ask .form-control:focus {
  z-index: 2;
}
</style>
