<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
import io from 'socket.io-client'


export default {
  data(){
    return{
      socket : io.connect('http://54.179.189.163'),
      // socket : io.connect('http://localhost:3000'),
    }
  },
  created(){
       this.socket.on('getNews',(data)=>{
        // this.numFact = data
        this.$q.notify({
            color: 'grey',
            textColor: 'white',
            icon: 'help',
            message: `did you know that ${data}`
          })
      })
      let token = localStorage.getItem('token')
      if(token){
        this.$store.commit('LOGIN',true)
      } else {
        this.$store.commit('LOGIN',false)
      }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
