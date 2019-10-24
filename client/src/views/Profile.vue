<template>
  <div class="columns">
    <div class="column">
      <ProfileQuestions></ProfileQuestions>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import ProfileQuestions from '../components/ProfileQuestions'

export default {
  name: 'Profile',
  components: {
    ProfileQuestions
  }
}
</script>

<style scoped>
</style>
