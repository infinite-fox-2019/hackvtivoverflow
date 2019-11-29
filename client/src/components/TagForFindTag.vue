<template>
  <div class='taginside'>
  <b-card :title="questionTag.title" :sub-title="questionTag.UserId.username"><unicon name='user'></unicon>
      <hr>
    <b-card-text>
        <a v-html='questionTag.description'></a>
    </b-card-text>
    <b-card-text>A second paragraph of text in the card.</b-card-text>
    <hr>
    <div class="fless">
        <div v-for='(tag,i) in questionTag.tags' :key='i'>
            <a href="#" class="card-link">
                <Tag :get-tag='tag' />
            </a>
        </div>
        <div class="answerQuestion">
            {{answerss.length}} <router-link :to='{ name: "detail", params: { id: questionTag._id}}' >Answers</router-link> <unicon name='fast-mail'></unicon>
        </div>
    </div>
  </b-card>
</div>
</template>

<script>
import Tag from './Tag'

export default {
  data () {
    return {
      answerss: ''
    }
  },
  props: ['questionTag'],
  components: {
    Tag
  },
  methods: {
    fetchAnswer () {
      const id = this.questionTag._id
      this.$store.dispatch('getAnswer', id)
        .then(data => {
          this.answerss = data
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.fetchAnswer()
  }
}
</script>

<style>
.fless{
    display: flex;
}
.taginside {
    padding-top: 5px;
}
.answerQuestion{
    margin-left: 14px;
}
</style>