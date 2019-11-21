<template>
  <div class='ratingcard'>
      <b-card bg-variant="light" text-variant="black" :title="sendQuestion.title">
        <b-card-text>
          <p>Views: {{sendQuestion.views}}<br>
          <small>Answer: {{ answerData.length }}</small>
          </p>
          <hr>
        </b-card-text>
        <b-button href="#" variant="info"><router-link :to='{ name:"detail", params: { id: sendQuestion._id }}'><a class='detailbtn'>Detail</a></router-link></b-button>
      </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      answerData: '',
      temp: []
    }
  },
  props: ['sendQuestion'],
  methods: {
    getAnswer () {
      const id = this.sendQuestion._id
      this.$store.dispatch('getAnswer', id)
        .then(data => {
          this.answerData = data
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    sendDetail (id) {

    }
  },
  created () {
    this.getAnswer()
  }
}
</script>

<style>
.ratingcard {
  padding-top:10px;
}
.detailbtn {
  color:aquamarine !important;
}
.detailbtn:hover {
  color: blue !important;
}
</style>