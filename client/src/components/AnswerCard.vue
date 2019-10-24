<template>
  <q-card class="my-card" style="margin: 3px" >
    <q-card-section style="padding: 0px; height: 80px">
      <!-- <div class="text-h6">Our Changing Planet</div> -->
      <div class="col" style="width: 100%; height: 100%; padding: 5px">
        <!-- {{answer}} -->
        <!-- <div v-html="answer"></div> -->
        <div>
        Questions Title: {{answer.questionId.title}}
        </div>
        <div>
        Posted Question: {{momentConvert}}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment'


export default {
  props: ['answer'],
  data(){
    return {
    }
  },
  methods : {
  },
  created(){
    console.log(this.answer)
  },
  computed : {
    momentConvert(){
       return moment(this.answer.questionId.createdAt).from(new Date())
    }
  }
}
</script>

<style>
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