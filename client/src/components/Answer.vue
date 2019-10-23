<template>
<div class='question'>
    <div class="qleft col-1">
        <div class="upp">
            <unicon name="arrow-up" fill="royalblue" @click='plusVoteA(getAnswer._id)'/>
        </div>
        <div class="total">
            {{ count }}
        </div>
        <div class="downn">
            <unicon name="arrow-down" fill="royalblue" @click='minVoteA(getAnswer._id)'/>
        </div>
    </div>
    <div class='qright col-10'>
      <div>
        <b-card no-body class="text-left">
          <div class="bg-secondary text-light">
            <h3 v-html='getAnswer.response'></h3>
            <small>by: {{ getAnswer.UserId.username }}</small>
          </div>
        </b-card>
      </div>
    </div>  
</div>
</template>

<script>
export default {
  data () {
    return {
      upvote: '',
      downvote: 0
    }
  },
  computed: {
    count: {
      set () {
        this.upvote = this.getAnswer.upvotes;
        this.downvote = this.getAnswer.downvotes
      },
      get () {
        return this.getAnswer.upvotes.length - this.getAnswer.downvotes.length
      }
    }
  },
  props: ['getAnswer'],
  methods: {
    plusVoteA (id) {
      console.log(id)
      this.$store.dispatch('plusVoteAnswer', id)
        .then(_ => {
          this.$awn.success('You like this answer')
          this.$emit('fetchAnswer')
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
    minVoteA (id) {
      this.$store.dispatch('minVoteAnswer', id)
        .then(_ => {
          this.$awn.success('You dislike this answer')
          this.$emit('fetchAnswer')
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
    }
  }
}
</script>

<style>
.qright{
    width:680px;
}
</style>