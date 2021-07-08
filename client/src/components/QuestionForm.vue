<template>
  <div class="container">
    <div class="notification has-background-white">
      <form @submit.prevent="addQuestion">
        <b-field label="Title">
          <b-input v-model="title" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"></b-input>
        </b-field>
        <wysiwyg v-model="description" />
        <button class="button is-info">Post Your Question</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionForm',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    addQuestion () {
      this.$store.dispatch('addQuestion', {
        title: this.title,
        description: this.description
      })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  padding-top: 50px;
}
.notification {
  margin: 10px;
  text-align: left;
}
.button {
  margin-top: 10px;
  float: right;
}
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>
