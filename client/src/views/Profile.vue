<template>
  <div>
    <div class="columns">
      <div class="column">
        <ProfileQuestions></ProfileQuestions>
      </div>
      <div class="column">
        <ProfileAnswers></ProfileAnswers>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ProfileQuestions from '../components/ProfileQuestions'
import ProfileAnswers from '../components/ProfileAnswers'

export default {
  name: 'Profile',
  components: {
    ProfileQuestions,
    ProfileAnswers
  }
}
</script>

<style scoped>
.columns {
  margin: auto;
  width: 900px;
}
</style>
