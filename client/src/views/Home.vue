<template>
  <div class="main-page w-1/5 sm:w-1/3 md:w-3/4 p-4 my-2 mr-64">
    <List/>
  </div>
</template>
<script>
import List from '../components/List'
export default {
  name: 'home',
  components: {
    List
  }
}
</script>
<style >
  /* .home {
    margin-left: 25%;
  } */
</style>
