<template>
  <div class="container">
    <div class="notification has-background-white">
      <form @submit.prevent="addAnswer">
        <div style="font-size: 25px; margin-bottom: 10px;">Your Answer</div>
        <b-field label="Title">
          <b-input v-model="title"></b-input>
        </b-field>
        <wysiwyg v-model="description" />
        <button class="button is-info">Post Your Answer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerForm',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    addAnswer () {
      this.$store.dispatch('addAnswer', {
        title: this.title,
        description: this.description,
        questionId: this.$route.params.id
      })
    }
  }
}
</script>

<style scoped>
.notification {
  text-align: left;
}
.button {
  margin-top: 10px;
}
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>
