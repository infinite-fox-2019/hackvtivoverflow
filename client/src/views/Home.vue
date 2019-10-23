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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
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
@media (max-width: 600px) {
  .title {
    font-size: 26px;
  }
  .subtitle {
    font-size: 12px;
  }
}
</style>
