<template>
  <div class="home">
    <Sidebar/>
    <div class="center">
      <Search/>
      <Questions/>
    </div>
    <Ads/>
  </div>
</template>

<script>
// @ is an alias to /src
import Questions from '@/components/Questions'
import Sidebar from '@/components/Sidebar'
import Ads from '@/components/Ads'
import Search from '@/components/Search'

export default {
  name: 'home',
  components: {
    Questions,
    Sidebar,
    Ads,
    Search
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-wrap: wrap;
}

.center {
  display: flex;
  flex-direction: column;
  width: 50vw;
}
</style>
