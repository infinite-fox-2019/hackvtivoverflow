<template>
  <div>
  <CardQuestion  :questions="userQuestion" :actions="1"/>
  <router-view></router-view>
  </div>
</template>

<script>
import CardQuestion from '@/components/CardQuestion'
import { mapState } from 'vuex'

export default {
  computed: mapState(['userQuestion']),
  components: {
    CardQuestion
  },
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('getUserQuestion')
  }

}
</script>

<style>

</style>
