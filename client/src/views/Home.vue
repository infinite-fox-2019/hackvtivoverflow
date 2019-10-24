<template>
  <div class="main-page w-1/5 sm:w-1/3 md:w-3/4 p-4 my-2 " style="margin: 0 auto;">
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
  .home {
   height: 100vh; 
  }
</style>
