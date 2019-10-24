<template>
  <div class="ask">
    <b-container>
      <h3>Ask a question</h3>
      <b-card class="my-5" style="width: 70%;">
        <form>
          <div class="form-group">
            <label style="margin: 0;"><strong>Title</strong></label>
            <small class="form-text text-muted">Be specific and imagine you’re asking a question to another developer</small>
            <input type="text" v-model="title" class="form-control" placeholder="e.g. Is there an R function for finding the index of an element in vector?">
          </div>
          <div class="form-group">
            <label style="margin: 0;"><strong>Body</strong></label>
            <small class="form-text text-muted">Include all the information someone would need to answer your question</small>
            <quill v-model="desc" :config="config" output="html"></quill>
          </div>
          <button type="submit" @click.prevent="sendData" class="btn btn-primary mt-3">Submit</button>
        </form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Ask',
  data () {
    return {
      title: '',
      desc: '',
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic'],
            ['link', 'blockquote', 'code-block', 'image'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }]
          ]
        },
        theme: 'snow'
      }
    }
  },
  methods: {
    sendData () {
      this.$store.dispatch('newQuestion', {
        title: this.title,
        desc: this.desc
      })
    }
  }
}
</script>

<style>
.ask {
  margin-top: 100px;
}
.ql-container {
  min-height: 200px;
}
</style>
