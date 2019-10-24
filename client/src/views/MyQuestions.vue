<template>
  <div class="d-flex">
    <div class="box">
      <h1>{{display}}</h1>
      <div v-for="(question, index) in questions" :key="index">
        <div class="d-flex mx-5 justify-content-end">
          <div>
            <b-button variant="warning" class="mx-2" size="sm" @click="editThis(question._id)">
              <i class="fas fa-edit"></i>
            </b-button>
          </div>
          <div>
            <b-button variant="danger" class="mx-2" size="sm" @click="deleteQues(question._id)">
              <i class="fas fa-trash"></i>
            </b-button>
          </div>
        </div>
        <OneQuestion :question="question"></OneQuestion>
        <hr v-if="index < questions.length-1" />
      </div>
      <div v-if="questions.length === 0" class="boxaja">
        <h1 style="text-decoration:underline">No Question</h1>
      </div>
    </div>
    <div class="righbar">
      <rightbar></rightbar>
    </div>
  </div>
</template>

<script>
import OneQuestion from '../components/OneQuestion.vue'
import Rightbar from '../components/Rightbar.vue'
export default {
  name: 'QuesOwned',
  data () {
    return {
      routename: this.$route.name,
      display: 'My Questions',
      description: 'this is all your question'
    }
  },
  components: {
    OneQuestion,
    Rightbar
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    totalques () {
      return this.questions.length
    }
  },
  methods: {
    deleteQues (id) {
      this.$store.dispatch('deleteQues', id)
    },
    editThis (id) {
      this.$store.commit('SET_EDIT', id)
      this.$router.push('/questions/edit')
    }
  },
  created () {
    this.$store.dispatch('getOwned')
  }
}
</script>

<style>
.box {
  margin-top: 5px;
  margin-bottom: 30px;
  min-height: calc(100vh - 450px);
  width: 58vw;
  border-radius: 8px;
  background: rgb(255, 255, 255);
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
hr {
  margin: 4px !important;
  padding: 0;
}
.header {
  height: 180px;
  text-align: left;
  width: 80%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.bold {
  border: 1px solid rgb(136, 121, 121);
}
.rightbar {
  min-height: 100vh;
}
.end {
  display: flex;
  align-items: flex-end;
}

.boxaja{
  padding: 10px;
  min-height: 500px;
  background: rgb(204, 204, 200)
}

</style>
