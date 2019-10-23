<template>
  <div class="main-page w-full p-2 my-2">
      <div>
        <label for="title">Title</label>
        <input type="text" name="title" class="shadow rounded focus:border-inline border-gray-300 mx-2 my-4 w-1/3 px-6 py-2" v-model="title">
      </div>
      <quill-editor v-model="content"
        ref="myQuillEditor"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>
      <div class="my-8">
        <h1>add tags</h1>
        <form @submit.prevent="addTag">
          <input
            type="text"
            placeholder="tag"
            v-model="tag"
            class="border border-gray-200 focus:border-blue-400 p-2 rounded"
          />
          <button
            class="bg-blue-400 p-1 m-2 rounded hover:bg-blue-200 text-white hover:text-blue-400"
          >Add</button>
        </form>
      <div class="flex">
        <div v-for="(item, index) in tags" :key="index">
          <span class="p-2 flex items-center justify-between bg-green-200 rounded">
            {{ item }}
            <i class="fas fa-times cursor-pointer px-1" @click.prevent="deleteTag(index)"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="container">
      <button class="bg-blue-400 hover:bg-blue-700 text-white hover:text-gray-100 rounded p-2" @click.prevent="createQuestion">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      title: '',
      tags: [],
      tag: ''
    }
  },
  methods: {
    createQuestion () {
      const description = this.content
      const title = this.title
      const tags = this.tags
      this.$store.dispatch('askQuestion', { title, description, tags })
    },
    addTag () {
      let tags = this.tag.split(' ').map(el => {
        return el
      })

      tags.forEach(tag => {
        this.tags.push(tag)
      })
      this.tag = ''
    },
    deleteTag (index) {
      this.tags.splice(index, 1)
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    console.log('this is current quill instance object', this.editor)
  }
}
</script>

<style>
.main-page {
  margin-left: 380px;
  height: 100vh;
}
.ql-editor {
  min-height: 300px !important;
 }
 .quill-editor {
   background-color: rgba(159, 209, 179, 0.578) !important;
 }
 .ql-toolbar {
   background-color: rgba(55, 112, 107, 0.585)
 }
</style>
