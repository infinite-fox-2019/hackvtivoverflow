<template>
  <div class="questions">
        <div class="qleft col-1">
          <div class="upp">
            <unicon name="arrow-up" fill="royalblue"  @click='plusvote(question._id)'/>
          </div>
          <div class="total">
            {{data}}
          </div>
          <div class="downn">
            <unicon name="arrow-down" fill="royalblue" @click='minvote(question._id)'/>
          </div>
        </div>
        <div class="qright col-11">
          <b-card class="text-center">
            <div class="bg-light text-dark">
              <a class='aheader'> <router-link :to='{ name:"detail", params: { id: question._id }}'>{{ question.title }}</router-link></a>
              <div class="tagss">
              <div class="col-8 tagss">
                <div v-for='(tag,i) in question.tags' :key='i'>
                    <Tag :get-tag='tag'/>
                </div>
                <h6>{{ answerData.length }} Answer</h6><unicon name='fast-mail'></unicon>
              </div>
              <div class="col-4">
                <div class="userright">
                  by:{{ question.UserId.username }}
                </div>
              </div>
            </div>
            </div>
          </b-card>
        </div>
  </div>
</template>

<script>
import Tag from './Tag'
import axios from 'axios'

export default {
  data () {
    return {
      answerData: '',
      upVote: '',
      downVote: ''
    }
  },
  components: {
    Tag
  },
  props: ['question'],
  methods: {
    plusvote (id) {
      this.$store.dispatch('plusVote', id)
        .then(data => {
          console.log(data)
          this.$awn.success('You like this question, u can add to favorite by click the star')
          this.$emit('fetchAgain')
        })
        .catch(err => {
          if(err.response.data.msg == 'Authentication Error!'){
            this.$awn.warning(err.response.data.msg+ '.. hint: Login/Register yeah.. i will send the form in 3 second')
            setTimeout(() => {
              this.$router.push('/login')              
            }, 3000);
          }else{
            this.$awn.warning(err.response.data.msg)
          }
        })
    },
    minvote (id) {
      this.$store.dispatch('minVote', id)
        .then(data => {
          console.log(data)
          this.$awn.success('You dislike this question')
          this.$emit('fetchAgain')
        })
        .catch(err => {
          if(err.response.data.msg == 'Authentication Error!'){
            this.$awn.warning(err.response.data.msg+ '.. hint: Login/Register yeah.. i will send the form in 3 second')
            setTimeout(() => {
              this.$router.push('/login')              
            }, 3000);
          }else{
            this.$awn.warning(err.response.data.msg)
          }
        })
    },
    getAnswer () {
      const id = this.question._id
      this.$store.dispatch('getAnswer', id)
        .then(data => {
          this.answerData = data
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  computed: {
    data: {
      get () {
        return this.question.upvotes.length - this.question.downvotes.length
      },
      set () {
        this.upvote= this.question.upvotes
        this.downvote= this.question.downvotes
      }
    }
  },
  created () {
    this.getAnswer()
  }
}
</script>

<style>
h6{
  margin-left: 2px;
}
h3{
  font-size: 25px
}
.aheader{
  font-size: 25px
}
.aheader:hover{
  color:chartreuse !important
}
.userright{
  text-align: right;
  font-size: 15px
}
.tagss{
  padding: 2px;
  display: flex;
}
.questions{
  height: 100%;
  margin-top: 5px;
  display: flex;
}
.qleft {
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column
}
.qright {
  background-color: white;
}
</style>