<template>
  <div id="app">
    <!-- Navbar -->
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import cron from 'cron'

export default {
  components: {
    NavBar
  },
  created(){
    const CronJob = cron.CronJob;
    new CronJob('0 */5 * * * *', () => {
      const token = localStorage.getItem('access_token')
      if(token){
        swal({
          title: "Session End",
          text: "Your session has end, want to log out?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.dispatch('logout')
            this.$router.push('/login')
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          }
        });
      }
    }, null, true, 'America/Los_Angeles');
  }
}
</script>

<style>
</style>
