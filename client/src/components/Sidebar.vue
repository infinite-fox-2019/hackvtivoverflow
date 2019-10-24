<template>
  <div class="w-1/5 sidebar flex-column justify-start shadow border border-gray-300 bg-green-100">
    <div @click.prevent="goHome" class="w-full side-menu">
      <a >Home</a>
    </div>
    <div @click.prevent="goUser" class="w-full side-menu">
      <a >My Question</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$store.commit('UPDATE_KEYWORD', { keyword: '' })
      this.$router.push('/')
      this.$store.dispatch('fetchQuestions')
    },
    goTag () {
      this.$router.push('/tags')
    },
    goUser () {
      this.$router.push('/users')
    }
  }
}
</script>

<style>

.sidebar {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 20%; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 0;
  top: 0;
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  margin-top: 86px;
  /* border: 0.6px black solid; */
}
.side-menu {
  padding-top: 20px;
  padding-bottom: 20px;
}

.side-menu:hover {
  cursor: pointer;
  background-color: rgba(255, 230, 0, 0.632)
}
</style>
