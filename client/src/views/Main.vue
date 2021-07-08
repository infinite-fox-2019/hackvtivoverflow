<template>
  <section class="hero is-warning">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          We &lt;3 People who code
        </h1>
        <h2 class="subtitle">
          We build products that empower developers<br>and connect them to solutions that enable<br>productivity, growth, and discovery.
        </h2>
        <router-link to="/home"><button class="button is-info">Explore</button></router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>
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
</style>
