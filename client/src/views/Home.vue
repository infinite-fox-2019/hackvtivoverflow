<template>
  <div class="home">
    <Navbar />
    <div class="container">
    <Content />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Content from '../components/Content'

export default {
  name: 'home',
  components: {
    Navbar,
    Content
  }
}
</script>
<style scoped>
.container {
    margin: auto 10%;
  }
</style>>
