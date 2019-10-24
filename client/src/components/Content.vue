<template>
  <div class="columns">
  <div class="column right is-one-quarter">
    <Sidebar />
  </div>
  <div class="column">
    <MainContent />
  </div>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'

export default {
  name: 'Content',
  components: {
    Sidebar,
    MainContent
  }
}
</script>

<style scoped>
  .columns {
    margin: auto;
    height: 800px;
  }
  .right {
    height: 100%;
    border-right: 2px solid rgb(228, 223, 223)
  }
</style>
