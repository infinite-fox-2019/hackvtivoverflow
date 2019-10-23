<template>
  <div class="container mb-5">
      <h1>Ask a public question</h1>

        <div class="ask-title d-flex justify-content-center my-3 flex-column align-items-center">
          <textarea v-model="question.title" rows="2" cols="50" placeholder="Enter Title">
          </textarea>
          <div>
            <input v-model="inputTag" type="text" class="p-2" placeholder="add tag">
            <i @click.prevent="makeTag" class="fas fa-plus-circle"></i>
          </div>

          <div class="d-flex flex-wrap">
            <div v-for="(tag, index) in question.tags" :key="index" class="ask-tag d-flex align-items-center">
            <span class="text-white">
              #{{ tag }}
               <i
            @click.prevent="removeTag(index)"
            style="font-size: 15px;"
            class="far fa-times-circle text-white cursor-pointer"
          ></i>
            </span>
          </div>
          </div>

        </div>
        <quill-editor v-model="question.description"
                ref="myQuillEditor"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
        </quill-editor>
        <button @click.prevent="createQuestion" class="btn btn-primary my-3">Create Question</button>
  </div>
</template>

<script>

// you can also register quill modules in the component
export default {
  name: 'askQuestion',
  data () {
    return {
      question: {
        title: '',
        description: '',
        tags: []
      },
      inputTag: '',
      update: false
    }
  },
  methods: {
    makeTag () {
      let tagArr = this.inputTag.split(' ')
      tagArr.forEach(tag => {
        if (tag[0] == '#') {
          this.question.tags.push(tag.substring(1))
        } else if (tag) {
          this.question.tags.push(tag)
        }
      })
      this.inputTag = ''
    },
    removeTag (index) {
      this.question.tags.splice(index, 1)
    },
    createQuestion () {
      let title = this.question.title
      let description = this.question.description
      let tags = this.question.tags
      this.$store.dispatch('createQuestion', { title, description, tags })
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
.ql-editor{
    min-height: 300px !important;
    border-radius: 30px !important;
}

.ask-title {
  width: 100%;
}
.ask-title textarea{
  font-size: 40px;
  width: 50%;
  margin: 5px 0;
  border-radius: 15px;
  border: none;
  box-shadow: 10px 10px 30px -18px rgba(0,0,0,0.75);
  outline: none;
  transition: 300ms;
  text-align: center;
}

.ask-title input{
  width: 300px;
  border-radius: 15px;
  outline: none;
}

.ask-title i {
  font-size: 25px;
  margin-left: 5px;
  cursor: pointer;
  color: #9633FF;
}

.ask-title textarea:focus{
  font-size: 20px;
}

.ask-tag{
  background-color: #9633FF;
  border-radius: 15px;
  padding: 2px 10px;
  margin: 3px;
}
</style>
