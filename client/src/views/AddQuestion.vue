<template>
  <b-container>
    <p class="h2 mt-5 mb-4">Your Question</p>
    <b-form>
      <b-form-group>
        <b-form-input v-model="title" placeholder="Question Title" required></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>      
        </b-col>
      </b-row>
      <b-button type="submit" class="mr-2 mt-3" size="" variant="success">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
      return {
          editor: ClassicEditor,
          editorData: '<p>Content of the editohohohohoholalallar.</p>',
          editorConfig: {
              // The configuration of the editor.
          }
      };
  }
}
</script>

<style>

</style>