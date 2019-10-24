<template>
  <div>
    <strong class="has-text-info">Questions</strong>
    <div v-for="question in profileQuestions" :key="question._id">
      <div class="columns">
        <div class="column">
          {{ question.title }}
        </div>
        <div>
          <button class="button is-info">Update</button>
        </div>
        <div>
          <button class="button">Delete</button>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProfileQuestions',
  computed: {
    ...mapState(['profileQuestions'])
  },
  methods: {
    fetchProfileQuestions () {
      this.$store.dispatch('fetchProfileQuestions')
    }
  },
  created () {
    this.fetchProfileQuestions()
  }
}
</script>

<style scoped>
.column {
  text-align: left;
}
</style>
