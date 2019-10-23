<template>
  <div class="home">
    <section v-if="!$store.state.isLogin" class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            We &lt;3 People who code
          </h1>
          <h2 class="subtitle">
            We build products that empower developers<br>and connect them to solutions that enable<br>productivity, growth, and discovery.
          </h2>
        </div>
      </div>
    </section>
    <div v-if="$store.state.isLogin" class="main-content">
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
.title {
  font-family: 'Bree Serif', serif;
  font-size: 40px;
}
.hero {
  height: 400px;
}
.hero-body {
  margin-top: 50px;
}
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
