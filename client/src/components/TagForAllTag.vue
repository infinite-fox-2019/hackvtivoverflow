<template>
  <b-card-text>
    <div class="d-flex">
      <button class="btn btn-outline-success" v-if='!isWatched' @click='watchTag'><unicon name='eye'></unicon>Watch</button>
      <button class="btn btn-danger btn-sm" v-else @click='watchTag'><unicon name='eye-slash'></unicon>UnWatch</button>
      <button class="btn btn-outline-warning ml-2" @click='goTagPage(getTag)'>See Questions</button>
    </div>
  </b-card-text>
</template>

<script>
import axios from '@/apis/server.js'

export default {
  data () {
    return {
      isWatched: false
    }
  },
  props: ['getTag'],
  computed: {
    user () {
      return this.$store.state.user.watchTag
    }
  },
  methods: {
    goTagPage (name) {
      this.$router.push(`/tag/${name}`)
    },
    setWatch () {
      const tag = this.getTag;
      this.user.forEach((el, i) => {
        if(el == tag) this.isWatched = true
      })
    },
    watchTag () {
      const tag = this.getTag
      axios({
        method: 'patch',
        url: '/users/add/watch',
        data: { tag },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.isWatched = !this.isWatched;
          this.$store.dispatch('checklogin')
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  watch: {
    user (val) {
      this.user = val
    }
  },
  created() {
    this.setWatch()
  }
}
</script>

<style>

</style>