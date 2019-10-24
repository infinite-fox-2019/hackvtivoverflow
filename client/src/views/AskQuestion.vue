<template>
  <q-layout view="hHh Lpr fFf">
    <q-header bordered id="test">
    <q-toolbar>
      HacktivOverflow
       <div class="q-pa-md q-gutter-sm">
        <q-btn color="primary" label="Home" @click="home" :size="size"/>
        <q-btn color="primary" label="Logout" @click="logout" :size="size" v-if="login" />
      </div>
    </q-toolbar>
  </q-header>
    <q-page-container>
      <div id="askQuestion">
        <h5>Title</h5>
        <q-input square 
        outlined 
        v-model="title" 
        />
        <h5>Content</h5>
          <div >
          <q-editor
            v-model="desc"
            :definitions="{
              bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
            }"
            />
          </div>
          <h5>Tags</h5>
          <p>Tags must unique and max 5 tags</p>
            <input-tag v-model="tags" :allow-duplicates='false' :limit='5'></input-tag>
          <q-btn label="Submit" color="primary" @click="submit" id="submit"/>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import {mapState} from 'vuex'
import InputTag from 'vue-input-tag'

export default {
  components : {
    Navbar,
    'input-tag' : InputTag
  },
  data (){
    return {
      title: '',
      desc: '',
      tags: [],
      dense: true,
      size: 'sm',
      
    }
  },
  methods : {
    submit(){
      console.log(this.title)
      console.log(this.desc)
      console.log(this.tags);
      let payload = {
        title : this.title,
        desc : this.desc,
        tags : this.tags
      }
      this.$store.dispatch('submitQuestion',payload)
        .then(()=>{
          this.$router.push('/')
            this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_box',
            message: 'Questions submitted'
          })
        })
        .catch((err)=>{
           this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: `${err.response.data}`
          })
        })
    },
    logout(){
      localStorage.removeItem('token')
      this.$store.commit('LOGIN',false)
      this.$router.push('/')
    },
    home(){
      this.$router.push('/')
    }
  },
  computed : mapState(['login'])
}
</script>

<style>
#submit{
  width: 75px;
  margin: 10px
}
h5{
  margin: 10px !important
}
#askQuestion{
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center
}
</style>