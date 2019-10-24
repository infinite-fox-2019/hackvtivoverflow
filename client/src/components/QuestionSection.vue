<template>
  <div>
    <h2 class="my-4 ml-3">{{data.title}}</h2>
    <b-media>
      <template v-slot:aside>
        <b-container>
          <b-row>
            <b-col>
              <b-img @click="upvotes()" width="40" style="cursor:pointer;" src="https://image.flaticon.com/icons/svg/25/25223.svg" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="mb-0 text-center">{{votes}}</h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img @click="downvotes()" style="cursor:pointer;" src="https://image.flaticon.com/icons/svg/25/25623.svg" width="40" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img v-if="data.UserId && data.UserId.name == $store.state.isLoginName" @click="editQuestion()" src="https://image.flaticon.com/icons/svg/1160/1160515.svg" width="20" class="" alt="placeholder" style="cursor:pointer; margin-left:10px; margin-top:10px;"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="m-auto">
              <b-img v-if="data.UserId && data.UserId.name == $store.state.isLoginName" @click="deleteQuestion()" style="cursor:pointer; margin-left:10px; margin-top:10px;" src="https://image.flaticon.com/icons/svg/1632/1632708.svg" width="20" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <div v-html="data.description">
      </div>
    </b-media>
  </div>
</template>

<script>
import axios from '../api/server'

export default {
  name: 'questionsection',
  props: [
    'data'
  ],
  data () {
    return {
      votes: 0
    }
  },
  watch: {
    data () {
      this.votes = this.data.upvotes.length - this.data.downvotes.length
    }
  },
  methods: {
    upvotes () {
      axios({
        method: 'patch',
        url: `/questions/upvotes/${this.data._id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('up')
          console.log(data)
          this.$store.dispatch('A_FETCH_QUESTION_LIST')
          this.$emit('updateResponse')
        })
        .catch(err => { console.log(err.response) })
    },
    downvotes () {
      axios({
        method: 'patch',
        url: `/questions/downvotes/${this.data._id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('down')
          console.log(data)
          this.$store.dispatch('A_FETCH_QUESTION_LIST')
          this.$emit('updateResponse')
        })
        .catch(err => { console.log(err.response) })
    },
    deleteQuestion () {
      axios({
        method: 'delete',
        url: `/questions/${this.data._id}`,
        data: {
          QuestionId: this.data.QuestionId
        },
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$router.push({ path: '/' })
        })
        .catch(err => { console.log(err.response) })
    },
    editQuestion(){
      this.$router.push({path:`/editquestion/${this.data._id}`})
    }
  },
  beforeMount () {
    console.log(this.data, '<a<dA<DA<dAS<dAS<dA<')
  }
}
</script>

<style>

</style>
