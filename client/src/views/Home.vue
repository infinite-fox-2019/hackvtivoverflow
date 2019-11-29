<template>
  <div class='main-container'>
  <div class="header bg-light">
    <div class="row">
    <div class="col-8">
      <div class="text">
      <h2>{{ nameTop }}</h2>
      </div>
      <div v-if='!$route.params.name'>
      <p>{{ questions.length }} Global Questions</p>
      </div>
    </div>
    <div class="col-4">
      <div class='askquestion'>
        <router-link to='/ask'><a class='h2'>Ask Question</a></router-link>
      </div>
    </div>
    </div>
    <hr>
  </div>
  <hr>
  <div class="body">
    <router-view  />
  </div>
  <div class="foot bg-light">
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      questions: [],
      nameTop: 'All Question'
    }
  },
  components: {
  },
  methods: {
    okeFetch () {
      this.fetchData()
    },
    fetchData () {
      this.$store.dispatch('fetchData')
        .then(data => {
          this.questions = data
        })
        .catch(console.log);
    }
  },
  watch:{
    '$route.params.name'(val){
      if(!val) {
        this.nameTop = 'All Question'
      }else {
        this.nameTop = 'Tag '+val
      }
    },
    '$route.path'(val) {
      if(val == '/rating'){
        this.nameTop = 'Rating'
      } else if(val == '/ ' ){
        this.nameTop = 'All Question'
      } else if(val == '/watch/tag') {
        this.nameTop = 'Your Watch Tag'
      }
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped lang='scss'>

.h2{
  font-size:19px;
  text-transform:uppercase;
  letter-spacing:3px;
}
.askquestion{
  margin-top: 10px;
  margin-left: 25px;
  font-size: 25px;
}
.h2:hover{
  background-color: #fad390 !important;
}
.col-4 {
  padding: 20px;
}
.h2{
  position: absolute
}
.header{
  height: 5vw;
}
p {
  font-size: 15px;
  margin-left: 25px;
}
.body{
  overflow: auto;
  height: 41vw;
}
.foot{
  height: 5vw;
}

</style>