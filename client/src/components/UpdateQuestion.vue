<template>
  <div class="container">
    <div class="notification has-background-white">
      <form @submit.prevent="updateQuestion">
        <b-field label="Title">
          <b-input v-model="title" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"></b-input>
        </b-field>
        <wysiwyg v-model="description" />
        <button class="button is-info">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../helpers/axios'
import alert from '../helpers/alert'

export default {
  name: 'QuestionForm',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    updateQuestion () {
      this.$store.dispatch('updateQuestion', {
        id: this.$route.params.id,
        title: this.title,
        description: this.description
      })
    },
    fetchQuestion () {
      axios.get(`questions/${this.$route.params.id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.title = data.title
          this.description = data.description
        })
        .catch(alert)
    }
  },
  watch: {
    '$route.params.id' () {
      this.fetchQuestion()
    }
  },
  created () {
    this.fetchQuestion()
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
