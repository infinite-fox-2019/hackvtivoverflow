<template>
  <div>
    <h1>Counter is: {{doubleCounter}}</h1>
    <p>Number of Clicks: {{stringCounter}}</p>
    <button @click.prevent="increment">Increment</button>
    <button @click.prevent="decrement">Decrement</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["doubleCounter", "stringCounter"]),
    ourOwn() {}
  },
  methods: {
    increment() {
      this.$store.state.counter++;
    },
    decrement() {
      this.$store.state.counter--;
    }
  }
};
</script>

<style>
</style>