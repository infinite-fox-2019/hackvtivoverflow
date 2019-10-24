<template>
    <b-menu>
        <b-menu-list label="Menu">
          <a @click.prevent="home">Home</a>
            <b-menu-list icon="information-outline" label="Public">
              <a @click.prevent="">Stack Overflow</a>
              <a href="">Tags</a>
              <a href="">Users</a>
              <a href="">Jobs</a>
            </b-menu-list>
        </b-menu-list>
    </b-menu>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    home () {
      this.$router.push('/')
      this.$store.dispatch('changeStatus', 'list')
    }
  }
}
</script>
<style scoped>
  .menu {
    margin-left: 50%;
    margin-top: 20px;
  }
  a {
    font-size: 14px;
  }
  b-menu-list {
    font-size: 18px !important;
  }
</style>
