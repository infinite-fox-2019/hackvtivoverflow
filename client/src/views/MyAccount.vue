<template>
  <div class="d-flex">
  <SideBar />
  <CardQuestion  :questions="userQuestion" :actions="1"/>
  <router-view></router-view>
  </div>
</template>

<script>
import CardQuestion from '@/components/CardQuestion'
import { mapState } from 'vuex'
import SideBar from '@/components/SideBar'

export default {
  computed: mapState(['userQuestion']),
  components: {
    CardQuestion,
    SideBar
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
