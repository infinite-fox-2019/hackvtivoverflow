<template>
  <q-layout view="hHh Lpr fFf">

  <Navbar></Navbar>

    

    <q-drawer show-if-above v-model="left" side="left" behavior="desktop" bordered id="left" :width="200">
      <!-- drawer content -->
      {{this.numFact}}
    </q-drawer>

    <q-drawer show-if-above side="right" :width="100">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div id="title">
        <!-- <div>
        All Questions
        {{questions.length}}
        </div>
        <div>
          <q-btn unelevated no-caps color="primary" label="Ask Question" v-if="login" @click="ask"/>
        </div> -->
        <div class="row" style="width: 100%">
          <div class="col">
            <div class="col">
              <h6 style="margin: 0px">All Questions</h6>
            </div>
            <div class="col">
              {{questions.length}} questions
            </div>
          </div>
          <div class="col">
            <q-btn unelevated no-caps color="primary" label="Ask Question" v-if="login" @click="ask"/>
          </div>
        </div>
      </div>
      <div v-for="question in questions" :key="question.id" >
        <Card :question='question'></Card>
      <hr>
      </div>
      <!-- <router-view /> -->
    </q-page-container>

  </q-layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import {mapState} from 'vuex'


export default {
  name: 'home',
  components: {
    HelloWorld,
    Navbar,
    Card
  },
  data () {
    return {
      left: false,
      
      numFact: ''
      // right: false
    }
  },
  methods: {
    getQuestions(){
      this.$store.dispatch('getQuestions')
    },
    ask(){
    this.$router.push('/askquestion')
    }
  },
  created(){
   
      this.getQuestions()
  },
  computed :  mapState(['questions','login'])
}
</script>


<style scoped>
#title{
  width: 100%; 
  height: 70px; 
  border: 1px solid rgba(0, 0, 0, 0.178);
  display: flex;
  /* flex-direction: column; */
  margin-bottom: 10px;
  
  justify-content: space-between;
  padding: 10px;
}
</style>