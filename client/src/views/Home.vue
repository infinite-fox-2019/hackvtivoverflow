<template>
  <div class="home">
    <div class="main-content">
      <div class="columns">
        <div class="column sidebar is-one-fifth">
          <Sidebar></Sidebar>
        </div>
        <div class="column">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '../components/Sidebar'

export default {
  name: 'home',
  components: {
    Sidebar
  }
}
</script>

<style scoped>
.sidebar {
  border-right: solid 1px rgb(201, 201, 201);
}
.main-content {
  margin-top: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 600px) {
  .title {
    font-size: 26px;
  }
  .subtitle {
    font-size: 12px;
  }
  .sidebar {
    width: 100%;
    border-right: solid 1px rgb(201, 201, 201);
  }
}
</style>
