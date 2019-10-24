<template>
  <div class="page">
    <div class="m-4">Edit your answer </div>
    <quill-editor v-model="description"
        ref="myQuillEditor"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>
    <div>
      <button class="bg-blue-400 hover:bg-blue-700 text-white hover:text-gray-800 rounded p-2 m-2 align-left" @click.prevent="updateAnswer">Update your Answer</button>
    </div>
  </div>
</template>

<script>
import axios from '../apis/axios'
export default {
  data () {
    return {
      description: ''
    }
  },
  methods: {
    updateAnswer () {
      this.$store.dispatch('updateAnswer', { description: this.description, id: this.$route.params.id })
    }
  },
  created () {
    axios({
      method: 'GET',
      url: `/answers/${this.$route.params.id}`,
      headers: { token: localStorage.getItem('token')}
    })
      .then(({ data }) => {
        this.description = data.description
      })
      .catch(alert)
  }
}
</script>

<style>
.page {
  margin-left: 25%;
}
</style>
