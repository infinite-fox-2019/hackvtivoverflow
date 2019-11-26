<template>
  <q-layout view="hHh Lpr fFf">

  <Navbar></Navbar>

    <q-drawer show-if-above v-model="left" side="left" behavior="desktop" bordered id="left" :width="200">
      <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above side="right" :width="100">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div style="width: 100%; height: 70px; border: 1px solid black" id="title">
        
        <div>
          <q-btn color="primary" icon="help" label="Your Questions" @click="questionState" :size="size" style="margin-right: 5px; margin-top: 2px " />
          <q-btn color="primary" icon="edit" label="Your Answers" @click="answerState" :size="size" />
        </div>
        <div v-if="updateCard">
          <h6 style="margin: 0px">This is all your questions, you can edit or delete it</h6>
        </div>
        <div v-if="updateAnswer">
           <h6 style="margin: 0px"> This is all your Answer, you can edit it </h6>
        </div>

      </div>
      <div v-if="updateCard">
        <div v-for="question in myQuestions" :key="question.id"  >
          <q-btn color="primary" icon="edit" label="Edit" @click="update(question._id)" :size="size" style="margin: 5px"/>
          <q-btn color="primary" icon="delete" label="Delete" @click="removeConfirm(question._id)" :size="size" />
            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
                  <span class="q-ml-sm">Are you sure?.</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn flat label="Yes" color="primary" @click="remove(question._id)" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
        <Card :question='question'></Card>
        </div>
      </div>
      <div v-if="updateAnswer">
        <div v-for="answer in myAnswers" :key="answer.id"  >
          <q-btn color="primary" icon="edit" label="Edit" @click="updateThisAnswer(answer)" :size="size"  style="margin: 5px"/>
          <div style="cursor: pointer" @click="goToQuestion(answer.questionId._id)">
            <AnswerCard :answer='answer' ></AnswerCard>
          </div>
          <q-dialog v-model="updateAnswerState">
            <q-card style="width: 500px; max-width: 80vw;">
              <div class="q-pa-md" style="max-width: 400px">
                <h4>Update</h4>
                <q-form
                  @submit="onSubmit(answer._id)"
                  @reset="onReset"
                  class="q-gutter-md"
                >
                <q-editor
                v-model="answerDesc"
                :definitions="{
                  bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
                }"
                />
                <div>
                  <q-btn label="Submit" type="submit" color="primary"/>
                </div>
                </q-form>
              </div>
            </q-card>
          </q-dialog>
        </div>
      </div>
      
      <!-- <router-view /> -->
    </q-page-container>

  </q-layout>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import AnswerCard from '@/components/AnswerCard.vue'
import {mapState} from 'vuex'

export default {
  components : {
    Navbar,
    Card,
    AnswerCard
  },
  data(){
    return {
      left : false,
      myQuestions : [],
      size : 'sm',
      updateCard : true,
      updateAnswer : false,
      myAnswers: [],
      updateAnswerState: false,
      answerDesc: '',
      confirm: false
    }
  },
  methods : {
    getQuestions(){
      this.$store.dispatch('getQuestions')
        .then((questions)=>{
          let arr = []
          let id = this.$route.params.id
          questions.forEach(element => {
            if(element.userId === id){
              arr.push(element)
            }
          });
          this.myQuestions = arr
          console.log(this.myQuestions)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    update(id){
      this.$router.push(`/update/${id}`)
    },
    removeConfirm(id){
    this.confirm = true
    },
    remove(id){
      console.log(id)
     
      this.$store.dispatch('deleteQuestion',id)
        .then((successed)=>{
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Deleted'
          })
          this.getQuestions()
        })
        .catch((err)=>{
          this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `${err.response.data.msg}`
        })
      })
    },
    getAnswers(){
      let id = this.$route.params.id
      console.log(id);
      this.$store.dispatch('getMyAnswer',id)
        .then((answer)=>{
          this.myAnswers = answer.data
          console.log(this.myAnswers);
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    questionState(){
      this.updateCard = true
      this.updateAnswer = false
    },
    answerState(){
      this.updateCard = false
      this.updateAnswer = true
    },
    updateThisAnswer(answer){
      console.log('masuk---->>>')
      this.updateAnswerState = true
      this.answerDesc = answer.desc
      console.log(answer)
    },
    loginModal(){
      this.loginModalState = true
    },
    onSubmit (id) {
      console.log(this.answerDesc);
      console.log(id)
      let payload = {
        id,
        desc:this.answerDesc
      }
      this.$store.dispatch('updateAnswer',payload)
        .then(()=>{
        this.loginModalState = false
          this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_box',
          message: 'Answer Updated'
        })
      })
        .catch((err)=>{
          this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `${err.response.data.msg}`
        })
      })
    },
    onReset () {
      // this.email = ''
      // this.password = ''
    },
    goToQuestion(id){
      console.log('masukk');
      console.log(id);
      this.$router.push(`/question/${id}`)
    }
  },
  created(){
      this.getQuestions()
      this.getAnswers()
  },
  computed : {
    ...mapState(['login']),
  } 
}
</script>

<style>

</style>