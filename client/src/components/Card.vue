<template>
  <q-card class="my-card" style="margin: 3px" >
    <q-card-section style="padding: 0px; height: 80px">
      <!-- <div class="text-h6">Our Changing Planet</div> -->
        <div class="row" style="width: 100%; height: 100%; padding: 5px">
        <div class="col-1 stat" >
          <div>{{this.score}}</div>
          <div>votes</div>
        </div>
        <div class="col-1 stat">
          <div>{{question.answerId.length}}</div>
          <div v-if="question.answerId.length <= 1">answer</div>
          <div v-if="question.answerId.length > 1">answers</div>
        </div>
        <div class="col-10" id="cardss">
          <div>
            <a @click="goToQuestion">{{question.title}}</a>
          </div>
          <div>
            <q-badge v-for="tag in question.tags" :key="tag.id" color="blue" style="margin-right: 3px">
              {{tag}}
            </q-badge>
          </div>
            <div>
             posted {{momentConvert}}
            </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment'

export default {
  props: ['question'],
  data(){
    return {
      score : 0
    }
  },
  methods : {
    getScore(id){
      this.$store.dispatch('getScore',id)
        .then((eachScore)=>{
          this.score = eachScore
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    goToQuestion(){
      this.$router.push(`/question/${this.question._id}`)
      // this.$router.push({ path: `question/${this.question._id}/`, query: { title: `${this.question.title}` } })
    }
  },
  computed: {
    momentConvert(){
       return moment(this.question.createdAt).from(new Date())
     
    }
  },
  created(){
    this.getScore(this.question._id)
  }
}
</script>

<style>
#cardss{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 10px;
  word-wrap: break-word;
}
.stat{
   display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
a {
    color: #0060B6;
    text-decoration: none;
}
a:hover 
{
     color:#00A0C6; 
     text-decoration:none; 
     cursor:pointer;  
}
</style>